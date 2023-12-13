import buildSegmenter from "./ipadic/segmenter.js";
import { Sentence, Word } from "./word.js";

export interface Segmenter {
    segmentAsWords(text: string): Word[];
    segmentAsSentences(text: string): Sentence[];
}

export function build(dicPath: string): Promise<Segmenter> {
    return buildSegmenter(dicPath);
}