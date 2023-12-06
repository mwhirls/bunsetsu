import { IpadicFeatures, Tokenizer, builder } from "kuromoji";

function posDetails(token: IpadicFeatures): string[] {
    return [token.pos_detail_1, token.pos_detail_2, token.pos_detail_3];
}

function isSuruVerb(token: IpadicFeatures) {
    const details = posDetails(token);
    return token.pos === '名詞' && details.some((value) => value === 'サ変接続');
}

function handleConjugation(tokens: IpadicFeatures[], start: number): Word {
    const word: IpadicFeatures[] = [];
    let index = start;
    while (index < tokens.length) {
        const token = tokens[index];
        const details = posDetails(token);
        if (details.some((value) => value === '接尾') ||
            token.pos === "助詞" && details.some((value) => value === '接続助詞') ||
            token.pos === "動詞" && details.some((value) => value === '非自立') ||
            token.pos === '助動詞') {
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
    if (token.conjugated_form === "連用形" ||
        token.conjugated_form === '連用タ接続' ||
        token.conjugated_form === '未然形') {
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
        if (next && next.basic_form === 'する') {
            const verb = handleVerb(tokens, index + 1);
            return { tokens: [token, ...verb.tokens] };
        }
    }
    const next = index + 1 < tokens.length ? tokens[index + 1] : null;
    if (next && next.basic_form === '接尾') {
        return await handleSuffixedNoun(token, next, lookup);
    }
    return { tokens: [token] };
}


async function nextWord(tokens: IpadicFeatures[], index: number, lookup: WordExistsCallback): Promise<Word> {
    const token = tokens[index];
    if (token.pos === '動詞') {
        return handleVerb(tokens, index);
    } else if (token.pos === '名詞') {
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
