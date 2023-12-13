import * as bunsetsu from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.iAdjective', function () {
    const runTestCase = (testCases: { phrase: string, basicForm: string, reading: string, auxillary?: string, auxillaryIndex?: number }[], conjugatedForm: bunsetsu.ConjugatedForm) => {
      for (const expected of testCases) {
        it(`should identify ${expected.phrase} as one word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(expected.phrase);
          assert.equal(words.length, 1);

          const word = words[0];
          assert.equal(word.pos(), bunsetsu.PartOfSpeech.iAdjective);
          assert.equal(word.surfaceForm(), expected.phrase);
          assert.equal(word.basicForm(), expected.basicForm);
          assert.equal(word.reading(), expected.reading);

          assert.ok(word.tokens.length >= 1);
          const token = word.tokens[0];
          assert.ok(token.detail);
          assert.equal(token.detail.type, bunsetsu.DetailType.ConjugationDetail);
          const detail = token.detail as bunsetsu.ConjugationDetail;
          assert.equal(detail.conjugatedForm, conjugatedForm);

          if (expected.auxillary && expected.auxillaryIndex) {
            const auxIdx = expected.auxillaryIndex ?? 1;
            assert.ok(word.tokens.length > auxIdx);
            assert.equal(word.tokens[auxIdx].basicForm, expected.auxillary);
          }
        });
      }
    };

    describe('garu-form', function () {
      describe('as is', function () {
        const adjectives = [
          { phrase: '嬉し', basicForm: "嬉しい", reading: 'ウレシ' },
          { phrase: '早', basicForm: '早い', reading: 'ハヤ' },
        ];
        runTestCase(adjectives, bunsetsu.ConjugatedForm.GaruConjunction);
      });

      describe('with auxillary verb', function () {
        const adjectives = [
          { phrase: '嬉しがる', basicForm: "嬉しい", reading: 'ウレシガル', auxillary: 'がる' },
          { phrase: '早すぎる', basicForm: '早い', reading: 'ハヤスギル', auxillary: 'すぎる' },
        ];
        runTestCase(adjectives, bunsetsu.ConjugatedForm.GaruConjunction);
      });

      describe('with suffix', function () {
        const adjectives = [
          { phrase: '悲しさ', basicForm: '悲しい', reading: 'カナシサ', auxillary: 'さ' },
          { phrase: '虚しそう', basicForm: '虚しい', reading: 'ムナシソウ', auxillary: 'そう' },
        ];
        runTestCase(adjectives, bunsetsu.ConjugatedForm.GaruConjunction);
      });
    });

    describe('conditional form', function () {
      const adjectives = [
        { phrase: '美味しければ', basicForm: "美味しい", reading: 'オイシケレバ' },
        { phrase: '早ければ', basicForm: "早い", reading: 'ハヤケレバ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ConditionalForm);
    });

    describe('contracted conditional form (1)', function () {
      const adjectives = [
        { phrase: '美味しけりゃ', basicForm: "美味しい", reading: 'オイシケリャ' },
        { phrase: '早けりゃ', basicForm: "早い", reading: 'ハヤケリャ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ConditionalContraction1);
    });

    describe('contracted conditional form (2)', function () {
      const adjectives = [
        { phrase: '美味しきゃ', basicForm: "美味しい", reading: 'オイシキャ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { phrase: '早きゃ', basicForm: "早い", reading: 'ハヤキャ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ConditionalContraction2);
    });

    describe('plain form', function () {
      const adjectives = [
        { phrase: '美味しい', basicForm: "美味しい", reading: 'オイシイ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { phrase: '早い', basicForm: "早い", reading: 'ハヤイ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.PlainForm);
    });

    describe('indeclinable nominal', function () {
      const adjectives = [
        { phrase: '美しき', basicForm: "美しい", reading: 'ウツクシキ' },
        { phrase: '親しき', basicForm: "親しい", reading: 'シタシキ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.IndeclinableNominalConjunction);
    });

    describe('classical plain form', function () {
      const adjectives = [
        { phrase: '赤し', basicForm: "赤い", reading: 'アカシ', stemSurfaceForm: '赤', stemReading: 'アカ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ClassicalPlainForm);
    });

    describe('irrealis u-form', function () {
      const adjectives = [
        { phrase: '高かろう', basicForm: "高い", reading: 'タカカロウ', auxillary: 'う' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.IrrealisUConjunction);
    });


    describe('irrealis nu-form', function () {
      const adjectives = [
        { phrase: '高からぬ', basicForm: "高い", reading: 'タカカラヌ', auxillary: 'ぬ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.IrrealisNuConjunction);
    });

    describe('imperative form', function () {
      const adjectives = [
        { phrase: '多かれ', basicForm: "多い", reading: 'オオカレ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ImperativeE);
    });

    describe('gozai-form', function () {
      const adjectives = [
        { phrase: '暑うございます', basicForm: "暑い", reading: 'アツウゴザイマス', auxillary: 'ござる' },
        { phrase: '苦しゅうない', basicForm: "苦しい", reading: 'クルシュウナイ', auxillary: 'ない' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.GozaiConjunction);
    });

    describe('past form', function () {
      const adjectives = [
        { phrase: 'うるさかった', basicForm: "うるさい", reading: "ウルサカッタ", stemSurfaceForm: 'うるさ', stemReading: 'ウルサ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TaConjunction);
    });

    describe('te-form', function () {
      const adjectives = [
        { phrase: '女々しくて', basicForm: "女々しい", reading: 'メメシクテ' },
        { phrase: '寒くて', basicForm: "寒い", reading: 'サムクテ' },

      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('adverbial form', function () {
      const adjectives = [
        { phrase: 'うるさく', basicForm: "うるさい", reading: "ウルサク" },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('nai-form', function () {
      const adjectives = [
        { phrase: '芳しくない', basicForm: "芳しい", reading: 'カンバシクナイ', auxillary: 'ない', auxillaryIndex: 1 },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });
  });
}