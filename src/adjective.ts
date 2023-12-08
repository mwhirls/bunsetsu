import { Stem, Conjugation } from "./conjugation.js";
import { PartOfSpeech } from "./word.js";

export interface AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    stem: Stem;
    conjugation: Conjugation;
}

