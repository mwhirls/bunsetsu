import { assert } from "chai";
import { TestContext } from "./context.js";
import * as bunsetsu from "../src/index.js"

type TestCase = {
    surfaceForm: string;
    baseForm: string;
}

function runTest(testCases: TestCase[], subsidiaryVerb: string, subsidiaryIndex: number, context: TestContext) {
    for (const expected of testCases) {
        it(`should identify ${expected.surfaceForm} as one word`, function () {
            assert.ok(context.segmenter);
            const words = context.segmenter!.segmentAsWords(expected.surfaceForm);
            assert.equal(words.length, 1);

            const word = words[0];
            assert.equal(word.pos, bunsetsu.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, expected.surfaceForm);
            assert.equal(word.baseForm, expected.baseForm);

            assert.ok(word.tokens.length > subsidiaryIndex);
            const stem = word.tokens[0];
            assert.equal(stem.baseForm, expected.baseForm);

            const subsidiary = word.tokens[subsidiaryIndex];
            assert.equal(subsidiary.baseForm, subsidiaryVerb);
        });
    }
}

export function runTestSuite(context: TestContext) {
    // https://japanese.stackexchange.com/questions/18952/what-is-a-subsidiary-verb
    describe('subsidiary verbs', async function () {
        describe('progressive form (ている)', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'している', baseForm: 'する' },
                    { surfaceForm: '来ている', baseForm: '来る' },
                    { surfaceForm: '食べている', baseForm: '食べる' },
                    { surfaceForm: '走っている', baseForm: '走る' },
                    { surfaceForm: '聞いている', baseForm: '聞く' },
                    { surfaceForm: '飲んでいる', baseForm: '飲む' },
                    { surfaceForm: '泳いでいる', baseForm: '泳ぐ' },
                    { surfaceForm: '話している', baseForm: '話す' },
                    { surfaceForm: '待っている', baseForm: '待つ' },
                    { surfaceForm: '言っている', baseForm: '言う' },
                ];
                runTest(verbs, 'いる', 2, context);
            });

            describe('as contracted plain form', function () {
                const verbsTeiru = [
                    { surfaceForm: 'してる', baseForm: 'する' },
                    { surfaceForm: '来てる', baseForm: '来る' },
                    { surfaceForm: '食べてる', baseForm: '食べる' },
                    { surfaceForm: '走ってる', baseForm: '走る' },
                    { surfaceForm: '聞いてる', baseForm: '聞く' },
                    { surfaceForm: '話してる', baseForm: '話す' },
                    { surfaceForm: '待ってる', baseForm: '待つ' },
                    { surfaceForm: '言ってる', baseForm: '言う' },
                ];
                const verbsDeiru = [
                    { surfaceForm: '飲んでる', baseForm: '飲む' },
                    { surfaceForm: '泳いでる', baseForm: '泳ぐ' },
                ];
                runTest(verbsTeiru, 'てる', 1, context);
                runTest(verbsDeiru, 'でる', 1, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'しています', baseForm: 'する' },
                    { surfaceForm: '来ています', baseForm: '来る' },
                    { surfaceForm: '食べています', baseForm: '食べる' },
                    { surfaceForm: '走っています', baseForm: '走る' },
                    { surfaceForm: '聞いています', baseForm: '聞く' },
                    { surfaceForm: '飲んでいます', baseForm: '飲む' },
                    { surfaceForm: '泳いでいます', baseForm: '泳ぐ' },
                    { surfaceForm: '話しています', baseForm: '話す' },
                    { surfaceForm: '待っています', baseForm: '待つ' },
                    { surfaceForm: '言っています', baseForm: '言う' },
                ];
                runTest(verbs, 'いる', 2, context);
            });

            describe('as contracted polite form', function () {
                const verbs = [
                    { surfaceForm: 'してます', baseForm: 'する' },
                    { surfaceForm: '来てます', baseForm: '来る' },
                    { surfaceForm: '食べてます', baseForm: '食べる' },
                    { surfaceForm: '走ってます', baseForm: '走る' },
                    { surfaceForm: '聞いてます', baseForm: '聞く' },
                    { surfaceForm: '飲んでます', baseForm: '飲む' },
                    { surfaceForm: '泳いでます', baseForm: '泳ぐ' },
                    { surfaceForm: '話してます', baseForm: '話す' },
                    { surfaceForm: '待ってます', baseForm: '待つ' },
                    { surfaceForm: '言ってます', baseForm: '言う' },
                ];
                runTest(verbs, 'ます', 2, context);
            });

            describe('as honorific form', function () {
                const verbs = [
                    { surfaceForm: 'していらっしゃる', baseForm: 'する' },
                    { surfaceForm: '来ていらっしゃる', baseForm: '来る' },
                    { surfaceForm: '食べていらっしゃる', baseForm: '食べる' },
                    { surfaceForm: '走っていらっしゃる', baseForm: '走る' },
                    { surfaceForm: '聞いていらっしゃる', baseForm: '聞く' },
                    { surfaceForm: '飲んでいらっしゃる', baseForm: '飲む' },
                    { surfaceForm: '泳いでいらっしゃる', baseForm: '泳ぐ' },
                    { surfaceForm: '話していらっしゃる', baseForm: '話す' },
                    { surfaceForm: '待っていらっしゃる', baseForm: '待つ' },
                    { surfaceForm: '言っていらっしゃる', baseForm: '言う' },
                ];
                runTest(verbs, 'いらっしゃる', 2, context);
            });

            describe('as honorific form (polite)', function () {
                const verbs = [
                    { surfaceForm: 'していらっしゃる', baseForm: 'する' },
                    { surfaceForm: '来ていらっしゃる', baseForm: '来る' },
                    { surfaceForm: '食べていらっしゃる', baseForm: '食べる' },
                    { surfaceForm: '走っていらっしゃる', baseForm: '走る' },
                    { surfaceForm: '聞いていらっしゃる', baseForm: '聞く' },
                    { surfaceForm: '飲んでいらっしゃる', baseForm: '飲む' },
                    { surfaceForm: '泳いでいらっしゃる', baseForm: '泳ぐ' },
                    { surfaceForm: '話していらっしゃる', baseForm: '話す' },
                    { surfaceForm: '待っていらっしゃる', baseForm: '待つ' },
                    { surfaceForm: '言っていらっしゃる', baseForm: '言う' },
                ];
                runTest(verbs, 'いらっしゃる', 2, context);
            });
        });

        describe('progressive form (ておる)', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'しておる', baseForm: 'する' },
                    { surfaceForm: '来ておる', baseForm: '来る' },
                    { surfaceForm: '食べておる', baseForm: '食べる' },
                    { surfaceForm: '走っておる', baseForm: '走る' },
                    { surfaceForm: '聞いておる', baseForm: '聞く' },
                    { surfaceForm: '飲んでおる', baseForm: '飲む' },
                    { surfaceForm: '泳いでおる', baseForm: '泳ぐ' },
                    { surfaceForm: '話しておる', baseForm: '話す' },
                    { surfaceForm: '待っておる', baseForm: '待つ' },
                    { surfaceForm: '言っておる', baseForm: '言う' },
                ];
                runTest(verbs, 'おる', 2, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'しております', baseForm: 'する' },
                    { surfaceForm: '来ております', baseForm: '来る' },
                    { surfaceForm: '食べております', baseForm: '食べる' },
                    { surfaceForm: '走っております', baseForm: '走る' },
                    { surfaceForm: '聞いております', baseForm: '聞く' },
                    { surfaceForm: '飲んでおります', baseForm: '飲む' },
                    { surfaceForm: '泳いでおります', baseForm: '泳ぐ' },
                    { surfaceForm: '話しております', baseForm: '話す' },
                    { surfaceForm: '待っております', baseForm: '待つ' },
                    { surfaceForm: '言っております', baseForm: '言う' },
                ];
                runTest(verbs, 'おる', 2, context);
            });
        });

        describe('～ていく', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'していく', baseForm: 'する' },
                    { surfaceForm: '来ていく', baseForm: '来る' },
                    { surfaceForm: '食べていく', baseForm: '食べる' },
                    { surfaceForm: '走っていく', baseForm: '走る' },
                    { surfaceForm: '聞いていく', baseForm: '聞く' },
                    { surfaceForm: '飲んでいく', baseForm: '飲む' },
                    { surfaceForm: '泳いでいく', baseForm: '泳ぐ' },
                    { surfaceForm: '話していく', baseForm: '話す' },
                    { surfaceForm: '待っていく', baseForm: '待つ' },
                    { surfaceForm: '言っていく', baseForm: '言う' },
                ];
                runTest(verbs, 'いく', 2, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'していきます', baseForm: 'する' },
                    { surfaceForm: '来ていきます', baseForm: '来る' },
                    { surfaceForm: '食べていきます', baseForm: '食べる' },
                    { surfaceForm: '走っていきます', baseForm: '走る' },
                    { surfaceForm: '聞いていきます', baseForm: '聞く' },
                    { surfaceForm: '飲んでいきます', baseForm: '飲む' },
                    { surfaceForm: '泳いでいきます', baseForm: '泳ぐ' },
                    { surfaceForm: '話していきます', baseForm: '話す' },
                    { surfaceForm: '待っていきます', baseForm: '待つ' },
                    { surfaceForm: '言っていきます', baseForm: '言う' },
                ];
                runTest(verbs, 'いく', 2, context);
            });
        });

        describe('～てくる', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'してくる', baseForm: 'する' },
                    { surfaceForm: '来てくる', baseForm: '来る' },
                    { surfaceForm: '食べてくる', baseForm: '食べる' },
                    { surfaceForm: '走ってくる', baseForm: '走る' },
                    { surfaceForm: '聞いてくる', baseForm: '聞く' },
                    { surfaceForm: '飲んでくる', baseForm: '飲む' },
                    { surfaceForm: '泳いでくる', baseForm: '泳ぐ' },
                    { surfaceForm: '話してくる', baseForm: '話す' },
                    { surfaceForm: '待ってくる', baseForm: '待つ' },
                    { surfaceForm: '言ってくる', baseForm: '言う' },
                ];
                runTest(verbs, 'くる', 2, context);
            });

            describe('as polite form', function () {
                const verbs = [
                    { surfaceForm: 'してきます', baseForm: 'する' },
                    { surfaceForm: '来てきます', baseForm: '来る' },
                    { surfaceForm: '食べてきます', baseForm: '食べる' },
                    { surfaceForm: '走ってきます', baseForm: '走る' },
                    { surfaceForm: '聞いてきます', baseForm: '聞く' },
                    { surfaceForm: '飲んできます', baseForm: '飲む' },
                    { surfaceForm: '泳いできます', baseForm: '泳ぐ' },
                    { surfaceForm: '話してきます', baseForm: '話す' },
                    { surfaceForm: '待ってきます', baseForm: '待つ' },
                    { surfaceForm: '言ってきます', baseForm: '言う' },
                ];
                runTest(verbs, 'くる', 2, context);
            });

            describe('as past form', function () {
                const verbs = [
                    { surfaceForm: 'してきた', baseForm: 'する' },
                    { surfaceForm: '来てきた', baseForm: '来る' },
                    { surfaceForm: '食べてきた', baseForm: '食べる' },
                    { surfaceForm: '走ってきた', baseForm: '走る' },
                    { surfaceForm: '聞いてきた', baseForm: '聞く' },
                    { surfaceForm: '飲んできた', baseForm: '飲む' },
                    { surfaceForm: '泳いできた', baseForm: '泳ぐ' },
                    { surfaceForm: '話してきた', baseForm: '話す' },
                    { surfaceForm: '待ってきた', baseForm: '待つ' },
                    { surfaceForm: '言ってきた', baseForm: '言う' },
                ];
                runTest(verbs, 'くる', 2, context);
            });
        });

        describe('～てまいる', function () {
            const verbs = [
                { surfaceForm: 'してまいる', baseForm: 'する' },
                { surfaceForm: '来てまいる', baseForm: '来る' },
                { surfaceForm: '食べてまいる', baseForm: '食べる' },
                { surfaceForm: '走ってまいる', baseForm: '走る' },
                { surfaceForm: '聞いてまいる', baseForm: '聞く' },
                { surfaceForm: '飲んでまいる', baseForm: '飲む' },
                { surfaceForm: '泳いでまいる', baseForm: '泳ぐ' },
                { surfaceForm: '話してまいる', baseForm: '話す' },
                { surfaceForm: '待ってまいる', baseForm: '待つ' },
                { surfaceForm: '言ってまいる', baseForm: '言う' },
            ];
            runTest(verbs, 'まいる', 2, context);
        });

        describe('～てくれる', function () {
            const verbs = [
                { surfaceForm: 'してくれる', baseForm: 'する' },
                { surfaceForm: '来てくれる', baseForm: '来る' },
                { surfaceForm: '食べてくれる', baseForm: '食べる' },
                { surfaceForm: '走ってくれる', baseForm: '走る' },
                { surfaceForm: '聞いてくれる', baseForm: '聞く' },
                { surfaceForm: '飲んでくれる', baseForm: '飲む' },
                { surfaceForm: '泳いでくれる', baseForm: '泳ぐ' },
                { surfaceForm: '話してくれる', baseForm: '話す' },
                { surfaceForm: '待ってくれる', baseForm: '待つ' },
                { surfaceForm: '言ってくれる', baseForm: '言う' },
            ];
            runTest(verbs, 'くれる', 2, context);
        });

        describe('～てくださる', function () {
            const verbs = [
                { surfaceForm: 'してくださる', baseForm: 'する' },
                { surfaceForm: '来てくださる', baseForm: '来る' },
                { surfaceForm: '食べてくださる', baseForm: '食べる' },
                { surfaceForm: '走ってくださる', baseForm: '走る' },
                { surfaceForm: '聞いてくださる', baseForm: '聞く' },
                { surfaceForm: '飲んでくださる', baseForm: '飲む' },
                { surfaceForm: '泳いでくださる', baseForm: '泳ぐ' },
                { surfaceForm: '話してくださる', baseForm: '話す' },
                { surfaceForm: '待ってくださる', baseForm: '待つ' },
                { surfaceForm: '言ってくださる', baseForm: '言う' },
            ];
            runTest(verbs, 'くださる', 2, context);
        });

        describe('～てもらう', function () {
            const verbs = [
                { surfaceForm: 'してもらう', baseForm: 'する' },
                { surfaceForm: '来てもらう', baseForm: '来る' },
                { surfaceForm: '食べてもらう', baseForm: '食べる' },
                { surfaceForm: '走ってもらう', baseForm: '走る' },
                { surfaceForm: '聞いてもらう', baseForm: '聞く' },
                { surfaceForm: '飲んでもらう', baseForm: '飲む' },
                { surfaceForm: '泳いでもらう', baseForm: '泳ぐ' },
                { surfaceForm: '話してもらう', baseForm: '話す' },
                { surfaceForm: '待ってもらう', baseForm: '待つ' },
                { surfaceForm: '言ってもらう', baseForm: '言う' },
            ];
            runTest(verbs, 'もらう', 2, context);
        });

        describe('～ていただく', function () {
            const verbs = [
                { surfaceForm: 'していただく', baseForm: 'する' },
                { surfaceForm: '来ていただく', baseForm: '来る' },
                { surfaceForm: '食べていただく', baseForm: '食べる' },
                { surfaceForm: '走っていただく', baseForm: '走る' },
                { surfaceForm: '聞いていただく', baseForm: '聞く' },
                { surfaceForm: '飲んでいただく', baseForm: '飲む' },
                { surfaceForm: '泳いでいただく', baseForm: '泳ぐ' },
                { surfaceForm: '話していただく', baseForm: '話す' },
                { surfaceForm: '待っていただく', baseForm: '待つ' },
                { surfaceForm: '言っていただく', baseForm: '言う' },
            ];
            runTest(verbs, 'いただく', 2, context);
        });

        describe('～てやる', function () {
            const verbs = [
                { surfaceForm: '来てやる', baseForm: '来る' },
                { surfaceForm: '食べてやる', baseForm: '食べる' },
                { surfaceForm: '走ってやる', baseForm: '走る' },
                { surfaceForm: '聞いてやる', baseForm: '聞く' },
                { surfaceForm: '飲んでやる', baseForm: '飲む' },
                { surfaceForm: '泳いでやる', baseForm: '泳ぐ' },
                { surfaceForm: '話してやる', baseForm: '話す' },
                { surfaceForm: '待ってやる', baseForm: '待つ' },
                { surfaceForm: '言ってやる', baseForm: '言う' },
            ];
            runTest(verbs, 'やる', 2, context);
        });

        describe('～てあげる', function () {
            const verbs = [
                { surfaceForm: 'してあげる', baseForm: 'する' },
                { surfaceForm: '来てあげる', baseForm: '来る' },
                { surfaceForm: '食べてあげる', baseForm: '食べる' },
                { surfaceForm: '走ってあげる', baseForm: '走る' },
                { surfaceForm: '聞いてあげる', baseForm: '聞く' },
                { surfaceForm: '飲んであげる', baseForm: '飲む' },
                { surfaceForm: '泳いであげる', baseForm: '泳ぐ' },
                { surfaceForm: '話してあげる', baseForm: '話す' },
                { surfaceForm: '待ってあげる', baseForm: '待つ' },
                { surfaceForm: '言ってあげる', baseForm: '言う' },
            ];
            runTest(verbs, 'あげる', 2, context);
        });

        describe('～しまう', function () {
            const verbs = [
                { surfaceForm: 'してしまう', baseForm: 'する' },
                { surfaceForm: '来てしまう', baseForm: '来る' },
                { surfaceForm: '食べてしまう', baseForm: '食べる' },
                { surfaceForm: '走ってしまう', baseForm: '走る' },
                { surfaceForm: '聞いてしまう', baseForm: '聞く' },
                { surfaceForm: '飲んでしまう', baseForm: '飲む' },
                { surfaceForm: '泳いでしまう', baseForm: '泳ぐ' },
                { surfaceForm: '話してしまう', baseForm: '話す' },
                { surfaceForm: '待ってしまう', baseForm: '待つ' },
                { surfaceForm: '言ってしまう', baseForm: '言う' },
            ];
            runTest(verbs, 'しまう', 2, context);
        });

        describe('～おく', function () {
            const verbs = [
                { surfaceForm: 'しておきます', baseForm: 'する' },
                { surfaceForm: '来ておきます', baseForm: '来る' },
                { surfaceForm: '食べておきます', baseForm: '食べる' },
                { surfaceForm: '走っておきます', baseForm: '走る' },
                { surfaceForm: '聞いておきます', baseForm: '聞く' },
                { surfaceForm: '飲んでおきます', baseForm: '飲む' },
                { surfaceForm: '泳いでおきます', baseForm: '泳ぐ' },
                { surfaceForm: '話しておきます', baseForm: '話す' },
                { surfaceForm: '待っておきます', baseForm: '待つ' },
                { surfaceForm: '言っておきます', baseForm: '言う' },
            ];
            runTest(verbs, 'おく', 2, context);
        });

        describe('～てみる', function () {
            describe('as plain form', function () {
                const verbs = [
                    { surfaceForm: 'してみる', baseForm: 'する' },
                    { surfaceForm: '来てみる', baseForm: '来る' },
                    { surfaceForm: '食べてみる', baseForm: '食べる' },
                    { surfaceForm: '走ってみる', baseForm: '走る' },
                    { surfaceForm: '聞いてみる', baseForm: '聞く' },
                    { surfaceForm: '飲んでみる', baseForm: '飲む' },
                    { surfaceForm: '泳いでみる', baseForm: '泳ぐ' },
                    { surfaceForm: '話してみる', baseForm: '話す' },
                    { surfaceForm: '待ってみる', baseForm: '待つ' },
                    { surfaceForm: '言ってみる', baseForm: '言う' },
                ];
                runTest(verbs, 'みる', 2, context);
            });

            describe('as conditional form', function () {
                const verbs = [
                    { surfaceForm: 'してみれば', baseForm: 'する' },
                    { surfaceForm: '来てみれば', baseForm: '来る' },
                    { surfaceForm: '食べてみれば', baseForm: '食べる' },
                    { surfaceForm: '走ってみれば', baseForm: '走る' },
                    { surfaceForm: '聞いてみれば', baseForm: '聞く' },
                    { surfaceForm: '飲んでみれば', baseForm: '飲む' },
                    { surfaceForm: '泳いでみれば', baseForm: '泳ぐ' },
                    { surfaceForm: '話してみれば', baseForm: '話す' },
                    { surfaceForm: '待ってみれば', baseForm: '待つ' },
                    { surfaceForm: '言ってみれば', baseForm: '言う' },
                ];
                runTest(verbs, 'みる', 2, context);
            });
        });

        describe('～てある', function () {
            const verbs = [
                { surfaceForm: 'してある', baseForm: 'する' },
                { surfaceForm: '来てある', baseForm: '来る' },
                { surfaceForm: '食べてある', baseForm: '食べる' },
                { surfaceForm: '走ってある', baseForm: '走る' },
                { surfaceForm: '聞いてある', baseForm: '聞く' },
                { surfaceForm: '飲んである', baseForm: '飲む' },
                { surfaceForm: '泳いである', baseForm: '泳ぐ' },
                { surfaceForm: '話してある', baseForm: '話す' },
                { surfaceForm: '待ってある', baseForm: '待つ' },
                { surfaceForm: '言ってある', baseForm: '言う' },
            ];
            runTest(verbs, 'ある', 2, context);
        });

        describe('～てござる', function () {
            const verbs = [
                { surfaceForm: 'してござる', baseForm: 'する' },
                { surfaceForm: '来てござる', baseForm: '来る' },
                { surfaceForm: '食べてござる', baseForm: '食べる' },
                { surfaceForm: '走ってござる', baseForm: '走る' },
                { surfaceForm: '聞いてござる', baseForm: '聞く' },
                { surfaceForm: '飲んでござる', baseForm: '飲む' },
                { surfaceForm: '泳いでござる', baseForm: '泳ぐ' },
                { surfaceForm: '話してござる', baseForm: '話す' },
                { surfaceForm: '待ってござる', baseForm: '待つ' },
                { surfaceForm: '言ってござる', baseForm: '言う' },
            ];
            runTest(verbs, 'ござる', 2, context);
        });

        describe('～てみせる', function () {
            const verbs = [
                { surfaceForm: 'してみせる', baseForm: 'する' },
                { surfaceForm: '来てみせる', baseForm: '来る' },
                { surfaceForm: '食べてみせる', baseForm: '食べる' },
                { surfaceForm: '走ってみせる', baseForm: '走る' },
                { surfaceForm: '聞いてみせる', baseForm: '聞く' },
                { surfaceForm: '飲んでみせる', baseForm: '飲む' },
                { surfaceForm: '泳いでみせる', baseForm: '泳ぐ' },
                { surfaceForm: '話してみせる', baseForm: '話す' },
                { surfaceForm: '待ってみせる', baseForm: '待つ' },
                { surfaceForm: '言ってみせる', baseForm: '言う' },
            ];
            runTest(verbs, 'みせる', 2, context);
        });
    });
}