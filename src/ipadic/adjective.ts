import { IpadicFeatures } from "kuromoji";
import { AdjectiveDetail } from "../adjective.js";
import { ConjugatedForm } from "../conjugation.js";
import { PartOfSpeech } from "../word.js";
import { IpadicTokenNode } from "./word.js";

export class IpadicAdjective extends IpadicTokenNode {
    constructor(token: IpadicFeatures, detail: IpadicAdjectiveDetail);
    constructor(token: IpadicFeatures, detail: IpadicAdjectiveDetail, auxillary?: IpadicTokenNode);
    constructor(token: IpadicFeatures, detail: IpadicAdjectiveDetail, auxillary?: IpadicTokenNode) {
        super(PartOfSpeech.iAdjective, token, detail, auxillary);
    }
}

export class IpadicAdjectiveDetail implements AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    conjugatedForm: ConjugatedForm;

    constructor(conjugatedForm: ConjugatedForm) {
        this.type = PartOfSpeech.iAdjective;
        this.conjugatedForm = conjugatedForm;
    }
}


