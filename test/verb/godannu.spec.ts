import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in く', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '死ねば', baseForm: '死ぬ', reading: 'シネバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '死にゃ', baseForm: '死ぬ', reading: 'シニャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '死ぬ', baseForm: '死ぬ', reading: 'シヌ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '死のう', baseForm: '死ぬ', reading: 'シノウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '死なない', baseForm: '死ぬ', reading: 'シナナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('ず', () => {
      const verbs = [
        { surfaceForm: '死なず', baseForm: "死ぬ", reading: 'シナズ' },
        { surfaceForm: '死なずに', baseForm: "死ぬ", reading: 'シナズニ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: tricky to test imperative form because 死ねる has its own dictionary entry

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '死になさい', baseForm: '死ぬ', reading: 'シニナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '死にな', baseForm: '死ぬ', reading: 'シニナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '死んで', baseForm: '死ぬ', reading: 'シンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '死んじゃ', baseForm: '死ぬ', reading: 'シンジャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '死んだ', baseForm: '死ぬ', reading: 'シンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '死にます', baseForm: '死ぬ', reading: 'シニマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '死にません', baseForm: '死ぬ', reading: 'シニマセン' },
        { surfaceForm: '死にませんでした', baseForm: '死ぬ', reading: 'シニマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '死なれる', baseForm: '死ぬ', reading: 'シナレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '死なせる', baseForm: '死ぬ', reading: 'シナセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '死なせられる', baseForm: '死ぬ', reading: 'シナセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '死んでほしい', baseForm: '死ぬ', reading: 'シンデホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '死にやがる', baseForm: '死ぬ', reading: 'シニヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '死にまい', baseForm: '死ぬ', reading: 'シニマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}