import { IpadicFeatures } from "kuromoji";
import { SymbolDetail, SymbolType } from "../symbol.js";
import { PartOfSpeech } from "../word.js";
import { IpadicTokenNode } from "./word.js";
import { IpadicPOSDetails } from "./details.js";

// string literals from kuromoji (Mecab IPADIC)
export enum IpadicSymbolType {
    Alphabet = 'アルファベット',
    OpeningBracketParens = '括弧開',
    ClosingBracketParens = '括弧閉',
    Period = '句点',
    Space = '空白',
    Comma = '読点',
}

export class IpadicSymbol extends IpadicTokenNode {
    constructor(token: IpadicFeatures) {
        const detail = new IpadicSymbolDetail(token);
        super(PartOfSpeech.Symbol, token, detail);
    }
}

function toSymbolType(token: IpadicFeatures) {
    const details = new IpadicPOSDetails(token);
    const symbolType = details.symbolType();
    if (symbolType) {
        switch (symbolType) {
            case IpadicSymbolType.Alphabet:
                return SymbolType.Alphabet;
            case IpadicSymbolType.OpeningBracketParens:
                return SymbolType.OpeningBracketParens;
            case IpadicSymbolType.ClosingBracketParens:
                return SymbolType.ClosingBracketParens;
            case IpadicSymbolType.Period:
                return SymbolType.Period;
            case IpadicSymbolType.Space:
                return SymbolType.Space;
            case IpadicSymbolType.Comma:
                return SymbolType.Comma;
        }
    }
    // handle types not categorized by kuromoji
    switch (token.basic_form) {
        case '！':
            return SymbolType.ExclamationMark;
        case '？':
            return SymbolType.QuestionMark;
        case '・':
            return SymbolType.Interpunct;
        default:
            console.log('unrecognized SymbolType: ', token.surface_form);
            return SymbolType.Unknown;
    }
}

export class IpadicSymbolDetail implements SymbolDetail {
    type: PartOfSpeech.Symbol;
    symbolType: SymbolType;

    constructor(token: IpadicFeatures) {
        this.type = PartOfSpeech.Symbol;
        this.symbolType = toSymbolType(token);
    }
}