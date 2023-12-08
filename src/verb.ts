import { Conjugation, Stem } from "./conjugation.js";
import { PartOfSpeech } from "./word.js";

export enum VerbType {
    Kuru = 'カ変動詞',
}

export interface VerbDetail {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
}