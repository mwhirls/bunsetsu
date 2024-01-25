import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in つ', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '持てば', baseForm: '持つ', reading: 'モテバ' },
        { surfaceForm: '待てば', baseForm: '待つ', reading: 'マテバ' },
        { surfaceForm: '立てば', baseForm: '立つ', reading: 'タテバ' },
        { surfaceForm: '経てば', baseForm: '経つ', reading: 'タテバ' },
        { surfaceForm: '勝てば', baseForm: '勝つ', reading: 'カテバ' },
        { surfaceForm: '育てば', baseForm: '育つ', reading: 'ソダテバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '持ちゃ', baseForm: '持つ', reading: 'モチャ' },
        { surfaceForm: '待ちゃ', baseForm: '待つ', reading: 'マチャ' },
        { surfaceForm: '立ちゃ', baseForm: '立つ', reading: 'タチャ' },
        { surfaceForm: '打ちゃ', baseForm: '打つ', reading: 'ウチャ' },
        { surfaceForm: '勝ちゃ', baseForm: '勝つ', reading: 'カチャ' },
        { surfaceForm: '育ちゃ', baseForm: '育つ', reading: 'ソダチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '持つ', baseForm: '持つ', reading: 'モツ' },
        { surfaceForm: '待つ', baseForm: '待つ', reading: 'マツ' },
        { surfaceForm: '立つ', baseForm: '立つ', reading: 'タツ' },
        { surfaceForm: '打つ', baseForm: '打つ', reading: 'ウツ' },
        { surfaceForm: '勝つ', baseForm: '勝つ', reading: 'カツ' },
        { surfaceForm: '育つ', baseForm: '育つ', reading: 'ソダツ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '持とう', baseForm: '持つ', reading: 'モトウ' },
        { surfaceForm: '待とう', baseForm: '待つ', reading: 'マトウ' },
        { surfaceForm: '立とう', baseForm: '立つ', reading: 'タトウ' },
        { surfaceForm: '打とう', baseForm: '打つ', reading: 'ウトウ' },
        { surfaceForm: '勝とう', baseForm: '勝つ', reading: 'カトウ' },
        { surfaceForm: '育とう', baseForm: '育つ', reading: 'ソダトウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '持たない', baseForm: '持つ', reading: 'モタナイ' },
        { surfaceForm: '待たない', baseForm: '待つ', reading: 'マタナイ' },
        { surfaceForm: '立たない', baseForm: '立つ', reading: 'タタナイ' },
        { surfaceForm: '打たない', baseForm: '打つ', reading: 'ウタナイ' },
        { surfaceForm: '勝たない', baseForm: '勝つ', reading: 'カタナイ' },
        { surfaceForm: '育たない', baseForm: '育つ', reading: 'ソダタナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });


    // TODO: hard to test imperative form because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '持ちなさい', baseForm: '持つ', reading: 'モチナサイ' },
        { surfaceForm: '待ちなさい', baseForm: '待つ', reading: 'マチナサイ' },
        { surfaceForm: '立ちなさい', baseForm: '立つ', reading: 'タチナサイ' },
        { surfaceForm: '打ちなさい', baseForm: '打つ', reading: 'ウチナサイ' },
        { surfaceForm: '勝ちなさい', baseForm: '勝つ', reading: 'カチナサイ' },
        { surfaceForm: '育ちなさい', baseForm: '育つ', reading: 'ソダチナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '持ちな', baseForm: '持つ', reading: 'モチナ' },
        { surfaceForm: '待ちな', baseForm: '待つ', reading: 'マチナ' },
        { surfaceForm: '立ちな', baseForm: '立つ', reading: 'タチナ' },
        { surfaceForm: '打ちな', baseForm: '打つ', reading: 'ウチナ' },
        { surfaceForm: '保ちな', baseForm: '保つ', reading: 'タモチナ' },
        { surfaceForm: '育ちな', baseForm: '育つ', reading: 'ソダチナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '持って', baseForm: '持つ', reading: 'モッテ' },
        { surfaceForm: '待って', baseForm: '待つ', reading: 'マッテ' },
        { surfaceForm: '立って', baseForm: '立つ', reading: 'タッテ' },
        { surfaceForm: '打って', baseForm: '打つ', reading: 'ウッテ' },
        { surfaceForm: '勝って', baseForm: '勝つ', reading: 'カッテ' },
        { surfaceForm: '育って', baseForm: '育つ', reading: 'ソダッテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '持っちゃ', baseForm: '持つ', reading: 'モッチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '持った', baseForm: '持つ', reading: 'モッタ' },
        { surfaceForm: '待った', baseForm: '待つ', reading: 'マッタ' },
        { surfaceForm: '立った', baseForm: '立つ', reading: 'タッタ' },
        { surfaceForm: '打った', baseForm: '打つ', reading: 'ウッタ' },
        { surfaceForm: '勝った', baseForm: '勝つ', reading: 'カッタ' },
        { surfaceForm: '育った', baseForm: '育つ', reading: 'ソダッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '持ちます', baseForm: '持つ', reading: 'モチマス' },
        { surfaceForm: '待ちます', baseForm: '待つ', reading: 'マチマス' },
        { surfaceForm: '立ちます', baseForm: '立つ', reading: 'タチマス' },
        { surfaceForm: '打ちます', baseForm: '打つ', reading: 'ウチマス' },
        { surfaceForm: '勝ちます', baseForm: '勝つ', reading: 'カチマス' },
        { surfaceForm: '育ちます', baseForm: '育つ', reading: 'ソダチマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '持ちません', baseForm: '持つ', reading: 'モチマセン' },
        { surfaceForm: '持ちませんでした', baseForm: '持つ', reading: 'モチマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '持たれる', baseForm: '持つ', reading: 'モタレル' },
        { surfaceForm: '待たれる', baseForm: '待つ', reading: 'マタレル' },
        { surfaceForm: '立たれる', baseForm: '立つ', reading: 'タタレル' },
        { surfaceForm: '打たれる', baseForm: '打つ', reading: 'ウタレル' },
        { surfaceForm: '勝たれる', baseForm: '勝つ', reading: 'カタレル' },
        { surfaceForm: '育たれる', baseForm: '育つ', reading: 'ソダタレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '持たせる', baseForm: '持つ', reading: 'モタセル' },
        { surfaceForm: '待たせる', baseForm: '待つ', reading: 'マタセル' },
        { surfaceForm: '立たせる', baseForm: '立つ', reading: 'タタセル' },
        { surfaceForm: '打たせる', baseForm: '打つ', reading: 'ウタセル' },
        { surfaceForm: '勝たせる', baseForm: '勝つ', reading: 'カタセル' },
        { surfaceForm: '育たせる', baseForm: '育つ', reading: 'ソダタセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '持たせられる', baseForm: '持つ', reading: 'モタセラレル' },
        { surfaceForm: '待たせられる', baseForm: '待つ', reading: 'マタセラレル' },
        { surfaceForm: '立たせられる', baseForm: '立つ', reading: 'タタセラレル' },
        { surfaceForm: '打たせられる', baseForm: '打つ', reading: 'ウタセラレル' },
        { surfaceForm: '勝たせられる', baseForm: '勝つ', reading: 'カタセラレル' },
        { surfaceForm: '育たせられる', baseForm: '育つ', reading: 'ソダタセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '持ってほしい', baseForm: '持つ', reading: 'モッテホシイ' },
        { surfaceForm: '待ってほしい', baseForm: '待つ', reading: 'マッテホシイ' },
        { surfaceForm: '立ってほしい', baseForm: '立つ', reading: 'タッテホシイ' },
        { surfaceForm: '打ってほしい', baseForm: '打つ', reading: 'ウッテホシイ' },
        { surfaceForm: '勝ってほしい', baseForm: '勝つ', reading: 'カッテホシイ' },
        { surfaceForm: '育ってほしい', baseForm: '育つ', reading: 'ソダッテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '持ちまい', baseForm: '持つ', reading: 'モチマイ' },
        { surfaceForm: '待ちまい', baseForm: '待つ', reading: 'マチマイ' },
        { surfaceForm: '立ちまい', baseForm: '立つ', reading: 'タチマイ' },
        { surfaceForm: '打ちまい', baseForm: '打つ', reading: 'ウチマイ' },
        { surfaceForm: '育ちまい', baseForm: '育つ', reading: 'ソダチマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}