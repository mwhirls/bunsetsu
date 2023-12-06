import { IpadicFeatures, Tokenizer, builder } from "kuromoji";

// https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44
enum PartOfSpeech {
    Filler = 'フィラー', // 「あのー」「えーと」
    Noun = '名詞',
    Verb = '動詞',
    Adjective = '形容詞',
    Particle = '助詞',
    AuxillaryVerb = '助動詞',
    Conjunction = '接続詞'
}

enum Details {
    Suffix = '接尾',
    SuruConjunction = 'サ変接続',
    NotIndependent = '非自立',
    ConjunctionParticle = '接続助詞',
}

enum ConjugatedForm {
    MasuStem = '連用形',
    TaForm = '連用タ接続',
    NaiStem = '未然形',
}

enum IrregularVerb {
    Suru = 'する',
    Kuru = 'くる'
}

function posDetails(token: IpadicFeatures): string[] {
    return [token.pos_detail_1, token.pos_detail_2, token.pos_detail_3];
}

function isSuruVerb(token: IpadicFeatures) {
    const details = posDetails(token);
    return token.pos === PartOfSpeech.Noun && details.some((value) => value === Details.SuruConjunction);
}

function handleConjugation(tokens: IpadicFeatures[], start: number): Word {
    const word: IpadicFeatures[] = [];
    let index = start;
    while (index < tokens.length) {
        const token = tokens[index];
        const details = posDetails(token);
        if (details.some((value) => value === Details.Suffix) ||
            token.pos === PartOfSpeech.Particle && details.some((value) => value === Details.NotIndependent) ||
            token.pos === PartOfSpeech.Verb && details.some((value) => value === Details.NotIndependent) ||
            token.pos === PartOfSpeech.AuxillaryVerb) {
            index++;
            word.push(token);
        } else {
            break;
        }
    }
    return { tokens: word };
}

function handleVerb(tokens: IpadicFeatures[], index: number): Word {
    const token = tokens[index];
    if (token.conjugated_form === ConjugatedForm.MasuStem ||
        token.conjugated_form === ConjugatedForm.TaForm ||
        token.conjugated_form === ConjugatedForm.NaiStem) {
        const conjugation = handleConjugation(tokens, index + 1);
        return { tokens: [token, ...conjugation.tokens] }
    }
    return { tokens: [token] };
}

async function handleSuffixedNoun(stem: IpadicFeatures, suffix: IpadicFeatures, lookup: WordExistsCallback): Promise<Word> {
    const compound = `${stem}${suffix}`;
    if (await lookup(compound)) {
        return { tokens: [stem, suffix] };
    }
    return { tokens: [stem] };
}

async function handleNoun(tokens: IpadicFeatures[], index: number, lookup: WordExistsCallback): Promise<Word> {
    const token = tokens[index];
    if (isSuruVerb(token)) {
        const next = index + 1 < tokens.length ? tokens[index + 1] : null;
        if (next && next.basic_form === IrregularVerb.Suru) {
            const verb = handleVerb(tokens, index + 1);
            return { tokens: [token, ...verb.tokens] };
        }
    }
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next && next.basic_form === Details.Suffix) {
        return await handleSuffixedNoun(token, next, lookup);
    }
    return { tokens: [token] };
}


async function nextWord(tokens: IpadicFeatures[], index: number, lookup: WordExistsCallback): Promise<Word> {
    const token = tokens[index];
    if (token.pos === PartOfSpeech.Verb) {
        return handleVerb(tokens, index);
    } else if (token.pos === PartOfSpeech.Noun) {
        return handleNoun(tokens, index, lookup);
    } else {
        return { tokens: [token] };
    }
}

async function nextSentence(tokens: IpadicFeatures[], start: number, lookup: WordExistsCallback): Promise<IpadicSentence> {
    const result = [];
    let index = start;
    while (index < tokens.length) {
        const word = await nextWord(tokens, index, lookup);
        index += word.tokens.length;
        result.push(word);
        // todo: break sentence
    }
    return { words: result, start, end: index };
}

async function toSentences(tokens: IpadicFeatures[], lookup: WordExistsCallback): Promise<Sentence[]> {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const sentence = await nextSentence(tokens, index, lookup);
        index += sentence.end - sentence.start;
        result.push(sentence);
    }
    return result;
}

async function toWords(tokens: IpadicFeatures[], lookup: WordExistsCallback): Promise<Word[]> {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const word = await nextWord(tokens, index, lookup);
        index += word.tokens.length;
        result.push(word);
    }
    return result;
}

export interface Word {
    tokens: IpadicFeatures[];
}

export interface Sentence {
    words: Word[];
}

export type WordExistsCallback = (text: string) => Promise<boolean>;

export interface Segmenter {
    segmentAsWords(text: string, lookup: WordExistsCallback): Promise<Word[]>;
    segmentAsSentences(text: string, lookup: WordExistsCallback): Promise<Sentence[]>;
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

    async segmentAsWords(text: string, lookup: WordExistsCallback): Promise<Word[]> {
        const tokens = this.tokenizer.tokenize(text);
        return await toWords(tokens, lookup);
    }
    async segmentAsSentences(text: string, lookup: WordExistsCallback): Promise<Sentence[]> {
        const tokens = this.tokenizer.tokenize(text);
        return toSentences(tokens, lookup);
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
