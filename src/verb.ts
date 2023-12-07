import { IpadicFeatures } from "kuromoji";
import { Stem, Conjugation } from "./conjugation";
import { PartOfSpeech } from "./word";
import { IpadicVerbDetail } from "./internal/verb";
import { IpadicWord } from "./internal/word";

export enum VerbType {
    Kuru = 'カ変動詞',
}

export class IpadicVerb extends IpadicWord {
    constructor(stem: IpadicFeatures, conjugation: IpadicFeatures[]) {
        const detail = new IpadicVerbDetail(stem, conjugation);
        super(PartOfSpeech.Verb, [stem, ...conjugation], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

export interface VerbDetail {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
}