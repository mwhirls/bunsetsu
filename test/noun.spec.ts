import * as bunsetsu from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
    describe('PartOfSpeech.Noun', async function () {
        describe('regular noun', async function () {
            const nouns = ['学生', '周り', '手', '眼鏡', '仕事'];
            for (const n of nouns) {
                it(`should identify ${n} as one noun`, function () {
                    assert.ok(context.segmenter);
                    const words = context.segmenter.segmentAsWords(n);
                    assert.equal(words.length, 1);

                    const word = words[0];
                    assert.equal(word.pos, bunsetsu.PartOfSpeech.Noun);
                    assert.equal(word.surfaceForm, n);
                    assert.equal(word.baseForm, n);
                    assert.equal(word.tokens.length, 1);
                });
            }
        });

        describe('suru verb', async function () {
            const nouns = ['勉強', '結婚', '旅行', '料理', '散歩']
            for (const n of nouns) {
                const suruVerb = `${n}する`;
                it(`should identify ${suruVerb} as one word`, function () {
                    assert.ok(context.segmenter);
                    const words = context.segmenter.segmentAsWords(suruVerb);
                    assert.equal(words.length, 1);

                    const word = words[0];
                    assert.equal(word.pos, bunsetsu.PartOfSpeech.Noun);
                    assert.equal(word.surfaceForm, suruVerb);
                    assert.equal(word.baseForm, n);

                    assert.equal(word.tokens.length, 2);
                    const nounToken = word.tokens[0];
                    assert.equal(nounToken.baseForm, n);
                    const suruToken = word.tokens[1];
                    assert.equal(suruToken.baseForm, 'する');
                });
            }
        });

        describe('suru verb (polite)', async function () {
            const nouns = ['勉強', '結婚', '旅行', '料理', '散歩']
            for (const n of nouns) {
                const suruVerb = `${n}します`;
                it(`should identify ${suruVerb} as one word`, function () {
                    assert.ok(context.segmenter);
                    const words = context.segmenter.segmentAsWords(suruVerb);
                    assert.equal(words.length, 1);

                    const word = words[0];
                    assert.equal(word.pos, bunsetsu.PartOfSpeech.Noun);
                    assert.equal(word.surfaceForm, suruVerb);
                    assert.equal(word.baseForm, n);

                    assert.equal(word.tokens.length, 3);
                    const nounToken = word.tokens[0];
                    assert.equal(nounToken.baseForm, n);
                    const suruToken = word.tokens[1];
                    assert.equal(suruToken.baseForm, 'する');
                });
            }
        });

        describe('separate noun within phrase', async function () {
            const cases = [
                { phrase: '関係ある', noun: '関係' }
            ];
            for (const c of cases) {
                it(`should identify ${c.noun} as a separate word in the phrase ${c.phrase}`, function () {
                    assert.ok(context.segmenter);
                    const words = context.segmenter.segmentAsWords(c.phrase);
                    assert.ok(words.length > 1);

                    const word = words[0];
                    assert.equal(word.pos, bunsetsu.PartOfSpeech.Noun);
                    assert.equal(word.surfaceForm, c.noun);
                    assert.equal(word.baseForm, c.noun);
                });
            }
        });
    });
}