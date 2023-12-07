import { IpadicFeatures } from "kuromoji";
import { NounDetail } from "../noun";
import { PartOfSpeech } from "../word";
import { IpadicVerb } from "./verb";
import { IpadicWord } from "./word";

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
    suru?: IpadicVerb | undefined;

    constructor(token: IpadicFeatures, suffix?: IpadicFeatures, suru?: IpadicVerb) {
        this.type = PartOfSpeech.Noun;
        this.suffix = suffix;
        this.suru = suru;
    }
}