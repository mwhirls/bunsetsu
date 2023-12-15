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
            const cases = [
                '言ったん',
                '学生だったん',
                '何点だったん',
            ];
            runTest(cases, 'ん', -1, context);
        });

        describe('んだ', function () {
            const cases = [
                '食べたんだけどね',
            ];
            runTest(cases, 'ん', 1, context);
        });

        describe('なんだ', function () {
            const cases = [
                '元気なんだ',
                '学生だったんだ'
            ];
            runTest(cases, 'ん', -2, context);
        });

        describe('ね', function () {
            const cases = [
                '元気だね',
                '優しいね',
                '飲もうね',
                '会うね',
                '言ったんだね'
            ];
            runTest(cases, 'ね', -1, context);
        });

        describe('よ', function () {
            const cases = [
                '元気だよ',
                '優しいよ',
                '飲もうよ',
                '会うよ',
                '言ったんだよ'
            ];
            runTest(cases, 'よ', -1, context);
        });

        describe('じゃ', function () {
            const cases = [
                '元気じゃない',
                'それじゃ',
                '学生じゃなかったら',
            ];
            runTest(cases, 'じゃ', 1, context);
        });

        describe('な (prohibition)', function () {
            const cases = [
                'するな',
                '行くな',
                '飲むな',
            ];
            runTest(cases, 'な', 1, context);
        });

        describe('な (admiration, emphasis, etc)', function () {
            describe('at end of sentence', function () {
                const cases = [
                    'プリントな',
                    '元気だな',
                ];
                runTest(cases, 'な', -1, context);

            });

            describe('embedded clause', function () {
                const cases = [
                    'ホント申し訳ないことしたなと思ってます',
                ];
                runTest(cases, 'な', 4, context);

            });

        });

        describe('ぜ', function () {
            const cases = [
                'ゲットだぜ',
                '飲もうぜ',
            ];
            runTest(cases, 'ぜ', -1, context);
        });

        describe('さ', function () {
            const cases = [
                'でさ',
                'やってみるさ',
                'よくあることさ'
            ];
            runTest(cases, 'さ', -1, context);
        });

        describe('っけ', function () {
            const cases = [
                '次のテストっていつだっけ？',
                'どこに住んでいるんだっけ？',
            ];
            runTest(cases, 'っけ', -2, context);
        });

        describe('わ', function () {
            const cases = [
                '知ってるわ。',
                'ちゃんとやるわ！',
            ];
            runTest(cases, 'わ', -2, context);
        });

        describe('ぞ', function () {
            const cases = [
                'がんばるぞ！',
                'さあ, 始めるぞ！',
            ];
            runTest(cases, 'ぞ', -2, context);
        });

        describe('と', function () {
            const cases = [
                '元気だと',
                '言うんだと',
                'ヤマトの説明だと',
            ];
            runTest(cases, 'と', -1, context);
        });

        describe('から', function () {
            const cases = [
                '元気だから',
                '言うんだから',
            ];
            runTest(cases, 'から', -1, context);
        });
    });
}