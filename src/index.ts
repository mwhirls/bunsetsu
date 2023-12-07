import { IpadicFeatures, Tokenizer, builder } from "kuromoji";

// https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44
export enum PartOfSpeech {
    Filler = 'フィラー', // 「あのー」「えーと」
    Interjection = '感動詞',
    Symbol = '記号',
    iAdjective = '形容詞',
    Noun = '名詞',
    Verb = '動詞',
    Particle = '助詞',
    AuxillaryVerb = '助動詞',
    Conjunction = '接続詞'
}

export enum Details {
    Suffix = '接尾',
    SuruConjunction = 'サ変接続',
    NotIndependent = '非自立',
    ConjunctionParticle = '接続助詞',
}

export enum SymbolType {
    Alphabet = 'アルファベット',
    OpeningBracketParens = '括弧開',
    ClosingBracketParens = '括弧閉',
    Period = '句点',
    QuestionMark = '疑問符', // びっくりマーク (!) not categorized by kuromoji
    ExclamationMark = '感嘆符', // はてなマーク (?) not categorized by kuromoji
    Space = '空白',
    Comma = '読点',
    Interpunct = '中点' // ・not categorized by kuromoji
}

export enum ConjugatedForm {
    ClassicalPlainForm = '文語基本形', // (いと)エモし
    ConditionalForm = '仮定形', // 美味しけれ(ば), etc
    ConditionalContraction1 = '仮定縮約１', // 美味しけりゃ
    ConditionalContraction2 = '仮定縮約２', // 美味しきゃ
    Continuative = '連用形', // -masu stem
    IndeclinableNominalConjunction = '体言接続', // ウザき(人)
    GaruConjunction = 'ガル接続', // 嬉し(がる), 早(すぎる), 悲し(さ), 虚し(そう), etc
    GozaiConjunction = '連用ゴザイ接続', // 愛しう(ございます), 苦しゅう(ない)
    Irrealis = '未然形', // 来(ない) -nai stem
    IrrealisNuConjunction = '未然ヌ接続', // 高から(ぬ)
    IrrealisReruConjunction = '未然レル接続', // （）される
    IrrealisUConjunction = '未然ウ接続', // 高かろ(う)
    ImperativeE = '命令ｅ', // (幸)多かれ
    ImperativeI = '命令ｉ', // 来い
    ImperativeRo = '命令ｒｏ', // しろ
    ImperativeYo = '命令ｙｏ', // 来よ
    PlainForm = '基本形',
    SpecialIndeclinableNominalConjunction1 = '体言接続特殊', // (今日)来ん(の)？
    SpecialIndeclinableNominalConjunction2 = '体言接続特殊２', // (今日)来(の)？
    TaConjunction = '連用タ接続', // うるさかっ(た)
    TeConjunction = '連用テ接続', // 女々しく(て), うるさく(する), 芳しく(ない)
}

export enum VerbType {
    Kuru = 'カ変動詞',
}

function posDetails(token: IpadicFeatures): string[] {
    return [token.pos_detail_1, token.pos_detail_2, token.pos_detail_3];
}

function isSuruVerb(token: IpadicFeatures) {
    const details = posDetails(token);
    return token.pos === PartOfSpeech.Noun && details.some((value) => value === Details.SuruConjunction);
}

function handleConjugation(tokens: IpadicFeatures[], start: number) {
    const result: IpadicFeatures[] = [];
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

function handleImperativeEConjugation(tokens: IpadicFeatures[], index: number): IpadicVerb | IpadicIAdjective {
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
            return new IpadicIAdjective(token, []);
        default:
            throw new Error('unrecognized imperative conjugation');
    }
}

function handleVerb(tokens: IpadicFeatures[], index: number): IpadicVerb | IpadicIAdjective {
    const token = tokens[index];
    if (token.conjugated_form === ConjugatedForm.ImperativeE) {
        return handleImperativeEConjugation(tokens, index);
    } else if (token.conjugated_form !== ConjugatedForm.PlainForm &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction1 &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction2) {
        const conjugation = handleConjugation(tokens, index + 1);
        return new IpadicVerb(token, [...conjugation]);
    }
    return new IpadicVerb(token, []);
}

function handleSuffixedNoun(stem: IpadicFeatures, suffix: IpadicFeatures): IpadicNoun {
    return new IpadicNoun(stem, suffix);
}

function handleNoun(tokens: IpadicFeatures[], index: number): IpadicNoun {
    const token = tokens[index];
    if (isSuruVerb(token)) {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.basic_form === 'する') {
            const verb = handleVerb(tokens, index + 1);
            if (verb.type === PartOfSpeech.Verb) {
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

function handleFiller(tokens: IpadicFeatures[], index: number): IpadicFiller | null {
    const specialCases = ['あのう', 'えっと', 'ええっと', 'ええと']; // tokenizer splits these into separate tokens
    const token = tokens[index];
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next) {
        const compound = `${token.basic_form}${next.basic_form}`;
        if (specialCases.some((value) => compound === value)) {
            return new IpadicFiller([token, next]);
        }
    }
    if (token.pos === PartOfSpeech.Filler) {
        return new IpadicFiller([token]);
    }
    return null;
}

function handleInterjection(tokens: IpadicFeatures[], index: number): IpadicFiller | IpadicInterjection {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicInterjection(token);
}

function handleSymbol(tokens: IpadicFeatures[], index: number): IpadicSymbolWord {
    const token = tokens[index];
    return new IpadicSymbolWord(token);
}

function handleAdjective(tokens: IpadicFeatures[], index: number) {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as adjectives
    if (filler) {
        return filler;
    }
    if (token.conjugated_form !== ConjugatedForm.PlainForm &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction1 &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction2) {
        const conjugation = handleConjugation(tokens, index + 1);
        return new IpadicIAdjective(token, [...conjugation]);
    }
    return new IpadicIAdjective(token, []);
}

function nextWord(tokens: IpadicFeatures[], index: number): IpadicWord {
    const token = tokens[index];
    switch (token.pos) {
        case PartOfSpeech.Filler:
            return handleFiller(tokens, index) ?? new IpadicFiller([token]);
        case PartOfSpeech.Interjection:
            return handleInterjection(tokens, index);
        case PartOfSpeech.Symbol:
            return handleSymbol(tokens, index);
        case PartOfSpeech.Noun:
            return handleNoun(tokens, index);
        case PartOfSpeech.Verb:
            return handleVerb(tokens, index);
        case PartOfSpeech.iAdjective:
            return handleAdjective(tokens, index);
        default:
            return new IpadicUnknownWord(token);
    }
}

function nextSentence(tokens: IpadicFeatures[], start: number): IpadicSentence {
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

function toSentences(tokens: IpadicFeatures[]): Sentence[] {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const sentence = nextSentence(tokens, index);
        index += sentence.end - sentence.start;
        result.push(sentence);
    }
    return result;
}

function toWords(tokens: IpadicFeatures[]): Word[] {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const word = nextWord(tokens, index);
        index += word.tokens.length;
        result.push(word);
    }
    return result;
}

export interface Filler {
    type: PartOfSpeech.Filler;
    surfaceForm: string;
    basicForm: string;
}

export interface SymbolWord {
    type: PartOfSpeech.Symbol;
    surfaceForm: string;
    basicForm: string;
    symbolType: SymbolType;
}

export interface Interjection {
    type: PartOfSpeech.Interjection;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
}

export interface IAdjective {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;
    surfaceForm: string;
    reading: string;
    pronunciation: string;
}

export interface Verb {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
    surfaceForm: string;
    reading: string;
    pronunciation: string;
}

export interface Noun {
    type: PartOfSpeech.Noun;
}

export interface Stem {
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
}

export interface Conjugation {
    conjugatedForm: ConjugatedForm;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
}

export interface UnknownWord {
    type: 'unknown';
    surfaceForm: string;
    basicForm: string;
    reading?: string | undefined;
    pronunciation?: string | undefined;
}

export type Word = Filler | Interjection | SymbolWord | IAdjective | Verb | Noun | UnknownWord;
export type IpadicWord = IpadicFiller | IpadicInterjection | IpadicSymbolWord | IpadicIAdjective | IpadicVerb | IpadicNoun | IpadicUnknownWord;

class BaseIpadicWord {
    tokens: IpadicFeatures[];

    constructor(tokens: IpadicFeatures[]) {
        this.tokens = tokens;
    }
}

class IpadicFiller extends BaseIpadicWord implements Filler {
    type: PartOfSpeech.Filler;
    surfaceForm: string;
    basicForm: string;

    constructor(tokens: IpadicFeatures[]) {
        super(tokens);
        this.type = PartOfSpeech.Filler;
        this.surfaceForm = tokens.reduce((acc, curr) => acc + curr.surface_form ?? "", "");
        this.basicForm = tokens.reduce((acc, curr) => acc + curr.basic_form ?? "", "")
    }
}

class IpadicInterjection extends BaseIpadicWord implements Interjection {
    type: PartOfSpeech.Interjection;
    surfaceForm: string;
    basicForm: string;
    reading: string;
    pronunciation: string;

    constructor(token: IpadicFeatures) {
        super([token]);
        this.type = PartOfSpeech.Interjection;
        this.surfaceForm = token.surface_form;
        this.basicForm = token.basic_form;
        this.reading = token.reading ?? "";
        this.pronunciation = token.pronunciation ?? "";
    }
}

class IpadicSymbolWord extends BaseIpadicWord implements SymbolWord {
    type: PartOfSpeech.Symbol;
    surfaceForm: string;
    basicForm: string;
    symbolType: SymbolType;

    constructor(token: IpadicFeatures) {
        super([token]);
        this.type = PartOfSpeech.Symbol;
        this.surfaceForm = token.surface_form;
        this.basicForm = token.basic_form;
        const details = posDetails(token);
        let symbolType = Object.values(SymbolType).find(x => details.some((detail) => x === detail));
        if (!symbolType) {
            switch (token.basic_form) {
                case '！':
                    symbolType = SymbolType.ExclamationMark;
                    break;
                case '？':
                    symbolType = SymbolType.QuestionMark;
                    break;
                case '・':
                    symbolType = SymbolType.Interpunct;
                    break;
                default:
                    throw new Error('unrecognized symbol');
            }
        }
        this.symbolType = symbolType;
    }
}

class IpadicIAdjective extends BaseIpadicWord implements IAdjective {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;
    surfaceForm: string;
    reading: string;
    pronunciation: string;

    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        super([stem, ...conjugation]);
        this.type = PartOfSpeech.iAdjective;
        this.stem = new IpadicStem(stem);
        this.conjugation = new IpadicConjugation(stem, conjugation);
        this.surfaceForm = `${this.stem.surfaceForm}${this.conjugation.surfaceForm}`;
        this.reading = `${this.stem.reading}${this.conjugation.reading}`;
        this.pronunciation = `${this.stem.pronunciation}${this.conjugation.pronunciation}`;
    }
}

class IpadicVerb extends BaseIpadicWord implements Verb {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
    surfaceForm: string;
    reading: string;
    pronunciation: string;

    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        super([stem, ...conjugation]);
        this.type = PartOfSpeech.Verb;
        this.stem = new IpadicStem(stem);
        this.conjugation = new IpadicConjugation(stem, conjugation);
        this.surfaceForm = `${this.stem.surfaceForm}${this.conjugation.surfaceForm}`;
        this.reading = `${this.stem.reading}${this.conjugation.reading}`;
        this.pronunciation = `${this.stem.pronunciation}${this.conjugation.pronunciation}`;
    }
}

class IpadicStem implements Stem {
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;

    constructor(token: IpadicFeatures) {
        this.surfaceForm = token.surface_form;
        this.basicForm = token.basic_form;
        this.reading = token.reading;
        this.pronunciation = token.pronunciation;
    }
}

class IpadicConjugation implements Conjugation {
    conjugatedForm: ConjugatedForm;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;

    constructor(stem: IpadicFeatures, tokens: IpadicFeatures[]) {
        const conjugatedForm = Object.values(ConjugatedForm).find(x => x === stem.conjugated_form);
        if (!conjugatedForm) {
            throw Error('unrecognized conjugated form');
        }
        this.conjugatedForm = conjugatedForm;
        this.surfaceForm = tokens.reduce((acc, curr) => acc + curr.surface_form ?? "", "");
        this.basicForm = tokens.reduce((acc, curr) => acc + curr.basic_form ?? "", "");
        this.reading = tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
        this.pronunciation = tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
    }
}

class IpadicNoun extends BaseIpadicWord implements Noun {
    type: PartOfSpeech.Noun;
    token: IpadicFeatures;
    suffix: IpadicFeatures | undefined;
    suru: IpadicVerb | undefined;

    constructor(token: IpadicFeatures, suffix?: IpadicFeatures, suru?: IpadicVerb) {
        const tokens = [token];
        if (suffix) {
            tokens.push(suffix);
        }
        if (suru) {
            tokens.push(...suru.tokens);
        }
        super(tokens);
        this.type = PartOfSpeech.Noun;
        this.token = token;
        this.suffix = suffix;
        this.suru = suru;
    }
}

class IpadicUnknownWord extends BaseIpadicWord implements UnknownWord {
    type: 'unknown';
    surfaceForm: string;
    basicForm: string;
    reading?: string | undefined;
    pronunciation?: string | undefined;

    constructor(token: IpadicFeatures) {
        super([token]);
        this.type = 'unknown';
        this.surfaceForm = token.surface_form;
        this.basicForm = token.basic_form;
        this.reading = token.reading;
        this.pronunciation = token.pronunciation;
    }
}

export interface Sentence {
    words: Word[];
}

export interface Segmenter {
    segmentAsWords(text: string): Word[];
    segmentAsSentences(text: string): Sentence[];
}

class IpadicSentence implements Sentence {
    words: Word[];
    start: number;
    end: number;

    constructor(words: Word[], start: number, end: number) {
        this.words = words;
        this.start = start;
        this.end = end;
    }
}

class IpadicSegmenter implements Segmenter {
    tokenizer: Tokenizer<IpadicFeatures>;

    constructor(tokenizer: Tokenizer<IpadicFeatures>) {
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

export function build(dicPath: string): Promise<Segmenter> {
    return new Promise((resolve, reject) => {
        const tokenizerBuilder = builder({ dicPath });
        tokenizerBuilder.build((err: Error, tokenizer: Tokenizer<IpadicFeatures>) => {
            if (err) {
                reject(err);
            } else {
                const segmenter = new IpadicSegmenter(tokenizer);
                resolve(segmenter);
            }
        });
    });
}
