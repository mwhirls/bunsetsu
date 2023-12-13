import { IpadicFeatures } from "kuromoji";
import { ConjugatedForm } from "../conjugation.js";
import { VerbDetail } from "../verb.js";
import { PartOfSpeech } from "../word.js";
import { IpadicTokenNode } from "./word.js";

export class IpadicVerb extends IpadicTokenNode {
    constructor(token: IpadicFeatures, detail: IpadicVerbDetail);
    constructor(token: IpadicFeatures, detail: IpadicVerbDetail, auxillary?: IpadicTokenNode);
    constructor(token: IpadicFeatures, detail: IpadicVerbDetail, auxillary?: IpadicTokenNode) {
        super(PartOfSpeech.Verb, token, detail, auxillary);
    }
}

export class IpadicVerbDetail implements VerbDetail {
    type: PartOfSpeech.Verb;
    conjugatedForm: ConjugatedForm;

    constructor(conjugatedForm: ConjugatedForm) {
        this.type = PartOfSpeech.Verb;
        this.conjugatedForm = conjugatedForm;
    }
}