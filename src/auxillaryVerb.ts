import { ConjugatedForm } from "./conjugation.js";
import { PartOfSpeech } from "./word.js";

// https://ja.wikipedia.org/wiki/%E5%8A%A9%E5%8B%95%E8%A9%9E_(%E5%9B%BD%E6%96%87%E6%B3%95)
export enum AuxillaryVerbType {
    Passive,
    PassivePotential,
    Causative,
    Negation,
    Volitional,
    NegativeInference,
    Desire,
    Past,
    Polite,
    Disdain,
    Hearsay1,
    Hearsay2,
    Certainty,
    Similarity,
    Copula,
    CopulaPolite,
    TaraConditional,
    Unknown
}

export interface AuxillaryVerbDetail {
    type: PartOfSpeech.AuxillaryVerb;
    conjugatedForm: ConjugatedForm;
    auxVerbType: AuxillaryVerbType;
}