import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Ku', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '死ねば', basicForm: '死ぬ', reading: 'シネバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '死にゃ', basicForm: '死ぬ', reading: 'シニャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const verbs = [
        { surfaceForm: '死ぬ', basicForm: '死ぬ', reading: 'シヌ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '死のう', basicForm: '死ぬ', reading: 'シノウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '死なない', basicForm: '死ぬ', reading: 'シナナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      /* 
      // TODO: tricky to test because 死ねる has its own dictionary entry
      describe('as ね variant', function () {
        const verbs = [
          { surfaceForm: '死ね', basicForm: '死ぬ', reading: 'シネ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
      */

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '死になさい', basicForm: '死ぬ', reading: 'シニナサイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '死にな', basicForm: '死ぬ', reading: 'シニナ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '死んで', basicForm: '死ぬ', reading: 'シンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '死んだ', basicForm: '死ぬ', reading: 'シンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '死にます', basicForm: '死ぬ', reading: 'シニマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
    });

    describe('ConjugatedForm.Passive', function () {
      const verbs = [
        { surfaceForm: '死なれる', basicForm: '死ぬ', reading: 'シナレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Passive, context);
    });

    describe('ConjugatedForm.Causative', function () {
      const verbs = [
        { surfaceForm: '死なせる', basicForm: '死ぬ', reading: 'シナセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Causative, context);
    });

    describe('ConjugatedForm.CausativePassive', function () {
      const verbs = [
        { surfaceForm: '死なせられる', basicForm: '死ぬ', reading: 'シナセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.CausativePassive, context);
    });
  });
}