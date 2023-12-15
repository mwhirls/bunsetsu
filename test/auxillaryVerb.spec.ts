import { assert } from "chai";
import { TestContext } from "./context.js";
import * as bunsetsu from "../src/index.js"

function runTest(testCases: string[], particle: string, particleIndex: number, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${particle} as a separate word in the phrase ${expected}`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected);
            const index = particleIndex < 0 ? words.length + particleIndex : particleIndex;
            assert.ok(index >= 0);

            const word = words[index];
            assert.equal(word.pos(), bunsetsu.PartOfSpeech.AuxillaryVerb);
            assert.equal(word.surfaceForm(), particle);
            assert.equal(word.basicForm(), particle);
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