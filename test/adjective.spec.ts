import * as bunsetsu from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

type AdjectiveTestCase = {
  surfaceForm: string;
  baseForm: string;
  reading: string;
  auxillary?: string;
  auxillaryIndex?: number;
  phrase?: string;
}

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.iAdjective', function () {
    const runTestCase = (testCases: AdjectiveTestCase[], conjugatedForm: bunsetsu.ConjugatedForm) => {
      for (const expected of testCases) {
        const phrase = expected.phrase ?? expected.surfaceForm;
        it(`should identify ${expected.phrase} as one word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(phrase);
          assert.ok(words.length >= 1);

          const word = words[0];
          assert.equal(word.pos, bunsetsu.PartOfSpeech.iAdjective);
          assert.equal(word.surfaceForm, expected.surfaceForm);
          assert.equal(word.baseForm, expected.baseForm);
          assert.equal(word.reading, expected.reading);

          assert.ok(word.tokens.length >= 1);
          const token = word.tokens[0];
          assert.ok(token.detail);
          assert.equal(token.detail.type, bunsetsu.DetailType.ConjugationDetail);
          const detail = token.detail as bunsetsu.ConjugationDetail;
          assert.equal(detail.conjugatedForm, conjugatedForm);

          if (expected.auxillary && expected.auxillaryIndex) {
            const auxIdx = expected.auxillaryIndex ?? 1;
            assert.ok(word.tokens.length > auxIdx);
            assert.equal(word.tokens[auxIdx].baseForm, expected.auxillary);
          }
        });
      }
    };

    describe('garu-form', function () {
      describe('as is', function () {
        const adjectives = [
          { surfaceForm: '嬉し', baseForm: "嬉しい", reading: 'ウレシ' },
          { surfaceForm: '早', baseForm: '早い', reading: 'ハヤ' },
        ];
        runTestCase(adjectives, bunsetsu.ConjugatedForm.GaruConjunction);
      });

      describe('with auxillary verb', function () {
        const adjectives = [
          { surfaceForm: '嬉しがる', baseForm: "嬉しい", reading: 'ウレシガル', auxillary: 'がる' },
          { surfaceForm: '早すぎる', baseForm: '早い', reading: 'ハヤスギル', auxillary: 'すぎる' },
        ];
        runTestCase(adjectives, bunsetsu.ConjugatedForm.GaruConjunction);
      });

      describe('with suffix', function () {
        const adjectives = [
          { surfaceForm: '悲しさ', baseForm: '悲しい', reading: 'カナシサ', auxillary: 'さ' },
          { surfaceForm: '虚しそう', baseForm: '虚しい', reading: 'ムナシソウ', auxillary: 'そう' },
        ];
        runTestCase(adjectives, bunsetsu.ConjugatedForm.GaruConjunction);
      });
    });

    describe('conditional form', function () {
      const adjectives = [
        { surfaceForm: '美味しければ', baseForm: "美味しい", reading: 'オイシケレバ' },
        { surfaceForm: '早ければ', baseForm: "早い", reading: 'ハヤケレバ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ConditionalForm);
    });

    describe('contracted conditional form (1)', function () {
      const adjectives = [
        { surfaceForm: '美味しけりゃ', baseForm: "美味しい", reading: 'オイシケリャ' },
        { surfaceForm: '早けりゃ', baseForm: "早い", reading: 'ハヤケリャ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ConditionalContraction1);
    });

    describe('contracted conditional form (2)', function () {
      const adjectives = [
        { surfaceForm: '美味しきゃ', baseForm: "美味しい", reading: 'オイシキャ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { surfaceForm: '早きゃ', baseForm: "早い", reading: 'ハヤキャ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ConditionalContraction2);
    });

    describe('plain form', function () {
      const adjectives = [
        { surfaceForm: '美味しい', baseForm: "美味しい", reading: 'オイシイ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { surfaceForm: '早い', baseForm: "早い", reading: 'ハヤイ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.PlainForm);
    });

    describe('indeclinable nominal', function () {
      const adjectives = [
        { surfaceForm: '美しき', baseForm: "美しい", reading: 'ウツクシキ' },
        { surfaceForm: '親しき', baseForm: "親しい", reading: 'シタシキ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.IndeclinableNominalConjunction);
    });

    describe('classical plain form', function () {
      const adjectives = [
        { surfaceForm: '赤し', baseForm: "赤い", reading: 'アカシ', stemSurfaceForm: '赤', stemReading: 'アカ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ClassicalPlainForm);
    });

    describe('irrealis u-form', function () {
      const adjectives = [
        { surfaceForm: '高かろう', baseForm: "高い", reading: 'タカカロウ', auxillary: 'う' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.IrrealisUConjunction);
    });


    describe('irrealis nu-form', function () {
      const adjectives = [
        { surfaceForm: '高からぬ', baseForm: "高い", reading: 'タカカラヌ', auxillary: 'ぬ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.IrrealisNuConjunction);
    });

    describe('imperative form', function () {
      const adjectives = [
        { surfaceForm: '多かれ', baseForm: "多い", reading: 'オオカレ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.ImperativeE);
    });

    describe('gozai-form', function () {
      const adjectives = [
        { surfaceForm: '暑うございます', baseForm: "暑い", reading: 'アツウゴザイマス', auxillary: 'ござる' },
        { surfaceForm: '苦しゅうない', baseForm: "苦しい", reading: 'クルシュウナイ', auxillary: 'ない' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.GozaiConjunction);
    });

    describe('past form', function () {
      const adjectives = [
        { surfaceForm: 'うるさかった', baseForm: "うるさい", reading: "ウルサカッタ", stemSurfaceForm: 'うるさ', stemReading: 'ウルサ' },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TaConjunction);
    });

    describe('te-form', function () {
      const adjectives = [
        { surfaceForm: '女々しくて', baseForm: "女々しい", reading: 'メメシクテ' },
        { surfaceForm: '寒くて', baseForm: "寒い", reading: 'サムクテ' },

      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('adverbial form', function () {
      const adjectives = [
        { surfaceForm: 'うるさく', baseForm: "うるさい", reading: "ウルサク" },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('nai-form', function () {
      const adjectives = [
        { surfaceForm: '芳しくない', baseForm: "芳しい", reading: 'カンバシクナイ', auxillary: 'ない', auxillaryIndex: 1 },
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('before a verb', function () {
      const adjectives = [
        { surfaceForm: 'すごく', baseForm: "すごい", reading: 'スゴク', phrase: 'すごく楽しくて' }
      ];
      runTestCase(adjectives, bunsetsu.ConjugatedForm.TeConjunction);
    });

  });
}