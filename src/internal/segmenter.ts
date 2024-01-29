import kuromoji, { IpadicFeatures } from "kuromoji";
import { Segmenter } from "../segmenter.js";
import { PartOfSpeech, ConjugatedForm, ConjugatedType } from "../token.js";
import { Sentence, Word } from "../word.js";
import { IpadicPOSDetails } from "./details.js";
import { IpadicConjugation, IpadicNode, IpadicSymbol } from "./token.js";
import { IpadicSentence, IpadicWord } from "./word.js";

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

    peek(): kuromoji.IpadicFeatures | undefined {
        const next = this.curr + 1;
        if (next >= this.tokens.length) {
            return undefined;
        }
        return this.tokens[next];
    }

    advanced(num: number): TokenCursor | undefined {
        const next = this.curr + num;
        if (next >= this.tokens.length || next < 0) {
            return undefined;
        }
        return new TokenCursor(this.tokens, next);
    }

    next(): TokenCursor | undefined {
        return this.advanced(1);
    }

    previous(): TokenCursor | undefined {
        return this.advanced(-1);
    }
}

type TokenHandler = (cursor: TokenCursor) => IpadicNode | undefined;

function reduce(cursor: TokenCursor, handlers: TokenHandler[]): IpadicNode | undefined {
    return handlers.reduce((prev: IpadicNode | undefined, curr: TokenHandler) => {
        return prev ?? curr(cursor);
    }, undefined)
}

function handleSpecialCharacter(cursor: TokenCursor) {
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    const isSpecialCharacter = format.test(cursor.token().basic_form);
    if (isSpecialCharacter) {
        return handleSymbol(cursor);
    }
    return undefined;
}

function isNominalizer(token: IpadicFeatures) {
    const nominalizers = [
        'の',
        'ん',
        'こと',
    ];
    return nominalizers.some(x => x === token.surface_form);
}

function handleNominalizer(cursor: TokenCursor) {
    const token = cursor.token();
    if (!isNominalizer(token)) {
        return undefined;
    }
    if (token.surface_form === 'こと') {
        return new IpadicNode(PartOfSpeech.Noun, token);
    }
    return new IpadicNode(PartOfSpeech.Particle, token);
}

function handleNoun(cursor: TokenCursor) {
    const result = reduce(cursor, [
        handleSpecialCharacter,
        handleNominalizer,
    ]);
    if (result) {
        return result;
    }
    const token = cursor.token();
    const details = new IpadicPOSDetails(token);
    const next = cursor.next();
    if (!next) {
        return new IpadicNode(PartOfSpeech.Noun, token);
    }
    const isSuruVerb = details.isSuruVerb() && next.token().basic_form === 'する';
    const isNaiAdjective = details.isNaiAdjectiveStem() && next.token().basic_form === 'ない';
    if (isSuruVerb || isNaiAdjective) {
        const auxillary = nextWord(next);
        return new IpadicNode(PartOfSpeech.Noun, token, undefined, auxillary);
    }
    return new IpadicNode(PartOfSpeech.Noun, token);
}

function handleFiller(cursor: TokenCursor) {
    const specialCases = ['あのう', 'えっと', 'ええっと', 'ええと']; // tokenizer splits these into separate tokens
    const token = cursor.token();
    const next = cursor.next();
    if (next) {
        const compound = `${token.basic_form}${next.token().basic_form}`;
        if (specialCases.some((value) => compound === value)) {
            const aux = nextWord(next);
            return new IpadicNode(PartOfSpeech.Filler, token, undefined, aux);
        }
    }
    if (token.pos === PartOfSpeech.Filler) {
        return new IpadicNode(PartOfSpeech.Filler, token);
    }
    return undefined;
}

function handleInterjection(cursor: TokenCursor) {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicNode(PartOfSpeech.Interjection, token);
}

function handleSymbol(cursor: TokenCursor) {
    const token = cursor.token();
    return new IpadicSymbol(token);
}

function handleConditional(cursor: TokenCursor): IpadicConjugation {
    const token = cursor.token();
    const next = cursor.next();
    if (next && next.token().surface_form === 'ば') { // group 来れ+ば
        const particle = nextWord(next);
        return new IpadicConjugation(token, particle);
    }
    return new IpadicConjugation(token);
}

function handleTeWaForm(cursor: TokenCursor) {
    const token = cursor.token();
    const next = cursor.next();
    if (token.surface_form != 'は' || !next) {
        return undefined
    }
    const auxillaryVerb = next ? handleAuxillaryVerb(next) : undefined;
    const particle = nextWord(cursor);
    particle.next = auxillaryVerb;
    return particle;
}

function handleTeForm(cursor: TokenCursor) {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return undefined;
    }
    const nextToken = next.token();
    const teConjunctions = [
        'て', // group 早く＋て
        'で', // group 泳い＋で and ない＋で
        'ちゃ', // group 言っ＋ちゃいけない
        'じゃ' // group 飲ん＋じゃいけない
    ];
    if (teConjunctions.some(x => x === nextToken.surface_form)) {
        const nextNext = next.next();
        const particle = nextWord(next);
        if (nextNext) {
            const subsidiaryVerb = handleTeWaForm(nextNext) ?? handleAuxillaryVerb(nextNext);
            particle.next = subsidiaryVerb;
        }
        return new IpadicConjugation(token, particle);
    }
    return undefined;
}

function handleTariConditional(cursor: TokenCursor) {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return undefined;
    }
    const nextToken = next.token();
    const tariForms = [
        'たり', // group 早か＋ったり
        'だり', // group 飲ん＋だり
    ];
    if (tariForms.some(x => x === nextToken.surface_form)) {
        const particle = nextWord(next);
        return new IpadicConjugation(token, particle, ConjugatedForm.TaConjunction);
    }
    return undefined;
}

function handleTeDeConjunction(cursor: TokenCursor) {
    const teForm = handleTeForm(cursor);
    if (teForm) {
        return teForm;
    }
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return new IpadicConjugation(cursor.token());
    }
    // adverbial form, e.g. 早く
    const auxillary = handleAuxillaryVerb(next); // 早くない
    return new IpadicConjugation(token, auxillary);
}

function handleIchidanKureru(cursor: TokenCursor) {
    const token = cursor.token();
    if (token.conjugated_type === ConjugatedType.IchidanKureru &&
        token.surface_form === 'くれ') { // irregular imperative of くれる can be miscategorized as continuative form
        const nextToken = cursor.next()?.token();
        if (!nextToken || nextToken.pos === PartOfSpeech.Particle) {
            return new IpadicConjugation(token, undefined, ConjugatedForm.ImperativeE);
        }
    }
    return undefined;
}

function handleNasaiContraction(cursor: TokenCursor): IpadicNode | undefined {
    // attempt to manually infer the contracted ～なさい form (e.g. 食べな) 
    // since it tends to come through as stem + sentence-ending particle
    const token = cursor.token();
    const next = cursor.next();
    if (!next ||
        (token.pos !== PartOfSpeech.Verb && token.pos !== PartOfSpeech.AuxillaryVerb) ||
        token.conjugated_form !== ConjugatedForm.Continuative) {
        return undefined;
    }
    const nextToken = next.token();
    if (nextToken.surface_form === 'な') {
        const auxillary = nextWord(next);
        return new IpadicConjugation(token, auxillary);
    }
    return undefined;
}

function handleSuffix(cursor: TokenCursor): IpadicNode | undefined {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return undefined;
    }
    const nextToken = next.token();
    const details = new IpadicPOSDetails(nextToken);
    if (!details.isSuffix()) {
        return undefined;
    }
    const suffix = nextWord(next);
    return new IpadicConjugation(token, suffix);
}

function isAuxillaryVerb(cursor: TokenCursor) {
    const token = cursor.token();
    const tokend = new IpadicPOSDetails(token);
    return token.pos === PartOfSpeech.AuxillaryVerb ||
        ((token.pos === PartOfSpeech.Verb || token.pos === PartOfSpeech.iAdjective) && tokend.isNotIndependent()) ||
        token.basic_form === 'おる' || // ～ておる subsidiary verb gets marked as an independent verb
        token.basic_form === 'ある'; // ～てある subsidiary verb gets marked as an independent verb
}

function handleMasu(cursor: TokenCursor) {
    const token = cursor.token();
    if (token.basic_form !== 'ます') {
        return undefined;
    }
    const next = cursor.next();
    if (!next) {
        return new IpadicConjugation(token);
    }

    const nextToken = next.token();
    if (nextToken.surface_form === 'ん') { // recurse for ませ（ん）
        const masen = nextWord(next);
        const nextNext = next.next();
        if (nextNext) {
            const desu = nextWord(nextNext);
            masen.next = desu;
        }
        return new IpadicConjugation(token, masen);
    } else if (nextToken.pos === PartOfSpeech.AuxillaryVerb) { // まし（た）
        const auxillary = nextWord(next);
        return new IpadicConjugation(token, auxillary);
    }
    return undefined;
}

function isPlainCopula(token: IpadicFeatures) {
    return token.basic_form == 'だ';
}

function isPoliteCopula(token: IpadicFeatures) {
    return token.basic_form == 'です';
}

function isSeparateWord(prev: TokenCursor, cursor: TokenCursor) {
    const token = cursor.token();
    const tokend = new IpadicPOSDetails(token);
    if (isPlainCopula(token)) {
        const prevToken = prev.token();
        return prevToken.conjugated_form !== ConjugatedForm.TaConjunction;
    }
    return tokend.isSentenceEndingParticle() ||
        isNominalizer(token) ||
        isPoliteCopula(token) ||
        token.basic_form == 'じゃん';
}


function handleTa(cursor: TokenCursor) {
    const token = cursor.token();
    if (token.conjugated_type === ConjugatedType.SpecialTa) {
        return new IpadicConjugation(token);
    }
    return undefined;
}

function handleZu(cursor: TokenCursor) {
    const token = cursor.token();
    if (token.conjugated_type !== ConjugatedType.SpecialNu) {
        return undefined;
    }
    const next = cursor.next();
    if (next) {
        const nextToken = next.token();
        // group ずに as in 言わずに together
        if (nextToken.pos == PartOfSpeech.Particle && nextToken.surface_form === 'に') {
            const auxillary = nextWord(next);
            return new IpadicConjugation(token, auxillary);
        }
    }
    return new IpadicConjugation(token);
}

function handleAuxillaryVerb(cursor: TokenCursor) {
    if (!isAuxillaryVerb(cursor)) {
        return undefined;
    }
    const result = reduce(cursor, [
        handleSuffix,
        handleMasu,
        handleTa,
        handleZu,
    ]);
    if (result) {
        return result;
    }
    const token = cursor.token();
    const next = cursor.next();
    if (!next || isSeparateWord(cursor, next)) {
        return new IpadicConjugation(token);
    }
    const stemForms = [
        ConjugatedForm.ConditionalForm,
        ConjugatedForm.Continuative,
        ConjugatedForm.GaruConjunction,
        ConjugatedForm.GozaiConjunction,
        ConjugatedForm.Irrealis,
        ConjugatedForm.TaConjunction,
        ConjugatedForm.TeConjunction,
        ConjugatedForm.DeConjunction,
    ];
    const isStem = stemForms.some(x => x === token.conjugated_form);
    if (isStem) {
        const auxillary = nextWord(next);
        return new IpadicConjugation(token, auxillary);
    }
    return new IpadicConjugation(token);
}

function handleDa(cursor: TokenCursor) {
    const token = cursor.token();
    // don't recurse for で (conjugation of auxillary verb だ)
    if (token.conjugated_type === ConjugatedType.SpecialDa &&
        token.conjugated_form === ConjugatedForm.Continuative) {
        return new IpadicConjugation(token);
    }
    return undefined;
}

function handleStemAuxillaryForm(cursor: TokenCursor) {
    const token = cursor.token();
    const result = reduce(cursor, [
        handleIchidanKureru,
        handleTeForm,
        handleTariConditional,
        handleNasaiContraction,
        handleDa,
        handleSuffix,
    ]);
    if (result) {
        return result;
    }
    const next = cursor.next();
    if (!next || isSeparateWord(cursor, next)) {
        return new IpadicConjugation(token);
    }
    const auxillary = handleAuxillaryVerb(next);
    return new IpadicConjugation(token, auxillary);
}

function handleVerbAdjective(cursor: TokenCursor): IpadicConjugation {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as adjectives
    if (filler) {
        return filler;
    }
    switch (token.conjugated_form) {
        case ConjugatedForm.PlainForm:
        case ConjugatedForm.ConditionalContraction1:
        case ConjugatedForm.ConditionalContraction2:
        case ConjugatedForm.EuphonicChangeForm:
        case ConjugatedForm.ImperativeE:
        case ConjugatedForm.ImperativeI:
        case ConjugatedForm.ImperativeRo:
        case ConjugatedForm.ImperativeYo:
        case ConjugatedForm.IndeclinableNominalConjunction:
        case ConjugatedForm.SpecialIndeclinableNominalConjunction1:
        case ConjugatedForm.SpecialIndeclinableNominalConjunction2:
        case ConjugatedForm.ClassicalPlainForm:
            return new IpadicConjugation(token);
        case ConjugatedForm.ConditionalForm:
            return handleConditional(cursor);
        case ConjugatedForm.Continuative:
        case ConjugatedForm.GaruConjunction:
        case ConjugatedForm.GozaiConjunction:
        case ConjugatedForm.Irrealis:
        case ConjugatedForm.IrrealisUConjunction:
        case ConjugatedForm.IrrealisNuConjunction:
        case ConjugatedForm.IrrealisReruConjunction:
        case ConjugatedForm.SpecialIrrealis:
        case ConjugatedForm.TaConjunction:
            return handleStemAuxillaryForm(cursor);
        case ConjugatedForm.TeConjunction:
        case ConjugatedForm.DeConjunction:
            return handleTeDeConjunction(cursor);
        default:
            throw new Error("unhandled verb/adjective conjugation");
    }
}

function handleUnknownWord(cursor: TokenCursor) {
    const token = cursor.token();
    const pos = Object.values(PartOfSpeech).find(x => x === token.pos) ?? PartOfSpeech.Unknown;
    return new IpadicNode(pos, token);
}

function nextWord(cursor: TokenCursor): IpadicNode {
    const token = cursor.token();
    switch (token.pos) {
        case PartOfSpeech.Filler:
            return handleFiller(cursor) ?? new IpadicNode(PartOfSpeech.Filler, token);
        case PartOfSpeech.Interjection:
            return handleInterjection(cursor);
        case PartOfSpeech.Symbol:
            return handleSymbol(cursor);
        case PartOfSpeech.Verb:
        case PartOfSpeech.AuxillaryVerb:
        case PartOfSpeech.iAdjective:
            return handleVerbAdjective(cursor);
        case PartOfSpeech.Noun:
            return handleNoun(cursor);
        default:
            return handleUnknownWord(cursor);
    }
}

function nextSentence(tokens: kuromoji.IpadicFeatures[], start: number): IpadicSentence {
    const result = [];
    let index = start;
    while (index < tokens.length) {
        const root = nextWord(new TokenCursor(tokens, index));
        const word = new IpadicWord(root);
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
        const cursor = new TokenCursor(tokens, index);
        const root = nextWord(cursor);
        const word = new IpadicWord(root);
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