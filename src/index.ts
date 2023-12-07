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

function handleImperativeEConjugation(tokens: IpadicFeatures[], index: number) {
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

function handleVerb(tokens: IpadicFeatures[], index: number) {
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

function handleSuffixedNoun(stem: IpadicFeatures, suffix: IpadicFeatures) {
    return new IpadicNoun(stem, suffix);
}

function handleNoun(tokens: IpadicFeatures[], index: number) {
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

function handleFiller(tokens: IpadicFeatures[], index: number) {
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

function handleInterjection(tokens: IpadicFeatures[], index: number) {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicWord(PartOfSpeech.Interjection, [token]);
}

function handleSymbol(tokens: IpadicFeatures[], index: number) {
    const token = tokens[index];
    return new IpadicSymbol(token);
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
        return new IpadicAdjective(token, [...conjugation]);
    }
    return new IpadicAdjective(token, []);
}

function nextWord(tokens: IpadicFeatures[], index: number): IpadicWord {
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

export interface Word {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
    detail?: WordDetail;
}

export type WordDetail = SymbolDetail | AdjectiveDetail | VerbDetail | NounDetail;

export interface SymbolDetail {
    type: PartOfSpeech.Symbol;
    symbolType: SymbolType;
}

export interface AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;
}

export interface VerbDetail {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
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

export interface NounDetail {
    type: PartOfSpeech.Noun;
    suffix?: IpadicFeatures | undefined;
    suru?: IpadicVerb | undefined;
}

class IpadicWord {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
    detail?: WordDetail;
    tokens: IpadicFeatures[];

    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[]);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string, pronunciation?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string, pronunciation?: string, detail?: WordDetail);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string, pronunciation?: string, detail?: WordDetail) {
        this.pos = pos;
        this.surfaceForm = surfaceForm ?? tokens.reduce((acc, curr) => acc + curr.surface_form ?? "", "");
        this.basicForm = basicForm ?? tokens.reduce((acc, curr) => acc + curr.basic_form ?? "", "");
        this.reading = reading ?? tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
        this.pronunciation = pronunciation ?? tokens.reduce((acc, curr) => acc + curr.pronunciation ?? "", "");
        this.detail = detail;
        this.tokens = tokens;
    }
}

class IpadicSymbol extends IpadicWord {
    constructor(token: IpadicFeatures) {
        const detail = new IpadicSymbolDetail(token);
        super(PartOfSpeech.Symbol, [token], token.surface_form, token.basic_form, token.reading, token.pronunciation, detail);
    }
}

class IpadicAdjective extends IpadicWord {
    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        const detail = new IpadicVerbDetail(stem, conjugation);
        super(PartOfSpeech.iAdjective, [stem, ...conjugation], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

class IpadicVerb extends IpadicWord {
    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        const detail = new IpadicVerbDetail(stem, conjugation);
        super(PartOfSpeech.Verb, [stem, ...conjugation], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

class IpadicNoun extends IpadicWord {
    constructor(token: IpadicFeatures, suffix?: IpadicFeatures, suru?: IpadicVerb) {
        const detail = new IpadicNounDetail(token, suffix, suru);
        const tokens = [token];
        if (suffix) {
            tokens.push(suffix);
        }
        if (suru) {
            tokens.push(...suru.tokens);
        }
        super(PartOfSpeech.Noun, [token], token.surface_form, token.basic_form, token.reading, token.pronunciation, detail);
    }
}

class IpadicSymbolDetail implements SymbolDetail {
    type: PartOfSpeech.Symbol;
    symbolType: SymbolType;

    constructor(token: IpadicFeatures) {
        this.type = PartOfSpeech.Symbol;
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

class IpadicAdjectiveDetail implements AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;

    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        this.type = PartOfSpeech.iAdjective;
        this.stem = new IpadicStem(stem);
        this.conjugation = new IpadicConjugation(stem, conjugation);
    }
}

class IpadicVerbDetail implements VerbDetail {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
    tokens: IpadicFeatures[];

    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        this.type = PartOfSpeech.Verb;
        this.stem = new IpadicStem(stem);
        this.conjugation = new IpadicConjugation(stem, conjugation);
        this.tokens = [stem, ...conjugation];
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

class IpadicNounDetail implements NounDetail {
    type: PartOfSpeech.Noun;
    suffix?: IpadicFeatures | undefined;
    suru?: IpadicVerb | undefined;

    constructor(token: IpadicFeatures, suffix?: IpadicFeatures, suru?: IpadicVerb) {
        this.type = PartOfSpeech.Noun;
        this.suffix = suffix;
        this.suru = suru;
    }
}

export type IpadicWordDetail = IpadicSymbolDetail | IpadicAdjectiveDetail | IpadicVerbDetail | IpadicNounDetail;

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
