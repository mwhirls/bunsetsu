import { IpadicFeatures } from "kuromoji";
import { PartOfSpeech, WordDetail } from "../word.js";
import { IpadicAdjectiveDetail } from "./adjective.js";
import { IpadicNounDetail } from "./noun.js";
import { IpadicSymbolDetail } from "./symbol.js";
import { IpadicVerbDetail } from "./verb.js";

export class IpadicWord {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
    detail?: WordDetail;
    tokens: IpadicFeatures[];

    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[]);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string, pronunciation?: string);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string, pronunciation?: string, detail?: WordDetail);
    constructor(pos: PartOfSpeech, tokens: IpadicFeatures[], surfaceForm?: string, basicForm?: string, reading?: string, pronunciation?: string, detail?: WordDetail) {
        this.pos = pos;
        this.surfaceForm = surfaceForm ?? tokens.reduce((acc, curr) => acc + curr.surface_form ?? "", "");
        this.basicForm = basicForm ?? tokens.reduce((acc, curr) => acc + curr.basic_form ?? "", "");
        this.reading = reading ?? tokens.reduce((acc, curr) => acc + curr.reading ?? "", "");
        this.pronunciation = pronunciation ?? tokens.reduce((acc, curr) => acc + curr.pronunciation ?? "", "");
        this.detail = detail;
        this.tokens = tokens;
    }
}

export type IpadicWordDetail = IpadicSymbolDetail | IpadicAdjectiveDetail | IpadicVerbDetail | IpadicNounDetail;

export function posDetails(token: IpadicFeatures): string[] {
    return [token.pos_detail_1, token.pos_detail_2, token.pos_detail_3];
}