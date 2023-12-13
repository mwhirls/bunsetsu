import { assert } from "chai";
import { TestContext } from "../context.js";
import * as bunsetsu from "../../src/index.js"

export type VerbTestCase = {
    surfaceForm: string;
    basicForm: string;
    reading: string;
    auxillary?: string;
    auxillaryIndex?: number;
}

export type PhraseTestCase = {
    phrase: string;
    index: number;
    wordSurfaceForm: string;
    basicForm: string;
    reading: string;
    auxillary?: string;
    auxillaryIndex?: number;
}

export function runTest(testCases: VerbTestCase[], conjugatedForm: bunsetsu.ConjugatedForm, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${expected.surfaceForm} as one word`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected.surfaceForm);
            assert.equal(words.length, 1);

            const word = words[0];
            assert.equal(word.pos(), bunsetsu.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm(), expected.surfaceForm);
            assert.equal(word.basicForm(), expected.basicForm);
            assert.equal(word.reading(), expected.reading);

            assert.ok(word.tokens.length >= 1);
            const token = word.tokens[0];
            assert.ok(token.detail);
            assert.equal(token.detail!.type, bunsetsu.DetailType.ConjugationDetail);
            const detail = token.detail as bunsetsu.ConjugationDetail;
            assert.equal(detail.conjugatedForm, conjugatedForm);

            if (expected.auxillary && expected.auxillaryIndex) {
                const auxIdx = expected.auxillaryIndex ?? 1;
                assert.ok(word.tokens.length > auxIdx);
                assert.equal(word.tokens[auxIdx].basicForm, expected.auxillary);
            }
        });
    }
}

export function runTestOnPhrase(testCases: PhraseTestCase[], conjugatedForm: bunsetsu.ConjugatedForm, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${expected.wordSurfaceForm} as one word`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected.phrase);

            const word = words[expected.index];
            assert.equal(word.pos(), bunsetsu.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm(), expected.wordSurfaceForm);
            assert.equal(word.basicForm(), expected.basicForm);
            assert.equal(word.reading(), expected.reading);

            assert.ok(word.tokens.length >= 1);
            const token = word.tokens[0];
            assert.ok(token.detail);
            assert.equal(token.detail!.type, bunsetsu.DetailType.ConjugationDetail);
            const detail = token.detail as bunsetsu.ConjugationDetail;
            assert.equal(detail.conjugatedForm, conjugatedForm);

            if (expected.auxillary && expected.auxillaryIndex) {
                const auxIdx = expected.auxillaryIndex ?? 1;
                assert.ok(word.tokens.length > auxIdx);
                assert.equal(word.tokens[auxIdx].basicForm, expected.auxillary);
            }
        });
    }
}