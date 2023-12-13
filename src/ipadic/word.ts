import { IpadicFeatures } from "kuromoji";
import { PartOfSpeech, Token, TokenDetail, Word } from "../word.js";
import { IpadicAdjectiveDetail } from "./adjective.js";
import { IpadicSymbolDetail } from "./symbol.js";
import { IpadicVerbDetail } from "./verb.js";
import { IpadicAuxillaryVerbDetail } from "./auxillaryVerb.js";

export class IpadicTokenNode {
    pos: PartOfSpeech;
    token: IpadicFeatures;
    detail?: TokenDetail;
    next?: IpadicTokenNode;

    constructor(pos: PartOfSpeech, token: IpadicFeatures);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, detail?: IpadicTokenDetail);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, detail?: IpadicTokenDetail, next?: IpadicTokenNode);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, detail?: IpadicTokenDetail, next?: IpadicTokenNode) {
        this.pos = pos;
        this.token = token;
        this.detail = detail;
        this.next = next;
    }
}

export type IpadicTokenDetail = IpadicSymbolDetail | IpadicAdjectiveDetail | IpadicVerbDetail | IpadicAuxillaryVerbDetail;

export class IpadicWord implements Word {
    tokens: Token[];

    constructor(root: IpadicTokenNode) {
        this.tokens = flatten(root);
    }

    pos(): PartOfSpeech {
        return this.root().pos;
    }
    surfaceForm(): string {
        return this.tokens.reduce((acc, t) => acc + t.surfaceForm, "");
    }
    basicForm(): string {
        const root = this.root();
        if (root.pos === PartOfSpeech.Verb ||
            root.pos === PartOfSpeech.iAdjective) {
            return root.basicForm;
        }
        return this.tokens.reduce((acc, t) => acc + t.basicForm, "");
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

function flatten(root: IpadicTokenNode): Token[] {
    const result: Token[] = [];
    let node: IpadicTokenNode | undefined = root;
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