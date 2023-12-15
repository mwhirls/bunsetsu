// string literals from kuromoji (Mecab IPADIC)
export enum PartOfSpeech {
    Filler = 'フィラー', // 「あのー」「えーと」
    Interjection = '感動詞',
    Symbol = '記号',
    iAdjective = '形容詞',
    Noun = '名詞',
    Verb = '動詞',
    Particle = '助詞',
    AuxillaryVerb = '助動詞',
    Conjunction = '接続詞',
    Unknown = '',
}

// string literals from kuromoji (Mecab IPADIC)
export enum SymbolType {
    Alphabet = 'アルファベット',
    OpeningBracketParens = '括弧開',
    ClosingBracketParens = '括弧閉',
    Period = '句点',
    Space = '空白',
    Comma = '読点',
    Unknown = '',
}

// String literals from kuromoji (MeCab IPADIC)
// For examples of how Kuromoji classifies conjugations, see:
// https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44
export enum ConjugatedForm {
    ClassicalPlainForm = '文語基本形',
    ConditionalForm = '仮定形',
    ConditionalContraction1 = '仮定縮約１',
    ConditionalContraction2 = '仮定縮約２',
    Continuative = '連用形',
    IndeclinableNominalConjunction = '体言接続',
    GaruConjunction = 'ガル接続',
    GozaiConjunction = '連用ゴザイ接続',
    Irrealis = '未然形',
    IrrealisNuConjunction = '未然ヌ接続',
    IrrealisReruConjunction = '未然レル接続',
    IrrealisUConjunction = '未然ウ接続',
    ImperativeE = '命令ｅ',
    ImperativeI = '命令ｉ',
    ImperativeRo = '命令ｒｏ',
    ImperativeYo = '命令ｙｏ',
    PlainForm = '基本形',
    SpecialIndeclinableNominalConjunction1 = '体言接続特殊',
    SpecialIndeclinableNominalConjunction2 = '体言接続特殊２',
    SpecialIrrealis = '未然特殊',
    TaConjunction = '連用タ接続',
    TeConjunction = '連用テ接続',
}

// String literals from kuromoji (MeCab IPADIC)
// todo: this list is incomplete
export enum ConjugatedType {
    Kuru = 'カ変・来ル',
    SuruSpecialClass = 'サ変・−スル',
    Zuru = 'サ変・−ズル',
    Suru = 'サ変・スル',
    Ra = 'ラ変',
    Ichidan = '一段',
    IchidanKureru = '一段・クレル',
    ShimoNidan = '下二段',
    KamiNidan = '上二段',
    Yodan = '四段',
    Godan = '五段',
    SpecialMasu = '特殊・マス',
    SpecialTa = '特殊・タ',
    SpecialYa = '特殊・ヤ',
    SpecialDa = '特殊・ダ',
}

// String literals from kuromoji (MeCab IPADIC)
export enum WordType {
    Known = 'KNOWN',
    Unknown = 'UNKNOWN',
}

export interface Token {
    pos: PartOfSpeech;
    surfaceForm: string;
    wordType: WordType;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
    detail?: TokenDetail;
}

export enum DetailType {
    SymbolDetail,
    ConjugationDetail,
}

export interface SymbolDetail {
    type: DetailType.SymbolDetail;
    symbolType: SymbolType;
}

export interface ConjugationDetail {
    type: DetailType.ConjugationDetail;
    conjugatedForm: ConjugatedForm;
}

export type TokenDetail = SymbolDetail | ConjugationDetail;