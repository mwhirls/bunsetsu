import { IpadicFeatures } from "kuromoji";
import { ConjugatedForm } from "../conjugation.js";
import { VerbDetail } from "../verb.js";
import { PartOfSpeech, Word } from "../word.js";
import { IpadicWord } from "./word.js";

export class IpadicVerb extends IpadicWord {
    constructor(stem: IpadicFeatures, inflection: IpadicFeatures[], detail: IpadicVerbDetail) {
        super(PartOfSpeech.Verb, [stem, ...inflection], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

export class IpadicVerbDetail implements VerbDetail {
    type: PartOfSpeech.Verb;
    conjugatedForm: ConjugatedForm;
    auxillaryWord?: Word;
    negativeForm?: boolean;

    constructor(conjugatedForm: ConjugatedForm);
    constructor(conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord);
    constructor(conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord, negativeForm?: boolean);
    constructor(conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord, negativeForm?: boolean) {
        this.type = PartOfSpeech.Verb;
        this.conjugatedForm = conjugatedForm;
        this.auxillaryWord = auxillaryWord;
        this.negativeForm = negativeForm;
    }
}