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
    SuruConjunction = 'サ変接続',
    NotIndependent = '非自立',
    ConjunctionParticle = '接続助詞',
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