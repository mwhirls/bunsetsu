import { PartOfSpeech } from "./word";

export enum SymbolType {
    Alphabet = 'アルファベット',
    OpeningBracketParens = '括弧開',
    ClosingBracketParens = '括弧閉',
    Period = '句点',
    QuestionMark = '疑問符', // びっくりマーク (!) not categorized by kuromoji
    ExclamationMark = '感嘆符', // はてなマーク (?) not categorized by kuromoji
    Space = '空白',
    Comma = '読点',
    Interpunct = '中点' // ・not categorized by kuromoji
}

export interface SymbolDetail {
    type: PartOfSpeech.Symbol;
    symbolType: SymbolType;
}