import { IpadicFeatures } from "kuromoji";
import { AdjectiveDetail } from "../adjective.js";
import { Stem, Conjugation } from "../conjugation.js";
import { PartOfSpeech } from "../word.js";
import { IpadicStem, IpadicConjugation } from "./conjugation.js";
import { IpadicVerbDetail } from "./verb.js";
import { IpadicWord } from "./word.js";

export class IpadicAdjective extends IpadicWord {
    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        const detail = new IpadicVerbDetail(stem, conjugation);
        super(PartOfSpeech.iAdjective, [stem, ...conjugation], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

export class IpadicAdjectiveDetail implements AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;

    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        this.type = PartOfSpeech.iAdjective;
        this.stem = new IpadicStem(stem);
        this.conjugation = new IpadicConjugation(stem, conjugation);
    }
}


