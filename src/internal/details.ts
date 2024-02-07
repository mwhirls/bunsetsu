import { IpadicFeatures } from "kuromoji";
import { PartOfSpeech, SymbolType } from "../token.js";

type ObjectValues<T> = T[keyof T];

export const DetailsType = {
    Suffix: '接尾',
    NotIndependent: '非自立',
    ConjunctionParticle: '接続助詞',
    NaiAdjectiveStem: 'ナイ形容詞語幹',
    AdverbialParticle: '副助詞',
    ParallelMarker: '並立助詞',
    SentenceEndingParticle: '終助詞'
} as const;
export type DetailsType = ObjectValues<typeof DetailsType>;

export const SuffixType = {
    General: '一般',
    SuruConjunction: 'サ変接続',
    AdjectivalNounStem: '形容動詞語幹',
    Counter: '助数詞',
    AuxillaryVerbStem: '助動詞語幹',
    Name: '人名',
    Area: '地域',
    Special: '特殊',
    Adverbial: '副詞可能',
} as const;
export type SuffixType = ObjectValues<typeof SuffixType>;

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