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
import { IpadicConjugatedForm, IpadicConjugatedType } from "./conjugation.js";

class TokenCursor {
    private readonly tokens: kuromoji.IpadicFeatures[];
    private readonly curr: number;

    constructor(tokens: kuromoji.IpadicFeatures[], curr: number) {
        this.tokens = tokens;
        this.curr = curr;
    }

    token(): kuromoji.IpadicFeatures {
        return this.tokens[this.curr];
    }

    peek(): kuromoji.IpadicFeatures | null {
        const next = this.curr + 1;
        if (next >= this.tokens.length) {
            return null;
        }
        return this.tokens[next];
    }

    advanced(num: number): TokenCursor | null {
        const next = this.curr + num;
        if (next >= this.tokens.length) {
            return null;
        }
        return new TokenCursor(this.tokens, next);
    }

    next(): TokenCursor | null {
        return this.advanced(1);
    }
}

function isSuruVerb(token: kuromoji.IpadicFeatures) {
    const details = posDetails(token);
    return token.pos === PartOfSpeech.Noun && details.some((value) => value === SuffixType.SuruConjunction);
}

function handleSuffixedNoun(stem: kuromoji.IpadicFeatures, suffix: kuromoji.IpadicFeatures) {
    return new IpadicNoun(stem, suffix);
}

function handleNoun(cursor: TokenCursor) {
    const token = cursor.token();
    if (isSuruVerb(token)) {
        const next = cursor.next();
        if (next && next.token().basic_form === 'する') {
            const verb = handleVerbAdjective(next);
            if (verb.detail && verb.detail.type === PartOfSpeech.Verb) {
                return new IpadicNoun(token, undefined, verb);
            }
        }
    }
    const next = cursor.peek();
    if (next && next.basic_form === Details.Suffix) {
        return handleSuffixedNoun(token, next);
    }
    return new IpadicNoun(token);
}

function handleFiller(cursor: TokenCursor) {
    const specialCases = ['あのう', 'えっと', 'ええっと', 'ええと']; // tokenizer splits these into separate tokens
    const token = cursor.token();
    const next = cursor.peek();
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

function handleInterjection(cursor: TokenCursor) {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicWord(PartOfSpeech.Interjection, [token]);
}

function handleSymbol(cursor: TokenCursor) {
    const token = cursor.token();
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

function handleConditional(cursor: TokenCursor): IpadicAdjective | IpadicVerb {
    const token = cursor.token();
    const form = ConjugatedForm.Conditional;
    const next = cursor.peek();
    if (next && next.surface_form === 'ば') { // group 来れ+ば
        return conjugatedWord(token, [next], form);
    }
    return conjugatedWord(token, [], form);
}

function handleTaConjunction(cursor: TokenCursor): IpadicAdjective | IpadicVerb {
    const token = cursor.token();
    const next = cursor.peek();
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

function handleAuxillaryWord(cursor: TokenCursor | null): IpadicWord | null {
    if (!cursor) {
        return null;
    }
    const details = posDetails(cursor.token());
    if (cursor.token().pos === PartOfSpeech.AuxillaryVerb ||
        details.some((value) => value === Details.NotIndependent)) {
        const auxillary = nextWord(cursor);
        return auxillary;
    }
    return null;
}

function handleTeConjunction(cursor: TokenCursor): IpadicAdjective | IpadicVerb {
    const token = cursor.token();
    const next = cursor.next();
    if (next) {
        if (next.token().surface_form === 'て') { // group 早く＋て
            const auxillary = handleAuxillaryWord(next.next());
            const auxTokens = auxillary?.tokens ?? [];
            return conjugatedWord(token, [next.token(), ...auxTokens], ConjugatedForm.TeForm, auxillary ?? undefined);
        }
        switch (next.token().pos) {
            case PartOfSpeech.AuxillaryVerb: { // group 早く＋ない
                const auxillaryVerb = handleVerbAdjective(next);
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

function handleMasuStem(curr: TokenCursor, next: TokenCursor) {
    const token = curr.token();
    const auxillaryVerb = handleVerbAdjective(next);
    switch (next.token().conjugated_type) {
        case IpadicConjugatedType.Masu: // 来ます
            return conjugatedWord(token, [...auxillaryVerb.tokens], ConjugatedForm.PoliteForm, auxillaryVerb);
        case IpadicConjugatedType.Ta: // 来ました
            return handleTaConjunction(curr);
    }
    const detail = auxillaryVerb.detail;
    if (detail?.type !== PartOfSpeech.Verb &&
        detail?.type !== PartOfSpeech.iAdjective) {
        throw Error('unrecognized continuative form');
    }
    return conjugatedWord(token, [...auxillaryVerb.tokens], detail.conjugatedForm, auxillaryVerb);
}

function handleContinuativeForm(cursor: TokenCursor) {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        if (token.conjugated_type === IpadicConjugatedType.IchidanKureru &&
            token.surface_form === 'くれ') { // irregular imperative of くれる can be miscategorized
            return conjugatedWord(token, [], ConjugatedForm.Imperative);
        }
        // todo: how to categorize this? is this a partial phrase?
        return conjugatedWord(token, [], ConjugatedForm.Continuative);
    }
    switch (next.token().pos) {
        case PartOfSpeech.Verb:
        case PartOfSpeech.AuxillaryVerb: {
            return handleMasuStem(cursor, next);
        }
        case PartOfSpeech.Particle: {
            switch (next.token().basic_form) {
                case 'て': // 来まして
                    return handleTeConjunction(cursor);
                case 'な': // し（な）よ 
                    return conjugatedWord(token, [next.token()], ConjugatedForm.Imperative);
                default:
                    throw Error('unrecognized continuative form');
            }
        }
        default:
            throw Error('unrecognized continuative form');
    }
}

function handleConjunctiveForm(cursor: TokenCursor, conjugatedForm: ConjugatedForm) {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return conjugatedWord(token, [], conjugatedForm);
    }
    switch (next.token().pos) {
        case PartOfSpeech.Verb:
        case PartOfSpeech.AuxillaryVerb:
        case PartOfSpeech.iAdjective: {
            const auxillaryVerb = handleVerbAdjective(next);
            return conjugatedWord(token, [...auxillaryVerb.tokens], conjugatedForm, auxillaryVerb);
        }
        case PartOfSpeech.Noun: {
            const details = posDetails(next.token());
            if (details.some((value) =>
                value === SuffixType.Special || // ～さ
                value === SuffixType.AuxillaryVerbStem)) { // ～そう
                const suffix = handleNoun(next);
                return conjugatedWord(token, [next.token()], conjugatedForm, suffix);
            }
            throw Error('unrecognized conjunctive form');
        }
        default:
            throw Error('unrecognized conjunctive form');
    }
}

function handleIrrealisForm(cursor: TokenCursor) {
    // 感じない, 逃げない, 走らない, 来ない、しない, etc
    return handleConjunctiveForm(cursor, ConjugatedForm.NaiForm);
}

function handleIrrealisUConjunction(cursor: TokenCursor) {
    const token = cursor.token();
    switch (token.pos) {
        case PartOfSpeech.Verb: // 来よう、食べよう、買おう、しよう, etc
            return handleConjunctiveForm(cursor, ConjugatedForm.Volitional);
        default:
            return handleConjunctiveForm(cursor, ConjugatedForm.IrrealisUForm);
    }
}

function handleVerbAdjective(cursor: TokenCursor): IpadicAdjective | IpadicVerb {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as adjectives
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
            return handleConditional(cursor);
        case IpadicConjugatedForm.Continuative:
            return handleContinuativeForm(cursor);
        case IpadicConjugatedForm.GaruConjunction:
            return handleConjunctiveForm(cursor, ConjugatedForm.GaruForm);
        case IpadicConjugatedForm.GozaiConjunction:
            return handleConjunctiveForm(cursor, ConjugatedForm.GozaiForm);
        case IpadicConjugatedForm.Irrealis:
            return handleIrrealisForm(cursor);
        case IpadicConjugatedForm.IrrealisNuConjunction:
            return handleConjunctiveForm(cursor, ConjugatedForm.IrrealisNuForm);
        case IpadicConjugatedForm.IrrealisUConjunction:
            return handleIrrealisUConjunction(cursor);
        case IpadicConjugatedForm.SpecialIrrealis:
            return handleConjunctiveForm(cursor, ConjugatedForm.Contracted);
        case IpadicConjugatedForm.ImperativeI:
        case IpadicConjugatedForm.ImperativeRo:
        case IpadicConjugatedForm.ImperativeYo:
        case IpadicConjugatedForm.ImperativeE:
            return conjugatedWord(token, [], ConjugatedForm.Imperative);
        case IpadicConjugatedForm.ClassicalPlainForm:
            return conjugatedWord(token, [], ConjugatedForm.ClassicalPlainForm);
        case IpadicConjugatedForm.IndeclinableNominalConjunction:
            return conjugatedWord(token, [], ConjugatedForm.IndeclinableNominal);
        case IpadicConjugatedForm.SpecialIndeclinableNominalConjunction1:
        case IpadicConjugatedForm.SpecialIndeclinableNominalConjunction2:
            return conjugatedWord(token, [], ConjugatedForm.Contracted);
        case IpadicConjugatedForm.TaConjunction:
            return handleTaConjunction(cursor);
        case IpadicConjugatedForm.TeConjunction:
            return handleTeConjunction(cursor);
        default:
            throw new Error("unhandled verb/adjective conjugation");
    }
}

function nextWord(cursor: TokenCursor): IpadicWord {
    const token = cursor.token();
    switch (token.pos) {
        case PartOfSpeech.Filler:
            return handleFiller(cursor) ?? new IpadicWord(PartOfSpeech.Filler, [token]);
        case PartOfSpeech.Interjection:
            return handleInterjection(cursor);
        case PartOfSpeech.Symbol:
            return handleSymbol(cursor);
        case PartOfSpeech.Verb:
        case PartOfSpeech.iAdjective:
            return handleVerbAdjective(cursor);
        case PartOfSpeech.Noun:
            return handleNoun(cursor);
        default:
            return new IpadicWord(PartOfSpeech[token.pos as keyof typeof PartOfSpeech], [token]);
    }
}

function nextSentence(tokens: kuromoji.IpadicFeatures[], start: number): IpadicSentence {
    const result = [];
    let index = start;
    while (index < tokens.length) {
        const word = nextWord(new TokenCursor(tokens, index));
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
        const word = nextWord(new TokenCursor(tokens, index));
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