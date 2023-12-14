import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in ぶ', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '呼べば', basicForm: '呼ぶ', reading: 'ヨベバ' },
        { surfaceForm: '飛べば', basicForm: '飛ぶ', reading: 'トベバ' },
        { surfaceForm: '遊べば', basicForm: '遊ぶ', reading: 'アソベバ' },
        { surfaceForm: '並べば', basicForm: '並ぶ', reading: 'ナラベバ' },
        { surfaceForm: '選べば', basicForm: '選ぶ', reading: 'エラベバ' },
        { surfaceForm: '喜べば', basicForm: '喜ぶ', reading: 'ヨロコベバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '呼びゃ', basicForm: '呼ぶ', reading: 'ヨビャ' },
        { surfaceForm: '飛びゃ', basicForm: '飛ぶ', reading: 'トビャ' },
        { surfaceForm: '遊びゃ', basicForm: '遊ぶ', reading: 'アソビャ' },
        { surfaceForm: '並びゃ', basicForm: '並ぶ', reading: 'ナラビャ' },
        { surfaceForm: '選びゃ', basicForm: '選ぶ', reading: 'エラビャ' },
        { surfaceForm: '喜びゃ', basicForm: '喜ぶ', reading: 'ヨロコビャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '呼ぶ', basicForm: '呼ぶ', reading: 'ヨブ' },
        { surfaceForm: '飛ぶ', basicForm: '飛ぶ', reading: 'トブ' },
        { surfaceForm: '遊ぶ', basicForm: '遊ぶ', reading: 'アソブ' },
        { surfaceForm: '並ぶ', basicForm: '並ぶ', reading: 'ナラブ' },
        { surfaceForm: '選ぶ', basicForm: '選ぶ', reading: 'エラブ' },
        { surfaceForm: '喜ぶ', basicForm: '喜ぶ', reading: 'ヨロコブ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '呼ぼう', basicForm: '呼ぶ', reading: 'ヨボウ' },
        { surfaceForm: '飛ぼう', basicForm: '飛ぶ', reading: 'トボウ' },
        { surfaceForm: '遊ぼう', basicForm: '遊ぶ', reading: 'アソボウ' },
        { surfaceForm: '並ぼう', basicForm: '並ぶ', reading: 'ナラボウ' },
        { surfaceForm: '選ぼう', basicForm: '選ぶ', reading: 'エラボウ' },
        { surfaceForm: '喜ぼう', basicForm: '喜ぶ', reading: 'ヨロコボウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '呼ばない', basicForm: '呼ぶ', reading: 'ヨバナイ' },
        { surfaceForm: '飛ばない', basicForm: '飛ぶ', reading: 'トバナイ' },
        { surfaceForm: '遊ばない', basicForm: '遊ぶ', reading: 'アソバナイ' },
        { surfaceForm: '並ばない', basicForm: '並ぶ', reading: 'ナラバナイ' },
        { surfaceForm: '選ばない', basicForm: '選ぶ', reading: 'エラバナイ' },
        { surfaceForm: '喜ばない', basicForm: '喜ぶ', reading: 'ヨロコバナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '呼びなさい', basicForm: '呼ぶ', reading: 'ヨビナサイ' },
        { surfaceForm: '飛びなさい', basicForm: '飛ぶ', reading: 'トビナサイ' },
        { surfaceForm: '遊びなさい', basicForm: '遊ぶ', reading: 'アソビナサイ' },
        { surfaceForm: '並びなさい', basicForm: '並ぶ', reading: 'ナラビナサイ' },
        { surfaceForm: '選びなさい', basicForm: '選ぶ', reading: 'エラビナサイ' },
        { surfaceForm: '喜びなさい', basicForm: '喜ぶ', reading: 'ヨロコビナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '呼びな', basicForm: '呼ぶ', reading: 'ヨビナ' },
        { surfaceForm: '飛びな', basicForm: '飛ぶ', reading: 'トビナ' },
        { surfaceForm: '選びな', basicForm: '選ぶ', reading: 'エラビナ' },
        { surfaceForm: '喜びな', basicForm: '喜ぶ', reading: 'ヨロコビナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '呼んで', basicForm: '呼ぶ', reading: 'ヨンデ' },
        { surfaceForm: '飛んで', basicForm: '飛ぶ', reading: 'トンデ' },
        { surfaceForm: '遊んで', basicForm: '遊ぶ', reading: 'アソンデ' },
        { surfaceForm: '並んで', basicForm: '並ぶ', reading: 'ナランデ' },
        { surfaceForm: '選んで', basicForm: '選ぶ', reading: 'エランデ' },
        { surfaceForm: '喜んで', basicForm: '喜ぶ', reading: 'ヨロコンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '呼んだ', basicForm: '呼ぶ', reading: 'ヨンダ' },
        { surfaceForm: '飛んだ', basicForm: '飛ぶ', reading: 'トンダ' },
        { surfaceForm: '遊んだ', basicForm: '遊ぶ', reading: 'アソンダ' },
        { surfaceForm: '並んだ', basicForm: '並ぶ', reading: 'ナランダ' },
        { surfaceForm: '選んだ', basicForm: '選ぶ', reading: 'エランダ' },
        { surfaceForm: '喜んだ', basicForm: '喜ぶ', reading: 'ヨロコンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '呼びます', basicForm: '呼ぶ', reading: 'ヨビマス' },
        { surfaceForm: '飛びます', basicForm: '飛ぶ', reading: 'トビマス' },
        { surfaceForm: '遊びます', basicForm: '遊ぶ', reading: 'アソビマス' },
        { surfaceForm: '並びます', basicForm: '並ぶ', reading: 'ナラビマス' },
        { surfaceForm: '選びます', basicForm: '選ぶ', reading: 'エラビマス' },
        { surfaceForm: '喜びます', basicForm: '喜ぶ', reading: 'ヨロコビマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '呼ばれる', basicForm: '呼ぶ', reading: 'ヨバレル' },
        { surfaceForm: '飛ばれる', basicForm: '飛ぶ', reading: 'トバレル' },
        { surfaceForm: '遊ばれる', basicForm: '遊ぶ', reading: 'アソバレル' },
        { surfaceForm: '並ばれる', basicForm: '並ぶ', reading: 'ナラバレル' },
        { surfaceForm: '選ばれる', basicForm: '選ぶ', reading: 'エラバレル' },
        { surfaceForm: '喜ばれる', basicForm: '喜ぶ', reading: 'ヨロコバレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '呼びません', basicForm: '呼ぶ', reading: 'ヨビマセン' },
        { surfaceForm: '呼びませんでした', basicForm: '呼ぶ', reading: 'ヨビマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '呼ばせる', basicForm: '呼ぶ', reading: 'ヨバセル' },
        { surfaceForm: '飛ばせる', basicForm: '飛ぶ', reading: 'トバセル' },
        { surfaceForm: '遊ばせる', basicForm: '遊ぶ', reading: 'アソバセル' },
        { surfaceForm: '並ばせる', basicForm: '並ぶ', reading: 'ナラバセル' },
        { surfaceForm: '選ばせる', basicForm: '選ぶ', reading: 'エラバセル' },
        { surfaceForm: '喜ばせる', basicForm: '喜ぶ', reading: 'ヨロコバセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // can be a bit tricky to test because some causative forms are considered
    // their own separate word
    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '呼ばせられる', basicForm: '呼ぶ', reading: 'ヨバセラレル' },
        { surfaceForm: '並ばせられる', basicForm: '並ぶ', reading: 'ナラバセラレル' },
        { surfaceForm: '選ばせられる', basicForm: '選ぶ', reading: 'エラバセラレル' },
        { surfaceForm: '喜ばせられる', basicForm: '喜ぶ', reading: 'ヨロコバセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '呼んでほしい', basicForm: '呼ぶ', reading: 'ヨンデホシイ' },
        { surfaceForm: '飛んでほしい', basicForm: '飛ぶ', reading: 'トンデホシイ' },
        { surfaceForm: '遊んでほしい', basicForm: '遊ぶ', reading: 'アソンデホシイ' },
        { surfaceForm: '並んでほしい', basicForm: '並ぶ', reading: 'ナランデホシイ' },
        { surfaceForm: '選んでほしい', basicForm: '選ぶ', reading: 'エランデホシイ' },
        { surfaceForm: '喜んでほしい', basicForm: '喜ぶ', reading: 'ヨロコンデホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('たい', function () {
      const verbs = [
        { surfaceForm: '呼びたい', basicForm: '呼ぶ', reading: 'ヨビタイ' },
        { surfaceForm: '飛びたい', basicForm: '飛ぶ', reading: 'トビタイ' },
        { surfaceForm: '遊びたい', basicForm: '遊ぶ', reading: 'アソビタイ' },
        { surfaceForm: '並びたい', basicForm: '並ぶ', reading: 'ナラビタイ' },
        { surfaceForm: '選びたい', basicForm: '選ぶ', reading: 'エラビタイ' },
        { surfaceForm: '喜びたい', basicForm: '喜ぶ', reading: 'ヨロコビタイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('たがる', function () {
      const verbs = [
        { surfaceForm: '呼びたがる', basicForm: '呼ぶ', reading: 'ヨビタガル' },
        { surfaceForm: '飛びたがる', basicForm: '飛ぶ', reading: 'トビタガル' },
        { surfaceForm: '並びたがる', basicForm: '並ぶ', reading: 'ナラビタガル' },
        { surfaceForm: '選びたがる', basicForm: '選ぶ', reading: 'エラビタガル' },
        { surfaceForm: '喜びたがる', basicForm: '喜ぶ', reading: 'ヨロコビタガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '飛びやがる', basicForm: '飛ぶ', reading: 'トビヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '呼びまい', basicForm: '呼ぶ', reading: 'ヨビマイ' },
        { surfaceForm: '飛びまい', basicForm: '飛ぶ', reading: 'トビマイ' },
        { surfaceForm: '並びまい', basicForm: '並ぶ', reading: 'ナラビマイ' },
        { surfaceForm: '選びまい', basicForm: '選ぶ', reading: 'エラビマイ' },
        { surfaceForm: '喜びまい', basicForm: '喜ぶ', reading: 'ヨロコビマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい after plain form', function () {
      const verbs = [
        { surfaceForm: '呼ぶまい', basicForm: '呼ぶ', reading: 'ヨブマイ' },
        { surfaceForm: '飛ぶまい', basicForm: '飛ぶ', reading: 'トブマイ' },
        { surfaceForm: '遊ぶまい', basicForm: '遊ぶ', reading: 'アソブマイ' },
        { surfaceForm: '並ぶまい', basicForm: '並ぶ', reading: 'ナラブマイ' },
        { surfaceForm: '選ぶまい', basicForm: '選ぶ', reading: 'エラブマイ' },
        { surfaceForm: '喜ぶまい', basicForm: '喜ぶ', reading: 'ヨロコブマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

  });
}