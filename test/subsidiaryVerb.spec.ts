import { assert } from "chai";
import { TestContext } from "./context.js";
import * as bunsetsu from "../src/index.js"

type TestCase = {
    surfaceForm: string;
    basicForm: string;
}

export function runTest(testCases: TestCase[], subsidiaryVerb: string, subsidiaryIndex: number, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${expected.surfaceForm} as one word`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected.surfaceForm);
            assert.equal(words.length, 1);

            const word = words[0];
            assert.equal(word.pos(), bunsetsu.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm(), expected.surfaceForm);
            assert.equal(word.basicForm(), expected.basicForm);

            assert.ok(word.tokens.length > subsidiaryIndex);
            const stem = word.tokens[0];
            assert.equal(stem.basicForm, expected.basicForm);

            const subsidiary = word.tokens[subsidiaryIndex];
            assert.equal(subsidiary.basicForm, subsidiaryVerb);
        });
    }
}

export function runTestSuite(context: TestContext) {
    // https://japanese.stackexchange.com/questions/18952/what-is-a-subsidiary-verb
    describe('subsidiary verbs', async function () {
        describe('progressive form (ている)', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'している', basicForm: 'する' },
                    { surfaceForm: '来ている', basicForm: '来る' },
                    { surfaceForm: '食べている', basicForm: '食べる' },
                    { surfaceForm: '走っている', basicForm: '走る' },
                    { surfaceForm: '聞いている', basicForm: '聞く' },
                    { surfaceForm: '飲んでいる', basicForm: '飲む' },
                    { surfaceForm: '泳いでいる', basicForm: '泳ぐ' },
                    { surfaceForm: '話している', basicForm: '話す' },
                    { surfaceForm: '待っている', basicForm: '待つ' },
                    { surfaceForm: '言っている', basicForm: '言う' },
                ];
                runTest(verbs, 'いる', 2, context);
            });

            describe('as contracted plain form', function () {
                const verbsTeiru = [
                    { surfaceForm: 'してる', basicForm: 'する' },
                    { surfaceForm: '来てる', basicForm: '来る' },
                    { surfaceForm: '食べてる', basicForm: '食べる' },
                    { surfaceForm: '走ってる', basicForm: '走る' },
                    { surfaceForm: '聞いてる', basicForm: '聞く' },
                    { surfaceForm: '話してる', basicForm: '話す' },
                    { surfaceForm: '待ってる', basicForm: '待つ' },
                    { surfaceForm: '言ってる', basicForm: '言う' },
                ];
                const verbsDeiru = [
                    { surfaceForm: '飲んでる', basicForm: '飲む' },
                    { surfaceForm: '泳いでる', basicForm: '泳ぐ' },
                ];
                runTest(verbsTeiru, 'てる', 1, context);
                runTest(verbsDeiru, 'でる', 1, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'しています', basicForm: 'する' },
                    { surfaceForm: '来ています', basicForm: '来る' },
                    { surfaceForm: '食べています', basicForm: '食べる' },
                    { surfaceForm: '走っています', basicForm: '走る' },
                    { surfaceForm: '聞いています', basicForm: '聞く' },
                    { surfaceForm: '飲んでいます', basicForm: '飲む' },
                    { surfaceForm: '泳いでいます', basicForm: '泳ぐ' },
                    { surfaceForm: '話しています', basicForm: '話す' },
                    { surfaceForm: '待っています', basicForm: '待つ' },
                    { surfaceForm: '言っています', basicForm: '言う' },
                ];
                runTest(verbs, 'いる', 2, context);
            });

            describe('as contracted polite form', function () {
                const verbs = [
                    { surfaceForm: 'してます', basicForm: 'する' },
                    { surfaceForm: '来てます', basicForm: '来る' },
                    { surfaceForm: '食べてます', basicForm: '食べる' },
                    { surfaceForm: '走ってます', basicForm: '走る' },
                    { surfaceForm: '聞いてます', basicForm: '聞く' },
                    { surfaceForm: '飲んでます', basicForm: '飲む' },
                    { surfaceForm: '泳いでます', basicForm: '泳ぐ' },
                    { surfaceForm: '話してます', basicForm: '話す' },
                    { surfaceForm: '待ってます', basicForm: '待つ' },
                    { surfaceForm: '言ってます', basicForm: '言う' },
                ];
                runTest(verbs, 'ます', 2, context);
            });

            describe('as honorific form', function () {
                const verbs = [
                    { surfaceForm: 'していらっしゃる', basicForm: 'する' },
                    { surfaceForm: '来ていらっしゃる', basicForm: '来る' },
                    { surfaceForm: '食べていらっしゃる', basicForm: '食べる' },
                    { surfaceForm: '走っていらっしゃる', basicForm: '走る' },
                    { surfaceForm: '聞いていらっしゃる', basicForm: '聞く' },
                    { surfaceForm: '飲んでいらっしゃる', basicForm: '飲む' },
                    { surfaceForm: '泳いでいらっしゃる', basicForm: '泳ぐ' },
                    { surfaceForm: '話していらっしゃる', basicForm: '話す' },
                    { surfaceForm: '待っていらっしゃる', basicForm: '待つ' },
                    { surfaceForm: '言っていらっしゃる', basicForm: '言う' },
                ];
                runTest(verbs, 'いらっしゃる', 2, context);
            });

            describe('as honorific form (polite)', function () {
                const verbs = [
                    { surfaceForm: 'していらっしゃる', basicForm: 'する' },
                    { surfaceForm: '来ていらっしゃる', basicForm: '来る' },
                    { surfaceForm: '食べていらっしゃる', basicForm: '食べる' },
                    { surfaceForm: '走っていらっしゃる', basicForm: '走る' },
                    { surfaceForm: '聞いていらっしゃる', basicForm: '聞く' },
                    { surfaceForm: '飲んでいらっしゃる', basicForm: '飲む' },
                    { surfaceForm: '泳いでいらっしゃる', basicForm: '泳ぐ' },
                    { surfaceForm: '話していらっしゃる', basicForm: '話す' },
                    { surfaceForm: '待っていらっしゃる', basicForm: '待つ' },
                    { surfaceForm: '言っていらっしゃる', basicForm: '言う' },
                ];
                runTest(verbs, 'いらっしゃる', 2, context);
            });
        });

        describe('progressive form (ておる)', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'しておる', basicForm: 'する' },
                    { surfaceForm: '来ておる', basicForm: '来る' },
                    { surfaceForm: '食べておる', basicForm: '食べる' },
                    { surfaceForm: '走っておる', basicForm: '走る' },
                    { surfaceForm: '聞いておる', basicForm: '聞く' },
                    { surfaceForm: '飲んでおる', basicForm: '飲む' },
                    { surfaceForm: '泳いでおる', basicForm: '泳ぐ' },
                    { surfaceForm: '話しておる', basicForm: '話す' },
                    { surfaceForm: '待っておる', basicForm: '待つ' },
                    { surfaceForm: '言っておる', basicForm: '言う' },
                ];
                runTest(verbs, 'おる', 2, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'しております', basicForm: 'する' },
                    { surfaceForm: '来ております', basicForm: '来る' },
                    { surfaceForm: '食べております', basicForm: '食べる' },
                    { surfaceForm: '走っております', basicForm: '走る' },
                    { surfaceForm: '聞いております', basicForm: '聞く' },
                    { surfaceForm: '飲んでおります', basicForm: '飲む' },
                    { surfaceForm: '泳いでおります', basicForm: '泳ぐ' },
                    { surfaceForm: '話しております', basicForm: '話す' },
                    { surfaceForm: '待っております', basicForm: '待つ' },
                    { surfaceForm: '言っております', basicForm: '言う' },
                ];
                runTest(verbs, 'おる', 2, context);
            });
        });

        describe('～ていく', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'していく', basicForm: 'する' },
                    { surfaceForm: '来ていく', basicForm: '来る' },
                    { surfaceForm: '食べていく', basicForm: '食べる' },
                    { surfaceForm: '走っていく', basicForm: '走る' },
                    { surfaceForm: '聞いていく', basicForm: '聞く' },
                    { surfaceForm: '飲んでいく', basicForm: '飲む' },
                    { surfaceForm: '泳いでいく', basicForm: '泳ぐ' },
                    { surfaceForm: '話していく', basicForm: '話す' },
                    { surfaceForm: '待っていく', basicForm: '待つ' },
                    { surfaceForm: '言っていく', basicForm: '言う' },
                ];
                runTest(verbs, 'いく', 2, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'していきます', basicForm: 'する' },
                    { surfaceForm: '来ていきます', basicForm: '来る' },
                    { surfaceForm: '食べていきます', basicForm: '食べる' },
                    { surfaceForm: '走っていきます', basicForm: '走る' },
                    { surfaceForm: '聞いていきます', basicForm: '聞く' },
                    { surfaceForm: '飲んでいきます', basicForm: '飲む' },
                    { surfaceForm: '泳いでいきます', basicForm: '泳ぐ' },
                    { surfaceForm: '話していきます', basicForm: '話す' },
                    { surfaceForm: '待っていきます', basicForm: '待つ' },
                    { surfaceForm: '言っていきます', basicForm: '言う' },
                ];
                runTest(verbs, 'いく', 2, context);
            });
        });

        describe('～てくる', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'してくる', basicForm: 'する' },
                    { surfaceForm: '来てくる', basicForm: '来る' },
                    { surfaceForm: '食べてくる', basicForm: '食べる' },
                    { surfaceForm: '走ってくる', basicForm: '走る' },
                    { surfaceForm: '聞いてくる', basicForm: '聞く' },
                    { surfaceForm: '飲んでくる', basicForm: '飲む' },
                    { surfaceForm: '泳いでくる', basicForm: '泳ぐ' },
                    { surfaceForm: '話してくる', basicForm: '話す' },
                    { surfaceForm: '待ってくる', basicForm: '待つ' },
                    { surfaceForm: '言ってくる', basicForm: '言う' },
                ];
                runTest(verbs, 'くる', 2, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'してきます', basicForm: 'する' },
                    { surfaceForm: '来てきます', basicForm: '来る' },
                    { surfaceForm: '食べてきます', basicForm: '食べる' },
                    { surfaceForm: '走ってきます', basicForm: '走る' },
                    { surfaceForm: '聞いてきます', basicForm: '聞く' },
                    { surfaceForm: '飲んできます', basicForm: '飲む' },
                    { surfaceForm: '泳いできます', basicForm: '泳ぐ' },
                    { surfaceForm: '話してきます', basicForm: '話す' },
                    { surfaceForm: '待ってきます', basicForm: '待つ' },
                    { surfaceForm: '言ってきます', basicForm: '言う' },
                ];
                runTest(verbs, 'くる', 2, context);
            });
        });

        describe('～てまいる', function () {
            const verbs = [
                { surfaceForm: 'してまいる', basicForm: 'する' },
                { surfaceForm: '来てまいる', basicForm: '来る' },
                { surfaceForm: '食べてまいる', basicForm: '食べる' },
                { surfaceForm: '走ってまいる', basicForm: '走る' },
                { surfaceForm: '聞いてまいる', basicForm: '聞く' },
                { surfaceForm: '飲んでまいる', basicForm: '飲む' },
                { surfaceForm: '泳いでまいる', basicForm: '泳ぐ' },
                { surfaceForm: '話してまいる', basicForm: '話す' },
                { surfaceForm: '待ってまいる', basicForm: '待つ' },
                { surfaceForm: '言ってまいる', basicForm: '言う' },
            ];
            runTest(verbs, 'まいる', 2, context);
        });

        describe('～てくれる', function () {
            const verbs = [
                { surfaceForm: 'してくれる', basicForm: 'する' },
                { surfaceForm: '来てくれる', basicForm: '来る' },
                { surfaceForm: '食べてくれる', basicForm: '食べる' },
                { surfaceForm: '走ってくれる', basicForm: '走る' },
                { surfaceForm: '聞いてくれる', basicForm: '聞く' },
                { surfaceForm: '飲んでくれる', basicForm: '飲む' },
                { surfaceForm: '泳いでくれる', basicForm: '泳ぐ' },
                { surfaceForm: '話してくれる', basicForm: '話す' },
                { surfaceForm: '待ってくれる', basicForm: '待つ' },
                { surfaceForm: '言ってくれる', basicForm: '言う' },
            ];
            runTest(verbs, 'くれる', 2, context);
        });

        describe('～てくださる', function () {
            const verbs = [
                { surfaceForm: 'してくださる', basicForm: 'する' },
                { surfaceForm: '来てくださる', basicForm: '来る' },
                { surfaceForm: '食べてくださる', basicForm: '食べる' },
                { surfaceForm: '走ってくださる', basicForm: '走る' },
                { surfaceForm: '聞いてくださる', basicForm: '聞く' },
                { surfaceForm: '飲んでくださる', basicForm: '飲む' },
                { surfaceForm: '泳いでくださる', basicForm: '泳ぐ' },
                { surfaceForm: '話してくださる', basicForm: '話す' },
                { surfaceForm: '待ってくださる', basicForm: '待つ' },
                { surfaceForm: '言ってくださる', basicForm: '言う' },
            ];
            runTest(verbs, 'くださる', 2, context);
        });

        describe('～てもらう', function () {
            const verbs = [
                { surfaceForm: 'してもらう', basicForm: 'する' },
                { surfaceForm: '来てもらう', basicForm: '来る' },
                { surfaceForm: '食べてもらう', basicForm: '食べる' },
                { surfaceForm: '走ってもらう', basicForm: '走る' },
                { surfaceForm: '聞いてもらう', basicForm: '聞く' },
                { surfaceForm: '飲んでもらう', basicForm: '飲む' },
                { surfaceForm: '泳いでもらう', basicForm: '泳ぐ' },
                { surfaceForm: '話してもらう', basicForm: '話す' },
                { surfaceForm: '待ってもらう', basicForm: '待つ' },
                { surfaceForm: '言ってもらう', basicForm: '言う' },
            ];
            runTest(verbs, 'もらう', 2, context);
        });

        describe('～ていただく', function () {
            const verbs = [
                { surfaceForm: 'していただく', basicForm: 'する' },
                { surfaceForm: '来ていただく', basicForm: '来る' },
                { surfaceForm: '食べていただく', basicForm: '食べる' },
                { surfaceForm: '走っていただく', basicForm: '走る' },
                { surfaceForm: '聞いていただく', basicForm: '聞く' },
                { surfaceForm: '飲んでいただく', basicForm: '飲む' },
                { surfaceForm: '泳いでいただく', basicForm: '泳ぐ' },
                { surfaceForm: '話していただく', basicForm: '話す' },
                { surfaceForm: '待っていただく', basicForm: '待つ' },
                { surfaceForm: '言っていただく', basicForm: '言う' },
            ];
            runTest(verbs, 'いただく', 2, context);
        });

        describe('～てやる', function () {
            const verbs = [
                { surfaceForm: '来てやる', basicForm: '来る' },
                { surfaceForm: '食べてやる', basicForm: '食べる' },
                { surfaceForm: '走ってやる', basicForm: '走る' },
                { surfaceForm: '聞いてやる', basicForm: '聞く' },
                { surfaceForm: '飲んでやる', basicForm: '飲む' },
                { surfaceForm: '泳いでやる', basicForm: '泳ぐ' },
                { surfaceForm: '話してやる', basicForm: '話す' },
                { surfaceForm: '待ってやる', basicForm: '待つ' },
                { surfaceForm: '言ってやる', basicForm: '言う' },
            ];
            runTest(verbs, 'やる', 2, context);
        });

        describe('～てあげる', function () {
            const verbs = [
                { surfaceForm: 'してあげる', basicForm: 'する' },
                { surfaceForm: '来てあげる', basicForm: '来る' },
                { surfaceForm: '食べてあげる', basicForm: '食べる' },
                { surfaceForm: '走ってあげる', basicForm: '走る' },
                { surfaceForm: '聞いてあげる', basicForm: '聞く' },
                { surfaceForm: '飲んであげる', basicForm: '飲む' },
                { surfaceForm: '泳いであげる', basicForm: '泳ぐ' },
                { surfaceForm: '話してあげる', basicForm: '話す' },
                { surfaceForm: '待ってあげる', basicForm: '待つ' },
                { surfaceForm: '言ってあげる', basicForm: '言う' },
            ];
            runTest(verbs, 'あげる', 2, context);
        });

        describe('～しまう', function () {
            const verbs = [
                { surfaceForm: 'してしまう', basicForm: 'する' },
                { surfaceForm: '来てしまう', basicForm: '来る' },
                { surfaceForm: '食べてしまう', basicForm: '食べる' },
                { surfaceForm: '走ってしまう', basicForm: '走る' },
                { surfaceForm: '聞いてしまう', basicForm: '聞く' },
                { surfaceForm: '飲んでしまう', basicForm: '飲む' },
                { surfaceForm: '泳いでしまう', basicForm: '泳ぐ' },
                { surfaceForm: '話してしまう', basicForm: '話す' },
                { surfaceForm: '待ってしまう', basicForm: '待つ' },
                { surfaceForm: '言ってしまう', basicForm: '言う' },
            ];
            runTest(verbs, 'しまう', 2, context);
        });

        describe('～おく', function () {
            const verbs = [
                { surfaceForm: 'しておきます', basicForm: 'する' },
                { surfaceForm: '来ておきます', basicForm: '来る' },
                { surfaceForm: '食べておきます', basicForm: '食べる' },
                { surfaceForm: '走っておきます', basicForm: '走る' },
                { surfaceForm: '聞いておきます', basicForm: '聞く' },
                { surfaceForm: '飲んでおきます', basicForm: '飲む' },
                { surfaceForm: '泳いでおきます', basicForm: '泳ぐ' },
                { surfaceForm: '話しておきます', basicForm: '話す' },
                { surfaceForm: '待っておきます', basicForm: '待つ' },
                { surfaceForm: '言っておきます', basicForm: '言う' },
            ];
            runTest(verbs, 'おく', 2, context);
        });

        describe('～てみる', function () {
            const verbs = [
                { surfaceForm: 'してみる', basicForm: 'する' },
                { surfaceForm: '来てみる', basicForm: '来る' },
                { surfaceForm: '食べてみる', basicForm: '食べる' },
                { surfaceForm: '走ってみる', basicForm: '走る' },
                { surfaceForm: '聞いてみる', basicForm: '聞く' },
                { surfaceForm: '飲んでみる', basicForm: '飲む' },
                { surfaceForm: '泳いでみる', basicForm: '泳ぐ' },
                { surfaceForm: '話してみる', basicForm: '話す' },
                { surfaceForm: '待ってみる', basicForm: '待つ' },
                { surfaceForm: '言ってみる', basicForm: '言う' },
            ];
            runTest(verbs, 'みる', 2, context);
        });

        describe('～てある', function () {
            const verbs = [
                { surfaceForm: 'してある', basicForm: 'する' },
                { surfaceForm: '来てある', basicForm: '来る' },
                { surfaceForm: '食べてある', basicForm: '食べる' },
                { surfaceForm: '走ってある', basicForm: '走る' },
                { surfaceForm: '聞いてある', basicForm: '聞く' },
                { surfaceForm: '飲んである', basicForm: '飲む' },
                { surfaceForm: '泳いである', basicForm: '泳ぐ' },
                { surfaceForm: '話してある', basicForm: '話す' },
                { surfaceForm: '待ってある', basicForm: '待つ' },
                { surfaceForm: '言ってある', basicForm: '言う' },
            ];
            runTest(verbs, 'ある', 2, context);
        });

        describe('～てござる', function () {
            const verbs = [
                { surfaceForm: 'してござる', basicForm: 'する' },
                { surfaceForm: '来てござる', basicForm: '来る' },
                { surfaceForm: '食べてござる', basicForm: '食べる' },
                { surfaceForm: '走ってござる', basicForm: '走る' },
                { surfaceForm: '聞いてござる', basicForm: '聞く' },
                { surfaceForm: '飲んでござる', basicForm: '飲む' },
                { surfaceForm: '泳いでござる', basicForm: '泳ぐ' },
                { surfaceForm: '話してござる', basicForm: '話す' },
                { surfaceForm: '待ってござる', basicForm: '待つ' },
                { surfaceForm: '言ってござる', basicForm: '言う' },
            ];
            runTest(verbs, 'ござる', 2, context);
        });

        describe('～てみせる', function () {
            const verbs = [
                { surfaceForm: 'してみせる', basicForm: 'する' },
                { surfaceForm: '来てみせる', basicForm: '来る' },
                { surfaceForm: '食べてみせる', basicForm: '食べる' },
                { surfaceForm: '走ってみせる', basicForm: '走る' },
                { surfaceForm: '聞いてみせる', basicForm: '聞く' },
                { surfaceForm: '飲んでみせる', basicForm: '飲む' },
                { surfaceForm: '泳いでみせる', basicForm: '泳ぐ' },
                { surfaceForm: '話してみせる', basicForm: '話す' },
                { surfaceForm: '待ってみせる', basicForm: '待つ' },
                { surfaceForm: '言ってみせる', basicForm: '言う' },
            ];
            runTest(verbs, 'みせる', 2, context);
        });
    });
}