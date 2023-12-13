import { IpadicFeatures } from "kuromoji";
import { ConjugatedForm } from "../conjugation.js";
import { PartOfSpeech } from "../word.js";
import { IpadicTokenNode } from "./word.js";
import { AuxillaryVerbDetail, AuxillaryVerbType } from "../auxillaryVerb.js";

export class IpadicAuxillaryVerb extends IpadicTokenNode {
    constructor(token: IpadicFeatures, detail: IpadicAuxillaryVerbDetail);
    constructor(token: IpadicFeatures, detail: IpadicAuxillaryVerbDetail, auxillary?: IpadicTokenNode);
    constructor(token: IpadicFeatures, detail: IpadicAuxillaryVerbDetail, auxillary?: IpadicTokenNode) {
        super(PartOfSpeech.AuxillaryVerb, token, detail, auxillary);
    }
}

export class IpadicAuxillaryVerbDetail implements AuxillaryVerbDetail {
    type: PartOfSpeech.AuxillaryVerb;
    conjugatedForm: ConjugatedForm;
    auxVerbType: AuxillaryVerbType;

    constructor(conjugatedForm: ConjugatedForm, auxVerbType: AuxillaryVerbType);
    constructor(conjugatedForm: ConjugatedForm, auxVerbType: AuxillaryVerbType);
    constructor(conjugatedForm: ConjugatedForm, auxVerbType: AuxillaryVerbType) {
        this.type = PartOfSpeech.AuxillaryVerb;
        this.conjugatedForm = conjugatedForm;
        this.auxVerbType = auxVerbType;
    }
}