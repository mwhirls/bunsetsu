import { IpadicFeatures } from "kuromoji";
import { AdjectiveDetail } from "../adjective.js";
import { ConjugatedForm } from "../conjugation.js";
import { PartOfSpeech, Word } from "../word.js";
import { IpadicWord } from "./word.js";

export class IpadicAdjective extends IpadicWord {
    constructor(stem: IpadicFeatures, inflection: IpadicFeatures[], detail: IpadicAdjectiveDetail) {
        super(PartOfSpeech.iAdjective, [stem, ...inflection], undefined, stem.basic_form, undefined, undefined, detail);
    }
}

export class IpadicAdjectiveDetail implements AdjectiveDetail {
    type: PartOfSpeech.iAdjective;
    conjugatedForm: ConjugatedForm;
    auxillaryWord?: Word;
    negativeForm?: boolean;

    constructor(conjugatedForm: ConjugatedForm);
    constructor(conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord);
    constructor(conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord, negativeForm?: boolean);
    constructor(conjugatedForm: ConjugatedForm, auxillaryWord?: IpadicWord, negativeForm?: boolean) {
        this.type = PartOfSpeech.iAdjective;
        this.conjugatedForm = conjugatedForm;
        this.auxillaryWord = auxillaryWord;
        this.negativeForm = negativeForm;
    }
}


