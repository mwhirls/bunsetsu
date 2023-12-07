import { IpadicFeatures } from "kuromoji";
import { IpadicVerb } from "./verb";
import { PartOfSpeech } from "./word";

export interface NounDetail {
    type: PartOfSpeech.Noun;
    suffix?: IpadicFeatures | undefined;
    suru?: IpadicVerb | undefined;
}