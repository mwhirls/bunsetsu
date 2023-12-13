import { PartOfSpeech, Token } from "./token.js";

export interface Word {
    tokens: Token[];

    pos(): PartOfSpeech;
    surfaceForm(): string;
    basicForm(): string;
    reading(): string | undefined;
    pronunciation(): string | undefined;
}

export interface Sentence {
    words: Word[];
}