import { AdjectiveDetail } from "./adjective.js";
import { NounDetail } from "./noun.js";
import { SymbolDetail } from "./symbol.js";
import { VerbDetail } from "./verb.js";

// https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44
export enum PartOfSpeech {
    Filler = 'フィラー', // 「あのー」「えーと」
    Interjection = '感動詞',
    Symbol = '記号',
    iAdjective = '形容詞',
    Noun = '名詞',
    Verb = '動詞',
    Particle = '助詞',
    AuxillaryVerb = '助動詞',
    Conjunction = '接続詞'
}

export enum Details {
    Suffix = '接尾',

    NotIndependent = '非自立',
    ConjunctionParticle = '接続助詞',
}

export enum SuffixType {
    General,
    SuruConjunction = 'サ変接続', // 現実(化)する
    AdjectivalNounStem = '形容動詞語幹', // 現実(的)な
    Counter = '助数詞', // 一(本)
    AuxillaryVerbStem = '助動詞語幹', // 美味し(そう)
    Name = '人名', // 花子(氏)
    Area = '地域', // 〇〇(県)
    Special = '特殊', // 美し(さ)
    Adverbial = '副詞可能', // 三日(後)
}

export interface Word {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
    detail?: WordDetail;
}

export type WordDetail = SymbolDetail | AdjectiveDetail | VerbDetail | NounDetail;