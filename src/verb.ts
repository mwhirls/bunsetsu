import { Conjugation, Stem } from "./conjugation";
import { PartOfSpeech } from "./word";

export enum VerbType {
    Kuru = 'カ変動詞',
}

export interface VerbDetail {
    type: PartOfSpeech.Verb;
    stem: Stem;
    conjugation: Conjugation;
}