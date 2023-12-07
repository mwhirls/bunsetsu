import { IpadicFeatures } from "kuromoji";
import { PartOfSpeech, Word } from "./word";

export interface NounDetail {
    type: PartOfSpeech.Noun;
    suffix?: IpadicFeatures | undefined;
    suru?: Word | undefined;
}