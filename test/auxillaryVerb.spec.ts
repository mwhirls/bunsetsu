import { assert } from "chai";
import { TestContext } from "./context.js";
import * as bunsetsu from "../src/index.js"

function runTest(testCases: string[], auxillary: string, auxillaryIndex: number, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${auxillary} as a separate word in the phrase ${expected}`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected);
            const index = auxillaryIndex < 0 ? words.length + auxillaryIndex : auxillaryIndex;
            assert.ok(index >= 0);

            const word = words[index];
            assert.equal(word.pos, bunsetsu.PartOfSpeech.AuxillaryVerb);
            assert.equal(word.surfaceForm, auxillary);
            assert.equal(word.baseForm, auxillary);
        });
    }
}

export function runTestSuite(context: TestContext) {
    describe('じゃん', function () {
        const cases = [
            '元気じゃん',
            '優しいじゃん',
            '食べたじゃん',
        ];
        runTest(cases, 'じゃん', -1, context);
    });
}