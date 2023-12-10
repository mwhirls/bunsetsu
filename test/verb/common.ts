import { assert } from "chai";
import { TestContext } from "../context.js";
import * as bunsetsu from "../../src/index.js"

export type VerbTestCase = {
    surfaceForm: string;
    basicForm: string;
    reading: string;
    auxillary?: string
}

export type PhraseTestCase = {
    phrase: string;
    index: number;
    wordSurfaceForm: string;
    basicForm: string;
    reading: string;
    auxillary?: string;
}

export function runTest(testCases: VerbTestCase[], conjugatedForm: bunsetsu.ConjugatedForm, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${expected.surfaceForm} as one word`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected.surfaceForm);
            assert.equal(words.length, 1);

            const word = words[0];
            assert.equal(word.pos, bunsetsu.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, expected.surfaceForm);
            assert.equal(word.basicForm, expected.basicForm);
            assert.equal(word.reading, expected.reading);

            assert.ok(word.detail);
            assert.equal(word.detail!.type, bunsetsu.PartOfSpeech.Verb);
            const detail = word.detail as bunsetsu.VerbDetail;
            assert.equal(detail.conjugatedForm, conjugatedForm);

            if (expected.auxillary) {
                assert.equal(detail.auxillaryWord?.basicForm, expected.auxillary);
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
            assert.equal(word.pos, bunsetsu.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, expected.wordSurfaceForm);
            assert.equal(word.basicForm, expected.basicForm);
            assert.equal(word.reading, expected.reading);

            assert.ok(word.detail);
            assert.equal(word.detail!.type, bunsetsu.PartOfSpeech.Verb);
            const detail = word.detail as bunsetsu.VerbDetail;
            assert.equal(detail.conjugatedForm, conjugatedForm);

            if (expected.auxillary) {
                assert.equal(detail.auxillaryWord?.basicForm, expected.auxillary);
            }
        });
    }
}