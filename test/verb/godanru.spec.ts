import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in る', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '殴れば', basicForm: '殴る', reading: 'ナグレバ' },
        { surfaceForm: 'なれば', basicForm: 'なる', reading: 'ナレバ' },
        { surfaceForm: '走れば', basicForm: '走る', reading: 'ハシレバ' },
        { surfaceForm: '作れば', basicForm: '作る', reading: 'ツクレバ' },
        { surfaceForm: '乗れば', basicForm: '乗る', reading: 'ノレバ' },
        { surfaceForm: '終われば', basicForm: '終わる', reading: 'オワレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '殴りゃ', basicForm: '殴る', reading: 'ナグリャ' },
        { surfaceForm: 'なりゃ', basicForm: 'なる', reading: 'ナリャ' },
        { surfaceForm: '走りゃ', basicForm: '走る', reading: 'ハシリャ' },
        { surfaceForm: '作りゃ', basicForm: '作る', reading: 'ツクリャ' },
        { surfaceForm: '乗りゃ', basicForm: '乗る', reading: 'ノリャ' },
        { surfaceForm: '終わりゃ', basicForm: '終わる', reading: 'オワリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '殴る', basicForm: '殴る', reading: 'ナグル' },
        { surfaceForm: 'なる', basicForm: 'なる', reading: 'ナル' },
        { surfaceForm: '走る', basicForm: '走る', reading: 'ハシル' },
        { surfaceForm: '作る', basicForm: '作る', reading: 'ツクル' },
        { surfaceForm: '乗る', basicForm: '乗る', reading: 'ノル' },
        { surfaceForm: '終わる', basicForm: '終わる', reading: 'オワル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('contracted form', function () {
      describe('when followed by の', function () {
        // need full sentence context to differentiate between this case and negative contraction, e.g. 乗んない？
        const phrases = [
          { phrase: '殴んの？', index: 0, wordSurfaceForm: '殴ん', basicForm: '殴る', reading: 'ナグン' },
          { phrase: '成んの？', index: 0, wordSurfaceForm: '成ん', basicForm: '成る', reading: 'ナン' },
          { phrase: '走んの？', index: 0, wordSurfaceForm: '走ん', basicForm: '走る', reading: 'ハシン' },
          { phrase: '作んの？', index: 0, wordSurfaceForm: '作ん', basicForm: '作る', reading: 'ツクン' },
          { phrase: '乗んの？', index: 0, wordSurfaceForm: '乗ん', basicForm: '乗る', reading: 'ノン' },
          { phrase: '終わんの？', index: 0, wordSurfaceForm: '終わん', basicForm: '終わる', reading: 'オワン' },
        ];
        runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.SpecialIndeclinableNominalConjunction1, context);
      });

      describe('when followed by ない', function () {
        // need full sentence context to differentiate between this case and の ending clause, e.g. 乗んの？
        const phrases = [
          { phrase: '殴んない', index: 0, wordSurfaceForm: '殴んない', basicForm: '殴る', reading: 'ナグンナイ' },
          { phrase: '成んない', index: 0, wordSurfaceForm: '成んない', basicForm: '成る', reading: 'ナンナイ' },
          { phrase: '走んない', index: 0, wordSurfaceForm: '走んない', basicForm: '走る', reading: 'ハシンナイ' },
          { phrase: '作んない', index: 0, wordSurfaceForm: '作んない', basicForm: '作る', reading: 'ツクンナイ' },
          { phrase: '乗んない', index: 0, wordSurfaceForm: '乗んない', basicForm: '乗る', reading: 'ノンナイ' },
          { phrase: '終わんない', index: 0, wordSurfaceForm: '終わんない', basicForm: '終わる', reading: 'オワンナイ' },
        ];
        runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.SpecialIrrealis, context);
      });
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '殴ろう', basicForm: '殴る', reading: 'ナグロウ' },
        { surfaceForm: 'なろう', basicForm: 'なる', reading: 'ナロウ' },
        { surfaceForm: '走ろう', basicForm: '走る', reading: 'ハシロウ' },
        { surfaceForm: '作ろう', basicForm: '作る', reading: 'ツクロウ' },
        { surfaceForm: '乗ろう', basicForm: '乗る', reading: 'ノロウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '殴らない', basicForm: '殴る', reading: 'ナグラナイ' },
        { surfaceForm: 'ならない', basicForm: 'なる', reading: 'ナラナイ' },
        { surfaceForm: '走らない', basicForm: '走る', reading: 'ハシラナイ' },
        { surfaceForm: '作らない', basicForm: '作る', reading: 'ツクラナイ' },
        { surfaceForm: '乗らない', basicForm: '乗る', reading: 'ノラナイ' },
        { surfaceForm: '終わらない', basicForm: '終わる', reading: 'オワラナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('imperative as れ variant', function () {
      const verbs = [
        { surfaceForm: '殴れ', basicForm: '殴る', reading: 'ナグレ' },
        { surfaceForm: 'なれ', basicForm: 'なる', reading: 'ナレ' },
        { surfaceForm: '走れ', basicForm: '走る', reading: 'ハシレ' },
        { surfaceForm: '作れ', basicForm: '作る', reading: 'ツクレ' },
        { surfaceForm: '乗れ', basicForm: '乗る', reading: 'ノレ' },
        { surfaceForm: '終われ', basicForm: '終わる', reading: 'オワレ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ImperativeE, context);
    });

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '殴りなさい', basicForm: '殴る', reading: 'ナグリナサイ' },
        { surfaceForm: 'なりなさい', basicForm: 'なる', reading: 'ナリナサイ' },
        { surfaceForm: '走りなさい', basicForm: '走る', reading: 'ハシリナサイ' },
        { surfaceForm: '作りなさい', basicForm: '作る', reading: 'ツクリナサイ' },
        { surfaceForm: '乗りなさい', basicForm: '乗る', reading: 'ノリナサイ' },
        { surfaceForm: '終わりなさい', basicForm: '終わる', reading: 'オワリナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '殴りな', basicForm: '殴る', reading: 'ナグリナ' },
        { surfaceForm: 'なりな', basicForm: 'なる', reading: 'ナリナ' },
        { surfaceForm: '走りな', basicForm: '走る', reading: 'ハシリナ' },
        { surfaceForm: '作りな', basicForm: '作る', reading: 'ツクリナ' },
        { surfaceForm: '乗りな', basicForm: '乗る', reading: 'ノリナ' },
        { surfaceForm: '終わりな', basicForm: '終わる', reading: 'オワリナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '殴って', basicForm: '殴る', reading: 'ナグッテ' },
        { surfaceForm: 'なって', basicForm: 'なる', reading: 'ナッテ' },
        { surfaceForm: '走って', basicForm: '走る', reading: 'ハシッテ' },
        { surfaceForm: '作って', basicForm: '作る', reading: 'ツクッテ' },
        { surfaceForm: '乗って', basicForm: '乗る', reading: 'ノッテ' },
        { surfaceForm: '終わって', basicForm: '終わる', reading: 'オワッテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '殴った', basicForm: '殴る', reading: 'ナグッタ' },
        { surfaceForm: 'なった', basicForm: 'なる', reading: 'ナッタ' },
        { surfaceForm: '走った', basicForm: '走る', reading: 'ハシッタ' },
        { surfaceForm: '作った', basicForm: '作る', reading: 'ツクッタ' },
        { surfaceForm: '乗った', basicForm: '乗る', reading: 'ノッタ' },
        { surfaceForm: '終わった', basicForm: '終わる', reading: 'オワッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '殴ります', basicForm: '殴る', reading: 'ナグリマス' },
        { surfaceForm: 'なります', basicForm: 'なる', reading: 'ナリマス' },
        { surfaceForm: '走ります', basicForm: '走る', reading: 'ハシリマス' },
        { surfaceForm: '作ります', basicForm: '作る', reading: 'ツクリマス' },
        { surfaceForm: '乗ります', basicForm: '乗る', reading: 'ノリマス' },
        { surfaceForm: '終わります', basicForm: '終わる', reading: 'オワリマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '殴りません', basicForm: '殴る', reading: 'ナグリマセン' },
        { surfaceForm: '殴りませんでした', basicForm: '殴る', reading: 'ナグリマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '殴られる', basicForm: '殴る', reading: 'ナグラレル' },
        { surfaceForm: 'なられる', basicForm: 'なる', reading: 'ナラレル' },
        { surfaceForm: '走られる', basicForm: '走る', reading: 'ハシラレル' },
        { surfaceForm: '作られる', basicForm: '作る', reading: 'ツクラレル' },
        { surfaceForm: '乗られる', basicForm: '乗る', reading: 'ノラレル' },
        { surfaceForm: '終わられる', basicForm: '終わる', reading: 'オワラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '殴らせる', basicForm: '殴る', reading: 'ナグラセル' },
        { surfaceForm: 'ならせる', basicForm: 'なる', reading: 'ナラセル' },
        { surfaceForm: '走らせる', basicForm: '走る', reading: 'ハシラセル' },
        { surfaceForm: '作らせる', basicForm: '作る', reading: 'ツクラセル' },
        { surfaceForm: '乗らせる', basicForm: '乗る', reading: 'ノラセル' },
        { surfaceForm: '終わらせる', basicForm: '終わる', reading: 'オワラセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '殴らせられる', basicForm: '殴る', reading: 'ナグラセラレル' },
        { surfaceForm: 'ならせられる', basicForm: 'なる', reading: 'ナラセラレル' },
        { surfaceForm: '走らせられる', basicForm: '走る', reading: 'ハシラセラレル' },
        { surfaceForm: '作らせられる', basicForm: '作る', reading: 'ツクラセラレル' },
        { surfaceForm: '乗らせられる', basicForm: '乗る', reading: 'ノラセラレル' },
        { surfaceForm: '終わらせられる', basicForm: '終わる', reading: 'オワラセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '殴ってほしい', basicForm: '殴る', reading: 'ナグッテホシイ' },
        { surfaceForm: 'なってほしい', basicForm: 'なる', reading: 'ナッテホシイ' },
        { surfaceForm: '走ってほしい', basicForm: '走る', reading: 'ハシッテホシイ' },
        { surfaceForm: '作ってほしい', basicForm: '作る', reading: 'ツクッテホシイ' },
        { surfaceForm: '乗ってほしい', basicForm: '乗る', reading: 'ノッテホシイ' },
        { surfaceForm: '終わってほしい', basicForm: '終わる', reading: 'オワッテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '殴りやがる', basicForm: '殴る', reading: 'ナグリヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '殴りまい', basicForm: '殴る', reading: 'ナグリマイ' },
        { surfaceForm: 'なりまい', basicForm: 'なる', reading: 'ナリマイ' },
        { surfaceForm: '走りまい', basicForm: '走る', reading: 'ハシリマイ' },
        { surfaceForm: '作りまい', basicForm: '作る', reading: 'ツクリマイ' },
        { surfaceForm: '乗りまい', basicForm: '乗る', reading: 'ノリマイ' },
        { surfaceForm: '終わりまい', basicForm: '終わる', reading: 'オワリマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '殴るまい', basicForm: '殴る', reading: 'ナグルマイ' },
        { surfaceForm: 'なるまい', basicForm: 'なる', reading: 'ナルマイ' },
        { surfaceForm: '走るまい', basicForm: '走る', reading: 'ハシルマイ' },
        { surfaceForm: '作るまい', basicForm: '作る', reading: 'ツクルマイ' },
        { surfaceForm: '乗るまい', basicForm: '乗る', reading: 'ノルマイ' },
        { surfaceForm: '終わるまい', basicForm: '終わる', reading: 'オワルマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });
  });
}