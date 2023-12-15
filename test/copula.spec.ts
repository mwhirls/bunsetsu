import { assert } from "chai";
import { TestContext } from "./context.js";
import * as bunsetsu from "../src/index.js"

export function runTestSuite(context: TestContext) {
    function runTest(testCases: string[], copulaSurfaceForm: string, copulaBaseForm: string, copulaIndex: number) {
        for (const expected of testCases) {
            it(`should identify ${copulaSurfaceForm} as a separate word in the phrase ${expected}`, function () {
                assert.ok(context.segmenter);
                const words = context.segmenter!.segmentAsWords(expected);
                const index = copulaIndex < 0 ? words.length + copulaIndex : copulaIndex;
                assert.ok(index >= 0);

                const word = words[index];
                assert.equal(word.pos(), bunsetsu.PartOfSpeech.AuxillaryVerb);
                assert.equal(word.surfaceForm(), copulaSurfaceForm);
                assert.equal(word.basicForm(), copulaBaseForm);
            });
        }
    }

    describe('copula', async function () {
        describe('だ', function () {
            const cases = [
                '学生だ',
                '学生だったんだ',
                '食べすぎだ',
                '言ったんだ',
            ];
            runTest(cases, 'だ', 'だ', -1);
        });

        describe('だった', function () {
            const cases = [
                '学生だった',
                '食べすぎだった',
            ];
            runTest(cases, 'だった', 'だ', -1);
        });

        describe('です', function () {
            const cases = [
                '学生です',
                '学生だったです',
                '学生だったのです',
                '学生だったんです',
                '言うんです',
                '言ったんです',
                'ふっかけすぎです',
                'ふっかけすぎだったのです',
                'ふっかけすぎだったんです',
            ];
            runTest(cases, 'です', 'です', -1);
        });

        describe('でした', function () {
            const cases = [
                '学生でした',
                '学生だったでした',
                '学生だったのでした',
                '学生だったんでした',
                '言うんでした',
                '言ったんでした',
                'ふっかけすぎでした',
                'ふっかけすぎだったのでした',
                'ふっかけすぎだったんでした',
            ];
            runTest(cases, 'でした', 'です', -1);
        });

        describe('だろ', function () {
            const cases = [
                '腹立つだろ',
            ];
            runTest(cases, 'だろ', 'だ', -1);
        });

        describe('だろう', function () {
            const cases = [
                '食べるだろう',
            ];
            runTest(cases, 'だろう', 'だ', -1);
        });

        describe('なら', function () {
            const cases = [
                '元気なら',
                '食べるなら',
                'この問題なら',
            ];
            runTest(cases, 'なら', 'だ', -1);
        });

        describe('だったら', function () {
            const cases = [
                '元気だったら',
                '言うんだったら',
            ];
            runTest(cases, 'だったら', 'だ', -1);
        });

        describe('で', function () {
            const cases = [
                '小さいほうでいいよ',
            ];
            runTest(cases, 'で', 'だ', -3);
        });
    });
}