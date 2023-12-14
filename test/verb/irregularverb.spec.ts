import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('VerbType.Kuru', function () {
    const runWordTestCase = (testCases: { surfaceForm: string, reading: string, auxillary?: string }[], form: bunsetsu.ConjugatedForm) => {
      const cases = testCases.map((testCase) => {
        return { ...testCase, basicForm: '来る' }
      });
      runTest(cases, form, context);
    };
    const runPhraseTestCase = (testCases: { phrase: string, index: number, wordSurfaceForm: string, reading: string, auxillary?: string }[], form: bunsetsu.ConjugatedForm) => {
      const cases = testCases.map((testCase) => {
        return { ...testCase, context, basicForm: '来る' }
      });
      runTestOnPhrase(cases, form, context);
    };

    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '来れば', reading: 'クレバ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ConditionalForm);
    });

    describe('contracted conditional form', function () {
      // need full sentence context, otherwise kuromoji can report 
      // 来（く）る as 来（きた）る
      const phrases = [
        { phrase: '来りゃいい', index: 0, wordSurfaceForm: '来りゃ', reading: 'クリャ' },
      ];
      runPhraseTestCase(phrases, bunsetsu.ConjugatedForm.ConditionalContraction1);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '来る', reading: 'クル' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.PlainForm);
    });

    describe('contracted form', function () {
      // need full sentence context, otherwise kuromoji can report 
      // 来（く）る as 来（きた）る
      const phrases = [
        { phrase: '今日来んの?', index: 1, wordSurfaceForm: '来ん', reading: 'クン' },
      ];
      runPhraseTestCase(phrases, bunsetsu.ConjugatedForm.SpecialIndeclinableNominalConjunction1);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '来よう', reading: 'コヨウ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '来ない', reading: 'コナイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Irrealis);
    });

    describe('imperative as い variant', function () {
      const verbs = [
        { surfaceForm: '来い', reading: 'コイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ImperativeI);
    });

    describe('imperative as よ variant', function () {
      const verbs = [
        { surfaceForm: '来よ', reading: 'コヨ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ImperativeYo);
    });

    describe('ConjugatedForm.Continuative', function () {
      const verbs = [
        { surfaceForm: '来ます', reading: 'キマス' },
        { surfaceForm: '来ました', reading: 'キマシタ' },
        { surfaceForm: '来まして', reading: 'キマシテ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '来た', reading: 'キタ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '来て', reading: 'キテ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '来なさい', reading: 'キナサイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    // testing passive, causative, and causative-passive are tricky because 
    // the tokenizer identifies them as forms of 来す（きたす） instead of 来る（くる）

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '来な', reading: 'キナ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '来るまい', reading: 'クルマイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.PlainForm);
    });
  });


  describe('VerbType.Suru', function () {
    const runWordTestCase = (testCases: { surfaceForm: string, reading: string, auxillary?: string }[], form: bunsetsu.ConjugatedForm) => {
      const cases = testCases.map((testCase) => {
        return { ...testCase, basicForm: 'する' }
      });
      runTest(cases, form, context);
    };
    const runPhraseTestCase = (testCases: { phrase: string, index: number, wordSurfaceForm: string, reading: string, auxillary?: string }[], form: bunsetsu.ConjugatedForm) => {
      const cases = testCases.map((testCase) => {
        return { ...testCase, basicForm: 'する' }
      });
      runTestOnPhrase(cases, form, context);
    };

    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: 'すれば', reading: 'スレバ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ConditionalForm);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: 'すりゃ', reading: 'スリャ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: 'する', reading: 'スル' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.PlainForm);
    });

    describe('contracted form', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'ゲームすんの？', index: 1, wordSurfaceForm: 'すん', reading: 'スン' },
      ];
      runPhraseTestCase(phrases, bunsetsu.ConjugatedForm.SpecialIndeclinableNominalConjunction1);
    });

    describe('classical plain form', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'このようにす', index: 3, wordSurfaceForm: 'す', reading: 'ス' },
      ];
      runPhraseTestCase(phrases, bunsetsu.ConjugatedForm.ClassicalPlainForm);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: 'しよう', reading: 'シヨウ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: 'しない', reading: 'シナイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Irrealis);
    });

    describe('imperative as ろ variant', function () {
      const verbs = [
        { surfaceForm: 'しろ', reading: 'シロ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ImperativeRo);
    });

    describe('imperative as よ variant', function () {
      const verbs = [
        { surfaceForm: 'せよ', reading: 'セヨ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.ImperativeYo);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: 'します', reading: 'シマス' },
        { surfaceForm: 'しました', reading: 'シマシタ' },
        { surfaceForm: 'しまして', reading: 'シマシテ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: 'した', reading: 'シタ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: 'して', reading: 'シテ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.TeConjunction);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: 'される', reading: 'サレル' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.IrrealisReruConjunction);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: 'させる', reading: 'サセル' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.IrrealisReruConjunction);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: 'させられる', reading: 'サセラレル' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.IrrealisReruConjunction);
    });

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: 'しなさい', reading: 'シナサイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: 'しな', reading: 'シナ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.Continuative);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: 'するまい', reading: 'スルマイ' },
      ];
      runWordTestCase(verbs, bunsetsu.ConjugatedForm.PlainForm);
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
  describe('special class する verbs', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '愛すれば', basicForm: '愛する', reading: 'アイスレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '愛すりゃ', basicForm: '愛する', reading: 'アイスリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '反する', basicForm: '反する', reading: 'ハンスル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '愛しよう', basicForm: '愛する', reading: 'アイシヨウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '反しない', basicForm: '反する', reading: 'ハンシナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('imperative as ろ variant', function () {
      const verbs = [
        { surfaceForm: '反しろ', basicForm: '反する', reading: 'ハンシロ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ImperativeRo, context);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '反するまい', basicForm: '反する', reading: 'ハンスルマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });
  });

  // Single kanji ずる verbs that conjugate irregularly due to lingering
  // influence from classical Japanese.  Their usage has changed over time, so 
  // as a result, MeCab has two entries for these types of verbs the (一段 -じる 
  // version and -ずる version). Examples include 信ずる / 信じる and 命ずる / 命じる. 
  // The more modern じる conjugations are often preferred by MeCab in ambiguous
  // contexts.
  // https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44#%E4%BA%94%E6%AE%B5%E5%8C%96%E3%81%A8%E4%B8%8A%E4%B8%80%E6%AE%B5%E5%8C%96
  describe('ずる verbs', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '信ずれば', basicForm: '信ずる', reading: 'シンズレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '信ずりゃ', basicForm: '信ずる', reading: 'シンズリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '信ずる', basicForm: '信ずる', reading: 'シンズル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('classical plain form', function () {
      const verbs = [
        { surfaceForm: '減ず', basicForm: '減ずる', reading: 'ゲンズ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ClassicalPlainForm, context);
    });

    describe('imperative as よ variant', function () {
      const verbs = [
        { surfaceForm: '信ぜよ', basicForm: '信ずる', reading: 'シンゼヨ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ImperativeYo, context);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '信ずるまい', basicForm: '信ずる', reading: 'シンズルマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });
  });
}