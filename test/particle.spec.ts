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
            assert.equal(word.pos(), bunsetsu.PartOfSpeech.Particle);
            assert.equal(word.surfaceForm(), particle);
            assert.equal(word.basicForm(), particle);
        });
    }
}

export function runTestSuite(context: TestContext) {
    describe('PartOfSpeech.Particle', async function () {
        describe('か', function () {
            describe('at end of sentence', function () {
                const cases = [
                    '食べますか',
                    'そうか',
                    'しましたか',
                    '行きましょうか',
                    '聞かないか',
                    '来たか',
                    '行こっか',
                ];
                runTest(cases, 'か', -1, context);
            });

            describe('in middle of sentence', function () {
                const cases = [
                    'するかしないか',
                ];
                runTest(cases, 'か', 1, context);
            });
        });

        describe('の', function () {
            describe('at end of sentence', function () {
                const cases = [
                    '食べるの',
                    '言ったの',
                    '大変なの'
                ];
                runTest(cases, 'の', -1, context);
            });

            describe('in the middle of sentence', function () {
                const cases = [
                    '言ったのは',
                    '言ったのが',
                    '見ての楽しみ',
                    '元気なのは'
                ];
                runTest(cases, 'の', -2, context);
            });
        });

        describe('ん', function () {
            describe('at end of sentence', function () {
                const cases = [
                    '食べるん',
                    '言ったん',
                    '学生だったん',
                    '何点だったん',
                ];
                runTest(cases, 'ん', -1, context);
            });
        });

        //ホント申し訳ないことしたなと思ってます
        // ふっかけすぎです
        // お願いしまーす
        // 分かりませんので

        /*
        describe('んだ', function () {
        });

        describe('なんだ', function () {
        });

        describe('ね', function () {
        });

        describe('よ', function () {
        });

        describe('じゃ', function () {
        });

        describe('じゃん', function () {
            const cases = [
                '言ってたじゃん',
            ];
            runTest(cases);
        });

        describe('な (prohibition)', function () {
        });

        describe('な (admiration)', function () {
            // プリントな
        });

        describe('ぜ', function () {
        });

        describe('さ', function () {
        });

        describe('っけ', function () {
        });

        describe('わ', function () {
        });

        describe('ぞ', function () {
        });
        */
    });
}