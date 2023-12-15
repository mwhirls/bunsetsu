import { assert } from "chai";
import { TestContext } from "./context.js";
import * as bunsetsu from "../src/index.js"

function runTest(testCases: string[], auxillary: string, auxillaryIndex: number, context: TestContext, pos: bunsetsu.PartOfSpeech) {
    for (const expected of testCases) {
        it(`should identify ${auxillary} as a separate word in the phrase ${expected}`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected);
            const index = auxillaryIndex < 0 ? words.length + auxillaryIndex : auxillaryIndex;
            assert.ok(index >= 0);

            const word = words[index];
            assert.equal(word.pos(), pos);
            assert.equal(word.surfaceForm(), auxillary);
        });
    }
}

export function runTestSuite(context: TestContext) {
    describe('PartOfSpeech.Conjunction', function () {
        describe('だから', function () {
            const cases = [
                'だから',
            ];
            runTest(cases, 'だから', -1, context, bunsetsu.PartOfSpeech.Conjunction);
        });

        describe('たら', function () {
            const cases = [
                'また時間になったら来ますね',
            ];
            runTest(cases, 'なったら', -3, context, bunsetsu.PartOfSpeech.Verb);
        });
    });
}