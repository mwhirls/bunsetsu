import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in ぶ', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '呼べば', baseForm: '呼ぶ', reading: 'ヨベバ' },
        { surfaceForm: '飛べば', baseForm: '飛ぶ', reading: 'トベバ' },
        { surfaceForm: '遊べば', baseForm: '遊ぶ', reading: 'アソベバ' },
        { surfaceForm: '並べば', baseForm: '並ぶ', reading: 'ナラベバ' },
        { surfaceForm: '選べば', baseForm: '選ぶ', reading: 'エラベバ' },
        { surfaceForm: '喜べば', baseForm: '喜ぶ', reading: 'ヨロコベバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '呼びゃ', baseForm: '呼ぶ', reading: 'ヨビャ' },
        { surfaceForm: '飛びゃ', baseForm: '飛ぶ', reading: 'トビャ' },
        { surfaceForm: '遊びゃ', baseForm: '遊ぶ', reading: 'アソビャ' },
        { surfaceForm: '並びゃ', baseForm: '並ぶ', reading: 'ナラビャ' },
        { surfaceForm: '選びゃ', baseForm: '選ぶ', reading: 'エラビャ' },
        { surfaceForm: '喜びゃ', baseForm: '喜ぶ', reading: 'ヨロコビャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '呼ぶ', baseForm: '呼ぶ', reading: 'ヨブ' },
        { surfaceForm: '飛ぶ', baseForm: '飛ぶ', reading: 'トブ' },
        { surfaceForm: '遊ぶ', baseForm: '遊ぶ', reading: 'アソブ' },
        { surfaceForm: '並ぶ', baseForm: '並ぶ', reading: 'ナラブ' },
        { surfaceForm: '選ぶ', baseForm: '選ぶ', reading: 'エラブ' },
        { surfaceForm: '喜ぶ', baseForm: '喜ぶ', reading: 'ヨロコブ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '呼ぼう', baseForm: '呼ぶ', reading: 'ヨボウ' },
        { surfaceForm: '飛ぼう', baseForm: '飛ぶ', reading: 'トボウ' },
        { surfaceForm: '遊ぼう', baseForm: '遊ぶ', reading: 'アソボウ' },
        { surfaceForm: '並ぼう', baseForm: '並ぶ', reading: 'ナラボウ' },
        { surfaceForm: '選ぼう', baseForm: '選ぶ', reading: 'エラボウ' },
        { surfaceForm: '喜ぼう', baseForm: '喜ぶ', reading: 'ヨロコボウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '呼ばない', baseForm: '呼ぶ', reading: 'ヨバナイ' },
        { surfaceForm: '飛ばない', baseForm: '飛ぶ', reading: 'トバナイ' },
        { surfaceForm: '遊ばない', baseForm: '遊ぶ', reading: 'アソバナイ' },
        { surfaceForm: '並ばない', baseForm: '並ぶ', reading: 'ナラバナイ' },
        { surfaceForm: '選ばない', baseForm: '選ぶ', reading: 'エラバナイ' },
        { surfaceForm: '喜ばない', baseForm: '喜ぶ', reading: 'ヨロコバナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '呼びなさい', baseForm: '呼ぶ', reading: 'ヨビナサイ' },
        { surfaceForm: '飛びなさい', baseForm: '飛ぶ', reading: 'トビナサイ' },
        { surfaceForm: '遊びなさい', baseForm: '遊ぶ', reading: 'アソビナサイ' },
        { surfaceForm: '並びなさい', baseForm: '並ぶ', reading: 'ナラビナサイ' },
        { surfaceForm: '選びなさい', baseForm: '選ぶ', reading: 'エラビナサイ' },
        { surfaceForm: '喜びなさい', baseForm: '喜ぶ', reading: 'ヨロコビナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '呼びな', baseForm: '呼ぶ', reading: 'ヨビナ' },
        { surfaceForm: '飛びな', baseForm: '飛ぶ', reading: 'トビナ' },
        { surfaceForm: '選びな', baseForm: '選ぶ', reading: 'エラビナ' },
        { surfaceForm: '喜びな', baseForm: '喜ぶ', reading: 'ヨロコビナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '呼んで', baseForm: '呼ぶ', reading: 'ヨンデ' },
        { surfaceForm: '飛んで', baseForm: '飛ぶ', reading: 'トンデ' },
        { surfaceForm: '遊んで', baseForm: '遊ぶ', reading: 'アソンデ' },
        { surfaceForm: '並んで', baseForm: '並ぶ', reading: 'ナランデ' },
        { surfaceForm: '選んで', baseForm: '選ぶ', reading: 'エランデ' },
        { surfaceForm: '喜んで', baseForm: '喜ぶ', reading: 'ヨロコンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '呼んじゃ', baseForm: '呼ぶ', reading: 'ヨンジャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '呼んだ', baseForm: '呼ぶ', reading: 'ヨンダ' },
        { surfaceForm: '飛んだ', baseForm: '飛ぶ', reading: 'トンダ' },
        { surfaceForm: '遊んだ', baseForm: '遊ぶ', reading: 'アソンダ' },
        { surfaceForm: '並んだ', baseForm: '並ぶ', reading: 'ナランダ' },
        { surfaceForm: '選んだ', baseForm: '選ぶ', reading: 'エランダ' },
        { surfaceForm: '喜んだ', baseForm: '喜ぶ', reading: 'ヨロコンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '呼びます', baseForm: '呼ぶ', reading: 'ヨビマス' },
        { surfaceForm: '飛びます', baseForm: '飛ぶ', reading: 'トビマス' },
        { surfaceForm: '遊びます', baseForm: '遊ぶ', reading: 'アソビマス' },
        { surfaceForm: '並びます', baseForm: '並ぶ', reading: 'ナラビマス' },
        { surfaceForm: '選びます', baseForm: '選ぶ', reading: 'エラビマス' },
        { surfaceForm: '喜びます', baseForm: '喜ぶ', reading: 'ヨロコビマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '呼ばれる', baseForm: '呼ぶ', reading: 'ヨバレル' },
        { surfaceForm: '飛ばれる', baseForm: '飛ぶ', reading: 'トバレル' },
        { surfaceForm: '遊ばれる', baseForm: '遊ぶ', reading: 'アソバレル' },
        { surfaceForm: '並ばれる', baseForm: '並ぶ', reading: 'ナラバレル' },
        { surfaceForm: '選ばれる', baseForm: '選ぶ', reading: 'エラバレル' },
        { surfaceForm: '喜ばれる', baseForm: '喜ぶ', reading: 'ヨロコバレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '呼びません', baseForm: '呼ぶ', reading: 'ヨビマセン' },
        { surfaceForm: '呼びませんでした', baseForm: '呼ぶ', reading: 'ヨビマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '呼ばせる', baseForm: '呼ぶ', reading: 'ヨバセル' },
        { surfaceForm: '飛ばせる', baseForm: '飛ぶ', reading: 'トバセル' },
        { surfaceForm: '遊ばせる', baseForm: '遊ぶ', reading: 'アソバセル' },
        { surfaceForm: '並ばせる', baseForm: '並ぶ', reading: 'ナラバセル' },
        { surfaceForm: '選ばせる', baseForm: '選ぶ', reading: 'エラバセル' },
        { surfaceForm: '喜ばせる', baseForm: '喜ぶ', reading: 'ヨロコバセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // can be a bit tricky to test because some causative forms are considered
    // their own separate word
    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '呼ばせられる', baseForm: '呼ぶ', reading: 'ヨバセラレル' },
        { surfaceForm: '並ばせられる', baseForm: '並ぶ', reading: 'ナラバセラレル' },
        { surfaceForm: '選ばせられる', baseForm: '選ぶ', reading: 'エラバセラレル' },
        { surfaceForm: '喜ばせられる', baseForm: '喜ぶ', reading: 'ヨロコバセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '呼んでほしい', baseForm: '呼ぶ', reading: 'ヨンデホシイ' },
        { surfaceForm: '飛んでほしい', baseForm: '飛ぶ', reading: 'トンデホシイ' },
        { surfaceForm: '遊んでほしい', baseForm: '遊ぶ', reading: 'アソンデホシイ' },
        { surfaceForm: '並んでほしい', baseForm: '並ぶ', reading: 'ナランデホシイ' },
        { surfaceForm: '選んでほしい', baseForm: '選ぶ', reading: 'エランデホシイ' },
        { surfaceForm: '喜んでほしい', baseForm: '喜ぶ', reading: 'ヨロコンデホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('たい', function () {
      const verbs = [
        { surfaceForm: '呼びたい', baseForm: '呼ぶ', reading: 'ヨビタイ' },
        { surfaceForm: '飛びたい', baseForm: '飛ぶ', reading: 'トビタイ' },
        { surfaceForm: '遊びたい', baseForm: '遊ぶ', reading: 'アソビタイ' },
        { surfaceForm: '並びたい', baseForm: '並ぶ', reading: 'ナラビタイ' },
        { surfaceForm: '選びたい', baseForm: '選ぶ', reading: 'エラビタイ' },
        { surfaceForm: '喜びたい', baseForm: '喜ぶ', reading: 'ヨロコビタイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('たがる', function () {
      const verbs = [
        { surfaceForm: '呼びたがる', baseForm: '呼ぶ', reading: 'ヨビタガル' },
        { surfaceForm: '飛びたがる', baseForm: '飛ぶ', reading: 'トビタガル' },
        { surfaceForm: '並びたがる', baseForm: '並ぶ', reading: 'ナラビタガル' },
        { surfaceForm: '選びたがる', baseForm: '選ぶ', reading: 'エラビタガル' },
        { surfaceForm: '喜びたがる', baseForm: '喜ぶ', reading: 'ヨロコビタガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '飛びやがる', baseForm: '飛ぶ', reading: 'トビヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '呼びまい', baseForm: '呼ぶ', reading: 'ヨビマイ' },
        { surfaceForm: '飛びまい', baseForm: '飛ぶ', reading: 'トビマイ' },
        { surfaceForm: '並びまい', baseForm: '並ぶ', reading: 'ナラビマイ' },
        { surfaceForm: '選びまい', baseForm: '選ぶ', reading: 'エラビマイ' },
        { surfaceForm: '喜びまい', baseForm: '喜ぶ', reading: 'ヨロコビマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}