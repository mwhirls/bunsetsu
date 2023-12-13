import { IpadicFeatures } from "kuromoji";
import { IpadicSymbolDetail } from "./symbol.js";
import { GrammaticalRole, PartOfSpeech, TokenDetail } from "../token.js";
import { IpadicConjugationDetail } from "./conjugation.js";

export class IpadicNode {
    pos: PartOfSpeech;
    token: IpadicFeatures;
    role: GrammaticalRole;
    detail?: TokenDetail;
    next?: IpadicNode;

    constructor(pos: PartOfSpeech, token: IpadicFeatures, role: GrammaticalRole);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, role: GrammaticalRole, detail?: IpadicTokenDetail);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, role: GrammaticalRole, detail?: IpadicTokenDetail, next?: IpadicNode);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, role: GrammaticalRole, detail?: IpadicTokenDetail, next?: IpadicNode) {
        this.pos = pos;
        this.token = token;
        this.role = role;
        this.detail = detail;
        this.next = next;
    }
}

export type IpadicTokenDetail = IpadicSymbolDetail | IpadicConjugationDetail;