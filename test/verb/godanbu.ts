import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Bu', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '呼べば', basicForm: '呼ぶ', reading: 'ヨベバ' },
        { surfaceForm: '飛べば', basicForm: '飛ぶ', reading: 'トベバ' },
        { surfaceForm: '遊べば', basicForm: '遊ぶ', reading: 'アソベバ' },
        { surfaceForm: '並べば', basicForm: '並ぶ', reading: 'ナラベバ' },
        { surfaceForm: '選べば', basicForm: '選ぶ', reading: 'エラベバ' },
        { surfaceForm: '喜べば', basicForm: '喜ぶ', reading: 'ヨロコベバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '呼びゃ', basicForm: '呼ぶ', reading: 'ヨビャ' },
        { surfaceForm: '飛びゃ', basicForm: '飛ぶ', reading: 'トビャ' },
        { surfaceForm: '遊びゃ', basicForm: '遊ぶ', reading: 'アソビャ' },
        { surfaceForm: '並びゃ', basicForm: '並ぶ', reading: 'ナラビャ' },
        { surfaceForm: '選びゃ', basicForm: '選ぶ', reading: 'エラビャ' },
        { surfaceForm: '喜びゃ', basicForm: '喜ぶ', reading: 'ヨロコビャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
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

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '呼ぼう', basicForm: '呼ぶ', reading: 'ヨボウ' },
        { surfaceForm: '飛ぼう', basicForm: '飛ぶ', reading: 'トボウ' },
        { surfaceForm: '遊ぼう', basicForm: '遊ぶ', reading: 'アソボウ' },
        { surfaceForm: '並ぼう', basicForm: '並ぶ', reading: 'ナラボウ' },
        { surfaceForm: '選ぼう', basicForm: '選ぶ', reading: 'エラボウ' },
        { surfaceForm: '喜ぼう', basicForm: '喜ぶ', reading: 'ヨロコボウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
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

    describe('ConjugatedForm.Imperative', function () {
      // TODO: hard to test this because potential forms have their own
      // dictionary entries, and when they're in their continuative form
      // they look really similar to the imperative form
      /*
      describe('as べ variant', function () {
        const verbs = [
          { surfaceForm: '呼べ', basicForm: '呼ぶ', reading: 'ヨベ' },
          { surfaceForm: '飛べ', basicForm: '飛ぶ', reading: 'トベ' },
          { surfaceForm: '遊べ', basicForm: '遊ぶ', reading: 'アソベ' },
          { surfaceForm: '並べ', basicForm: '並ぶ', reading: 'ナラベ' },
          { surfaceForm: '選べ', basicForm: '選ぶ', reading: 'エラベ' },
          { surfaceForm: '喜べ', basicForm: '喜ぶ', reading: 'ヨロコベ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
      */
    });


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

    describe('ConjugatedForm.TeForm', function () {
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

    describe('ConjugatedForm.PastForm', function () {
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

    describe('ConjugatedForm.PoliteForm', function () {
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

    describe('ConjugatedForm.Passive', function () {
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

    describe('ConjugatedForm.Causative', function () {
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
    describe('ConjugatedForm.CausativePassive', function () {
      const verbs = [
        { surfaceForm: '呼ばせられる', basicForm: '呼ぶ', reading: 'ヨバセラレル' },
        { surfaceForm: '並ばせられる', basicForm: '並ぶ', reading: 'ナラバセラレル' },
        { surfaceForm: '選ばせられる', basicForm: '選ぶ', reading: 'エラバセラレル' },
        { surfaceForm: '喜ばせられる', basicForm: '喜ぶ', reading: 'ヨロコバセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });
  });
}