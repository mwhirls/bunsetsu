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

export interface Token {
    pos: PartOfSpeech;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
    role: GrammaticalRole,
    detail?: TokenDetail;
}

// https://ja.wikipedia.org/wiki/%E5%8A%A9%E5%8B%95%E8%A9%9E_(%E5%9B%BD%E6%96%87%E6%B3%95)
export enum GrammaticalRole {
    Base,
    Passive,
    PassivePotential,
    Causative,
    Negation,
    Volitional,
    NegativeInference,
    Desire,
    Past,
    Polite,
    Disdain,
    Hearsay1,
    Hearsay2,
    Certainty,
    Similarity,
    Copula,
    CopulaPolite,
    TaraConditional,
    Unknown
}

export enum DetailType {
    SymbolDetail,
    ConjugationDetail,
}

export enum SymbolType {
    Alphabet,
    OpeningBracketParens,
    ClosingBracketParens,
    Period,
    QuestionMark,
    ExclamationMark,
    Space,
    Comma,
    Interpunct,
    Unknown
}

export interface SymbolDetail {
    type: DetailType.SymbolDetail;
    symbolType: SymbolType;
}

export enum ConjugatedForm {
    ClassicalPlainForm,
    Conditional,
    ConditionalContraction,
    Continuative,
    IndeclinableNominal,
    GaruForm,
    GozaiForm,
    Irrealis,
    Imperative,
    PlainForm,
    TaConjunction,
    TeConjunction,
    Unknown,
}

export interface ConjugationDetail {
    type: DetailType.ConjugationDetail;
    conjugatedForm: ConjugatedForm;
}

export type TokenDetail = SymbolDetail | ConjugationDetail;