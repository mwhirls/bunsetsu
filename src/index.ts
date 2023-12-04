import { IpadicFeatures } from "kuromoji";


export interface Word {
    tokens: IpadicFeatures[];
}

export interface Sentence {
    words: Word[];
}

export type WordExistsCallback = (text: string) => Promise<boolean>;

export interface Segmenter {
    segment(text: string, lookup: WordExistsCallback): Sentence[];
}