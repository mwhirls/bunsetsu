import { IpadicFeatures } from "kuromoji";
import { NounDetail } from "../noun.js";
import { PartOfSpeech, Word } from "../word.js";
import { IpadicVerb } from "./verb.js";
import { IpadicWord } from "./word.js";

export class IpadicNoun extends IpadicWord {
    constructor(token: IpadicFeatures, suffix?: IpadicFeatures, suru?: IpadicVerb) {
        const detail = new IpadicNounDetail(token, suffix, suru);
        const tokens = [token];
        if (suffix) {
            tokens.push(suffix);
        }
        if (suru) {
            tokens.push(...suru.tokens);
        }
        super(PartOfSpeech.Noun, [token], token.surface_form, token.basic_form, token.reading, token.pronunciation, detail);
    }
}

export class IpadicNounDetail implements NounDetail {
    type: PartOfSpeech.Noun;
    suffix?: IpadicFeatures | undefined;
    suru?: Word | undefined;

    constructor(token: IpadicFeatures, suffix?: IpadicFeatures, suru?: IpadicVerb) {
        this.type = PartOfSpeech.Noun;
        this.suffix = suffix;
        this.suru = suru;
    }
}