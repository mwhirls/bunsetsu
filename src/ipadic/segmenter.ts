import kuromoji from "kuromoji";
import { ConjugatedForm } from "../conjugation.js";
import { Sentence } from "../sentence.js";
import { PartOfSpeech, Details, Word, SuffixType } from "../word.js";
import { IpadicAdjective, IpadicAdjectiveDetail } from "./adjective.js";
import { IpadicNoun } from "./noun.js";
import { IpadicSentence } from "./sentence.js";
import { IpadicSymbol } from "./symbol.js";
import { IpadicVerb, IpadicVerbDetail } from "./verb.js";
import { posDetails, IpadicWord } from "./word.js";
import { Segmenter } from "../segmenter.js";
import { IpadicConjugatedForm } from "./conjugation.js";

function isSuruVerb(token: kuromoji.IpadicFeatures) {
    const details = posDetails(token);
    return token.pos === PartOfSpeech.Noun && details.some((value) => value === SuffixType.SuruConjunction);
}

function handleSuffixedNoun(stem: kuromoji.IpadicFeatures, suffix: kuromoji.IpadicFeatures) {
    return new IpadicNoun(stem, suffix);
}

function handleNoun(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    if (isSuruVerb(token)) {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.basic_form === 'する') {
            const verb = handleVerbAdjective(tokens, index + 1);
            if (verb.detail && verb.detail.type === PartOfSpeech.Verb) {
                return new IpadicNoun(token, undefined, verb);
            }
        }
    }
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next && next.basic_form === Details.Suffix) {
        return handleSuffixedNoun(token, next);
    }
    return new IpadicNoun(token);
}

function handleFiller(tokens: kuromoji.IpadicFeatures[], index: number) {
    const specialCases = ['あのう', 'えっと', 'ええっと', 'ええと']; // tokenizer splits these into separate tokens
    const token = tokens[index];
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next) {
        const compound = `${token.basic_form}${next.basic_form}`;
        if (specialCases.some((value) => compound === value)) {
            return new IpadicWord(PartOfSpeech.Filler, [token, next]);
        }
    }
    if (token.pos === PartOfSpeech.Filler) {
        return new IpadicWord(PartOfSpeech.Filler, [token]);
    }
    return null;
}

function handleInterjection(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicWord(PartOfSpeech.Interjection, [token]);
}

function handleSymbol(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    return new IpadicSymbol(token);
}

function conjugatedWord(stem: kuromoji.IpadicFeatures, inflection: kuromoji.IpadicFeatures[], conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord): IpadicAdjective | IpadicVerb {
    switch (stem.pos) {
        case PartOfSpeech.Verb:
        case PartOfSpeech.AuxillaryVerb: {
            const detail = new IpadicVerbDetail(conjugatedForm, auxillaryWord);
            return new IpadicVerb(stem, inflection, detail);
        }
        case PartOfSpeech.iAdjective: {
            const detail = new IpadicAdjectiveDetail(conjugatedForm, auxillaryWord);
            return new IpadicAdjective(stem, inflection, detail);
        }
        default:
            throw new Error('unrecognized conjugated word');
    }
}

function handleConditional(tokens: kuromoji.IpadicFeatures[], index: number): IpadicAdjective | IpadicVerb {
    const token = tokens[index];
    const form = ConjugatedForm.Conditional;
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next && next.surface_form === 'ば') { // group 来れ+ば
        return conjugatedWord(token, [next], form);
    }
    return conjugatedWord(token, [], form);
}

function handleImperativeEConjugation(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    const form = ConjugatedForm.Imperative;
    if (token.conjugated_type === '五段・サ行') {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.surface_form === 'よ') {
            return conjugatedWord(token, [next], form); // archaic せよ case
        }
    }
    return conjugatedWord(token, [], form);
}

function handleTaConjunction(tokens: kuromoji.IpadicFeatures[], index: number): IpadicAdjective | IpadicVerb {
    const token = tokens[index];
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next) {
        if (next.surface_form === 'たら') { // group 早かっ＋たら
            return conjugatedWord(token, [next], ConjugatedForm.TaraConditional);
        } else if (next.surface_form === 'た') { // group 早かっ＋た 
            return conjugatedWord(token, [next], ConjugatedForm.PastForm);
        }
    }
    console.warn('unrecognized conjugation found');
    return conjugatedWord(token, [], ConjugatedForm.Unknown);
}

function handleTeConjunction(tokens: kuromoji.IpadicFeatures[], index: number): IpadicAdjective | IpadicVerb {
    const token = tokens[index];
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next) {
        if (next.surface_form === 'て') { // group 早く＋て
            return conjugatedWord(token, [next], ConjugatedForm.TeForm);
        }
        switch (next.pos) {
            case PartOfSpeech.AuxillaryVerb: { // group 早く＋ない
                const auxillaryVerb = handleVerbAdjective(tokens, index + 1);
                return conjugatedWord(token, [...auxillaryVerb.tokens], ConjugatedForm.Adverbial, auxillaryVerb);
            }
        }
    }
    if (token.pos === PartOfSpeech.iAdjective) { // 早く
        return conjugatedWord(token, [], ConjugatedForm.Adverbial);
    }
    console.warn('unrecognized conjugation found');
    return conjugatedWord(token, [], ConjugatedForm.Unknown);
}

function handleConjunctiveForm(tokens: kuromoji.IpadicFeatures[], index: number, conjugatedForm: ConjugatedForm) {
    const token = tokens[index];
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (!next) {
        return conjugatedWord(token, [], conjugatedForm);
    }
    switch (next.pos) {
        case PartOfSpeech.Verb:
        case PartOfSpeech.AuxillaryVerb:
        case PartOfSpeech.iAdjective: {
            const auxillaryVerb = handleVerbAdjective(tokens, index + 1);
            return conjugatedWord(token, [...auxillaryVerb.tokens], conjugatedForm, auxillaryVerb);
        }
        case PartOfSpeech.Noun: {
            const details = posDetails(next);
            if (details.some((value) =>
                value === SuffixType.Special || // ～さ
                value === SuffixType.AuxillaryVerbStem)) { // ～そう
                const suffix = handleNoun(tokens, index + 1);
                return conjugatedWord(token, [next], conjugatedForm, suffix);
            }
            throw Error('unrecognized conjunctive form');
        }
        default:
            throw Error('unrecognized conjunctive form');
    }
}

function handleVerbAdjective(tokens: kuromoji.IpadicFeatures[], index: number): IpadicAdjective | IpadicVerb {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as adjectives
    if (filler) {
        return filler;
    }
    const ipadicForm = Object.values(IpadicConjugatedForm).find(x => x === token.conjugated_form);
    switch (ipadicForm) {
        case IpadicConjugatedForm.PlainForm:
            return conjugatedWord(token, [], ConjugatedForm.PlainForm);
        case IpadicConjugatedForm.ConditionalContraction1:
        case IpadicConjugatedForm.ConditionalContraction2:
            return conjugatedWord(token, [], ConjugatedForm.ConditionalContraction);
        case IpadicConjugatedForm.ConditionalForm:
            return handleConditional(tokens, index);
        case IpadicConjugatedForm.Continuative:
            return handleConjunctiveForm(tokens, index, ConjugatedForm.Continuative);
        case IpadicConjugatedForm.GaruConjunction:
            return handleConjunctiveForm(tokens, index, ConjugatedForm.GaruForm);
        case IpadicConjugatedForm.GozaiConjunction:
            return handleConjunctiveForm(tokens, index, ConjugatedForm.GozaiForm);
        case IpadicConjugatedForm.IrrealisNuConjunction:
            return handleConjunctiveForm(tokens, index, ConjugatedForm.IrrealisNuForm);
        case IpadicConjugatedForm.IrrealisUConjunction:
            return handleConjunctiveForm(tokens, index, ConjugatedForm.IrrealisUForm);
        case IpadicConjugatedForm.ImperativeI:
        case IpadicConjugatedForm.ImperativeRo:
        case IpadicConjugatedForm.ImperativeYo:
        case IpadicConjugatedForm.ImperativeE:
            return handleImperativeEConjugation(tokens, index);
        case IpadicConjugatedForm.ClassicalPlainForm:
            return conjugatedWord(token, [], ConjugatedForm.ClassicalPlainForm);
        case IpadicConjugatedForm.IndeclinableNominalConjunction:
        case IpadicConjugatedForm.SpecialIndeclinableNominalConjunction1:
        case IpadicConjugatedForm.SpecialIndeclinableNominalConjunction2:
            return conjugatedWord(token, [], ConjugatedForm.IndeclinableNominal);
        case IpadicConjugatedForm.TaConjunction:
            return handleTaConjunction(tokens, index);
        case IpadicConjugatedForm.TeConjunction:
            return handleTeConjunction(tokens, index);
        default:
            throw new Error("unhandled verb/adjective conjugation");
    }
}

function nextWord(tokens: kuromoji.IpadicFeatures[], index: number): IpadicWord {
    const token = tokens[index];
    switch (token.pos) {
        case PartOfSpeech.Filler:
            return handleFiller(tokens, index) ?? new IpadicWord(PartOfSpeech.Filler, [token]);
        case PartOfSpeech.Interjection:
            return handleInterjection(tokens, index);
        case PartOfSpeech.Symbol:
            return handleSymbol(tokens, index);
        case PartOfSpeech.Verb:
        case PartOfSpeech.iAdjective:
            return handleVerbAdjective(tokens, index);
        case PartOfSpeech.Noun:
            return handleNoun(tokens, index);
        default:
            return new IpadicWord(PartOfSpeech[token.pos as keyof typeof PartOfSpeech], [token]);
    }
}

function nextSentence(tokens: kuromoji.IpadicFeatures[], start: number): IpadicSentence {
    const result = [];
    let index = start;
    while (index < tokens.length) {
        const word = nextWord(tokens, index);
        index += word.tokens.length;
        result.push(word);
        // todo: break sentence
    }
    return { words: result, start, end: index };
}

function toSentences(tokens: kuromoji.IpadicFeatures[]): Sentence[] {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const sentence = nextSentence(tokens, index);
        index += sentence.end - sentence.start;
        result.push(sentence);
    }
    return result;
}

function toWords(tokens: kuromoji.IpadicFeatures[]): Word[] {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const word = nextWord(tokens, index);
        index += word.tokens.length;
        result.push(word);
    }
    return result;
}

export class IpadicSegmenter implements Segmenter {
    tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>;

    constructor(tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>) {
        this.tokenizer = tokenizer;
    }

    segmentAsWords(text: string): Word[] {
        const tokens = this.tokenizer.tokenize(text);
        return toWords(tokens);
    }
    segmentAsSentences(text: string): Sentence[] {
        const tokens = this.tokenizer.tokenize(text);
        return toSentences(tokens);
    }
}

export function buildSegmenter(dicPath: string): Promise<Segmenter> {
    return new Promise((resolve, reject) => {
        const tokenizerBuilder = kuromoji.builder({ dicPath });
        tokenizerBuilder.build((err: Error, tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>) => {
            if (err) {
                reject(err);
            } else {
                const segmenter = new IpadicSegmenter(tokenizer);
                resolve(segmenter);
            }
        });
    });
}

export default buildSegmenter;