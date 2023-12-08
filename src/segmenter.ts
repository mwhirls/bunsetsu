import buildSegmenter from "./internal/segmenter.js";
import { Sentence } from "./sentence.js";
import { Word } from "./word.js";

export interface Segmenter {
    segmentAsWords(text: string): Word[];
    segmentAsSentences(text: string): Sentence[];
}

export function build(dicPath: string): Promise<Segmenter> {
    return buildSegmenter(dicPath);
}