import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('VerbType.Godan', function () {
    describe('ConjugatedType.Ru', function () {
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = [
          { surfaceForm: '殴れば', basicForm: '殴る', reading: 'ナグレバ' },
          { surfaceForm: 'なれば', basicForm: 'なる', reading: 'ナレバ' },
          { surfaceForm: '走れば', basicForm: '走る', reading: 'ハシレバ' },
          { surfaceForm: '作れば', basicForm: '作る', reading: 'ツクレバ' },
          { surfaceForm: '乗れば', basicForm: '乗る', reading: 'ノレバ' },
          { surfaceForm: '終われば', basicForm: '終わる', reading: 'オワレバ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
      });

      describe('ConjugatedForm.ConditionalContraction', function () {
        const verbs = [
          { surfaceForm: '殴りゃ', basicForm: '殴る', reading: 'ナグリャ' },
          { surfaceForm: 'なりゃ', basicForm: 'なる', reading: 'ナリャ' },
          { surfaceForm: '走りゃ', basicForm: '走る', reading: 'ハシリャ' },
          { surfaceForm: '作りゃ', basicForm: '作る', reading: 'ツクリャ' },
          { surfaceForm: '乗りゃ', basicForm: '乗る', reading: 'ノリャ' },
          { surfaceForm: '終わりゃ', basicForm: '終わる', reading: 'オワリャ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
      });

      describe('ConjugatedForm.PlainForm', function () {
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

      describe('ConjugatedForm.Contracted', function () {
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
          runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Contracted, context);
        });

        describe('when followed by ない', function () {
          // need full sentence context to differentiate between this case and の ending clausce, e.g. 乗んの？
          const phrases = [
            { phrase: '殴んない', index: 0, wordSurfaceForm: '殴んない', basicForm: '殴る', reading: 'ナグンナイ' },
            { phrase: '成んない', index: 0, wordSurfaceForm: '成んない', basicForm: '成る', reading: 'ナンナイ' },
            { phrase: '走んない', index: 0, wordSurfaceForm: '走んない', basicForm: '走る', reading: 'ハシンナイ' },
            { phrase: '作んない', index: 0, wordSurfaceForm: '作んない', basicForm: '作る', reading: 'ツクンナイ' },
            { phrase: '乗んない', index: 0, wordSurfaceForm: '乗んない', basicForm: '乗る', reading: 'ノンナイ' },
            { phrase: '終わんない', index: 0, wordSurfaceForm: '終わんない', basicForm: '終わる', reading: 'オワンナイ' },
          ];
          runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Contracted, context);
        });
      });

      describe('ConjugatedForm.Volitional', function () {
        const verbs = [
          { surfaceForm: '殴ろう', basicForm: '殴る', reading: 'ナグロウ' },
          { surfaceForm: 'なろう', basicForm: 'なる', reading: 'ナロウ' },
          { surfaceForm: '走ろう', basicForm: '走る', reading: 'ハシロウ' },
          { surfaceForm: '作ろう', basicForm: '作る', reading: 'ツクロウ' },
          { surfaceForm: '乗ろう', basicForm: '乗る', reading: 'ノロウ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
      });

      describe('ConjugatedForm.NaiForm', function () {
        const verbs = [
          { surfaceForm: '殴らない', basicForm: '殴る', reading: 'ナグラナイ' },
          { surfaceForm: 'ならない', basicForm: 'なる', reading: 'ナラナイ' },
          { surfaceForm: '走らない', basicForm: '走る', reading: 'ハシラナイ' },
          { surfaceForm: '作らない', basicForm: '作る', reading: 'ツクラナイ' },
          { surfaceForm: '乗らない', basicForm: '乗る', reading: 'ノラナイ' },
          { surfaceForm: '終わらない', basicForm: '終わる', reading: 'オワラナイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
      });

      describe('ConjugatedForm.Imperative', function () {
        describe('as れ variant', function () {
          const verbs = [
            { surfaceForm: '殴れ', basicForm: '殴る', reading: 'ナグレ' },
            { surfaceForm: 'なれ', basicForm: 'なる', reading: 'ナレ' },
            { surfaceForm: '走れ', basicForm: '走る', reading: 'ハシレ' },
            { surfaceForm: '作れ', basicForm: '作る', reading: 'ツクレ' },
            { surfaceForm: '乗れ', basicForm: '乗る', reading: 'ノレ' },
            { surfaceForm: '終われ', basicForm: '終わる', reading: 'オワレ' },
          ];
          runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
        });

        describe('as い variant (なさい）', function () {
          const verbs = [
            { surfaceForm: '殴りなさい', basicForm: '殴る', reading: 'ナグリナサイ' },
            { surfaceForm: 'なりなさい', basicForm: 'なる', reading: 'ナリナサイ' },
            { surfaceForm: '走りなさい', basicForm: '走る', reading: 'ハシリナサイ' },
            { surfaceForm: '作りなさい', basicForm: '作る', reading: 'ツクリナサイ' },
            { surfaceForm: '乗りなさい', basicForm: '乗る', reading: 'ノリナサイ' },
            { surfaceForm: '終わりなさい', basicForm: '終わる', reading: 'オワリナサイ' },
          ];
          runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
        });

        describe('as contracted い variant (な）', function () {
          const verbs = [
            { surfaceForm: '殴りな', basicForm: '殴る', reading: 'ナグリナ' },
            { surfaceForm: 'なりな', basicForm: 'なる', reading: 'ナリナ' },
            { surfaceForm: '走りな', basicForm: '走る', reading: 'ハシリナ' },
            { surfaceForm: '作りな', basicForm: '作る', reading: 'ツクリナ' },
            { surfaceForm: '乗りな', basicForm: '乗る', reading: 'ノリナ' },
            { surfaceForm: '終わりな', basicForm: '終わる', reading: 'オワリナ' },
          ];
          runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
        });
      });

      describe('ConjugatedForm.TeForm', function () {
        const verbs = [
          { surfaceForm: '殴って', basicForm: '殴る', reading: 'ナグッテ' },
          { surfaceForm: 'なって', basicForm: 'なる', reading: 'ナッテ' },
          { surfaceForm: '走って', basicForm: '走る', reading: 'ハシッテ' },
          { surfaceForm: '作って', basicForm: '作る', reading: 'ツクッテ' },
          { surfaceForm: '乗って', basicForm: '乗る', reading: 'ノッテ' },
          { surfaceForm: '終わって', basicForm: '終わる', reading: 'オワッテ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
      });

      describe('ConjugatedForm.PastForm', function () {
        const verbs = [
          { surfaceForm: '殴った', basicForm: '殴る', reading: 'ナグッタ' },
          { surfaceForm: 'なった', basicForm: 'なる', reading: 'ナッタ' },
          { surfaceForm: '走った', basicForm: '走る', reading: 'ハシッタ' },
          { surfaceForm: '作った', basicForm: '作る', reading: 'ツクッタ' },
          { surfaceForm: '乗った', basicForm: '乗る', reading: 'ノッタ' },
          { surfaceForm: '終わった', basicForm: '終わる', reading: 'オワッタ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
      });

      describe('ConjugatedForm.PoliteForm', function () {
        const verbs = [
          { surfaceForm: '殴ります', basicForm: '殴る', reading: 'ナグリマス' },
          { surfaceForm: 'なります', basicForm: 'なる', reading: 'ナリマス' },
          { surfaceForm: '走ります', basicForm: '走る', reading: 'ハシリマス' },
          { surfaceForm: '作ります', basicForm: '作る', reading: 'ツクリマス' },
          { surfaceForm: '乗ります', basicForm: '乗る', reading: 'ノリマス' },
          { surfaceForm: '終わります', basicForm: '終わる', reading: 'オワリマス' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
      });
    });
  });
}