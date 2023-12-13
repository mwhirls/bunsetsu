import { ConjugatedForm } from "./conjugation.js";
import { PartOfSpeech, Word } from "./word.js";

export interface AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    conjugatedForm: ConjugatedForm;
    auxillaryWord?: Word,
}

