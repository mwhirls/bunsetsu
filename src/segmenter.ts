import buildSegmenter from "./internal/segmenter";
import { Sentence } from "./sentence";
import { Word } from "./word";

export interface Segmenter {
    segmentAsWords(text: string): Word[];
    segmentAsSentences(text: string): Sentence[];
}

export function build(dicPath: string): Promise<Segmenter> {
    return buildSegmenter(dicPath);
}