import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in る', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '殴れば', baseForm: '殴る', reading: 'ナグレバ' },
        { surfaceForm: 'なれば', baseForm: 'なる', reading: 'ナレバ' },
        { surfaceForm: '走れば', baseForm: '走る', reading: 'ハシレバ' },
        { surfaceForm: '作れば', baseForm: '作る', reading: 'ツクレバ' },
        { surfaceForm: '乗れば', baseForm: '乗る', reading: 'ノレバ' },
        { surfaceForm: '終われば', baseForm: '終わる', reading: 'オワレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '殴りゃ', baseForm: '殴る', reading: 'ナグリャ' },
        { surfaceForm: 'なりゃ', baseForm: 'なる', reading: 'ナリャ' },
        { surfaceForm: '走りゃ', baseForm: '走る', reading: 'ハシリャ' },
        { surfaceForm: '作りゃ', baseForm: '作る', reading: 'ツクリャ' },
        { surfaceForm: '乗りゃ', baseForm: '乗る', reading: 'ノリャ' },
        { surfaceForm: '終わりゃ', baseForm: '終わる', reading: 'オワリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '殴る', baseForm: '殴る', reading: 'ナグル' },
        { surfaceForm: 'なる', baseForm: 'なる', reading: 'ナル' },
        { surfaceForm: '走る', baseForm: '走る', reading: 'ハシル' },
        { surfaceForm: '作る', baseForm: '作る', reading: 'ツクル' },
        { surfaceForm: '乗る', baseForm: '乗る', reading: 'ノル' },
        { surfaceForm: '終わる', baseForm: '終わる', reading: 'オワル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('contracted form', function () {
      describe('when followed by の', function () {
        // need full sentence context to differentiate between this case and negative contraction, e.g. 乗んない？
        const phrases = [
          { phrase: '殴んの？', index: 0, wordSurfaceForm: '殴ん', baseForm: '殴る', reading: 'ナグン' },
          { phrase: '成んの？', index: 0, wordSurfaceForm: '成ん', baseForm: '成る', reading: 'ナン' },
          { phrase: '走んの？', index: 0, wordSurfaceForm: '走ん', baseForm: '走る', reading: 'ハシン' },
          { phrase: '作んの？', index: 0, wordSurfaceForm: '作ん', baseForm: '作る', reading: 'ツクン' },
          { phrase: '乗んの？', index: 0, wordSurfaceForm: '乗ん', baseForm: '乗る', reading: 'ノン' },
          { phrase: '終わんの？', index: 0, wordSurfaceForm: '終わん', baseForm: '終わる', reading: 'オワン' },
        ];
        runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.SpecialIndeclinableNominalConjunction1, context);
      });

      describe('when followed by ない', function () {
        // need full sentence context to differentiate between this case and の ending clause, e.g. 乗んの？
        const phrases = [
          { phrase: '殴んない', index: 0, wordSurfaceForm: '殴んない', baseForm: '殴る', reading: 'ナグンナイ' },
          { phrase: '成んない', index: 0, wordSurfaceForm: '成んない', baseForm: '成る', reading: 'ナンナイ' },
          { phrase: '走んない', index: 0, wordSurfaceForm: '走んない', baseForm: '走る', reading: 'ハシンナイ' },
          { phrase: '作んない', index: 0, wordSurfaceForm: '作んない', baseForm: '作る', reading: 'ツクンナイ' },
          { phrase: '乗んない', index: 0, wordSurfaceForm: '乗んない', baseForm: '乗る', reading: 'ノンナイ' },
          { phrase: '終わんない', index: 0, wordSurfaceForm: '終わんない', baseForm: '終わる', reading: 'オワンナイ' },
        ];
        runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.SpecialIrrealis, context);
      });
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '殴ろう', baseForm: '殴る', reading: 'ナグロウ' },
        { surfaceForm: 'なろう', baseForm: 'なる', reading: 'ナロウ' },
        { surfaceForm: '走ろう', baseForm: '走る', reading: 'ハシロウ' },
        { surfaceForm: '作ろう', baseForm: '作る', reading: 'ツクロウ' },
        { surfaceForm: '乗ろう', baseForm: '乗る', reading: 'ノロウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '殴らない', baseForm: '殴る', reading: 'ナグラナイ' },
        { surfaceForm: 'ならない', baseForm: 'なる', reading: 'ナラナイ' },
        { surfaceForm: '走らない', baseForm: '走る', reading: 'ハシラナイ' },
        { surfaceForm: '作らない', baseForm: '作る', reading: 'ツクラナイ' },
        { surfaceForm: '乗らない', baseForm: '乗る', reading: 'ノラナイ' },
        { surfaceForm: '終わらない', baseForm: '終わる', reading: 'オワラナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('imperative as れ variant', function () {
      const verbs = [
        { surfaceForm: '殴れ', baseForm: '殴る', reading: 'ナグレ' },
        { surfaceForm: 'なれ', baseForm: 'なる', reading: 'ナレ' },
        { surfaceForm: '走れ', baseForm: '走る', reading: 'ハシレ' },
        { surfaceForm: '作れ', baseForm: '作る', reading: 'ツクレ' },
        { surfaceForm: '乗れ', baseForm: '乗る', reading: 'ノレ' },
        { surfaceForm: '終われ', baseForm: '終わる', reading: 'オワレ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ImperativeE, context);
    });

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '殴りなさい', baseForm: '殴る', reading: 'ナグリナサイ' },
        { surfaceForm: 'なりなさい', baseForm: 'なる', reading: 'ナリナサイ' },
        { surfaceForm: '走りなさい', baseForm: '走る', reading: 'ハシリナサイ' },
        { surfaceForm: '作りなさい', baseForm: '作る', reading: 'ツクリナサイ' },
        { surfaceForm: '乗りなさい', baseForm: '乗る', reading: 'ノリナサイ' },
        { surfaceForm: '終わりなさい', baseForm: '終わる', reading: 'オワリナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '殴りな', baseForm: '殴る', reading: 'ナグリナ' },
        { surfaceForm: 'なりな', baseForm: 'なる', reading: 'ナリナ' },
        { surfaceForm: '走りな', baseForm: '走る', reading: 'ハシリナ' },
        { surfaceForm: '作りな', baseForm: '作る', reading: 'ツクリナ' },
        { surfaceForm: '乗りな', baseForm: '乗る', reading: 'ノリナ' },
        { surfaceForm: '終わりな', baseForm: '終わる', reading: 'オワリナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '殴って', baseForm: '殴る', reading: 'ナグッテ' },
        { surfaceForm: 'なって', baseForm: 'なる', reading: 'ナッテ' },
        { surfaceForm: '走って', baseForm: '走る', reading: 'ハシッテ' },
        { surfaceForm: '作って', baseForm: '作る', reading: 'ツクッテ' },
        { surfaceForm: '乗って', baseForm: '乗る', reading: 'ノッテ' },
        { surfaceForm: '終わって', baseForm: '終わる', reading: 'オワッテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '走っちゃ', baseForm: '走る', reading: 'ハシッチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '殴った', baseForm: '殴る', reading: 'ナグッタ' },
        { surfaceForm: 'なった', baseForm: 'なる', reading: 'ナッタ' },
        { surfaceForm: '走った', baseForm: '走る', reading: 'ハシッタ' },
        { surfaceForm: '作った', baseForm: '作る', reading: 'ツクッタ' },
        { surfaceForm: '乗った', baseForm: '乗る', reading: 'ノッタ' },
        { surfaceForm: '終わった', baseForm: '終わる', reading: 'オワッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '殴ります', baseForm: '殴る', reading: 'ナグリマス' },
        { surfaceForm: 'なります', baseForm: 'なる', reading: 'ナリマス' },
        { surfaceForm: '走ります', baseForm: '走る', reading: 'ハシリマス' },
        { surfaceForm: '作ります', baseForm: '作る', reading: 'ツクリマス' },
        { surfaceForm: '乗ります', baseForm: '乗る', reading: 'ノリマス' },
        { surfaceForm: '終わります', baseForm: '終わる', reading: 'オワリマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '殴りません', baseForm: '殴る', reading: 'ナグリマセン' },
        { surfaceForm: '殴りませんでした', baseForm: '殴る', reading: 'ナグリマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '殴られる', baseForm: '殴る', reading: 'ナグラレル' },
        { surfaceForm: 'なられる', baseForm: 'なる', reading: 'ナラレル' },
        { surfaceForm: '走られる', baseForm: '走る', reading: 'ハシラレル' },
        { surfaceForm: '作られる', baseForm: '作る', reading: 'ツクラレル' },
        { surfaceForm: '乗られる', baseForm: '乗る', reading: 'ノラレル' },
        { surfaceForm: '終わられる', baseForm: '終わる', reading: 'オワラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '殴らせる', baseForm: '殴る', reading: 'ナグラセル' },
        { surfaceForm: 'ならせる', baseForm: 'なる', reading: 'ナラセル' },
        { surfaceForm: '走らせる', baseForm: '走る', reading: 'ハシラセル' },
        { surfaceForm: '作らせる', baseForm: '作る', reading: 'ツクラセル' },
        { surfaceForm: '乗らせる', baseForm: '乗る', reading: 'ノラセル' },
        { surfaceForm: '終わらせる', baseForm: '終わる', reading: 'オワラセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '殴らせられる', baseForm: '殴る', reading: 'ナグラセラレル' },
        { surfaceForm: 'ならせられる', baseForm: 'なる', reading: 'ナラセラレル' },
        { surfaceForm: '走らせられる', baseForm: '走る', reading: 'ハシラセラレル' },
        { surfaceForm: '作らせられる', baseForm: '作る', reading: 'ツクラセラレル' },
        { surfaceForm: '乗らせられる', baseForm: '乗る', reading: 'ノラセラレル' },
        { surfaceForm: '終わらせられる', baseForm: '終わる', reading: 'オワラセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '殴ってほしい', baseForm: '殴る', reading: 'ナグッテホシイ' },
        { surfaceForm: 'なってほしい', baseForm: 'なる', reading: 'ナッテホシイ' },
        { surfaceForm: '走ってほしい', baseForm: '走る', reading: 'ハシッテホシイ' },
        { surfaceForm: '作ってほしい', baseForm: '作る', reading: 'ツクッテホシイ' },
        { surfaceForm: '乗ってほしい', baseForm: '乗る', reading: 'ノッテホシイ' },
        { surfaceForm: '終わってほしい', baseForm: '終わる', reading: 'オワッテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '殴りやがる', baseForm: '殴る', reading: 'ナグリヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '殴りまい', baseForm: '殴る', reading: 'ナグリマイ' },
        { surfaceForm: 'なりまい', baseForm: 'なる', reading: 'ナリマイ' },
        { surfaceForm: '走りまい', baseForm: '走る', reading: 'ハシリマイ' },
        { surfaceForm: '作りまい', baseForm: '作る', reading: 'ツクリマイ' },
        { surfaceForm: '乗りまい', baseForm: '乗る', reading: 'ノリマイ' },
        { surfaceForm: '終わりまい', baseForm: '終わる', reading: 'オワリマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}