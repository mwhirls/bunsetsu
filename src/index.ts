import { IpadicFeatures, Tokenizer, builder } from "kuromoji";
import { JMdictWord } from '@scriptin/jmdict-simplified-types'

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
    IrrealisUConjunction = '未然ウ接続', // 高かろ(う)
    IrrealisNuConjunction = '未然ヌ接続', // 高から(ぬ)
    ImperativeE = '命令ｅ', // (幸)多かれ
    ImperativeI = '命令ｉ', // 来い
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

function handleVerb(tokens: IpadicFeatures[], index: number): IpadicWord {
    const token = tokens[index];
    if (token.conjugated_form !== ConjugatedForm.PlainForm &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction1 &&
        token.conjugated_form !== ConjugatedForm.ConditionalContraction2) {
        const conjugation = handleConjugation(tokens, index + 1);
        return new IpadicWord(PartOfSpeech.Verb, [token, ...conjugation]);
    }
    return new IpadicWord(PartOfSpeech.Verb, [token]);
}

async function handleSuffixedNoun(stem: IpadicFeatures, suffix: IpadicFeatures): Promise<IpadicWord> {
    return new IpadicWord(PartOfSpeech.Noun, [stem, suffix]);
}

async function handleNoun(tokens: IpadicFeatures[], index: number): Promise<IpadicWord> {
    const token = tokens[index];
    if (isSuruVerb(token)) {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.basic_form === 'する') {
            const verb = handleVerb(tokens, index + 1);
            return new IpadicWord(PartOfSpeech.Noun, [token, ...verb.tokens]);
        }
    }
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next && next.basic_form === Details.Suffix) {
        return await handleSuffixedNoun(token, next);
    }
    return new IpadicWord(PartOfSpeech.Noun, [token]);
}

function handleFiller(tokens: IpadicFeatures[], index: number): IpadicWord | null {
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

function handleInterjection(tokens: IpadicFeatures[], index: number): IpadicWord {
    const token = tokens[index];
    const filler = handleFiller(tokens, index); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicWord(PartOfSpeech.Interjection, [token]);
}

function handleSymbol(tokens: IpadicFeatures[], index: number): IpadicWord {
    const token = tokens[index];
    return new IpadicWord(PartOfSpeech.Symbol, [token]);
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
        return new IpadicWord(PartOfSpeech.iAdjective, [token, ...conjugation]);
    }
    return new IpadicWord(PartOfSpeech.iAdjective, [token]);
}

async function nextWord(tokens: IpadicFeatures[], index: number): Promise<IpadicWord> {
    const token = tokens[index];
    switch (token.pos) {
        case PartOfSpeech.Filler:
            return handleFiller(tokens, index) ?? new IpadicWord(PartOfSpeech.Filler, [token]);
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
            return new IpadicWord(PartOfSpeech[token.pos as keyof typeof PartOfSpeech], [token]);
    }
}

async function nextSentence(tokens: IpadicFeatures[], start: number): Promise<IpadicSentence> {
    const result = [];
    let index = start;
    while (index < tokens.length) {
        const word = await nextWord(tokens, index);
        index += word.tokens.length;
        result.push(word);
        // todo: break sentence
    }
    return { words: result, start, end: index };
}

async function toSentences(tokens: IpadicFeatures[]): Promise<Sentence[]> {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const sentence = await nextSentence(tokens, index);
        index += sentence.end - sentence.start;
        result.push(sentence);
    }
    return result;
}

async function toWords(tokens: IpadicFeatures[]): Promise<Word[]> {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const word = await nextWord(tokens, index);
        index += word.tokens.length;
        result.push(word);
    }
    return result;
}

export interface Token {
    surfaceForm: string;
    pos: PartOfSpeech;
    posDetails: Details[];
    conjugatedForm: ConjugatedForm;
    basicForm: string;
    reading?: string | undefined;
    pronunciation?: string | undefined;
}

export interface Word {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading?: string | undefined;
    pronunciation?: string | undefined;
    symbolType?: SymbolType | undefined;
}

class IpadicWord implements Word {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading?: string | undefined;
    pronunciation?: string | undefined;
    symbolType?: SymbolType | undefined;
    tokens: IpadicFeatures[];

    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[]) {
        const getBasicForm = () => {
            if (pos === PartOfSpeech.Verb || pos === PartOfSpeech.iAdjective) {
                return tokens.length ? tokens[0].basic_form : "";
            }
            return tokens.reduce((acc, curr) => acc + curr.basic_form ?? "", "");
        };
        const reading = tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
        const pronunciation = tokens.reduce((acc, curr) => acc + curr.pronunciation ?? "", "");
        let symbolType = pos === PartOfSpeech.Symbol && tokens.length ? Object.values(SymbolType).find(x => x === tokens[0].pos_detail_1) : undefined;
        if (!symbolType) {
            switch (tokens[0].basic_form) {
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
                    break;
            }
        }

        this.pos = pos;
        this.surfaceForm = tokens.reduce((acc, curr) => acc + curr.surface_form, "");
        this.basicForm = getBasicForm();
        this.reading = reading.length ? reading : undefined;
        this.pronunciation = pronunciation.length ? pronunciation : undefined;
        this.symbolType = symbolType;
        this.tokens = tokens;
    }
}

export interface Sentence {
    words: Word[];
}

export type DictionaryLookup = (text: string) => Promise<JMdictWord | null>;

export interface Segmenter {
    segmentAsWords(text: string): Promise<Word[]>;
    segmentAsSentences(text: string): Promise<Sentence[]>;
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

    async segmentAsWords(text: string): Promise<Word[]> {
        const tokens = this.tokenizer.tokenize(text);
        return await toWords(tokens);
    }
    async segmentAsSentences(text: string): Promise<Sentence[]> {
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
