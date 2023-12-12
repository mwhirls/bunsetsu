import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Tsu', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '持てば', basicForm: '持つ', reading: 'モテバ' },
        { surfaceForm: '待てば', basicForm: '待つ', reading: 'マテバ' },
        { surfaceForm: '立てば', basicForm: '立つ', reading: 'タテバ' },
        { surfaceForm: '打てば', basicForm: '打つ', reading: 'ウテバ' },
        { surfaceForm: '勝てば', basicForm: '勝つ', reading: 'カテバ' },
        { surfaceForm: '育てば', basicForm: '育つ', reading: 'ソダテバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '持ちゃ', basicForm: '持つ', reading: 'モチャ' },
        { surfaceForm: '待ちゃ', basicForm: '待つ', reading: 'マチャ' },
        { surfaceForm: '立ちゃ', basicForm: '立つ', reading: 'タチャ' },
        { surfaceForm: '打ちゃ', basicForm: '打つ', reading: 'ウチャ' },
        { surfaceForm: '勝ちゃ', basicForm: '勝つ', reading: 'カチャ' },
        { surfaceForm: '育ちゃ', basicForm: '育つ', reading: 'ソダチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const verbs = [
        { surfaceForm: '持つ', basicForm: '持つ', reading: 'モツ' },
        { surfaceForm: '待つ', basicForm: '待つ', reading: 'マツ' },
        { surfaceForm: '立つ', basicForm: '立つ', reading: 'タツ' },
        { surfaceForm: '打つ', basicForm: '打つ', reading: 'ウツ' },
        { surfaceForm: '勝つ', basicForm: '勝つ', reading: 'カツ' },
        { surfaceForm: '育つ', basicForm: '育つ', reading: 'ソダツ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '持とう', basicForm: '持つ', reading: 'モトウ' },
        { surfaceForm: '待とう', basicForm: '待つ', reading: 'マトウ' },
        { surfaceForm: '立とう', basicForm: '立つ', reading: 'タトウ' },
        { surfaceForm: '打とう', basicForm: '打つ', reading: 'ウトウ' },
        { surfaceForm: '勝とう', basicForm: '勝つ', reading: 'カトウ' },
        { surfaceForm: '育とう', basicForm: '育つ', reading: 'ソダトウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '持たない', basicForm: '持つ', reading: 'モタナイ' },
        { surfaceForm: '待たない', basicForm: '待つ', reading: 'マタナイ' },
        { surfaceForm: '立たない', basicForm: '立つ', reading: 'タタナイ' },
        { surfaceForm: '打たない', basicForm: '打つ', reading: 'ウタナイ' },
        { surfaceForm: '勝たない', basicForm: '勝つ', reading: 'カタナイ' },
        { surfaceForm: '育たない', basicForm: '育つ', reading: 'ソダタナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      describe('as て variant', function () {
        const verbs = [
          { surfaceForm: '持て', basicForm: '持つ', reading: 'モテ' },
          { surfaceForm: '待て', basicForm: '待つ', reading: 'マテ' },
          { surfaceForm: '立て', basicForm: '立つ', reading: 'タテ' },
          { surfaceForm: '打て', basicForm: '打つ', reading: 'ウテ' },
          { surfaceForm: '勝て', basicForm: '勝つ', reading: 'カテ' },
          { surfaceForm: '育て', basicForm: '育つ', reading: 'ソダテ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '持ちなさい', basicForm: '持つ', reading: 'モチナサイ' },
          { surfaceForm: '待ちなさい', basicForm: '待つ', reading: 'マチナサイ' },
          { surfaceForm: '立ちなさい', basicForm: '立つ', reading: 'タチナサイ' },
          { surfaceForm: '打ちなさい', basicForm: '打つ', reading: 'ウチナサイ' },
          { surfaceForm: '勝ちなさい', basicForm: '勝つ', reading: 'カチナサイ' },
          { surfaceForm: '育ちなさい', basicForm: '育つ', reading: 'ソダチナサイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '持ちな', basicForm: '持つ', reading: 'モチナ' },
          { surfaceForm: '待ちな', basicForm: '待つ', reading: 'マチナ' },
          { surfaceForm: '立ちな', basicForm: '立つ', reading: 'タチナ' },
          { surfaceForm: '打ちな', basicForm: '打つ', reading: 'ウチナ' },
          { surfaceForm: '勝ちな', basicForm: '勝つ', reading: 'カチナ' },
          { surfaceForm: '育ちな', basicForm: '育つ', reading: 'ソダチナ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '持って', basicForm: '持つ', reading: 'モッテ' },
        { surfaceForm: '待って', basicForm: '待つ', reading: 'マッテ' },
        { surfaceForm: '立って', basicForm: '立つ', reading: 'タッテ' },
        { surfaceForm: '打って', basicForm: '打つ', reading: 'ウッテ' },
        { surfaceForm: '勝って', basicForm: '勝つ', reading: 'カッテ' },
        { surfaceForm: '育って', basicForm: '育つ', reading: 'ソダッテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '持った', basicForm: '持つ', reading: 'モッタ' },
        { surfaceForm: '待った', basicForm: '待つ', reading: 'マッタ' },
        { surfaceForm: '立った', basicForm: '立つ', reading: 'タッタ' },
        { surfaceForm: '打った', basicForm: '打つ', reading: 'ウッタ' },
        { surfaceForm: '勝った', basicForm: '勝つ', reading: 'カッタ' },
        { surfaceForm: '育った', basicForm: '育つ', reading: 'ソダッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '持ちます', basicForm: '持つ', reading: 'モチマス' },
        { surfaceForm: '待ちます', basicForm: '待つ', reading: 'マチマス' },
        { surfaceForm: '立ちます', basicForm: '立つ', reading: 'タチマス' },
        { surfaceForm: '打ちます', basicForm: '打つ', reading: 'ウチマス' },
        { surfaceForm: '勝ちます', basicForm: '勝つ', reading: 'カチマス' },
        { surfaceForm: '育ちます', basicForm: '育つ', reading: 'ソダチマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
    });

    describe('ConjugatedForm.Passive', function () {
      const verbs = [
        { surfaceForm: '持たれる', basicForm: '持つ', reading: 'モタレル' },
        { surfaceForm: '待たれる', basicForm: '待つ', reading: 'マタレル' },
        { surfaceForm: '立たれる', basicForm: '立つ', reading: 'タタレル' },
        { surfaceForm: '打たれる', basicForm: '打つ', reading: 'ウタレル' },
        { surfaceForm: '勝たれる', basicForm: '勝つ', reading: 'カタレル' },
        { surfaceForm: '育たれる', basicForm: '育つ', reading: 'ソダタレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Passive, context);
    });

    describe('ConjugatedForm.Causative', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '持たせる', basicForm: '持つ', reading: 'モタセル' },
        { surfaceForm: '待たせる', basicForm: '待つ', reading: 'マタセル' },
        { surfaceForm: '立たせる', basicForm: '立つ', reading: 'タタセル' },
        { surfaceForm: '打たせる', basicForm: '打つ', reading: 'ウタセル' },
        { surfaceForm: '勝たせる', basicForm: '勝つ', reading: 'カタセル' },
        { surfaceForm: '育たせる', basicForm: '育つ', reading: 'ソダタセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Causative, context);
    });

    describe('ConjugatedForm.CausativePassive', function () {
      const verbs = [
        { surfaceForm: '持たせられる', basicForm: '持つ', reading: 'モタセラレル' },
        { surfaceForm: '待たせられる', basicForm: '待つ', reading: 'マタセラレル' },
        { surfaceForm: '立たせられる', basicForm: '立つ', reading: 'タタセラレル' },
        { surfaceForm: '打たせられる', basicForm: '打つ', reading: 'ウタセラレル' },
        { surfaceForm: '勝たせられる', basicForm: '勝つ', reading: 'カタセラレル' },
        { surfaceForm: '育たせられる', basicForm: '育つ', reading: 'ソダタセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.CausativePassive, context);
    });
  });
}