import * as tokun from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.iAdjective', function () {
    const runTestCase = (testCases: { phrase: string, basicForm: string, reading: string, stemSurfaceForm: string, stemReading: string }[], conjugatedForm: tokun.ConjugatedForm) => {
      for (const expected of testCases) {
        it(`should identify ${expected.phrase} as one word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(expected.phrase);
          assert.equal(words.length, 1);

          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.iAdjective);
          assert.equal(word.surfaceForm, expected.phrase);
          assert.equal(word.basicForm, expected.basicForm);
          assert.equal(word.reading, expected.reading);

          assert.ok(word.detail);
          assert.equal(word.detail.type, tokun.PartOfSpeech.iAdjective);
          const detail = word.detail as tokun.AdjectiveDetail;

          const stem = detail.stem;
          assert.equal(stem.basicForm, word.basicForm);
          assert.equal(stem.surfaceForm, expected.stemSurfaceForm);
          assert.equal(stem.reading, expected.stemReading);

          const conj = detail.conjugation;
          const conjSurfaceForm = expected.phrase.replace(expected.stemSurfaceForm, '');
          const conjReading = expected.reading.replace(expected.stemReading, '');
          assert.equal(conj.conjugatedForm, conjugatedForm);
          assert.equal(conj.surfaceForm, conjSurfaceForm);
          assert.equal(conj.reading, conjReading);
        });
      }
    };

    describe('ConjugatedForm.GaruConjunction', function () {
      const adjectives = [
        { phrase: '嬉しがる', basicForm: "嬉しい", reading: 'ウレシガル', stemSurfaceForm: '嬉し', stemReading: 'ウレシ' },
        { phrase: '早すぎる', basicForm: '早い', reading: 'ハヤスギル', stemSurfaceForm: '早', stemReading: 'ハヤ' },
        { phrase: '悲しさ', basicForm: '悲しい', reading: 'カナシサ', stemSurfaceForm: '悲し', stemReading: 'カナシ' },
        { phrase: '虚しそう', basicForm: '虚しい', reading: 'ムナシソウ', stemSurfaceForm: '虚し', stemReading: 'ムナシ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.GaruConjunction);
    });

    describe('ConjugatedForm.ConditionalForm', function () {
      const adjectives = [
        { phrase: '美味しければ', basicForm: "美味しい", reading: 'オイシケレバ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { phrase: '早ければ', basicForm: "早い", reading: 'ハヤケレバ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.ConditionalForm);
    });

    describe('ConjugatedForm.ConditionalContraction1', function () {
      const adjectives = [
        { phrase: '美味しけりゃ', basicForm: "美味しい", reading: 'オイシイケリャ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { phrase: '早けりゃ', basicForm: "早い", reading: 'ハヤケリャ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.ConditionalContraction1);
    });

    describe('ConjugatedForm.ConditionalContraction2', function () {
      const adjectives = [
        { phrase: '美味しきゃ', basicForm: "美味しい", reading: 'オイシキャ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { phrase: '早きゃ', basicForm: "早い", reading: 'ハヤキャ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.ConditionalContraction2);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const adjectives = [
        { phrase: '美味しい', basicForm: "美味しい", reading: 'オイシイ', stemSurfaceForm: '美味し', stemReading: 'オイシ' },
        { phrase: '早い', basicForm: "早い", reading: 'ハヤイ', stemSurfaceForm: '早', stemReading: 'ハヤ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.PlainForm);
    });

    describe('ConjugatedForm.IndeclinableNominalConjunction', function () {
      const adjectives = [
        { phrase: '美しき', basicForm: "美しい", reading: 'オイシキ', stemSurfaceForm: '美し', stemReading: 'オイシ' },
        { phrase: '親しき', basicForm: "親しい", reading: 'シタシキ', stemSurfaceForm: '親し', stemReading: 'オイシ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.IndeclinableNominalConjunction);
    });

    describe('ConjugatedForm.ClassicalPlainForm', function () {
      const adjectives = [
        { phrase: '赤し', basicForm: "赤い", reading: 'アカシ', stemSurfaceForm: '赤', stemReading: 'アカ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.ClassicalPlainForm);
    });

    describe('ConjugatedForm.IrrealisUConjunction', function () {
      const adjectives = [
        { phrase: '高かろう', basicForm: "高い", reading: 'タカロウ', stemSurfaceForm: '高', stemReading: 'タカ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.IrrealisUConjunction);
    });

    describe('ConjugatedForm.IrrealisNuConjunction', function () {
      const adjectives = [
        { phrase: '高からぬ', basicForm: "高い", reading: 'タカラヌ', stemSurfaceForm: '高', stemReading: 'タカ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.IrrealisNuConjunction);
    });

    describe('ConjugatedForm.ImperativeE', function () {
      const adjectives = [
        { phrase: '多かれ', basicForm: "多い", reading: 'オオカレ', stemSurfaceForm: '多', stemReading: 'オオ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.ImperativeE);
    });

    describe('ConjugatedForm.GozaiConjunction', function () {
      const adjectives = [
        { phrase: '暑うございます', basicForm: "暑い", reading: 'アツゴザイマス', stemSurfaceForm: '暑', stemReading: 'アツ' },
        { phrase: '苦しゅうない', basicForm: "苦しい", reading: 'クルシユウナイ', stemSurfaceForm: '苦し', stemReading: 'クルシ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.GozaiConjunction);
    });

    describe('ConjugatedForm.TaConjunction', function () {
      const adjectives = [
        { phrase: 'うるさかった', basicForm: "うるさい", reading: "ウルサカッタ", stemSurfaceForm: 'うるさ', stemReading: 'ウルサ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.TaConjunction);
    });

    describe('ConjugatedForm.TeConjunction', function () {
      const adjectives = [
        { phrase: '女々しくて', basicForm: "女々しい", reading: 'メメシクテ', stemSurfaceForm: '女々し', stemReading: 'メメシ' },
        { phrase: 'うるさく', basicForm: "うるさい", reading: "ウルサク", stemSurfaceForm: 'うるさ', stemReading: 'ウルサ' },
        { phrase: '芳しくない', basicForm: "芳しい", reading: 'カンバシクナイ', stemSurfaceForm: '芳し', stemReading: 'カンバシ' },
      ];
      runTestCase(adjectives, tokun.ConjugatedForm.TeConjunction);
    });
  });
}