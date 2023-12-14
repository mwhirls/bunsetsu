import { Token, PartOfSpeech, WordType } from "../token.js";
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
    wordType(): WordType {
        return this.root().wordType;
    }
    basicForm(): string | undefined {
        return this.wordType() === WordType.Known ? this.root().basicForm : undefined
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
        const wordType = Object.values(WordType).find(x => x === node!.token.word_type);
        if (!wordType) {
            throw new Error('unrecognized word type');
        }
        const token = {
            pos: node.pos,
            surfaceForm: node.token.surface_form,
            wordType: wordType,
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