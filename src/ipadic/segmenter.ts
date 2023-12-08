import kuromoji from "kuromoji";
import { ConjugatedForm } from "../conjugation.js";
import { Sentence } from "../sentence.js";
import { PartOfSpeech, Details, Word } from "../word.js";
import { IpadicAdjective } from "./adjective.js";
import { IpadicNoun } from "./noun.js";
import { IpadicSentence } from "./sentence.js";
import { IpadicSymbol } from "./symbol.js";
import { IpadicVerb } from "./verb.js";
import { posDetails, IpadicWord } from "./word.js";
import { Segmenter } from "../segmenter.js";

function isSuruVerb(token: kuromoji.IpadicFeatures) {
    const details = posDetails(token);
    return token.pos === PartOfSpeech.Noun && details.some((value) => value === Details.SuruConjunction);
}

function handleConjugation(tokens: kuromoji.IpadicFeatures[], start: number) {
    const result: kuromoji.IpadicFeatures[] = [];
    let index = start;
    while (index < tokens.length) {
        const token = tokens[index];
        const details = posDetails(token);
        if (details.some((value) => value === Details.Suffix) ||
            token.pos === PartOfSpeech.Particle && details.some((value) => value === Details.NotIndependent) ||
            token.pos === PartOfSpeech.Verb && details.some((value) => value === Details.NotIndependent) ||
            token.pos === PartOfSpeech.AuxillaryVerb ||
            token.pos === PartOfSpeech.Particle && details.some((value) => value === Details.ConjunctionParticle)) {
            index++;
            result.push(token);
        } else {
            break;
        }
    }
    return result;
}

function handleImperativeEConjugation(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    if (token.conjugated_type === '五段・サ行') {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.surface_form === 'よ') {
            return new IpadicVerb(token, [next]); // archaic せよ case
        }
    }
    switch (token.pos) {
        case PartOfSpeech.Verb:
            return new IpadicVerb(token, []);
        case PartOfSpeech.iAdjective:
            return new IpadicAdjective(token, []);
        default:
            throw new Error('unrecognized imperative conjugation');
    }
}

function handleVerb(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    if (token.conjugated_form === ConjugatedForm.ImperativeE) {
        return handleImperativeEConjugation(tokens, index);
    } else if (token.conjugated_form !== ConjugatedForm.PlainForm &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction1 &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction2) {
        const conjugation = handleConjugation(tokens, index + 1);
        return new IpadicVerb(token, [...conjugation]);
    }
    return new IpadicAdjective(token, []);
}

function handleSuffixedNoun(stem: kuromoji.IpadicFeatures, suffix: kuromoji.IpadicFeatures) {
    return new IpadicNoun(stem, suffix);
}

function handleNoun(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    if (isSuruVerb(token)) {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.basic_form === 'する') {
            const verb = handleVerb(tokens, index + 1);
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

function handleAdjective(tokens: kuromoji.IpadicFeatures[], index: number) {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as adjectives
    if (filler) {
        return filler;
    }
    if (token.conjugated_form !== ConjugatedForm.PlainForm &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction1 &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction2) {
        const conjugation = handleConjugation(tokens, index + 1);
        return new IpadicAdjective(token, [...conjugation]);
    }
    return new IpadicAdjective(token, []);
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
            return handleVerb(tokens, index);
        case PartOfSpeech.iAdjective:
            return handleAdjective(tokens, index);
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