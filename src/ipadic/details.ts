import { IpadicFeatures } from "kuromoji";
import { PartOfSpeech } from "../word.js";
import { IpadicSymbolType } from "./symbol.js";

export enum IpadicDetailsType {
    Suffix = '接尾',
    NotIndependent = '非自立',
    ConjunctionParticle = '接続助詞',
}

export enum SuffixType {
    General = '一般',
    SuruConjunction = 'サ変接続', // 現実(化)する
    AdjectivalNounStem = '形容動詞語幹', // 現実(的)な
    Counter = '助数詞', // 一(本)
    AuxillaryVerbStem = '助動詞語幹', // 美味し(そう)
    Name = '人名', // 花子(氏)
    Area = '地域', // 〇〇(県)
    Special = '特殊', // 美し(さ)
    Adverbial = '副詞可能', // 三日(後)
}

export class IpadicPOSDetails {
    private readonly token: IpadicFeatures;
    private readonly details: string[];

    constructor(token: IpadicFeatures) {
        this.token = token;
        this.details = [token.pos_detail_1, token.pos_detail_2, token.pos_detail_3];
    }

    isSuffix(): boolean {
        return this.has(IpadicDetailsType.Suffix);
    }

    isSuffixType(suffixType: SuffixType): boolean {
        return this.has(suffixType);
    }

    isNotIndependent(): boolean {
        return this.has(IpadicDetailsType.NotIndependent);
    }

    isSuruVerb(token: IpadicFeatures) {
        return token.pos === PartOfSpeech.Noun &&
            this.isSuffixType(SuffixType.SuruConjunction);
    }

    symbolType(): IpadicSymbolType | undefined {
        return Object.values(IpadicSymbolType).find(x => this.has(x));
    }

    private has(property: string): boolean {
        return this.details.some((value) => value === property);
    }
}