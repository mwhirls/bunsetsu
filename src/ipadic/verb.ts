import { IpadicFeatures } from "kuromoji";
import { Stem, Conjugation } from "../conjugation.js";
import { VerbDetail } from "../verb.js";
import { PartOfSpeech } from "../word.js";
import { IpadicStem, IpadicConjugation } from "./conjugation.js";
import { IpadicWord } from "./word.js";

export class IpadicVerb extends IpadicWord {
    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        const detail = new IpadicVerbDetail(stem, conjugation);
        super(PartOfSpeech.Verb, [stem, ...conjugation], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

export class IpadicVerbDetail implements VerbDetail {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
    tokens: IpadicFeatures[];

    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        this.type = PartOfSpeech.Verb;
        this.stem = new IpadicStem(stem);
        this.conjugation = new IpadicConjugation(stem, conjugation);
        this.tokens = [stem, ...conjugation];
    }
}