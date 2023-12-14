import { IpadicFeatures } from "kuromoji";
import { ConjugatedForm, ConjugationDetail, DetailType, PartOfSpeech, SymbolDetail, SymbolType, TokenDetail } from "../token.js";
import { IpadicPOSDetails } from "../details.js";

export class IpadicNode {
    pos: PartOfSpeech;
    token: IpadicFeatures;
    detail?: TokenDetail;
    next?: IpadicNode;

    constructor(pos: PartOfSpeech, token: IpadicFeatures);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, detail?: IpadicTokenDetail);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, detail?: IpadicTokenDetail, next?: IpadicNode);
    constructor(pos: PartOfSpeech, token: IpadicFeatures, detail?: IpadicTokenDetail, next?: IpadicNode) {
        this.pos = pos;
        this.token = token;
        this.detail = detail;
        this.next = next;
    }
}

export class IpadicConjugation extends IpadicNode {
    constructor(token: IpadicFeatures, detail: IpadicConjugationDetail);
    constructor(token: IpadicFeatures, detail: IpadicConjugationDetail, auxillary?: IpadicNode);
    constructor(token: IpadicFeatures, detail: IpadicConjugationDetail, auxillary?: IpadicNode) {
        const pos = Object.values(PartOfSpeech).find(x => x === token.pos);
        if (!pos) {
            throw new Error('unrecognized part of speech');
        }
        super(pos, token, detail, auxillary);
    }
}

export class IpadicSymbol extends IpadicNode {
    constructor(token: IpadicFeatures) {
        const detail = new IpadicSymbolDetail(token);
        super(PartOfSpeech.Symbol, token, detail);
    }
}

export class IpadicSymbolDetail implements SymbolDetail {
    type: DetailType.SymbolDetail;
    symbolType: SymbolType;

    constructor(token: IpadicFeatures) {
        this.type = DetailType.SymbolDetail;
        const details = new IpadicPOSDetails(token);
        this.symbolType = details.symbolType() ?? SymbolType.Unknown;
    }
}

export class IpadicConjugationDetail implements ConjugationDetail {
    type: DetailType.ConjugationDetail;
    conjugatedForm: ConjugatedForm

    constructor(conjugatedForm: ConjugatedForm) {
        this.type = DetailType.ConjugationDetail;
        this.conjugatedForm = conjugatedForm;
    }
}

export type IpadicTokenDetail = IpadicSymbolDetail | IpadicConjugationDetail;