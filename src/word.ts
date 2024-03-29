import { PartOfSpeech, Token, WordType } from "./token.js";

export interface Word {
    tokens: Token[];
    pos: PartOfSpeech;
    surfaceForm: string;
    wordType: WordType;
    baseForm: string | undefined;
    reading: string | undefined;
    pronunciation: string | undefined;
}

export interface Sentence {
    words: Word[];
}