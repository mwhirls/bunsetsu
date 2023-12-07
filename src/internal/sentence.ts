import { Sentence } from "../sentence";
import { Word } from "../word";

export class IpadicSentence implements Sentence {
    words: Word[];
    start: number;
    end: number;

    constructor(words: Word[], start: number, end: number) {
        this.words = words;
        this.start = start;
        this.end = end;
    }
}