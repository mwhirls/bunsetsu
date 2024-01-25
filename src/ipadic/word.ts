import { Token, PartOfSpeech, WordType } from "../token.js";
import { Sentence, Word } from "../word.js";
import { IpadicNode } from "./token.js";

export class IpadicWord implements Word {
    tokens: Token[];
    pos: PartOfSpeech;
    surfaceForm: string;
    wordType: WordType;
    baseForm: string | undefined;
    reading: string | undefined;
    pronunciation: string | undefined;

    constructor(root: IpadicNode) {
        this.tokens = flatten(root);
        this.pos = this.root().pos;
        this.surfaceForm = this.tokens.reduce((acc, t) => acc + t.surfaceForm, "");
        this.wordType = this.root().wordType;
        this.baseForm = this.wordType === WordType.Known ? this.root().baseForm : undefined;
        this.reading = this.tokens.reduce((acc, t) => acc + t.reading, "");
        this.pronunciation = this.tokens.reduce((acc, t) => acc + t.pronunciation, "");
    }

    root(): Token {
        return this.tokens[0];
    }
}

function flatten(root: IpadicNode): Token[] {
    const result: Token[] = [];
    let node: IpadicNode | undefined = root;
    while (node) {
        const wordType = Object.values(WordType).find(x => x === node!.token.word_type);
        if (!wordType) {
            throw new Error('unrecognized word type');
        }
        const token = {
            pos: node.pos,
            surfaceForm: node.token.surface_form,
            wordType: wordType,
            baseForm: node.token.basic_form,
            reading: node.token.reading,
            pronunciation: node.token.pronunciation,
            detail: node.detail,
        };
        result.push(token);
        node = node.next;
    }
    return result;
}

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