import * as tokun from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Verb', function () {
    const runTest = (testCases: { surfaceForm: string, basicForm: string, reading: string, auxillary?: string }[], conjugatedForm: tokun.ConjugatedForm) => {
      for (const expected of testCases) {
        it(`should identify ${expected.surfaceForm} as one word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(expected.surfaceForm);
          assert.equal(words.length, 1);

          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Verb);
          assert.equal(word.surfaceForm, expected.surfaceForm);
          assert.equal(word.basicForm, expected.basicForm);
          assert.equal(word.reading, expected.reading);

          assert.ok(word.detail);
          assert.equal(word.detail.type, tokun.PartOfSpeech.Verb);
          const detail = word.detail as tokun.VerbDetail;
          assert.equal(detail.conjugatedForm, conjugatedForm);

          if (expected.auxillary) {
            assert.equal(detail.auxillaryWord?.basicForm, expected.auxillary);
          }
        });
      }
    };
    const runTestOnPhrase = (testCases: { phrase: string, index: number, wordSurfaceForm: string, basicForm: string, reading: string, auxillary?: string }[], conjugatedForm: tokun.ConjugatedForm) => {
      for (const expected of testCases) {
        it(`should identify ${expected.wordSurfaceForm} as one word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(expected.phrase);

          const word = words[expected.index];
          assert.equal(word.pos, tokun.PartOfSpeech.Verb);
          assert.equal(word.surfaceForm, expected.wordSurfaceForm);
          assert.equal(word.basicForm, expected.basicForm);
          assert.equal(word.reading, expected.reading);

          assert.ok(word.detail);
          assert.equal(word.detail.type, tokun.PartOfSpeech.Verb);
          const detail = word.detail as tokun.VerbDetail;
          assert.equal(detail.conjugatedForm, conjugatedForm);

          if (expected.auxillary) {
            assert.equal(detail.auxillaryWord?.basicForm, expected.auxillary);
          }
        });
      }
    };

    describe('VerbType.Kuru', function () {
      const runWordTestCase = (testCases: { surfaceForm: string, reading: string, auxillary?: string }[], form: tokun.ConjugatedForm) => {
        const cases = testCases.map((testCase) => { return { ...testCase, basicForm: '来る' } });
        runTest(cases, form);
      };
      const runPhraseTestCase = (testCases: { phrase: string, index: number, wordSurfaceForm: string, reading: string, auxillary?: string }[], form: tokun.ConjugatedForm) => {
        const cases = testCases.map((testCase) => { return { ...testCase, basicForm: '来る' } });
        runTestOnPhrase(cases, form);
      };

      describe('ConjugatedForm.Conditional', function () {
        const verbs = [
          { surfaceForm: '来れば', reading: 'クレバ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Conditional);
      });

      describe('ConjugatedForm.ConditionalContraction', function () {
        // need full sentence context, otherwise kuromoji can report 
        // 来（く）る as 来（きた）る
        const phrases = [
          { phrase: '来りゃいい', index: 0, wordSurfaceForm: '来りゃ', reading: 'クリャ' },
        ];
        runPhraseTestCase(phrases, tokun.ConjugatedForm.ConditionalContraction);
      });

      describe('ConjugatedForm.PlainForm', function () {
        const verbs = [
          { surfaceForm: '来る', reading: 'クル' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.PlainForm);
      });

      describe('ConjugatedForm.IndeclinableNominal', function () {
        // need full sentence context, otherwise kuromoji can report 
        // 来（く）る as 来（きた）る
        const phrases = [
          { phrase: '今日来んの?', index: 1, wordSurfaceForm: '来ん', reading: 'クン' },
        ];
        runPhraseTestCase(phrases, tokun.ConjugatedForm.IndeclinableNominal);
      });

      describe('ConjugatedForm.Volitional', function () {
        const verbs = [
          { surfaceForm: '来よう', reading: 'コヨウ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Volitional);
      });

      describe('ConjugatedForm.NaiForm', function () {
        const verbs = [
          { surfaceForm: '来ない', reading: 'コナイ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.NaiForm);
      });

      describe('ConjugatedForm.Imperative as い variant', function () {
        const verbs = [
          { surfaceForm: '来い', reading: 'コイ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Imperative);
      });

      describe('ConjugatedForm.Imperative as よ variant', function () {
        const verbs = [
          { surfaceForm: '来よ', reading: 'コヨ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Imperative);
      });

      describe('ConjugatedForm.PoliteForm', function () {
        const verbs = [
          { surfaceForm: '来ます', reading: 'キマス' },
          { surfaceForm: '来ました', reading: 'キマシタ' },
          { surfaceForm: '来まして', reading: 'キマシテ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.PoliteForm);
      });

      describe('ConjugatedForm.PastForm', function () {
        const verbs = [
          { surfaceForm: '来た', reading: 'キタ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.PastForm);
      });

      describe('ConjugatedForm.TeForm', function () {
        const verbs = [
          { surfaceForm: '来て', reading: 'キテ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.TeForm);
      });
    });


    describe('VerbType.Suru', function () {

      const runWordTestCase = (testCases: { surfaceForm: string, reading: string, auxillary?: string }[], form: tokun.ConjugatedForm) => {
        const cases = testCases.map((testCase) => { return { ...testCase, basicForm: 'する' } });
        runTest(cases, form);
      };
      const runPhraseTestCase = (testCases: { phrase: string, index: number, wordSurfaceForm: string, reading: string, auxillary?: string }[], form: tokun.ConjugatedForm) => {
        const cases = testCases.map((testCase) => { return { ...testCase, basicForm: 'する' } });
        runTestOnPhrase(cases, form);
      };

      describe('ConjugatedForm.Conditional', function () {
        const verbs = [
          { surfaceForm: 'すれば', reading: 'スレバ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Conditional);
      });

      describe('ConjugatedForm.ConditionalContraction', function () {
        const verbs = [
          { surfaceForm: 'すりゃ', reading: 'スリャ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.ConditionalContraction);
      });

      describe('ConjugatedForm.PlainForm', function () {
        const verbs = [
          { surfaceForm: 'する', reading: 'スル' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.PlainForm);
      });

      describe('ConjugatedForm.IndeclinableNominal', function () {
        // need full sentence context
        const phrases = [
          { phrase: 'ゲームすんの？', index: 1, wordSurfaceForm: 'すん', reading: 'スン' },
        ];
        runPhraseTestCase(phrases, tokun.ConjugatedForm.IndeclinableNominal);
      });

      describe('ConjugatedForm.ClassicalPlainForm', function () {
        // need full sentence context
        const phrases = [
          { phrase: 'このようにす', index: 3, wordSurfaceForm: 'す', reading: 'ス' },
        ];
        runPhraseTestCase(phrases, tokun.ConjugatedForm.ClassicalPlainForm);
      });

      describe('ConjugatedForm.Volitional', function () {
        const verbs = [
          { surfaceForm: 'しよう', reading: 'シヨウ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Volitional);
      });

      describe('ConjugatedForm.NaiForm', function () {
        const verbs = [
          { surfaceForm: 'しない', reading: 'シナイ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.NaiForm);
      });

      describe('ConjugatedForm.Imperative as い variant', function () {
        const verbs = [
          { surfaceForm: 'しろ', reading: 'シロ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Imperative);
      });

      describe('ConjugatedForm.Imperative as よ variant', function () {
        const verbs = [
          { surfaceForm: 'せよ', reading: 'セヨ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.Imperative);
      });

      describe('ConjugatedForm.PoliteForm', function () {
        const verbs = [
          { surfaceForm: 'します', reading: 'シマス' },
          { surfaceForm: 'しました', reading: 'シマシタ' },
          { surfaceForm: 'しまして', reading: 'シマシテ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.PoliteForm);
      });

      describe('ConjugatedForm.PastForm', function () {
        const verbs = [
          { surfaceForm: 'した', reading: 'シタ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.PastForm);
      });

      describe('ConjugatedForm.TeForm', function () {
        const verbs = [
          { surfaceForm: 'して', reading: 'シテ' },
        ];
        runWordTestCase(verbs, tokun.ConjugatedForm.TeForm);
      });
    });

    // Single kanji する verbs that conjugate irregularly due to lingering
    // influence from classical Japanese.  Their usage has changed over time, so 
    // as a result, MeCab has two entries for these types of verbs the (五段 -す 
    // version and -する version). Examples include 愛す / 愛する and 反す / 反する. 
    // The resulting surface forms are equivalent for some conjugations (愛します, 愛します), 
    // but different for others (愛しない, 愛さない). MeCab seems to prefer to prioritize
    // interpreting the words in ambiguous cases as the 五段 -す versions.
    // https://japanese.stackexchange.com/questions/46857/difference-between-%E6%84%9B%E3%81%99%E3%82%8B-and-%E6%84%9B%E3%81%99
    // https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44#%E4%BA%94%E6%AE%B5%E5%8C%96%E3%81%A8%E4%B8%8A%E4%B8%80%E6%AE%B5%E5%8C%96
    describe('VerbType.SpecialClassSuruVerb', function () {
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = [
          { surfaceForm: '愛すれば', basicForm: '愛する', reading: 'アイスレバ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.Conditional);
      });

      describe('ConjugatedForm.ConditionalContraction', function () {
        const verbs = [
          { surfaceForm: '愛すりゃ', basicForm: '愛する', reading: 'アイスリャ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.ConditionalContraction);
      });

      describe('ConjugatedForm.PlainForm', function () {
        const verbs = [
          { surfaceForm: '反する', basicForm: '反する', reading: 'ハンスル' },
        ];
        runTest(verbs, tokun.ConjugatedForm.PlainForm);
      });

      describe('ConjugatedForm.Volitional', function () {
        const verbs = [
          { surfaceForm: '愛しよう', basicForm: '愛する', reading: 'アイシヨウ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.Volitional);
      });

      describe('ConjugatedForm.NaiForm', function () {
        const verbs = [
          { surfaceForm: '反しない', basicForm: '反する', reading: 'ハンシナイ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.NaiForm);
      });

      describe('ConjugatedForm.Imperative as ろ variant', function () {
        const verbs = [
          { surfaceForm: '反しろ', basicForm: '反する', reading: 'ハンシロ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.Imperative);
      });
    });

    // Single kanji ずる verbs that conjugate irregularly due to lingering
    // influence from classical Japanese.  Their usage has changed over time, so 
    // as a result, MeCab has two entries for these types of verbs the (一段 -じる 
    // version and -ずる version). Examples include 信ずる / 信じる and 命ずる / 命じる. 
    // The more modern じる conjugations are often preferred by MeCab in ambiguous
    // contexts.
    // https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44#%E4%BA%94%E6%AE%B5%E5%8C%96%E3%81%A8%E4%B8%8A%E4%B8%80%E6%AE%B5%E5%8C%96
    describe('VerbType.ZuruVerb', function () {
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = [
          { surfaceForm: '信ずれば', basicForm: '信ずる', reading: 'シンズレバ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.Conditional);
      });

      describe('ConjugatedForm.ConditionalContraction', function () {
        const verbs = [
          { surfaceForm: '信ずりゃ', basicForm: '信ずる', reading: 'シンズリャ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.ConditionalContraction);
      });

      describe('ConjugatedForm.PlainForm', function () {
        const verbs = [
          { surfaceForm: '信ずる', basicForm: '信ずる', reading: 'シンズル' },
        ];
        runTest(verbs, tokun.ConjugatedForm.PlainForm);
      });

      describe('ConjugatedForm.ClassicalPlainForm', function () {
        const verbs = [
          { surfaceForm: '減ず', basicForm: '減ずる', reading: 'ゲンズ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.ClassicalPlainForm);
      });

      describe('ConjugatedForm.Imperative as よ variant', function () {
        const verbs = [
          { surfaceForm: '信ぜよ', basicForm: '信ずる', reading: 'シンゼヨ' },
        ];
        runTest(verbs, tokun.ConjugatedForm.Imperative);
      });
    });

  });
}