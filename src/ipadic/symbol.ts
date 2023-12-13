import { IpadicFeatures } from "kuromoji";
import { IpadicPOSDetails } from "./details.js";
import { PartOfSpeech, SymbolType, SymbolDetail, GrammaticalRole, DetailType } from "../token.js";
import { IpadicNode } from "./token.js";

// string literals from kuromoji (Mecab IPADIC)
export enum IpadicSymbolType {
    Alphabet = 'アルファベット',
    OpeningBracketParens = '括弧開',
    ClosingBracketParens = '括弧閉',
    Period = '句点',
    Space = '空白',
    Comma = '読点',
}

export class IpadicSymbol extends IpadicNode {
    constructor(token: IpadicFeatures) {
        const detail = new IpadicSymbolDetail(token);
        super(PartOfSpeech.Symbol, token, GrammaticalRole.Unknown, detail);
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
    type: DetailType.SymbolDetail;
    symbolType: SymbolType;

    constructor(token: IpadicFeatures) {
        this.type = DetailType.SymbolDetail;
        this.symbolType = toSymbolType(token);
    }
}