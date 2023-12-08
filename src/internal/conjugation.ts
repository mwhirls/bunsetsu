
import { IpadicFeatures } from "kuromoji";
import { Stem, Conjugation, ConjugatedForm } from "../conjugation.js";

export class IpadicStem implements Stem {
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;

    constructor(token: IpadicFeatures) {
        this.surfaceForm = token.surface_form;
        this.basicForm = token.basic_form;
        this.reading = token.reading;
        this.pronunciation = token.pronunciation;
    }
}

export class IpadicConjugation implements Conjugation {
    conjugatedForm: ConjugatedForm;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;

    constructor(stem: IpadicFeatures, tokens: IpadicFeatures[]) {
        const conjugatedForm = Object.values(ConjugatedForm).find(x => x === stem.conjugated_form);
        if (!conjugatedForm) {
            throw Error('unrecognized conjugated form');
        }
        this.conjugatedForm = conjugatedForm;
        this.surfaceForm = tokens.reduce((acc, curr) => acc + curr.surface_form ?? "", "");
        this.basicForm = tokens.reduce((acc, curr) => acc + curr.basic_form ?? "", "");
        this.reading = tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
        this.pronunciation = tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
    }
}
