import { ConjugatedForm } from "./conjugation.js";
import { PartOfSpeech, Word } from "./word.js";

export enum VerbType {
    Kuru = 'カ変動詞',
}

export interface VerbDetail {
    type: PartOfSpeech.Verb;
    conjugatedForm: ConjugatedForm;
    auxillaryWord?: Word,
}