import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in く', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '死ねば', basicForm: '死ぬ', reading: 'シネバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '死にゃ', basicForm: '死ぬ', reading: 'シニャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '死ぬ', basicForm: '死ぬ', reading: 'シヌ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '死のう', basicForm: '死ぬ', reading: 'シノウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '死なない', basicForm: '死ぬ', reading: 'シナナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: tricky to test imperative form because 死ねる has its own dictionary entry

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '死になさい', basicForm: '死ぬ', reading: 'シニナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '死にな', basicForm: '死ぬ', reading: 'シニナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '死んで', basicForm: '死ぬ', reading: 'シンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '死んだ', basicForm: '死ぬ', reading: 'シンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '死にます', basicForm: '死ぬ', reading: 'シニマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '死なれる', basicForm: '死ぬ', reading: 'シナレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '死なせる', basicForm: '死ぬ', reading: 'シナセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '死なせられる', basicForm: '死ぬ', reading: 'シナセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '死んでほしい', basicForm: '死ぬ', reading: 'シンデホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '死にやがる', basicForm: '死ぬ', reading: 'シニヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '死にまい', basicForm: '死ぬ', reading: 'シニマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '死ぬまい', basicForm: '死ぬ', reading: 'シヌマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

  });
}