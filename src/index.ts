import { builder, Tokenizer, IpadicFeatures } from "kuromoji";
import { IpadicSegmenter } from "./internal/segmenter";
import { Sentence } from "./sentence";
import { PartOfSpeech, Word, WordDetail } from "./word";
import { AdjectiveDetail } from "./adjective";
import { NounDetail } from "./noun";
import { SymbolDetail, SymbolType } from "./symbol";
import { VerbDetail } from "./verb";

export interface Segmenter {
    segmentAsWords(text: string): Word[];
    segmentAsSentences(text: string): Sentence[];
}

export function build(dicPath: string): Promise<Segmenter> {
    return new Promise((resolve, reject) => {
        const tokenizerBuilder = builder({ dicPath });
        tokenizerBuilder.build((err: Error, tokenizer: Tokenizer<IpadicFeatures>) => {
            if (err) {
                reject(err);
            } else {
                const segmenter = new IpadicSegmenter(tokenizer);
                resolve(segmenter);
            }
        });
    });
}

export { Sentence, Word, PartOfSpeech, WordDetail, SymbolDetail, AdjectiveDetail, VerbDetail, NounDetail, SymbolType };