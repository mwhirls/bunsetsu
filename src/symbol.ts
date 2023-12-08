import { PartOfSpeech } from "./word.js";

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
    type: PartOfSpeech.Symbol;
    symbolType: SymbolType;
}