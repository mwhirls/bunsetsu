import { Stem, Conjugation } from "./conjugation";
import { PartOfSpeech } from "./word";

export interface AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;
}

