import { IpadicFeatures } from "kuromoji";
import { SymbolDetail, SymbolType } from "../symbol";
import { PartOfSpeech } from "../word";
import { IpadicWord, posDetails } from "./word";

export class IpadicSymbol extends IpadicWord {
    constructor(token: IpadicFeatures) {
        const detail = new IpadicSymbolDetail(token);
        super(PartOfSpeech.Symbol, [token], token.surface_form, token.basic_form, token.reading, token.pronunciation, detail);
    }
}

export class IpadicSymbolDetail implements SymbolDetail {
    type: PartOfSpeech.Symbol;
    symbolType: SymbolType;

    constructor(token: IpadicFeatures) {
        this.type = PartOfSpeech.Symbol;
        const details = posDetails(token);
        let symbolType = Object.values(SymbolType).find(x => details.some((detail) => x === detail));
        if (!symbolType) {
            switch (token.basic_form) {
                case '！':
                    symbolType = SymbolType.ExclamationMark;
                    break;
                case '？':
                    symbolType = SymbolType.QuestionMark;
                    break;
                case '・':
                    symbolType = SymbolType.Interpunct;
                    break;
                default:
                    throw new Error('unrecognized symbol');
            }
        }
        this.symbolType = symbolType;
    }
}