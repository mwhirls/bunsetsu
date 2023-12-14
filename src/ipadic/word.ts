import { Token, PartOfSpeech } from "../token.js";
import { Sentence, Word } from "../word.js";
import { IpadicNode } from "./token.js";

export class IpadicWord implements Word {
    tokens: Token[];

    constructor(root: IpadicNode) {
        this.tokens = flatten(root);
    }

    pos(): PartOfSpeech {
        return this.root().pos;
    }
    surfaceForm(): string {
        return this.tokens.reduce((acc, t) => acc + t.surfaceForm, "");
    }
    basicForm(): string {
        return this.root().basicForm;
    }
    reading(): string | undefined {
        return this.tokens.reduce((acc, t) => acc + t.reading, "");
    }
    pronunciation(): string | undefined {
        return this.tokens.reduce((acc, t) => acc + t.pronunciation, "");
    }
    root(): Token {
        return this.tokens[0];
    }
}

function flatten(root: IpadicNode): Token[] {
    const result: Token[] = [];
    let node: IpadicNode | undefined = root;
    while (node) {
        const token = {
            pos: node.pos,
            surfaceForm: node.token.surface_form,
            basicForm: node.token.basic_form,
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