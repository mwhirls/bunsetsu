import { IpadicFeatures } from "kuromoji";
import { PartOfSpeech, SymbolType } from "./token.js";

export enum DetailsType {
    Suffix = '接尾',
    NotIndependent = '非自立',
    ConjunctionParticle = '接続助詞',
    NaiAdjectiveStem = 'ナイ形容詞語幹',
    AdverbialParticle = '副助詞',
    ParallelMarker = '並立助詞',
    SentenceEndingParticle = '終助詞'
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
        return this.has(DetailsType.Suffix);
    }

    isSuffixType(suffixType: SuffixType): boolean {
        return this.has(suffixType);
    }

    isNotIndependent(): boolean {
        return this.has(DetailsType.NotIndependent);
    }

    isNaiAdjectiveStem(): boolean {
        return this.has(DetailsType.NaiAdjectiveStem);
    }

    isSuruVerb() {
        return this.token.pos === PartOfSpeech.Noun &&
            this.isSuffixType(SuffixType.SuruConjunction);
    }

    isSentenceEndingParticle() {
        return this.has(DetailsType.SentenceEndingParticle);
    }

    symbolType(): SymbolType | undefined {
        return Object.values(SymbolType).find(x => this.has(x));
    }

    private has(property: string): boolean {
        return this.details.some((value) => value.includes(property));
    }
}