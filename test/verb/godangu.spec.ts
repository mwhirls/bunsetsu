import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in ぐ', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '泳げば', baseForm: '泳ぐ', reading: 'オヨゲバ' },
        { surfaceForm: '脱げば', baseForm: '脱ぐ', reading: 'ヌゲバ' },
        { surfaceForm: '騒げば', baseForm: '騒ぐ', reading: 'サワゲバ' },
        { surfaceForm: '注げば', baseForm: '注ぐ', reading: 'ソソゲバ' },
        { surfaceForm: '稼げば', baseForm: '稼ぐ', reading: 'カセゲバ' },
        { surfaceForm: '繋げば', baseForm: '繋ぐ', reading: 'ツナゲバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '泳ぎゃ', baseForm: '泳ぐ', reading: 'オヨギャ' },
        { surfaceForm: '脱ぎゃ', baseForm: '脱ぐ', reading: 'ヌギャ' },
        { surfaceForm: '騒ぎゃ', baseForm: '騒ぐ', reading: 'サワギャ' },
        { surfaceForm: '注ぎゃ', baseForm: '注ぐ', reading: 'ソソギャ' },
        { surfaceForm: '稼ぎゃ', baseForm: '稼ぐ', reading: 'カセギャ' },
        { surfaceForm: '繋ぎゃ', baseForm: '繋ぐ', reading: 'ツナギャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '泳ぐ', baseForm: '泳ぐ', reading: 'オヨグ' },
        { surfaceForm: '脱ぐ', baseForm: '脱ぐ', reading: 'ヌグ' },
        { surfaceForm: '騒ぐ', baseForm: '騒ぐ', reading: 'サワグ' },
        { surfaceForm: '注ぐ', baseForm: '注ぐ', reading: 'ソソグ' },
        { surfaceForm: '稼ぐ', baseForm: '稼ぐ', reading: 'カセグ' },
        { surfaceForm: '繋ぐ', baseForm: '繋ぐ', reading: 'ツナグ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '泳ごう', baseForm: '泳ぐ', reading: 'オヨゴウ' },
        { surfaceForm: '脱ごう', baseForm: '脱ぐ', reading: 'ヌゴウ' },
        { surfaceForm: '騒ごう', baseForm: '騒ぐ', reading: 'サワゴウ' },
        { surfaceForm: '注ごう', baseForm: '注ぐ', reading: 'ソソゴウ' },
        { surfaceForm: '稼ごう', baseForm: '稼ぐ', reading: 'カセゴウ' },
        { surfaceForm: '繋ごう', baseForm: '繋ぐ', reading: 'ツナゴウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '泳がない', baseForm: '泳ぐ', reading: 'オヨガナイ' },
        { surfaceForm: '脱がない', baseForm: '脱ぐ', reading: 'ヌガナイ' },
        { surfaceForm: '騒がない', baseForm: '騒ぐ', reading: 'サワガナイ' },
        { surfaceForm: '注がない', baseForm: '注ぐ', reading: 'ソソガナイ' },
        { surfaceForm: '稼がない', baseForm: '稼ぐ', reading: 'カセガナイ' },
        { surfaceForm: '防がない', baseForm: '防ぐ', reading: 'フセガナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('ず', () => {
      const verbs = [
        { surfaceForm: '泳がず', baseForm: "泳ぐ", reading: 'オヨガズ' },
        { surfaceForm: '泳がずに', baseForm: "泳ぐ", reading: 'オヨガズニ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '泳ぎなさい', baseForm: '泳ぐ', reading: 'オヨギナサイ' },
        { surfaceForm: '脱ぎなさい', baseForm: '脱ぐ', reading: 'ヌギナサイ' },
        { surfaceForm: '騒ぎなさい', baseForm: '騒ぐ', reading: 'サワギナサイ' },
        { surfaceForm: '注ぎなさい', baseForm: '注ぐ', reading: 'ソソギナサイ' },
        { surfaceForm: '稼ぎなさい', baseForm: '稼ぐ', reading: 'カセギナサイ' },
        { surfaceForm: '繋ぎなさい', baseForm: '繋ぐ', reading: 'ツナギナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '泳ぎな', baseForm: '泳ぐ', reading: 'オヨギナ' },
        { surfaceForm: '脱ぎな', baseForm: '脱ぐ', reading: 'ヌギナ' },
        { surfaceForm: '騒ぎな', baseForm: '騒ぐ', reading: 'サワギナ' },
        { surfaceForm: '注ぎな', baseForm: '注ぐ', reading: 'ソソギナ' },
        { surfaceForm: '稼ぎな', baseForm: '稼ぐ', reading: 'カセギナ' },
        { surfaceForm: '繋ぎな', baseForm: '繋ぐ', reading: 'ツナギナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });

  describe('te-form', function () {
    const verbs = [
      { surfaceForm: '泳いで', baseForm: '泳ぐ', reading: 'オヨイデ' },
      { surfaceForm: '脱いで', baseForm: '脱ぐ', reading: 'ヌイデ' },
      { surfaceForm: '騒いで', baseForm: '騒ぐ', reading: 'サワイデ' },
      { surfaceForm: '注いで', baseForm: '注ぐ', reading: 'ソソイデ' },
      { surfaceForm: '稼いで', baseForm: '稼ぐ', reading: 'カセイデ' },
      { surfaceForm: '繋いで', baseForm: '繋ぐ', reading: 'ツナイデ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
  });

  describe('ちゃ (ては contracted)', function () {
    const verbs = [
      { surfaceForm: '泳いじゃ', baseForm: '泳ぐ', reading: 'オヨイジャ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
  });

  describe('past form', function () {
    const verbs = [
      { surfaceForm: '泳いだ', baseForm: '泳ぐ', reading: 'オヨイダ' },
      { surfaceForm: '脱いだ', baseForm: '脱ぐ', reading: 'ヌイダ' },
      { surfaceForm: '騒いだ', baseForm: '騒ぐ', reading: 'サワイダ' },
      { surfaceForm: '注いだ', baseForm: '注ぐ', reading: 'ソソイダ' },
      { surfaceForm: '稼いだ', baseForm: '稼ぐ', reading: 'カセイダ' },
      { surfaceForm: '繋いだ', baseForm: '繋ぐ', reading: 'ツナイダ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
  });

  describe('polite form', function () {
    const verbs = [
      { surfaceForm: '泳ぎます', baseForm: '泳ぐ', reading: 'オヨギマス' },
      { surfaceForm: '脱ぎます', baseForm: '脱ぐ', reading: 'ヌギマス' },
      { surfaceForm: '騒ぎます', baseForm: '騒ぐ', reading: 'サワギマス' },
      { surfaceForm: '注ぎます', baseForm: '注ぐ', reading: 'ソソギマス' },
      { surfaceForm: '稼ぎます', baseForm: '稼ぐ', reading: 'カセギマス' },
      { surfaceForm: '繋ぎます', baseForm: '繋ぐ', reading: 'ツナギマス' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });

  describe('polite form (conjugated)', function () {
    const verbs = [
      { surfaceForm: '泳ぎません', baseForm: '泳ぐ', reading: 'オヨギマセン' },
      { surfaceForm: '泳ぎませんでした', baseForm: '泳ぐ', reading: 'オヨギマセンデシタ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });

  describe('passive form', function () {
    const verbs = [
      { surfaceForm: '泳がれる', baseForm: '泳ぐ', reading: 'オヨガレル' },
      { surfaceForm: '脱がれる', baseForm: '脱ぐ', reading: 'ヌガレル' },
      { surfaceForm: '騒がれる', baseForm: '騒ぐ', reading: 'サワガレル' },
      { surfaceForm: '注がれる', baseForm: '注ぐ', reading: 'ソソガレル' },
      { surfaceForm: '稼がれる', baseForm: '稼ぐ', reading: 'カセガレル' },
      { surfaceForm: '繋がれる', baseForm: '繋ぐ', reading: 'ツナガレル' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
  });
  describe('causative form', function () {
    // can be a bit tricky to test because some causative forms are considered
    // their own separate word
    const verbs = [
      { surfaceForm: '急がせる', baseForm: '急ぐ', reading: 'イソガセル' },
      { surfaceForm: '塞がせる', baseForm: '塞ぐ', reading: 'フサガセル' },
      { surfaceForm: '防がせる', baseForm: '防ぐ', reading: 'フセガセル' },
      { surfaceForm: '注がせる', baseForm: '注ぐ', reading: 'ソソガセル' },
      { surfaceForm: '稼がせる', baseForm: '稼ぐ', reading: 'カセガセル' },
      { surfaceForm: '繋がせる', baseForm: '繋ぐ', reading: 'ツナガセル' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
  });

  describe('causative-passive form', function () {
    // can be a bit tricky to test because some causative forms are considered
    // their own separate word
    const verbs = [
      { surfaceForm: '急がせられる', baseForm: '急ぐ', reading: 'イソガセラレル' },
      { surfaceForm: '塞がせられる', baseForm: '塞ぐ', reading: 'フサガセラレル' },
      { surfaceForm: '防がせられる', baseForm: '防ぐ', reading: 'フセガセラレル' },
      { surfaceForm: '注がせられる', baseForm: '注ぐ', reading: 'ソソガセラレル' },
      { surfaceForm: '稼がせられる', baseForm: '稼ぐ', reading: 'カセガセラレル' },
      { surfaceForm: '繋がせられる', baseForm: '繋ぐ', reading: 'ツナガセラレル' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
  });

  describe('てほしい', function () {
    const verbs = [
      { surfaceForm: '泳いでほしい', baseForm: '泳ぐ', reading: 'オヨイデホシイ' },
      { surfaceForm: '脱いでほしい', baseForm: '脱ぐ', reading: 'ヌイデホシイ' },
      { surfaceForm: '騒いでほしい', baseForm: '騒ぐ', reading: 'サワイデホシイ' },
      { surfaceForm: '注いでほしい', baseForm: '注ぐ', reading: 'ソソイデホシイ' },
      { surfaceForm: '稼いでほしい', baseForm: '稼ぐ', reading: 'カセイデホシイ' },
      { surfaceForm: '繋いでほしい', baseForm: '繋ぐ', reading: 'ツナイデホシイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
  });

  describe('たい', function () {
    const verbs = [
      { surfaceForm: '泳ぎたい', baseForm: '泳ぐ', reading: 'オヨギタイ' },
      { surfaceForm: '脱ぎたい', baseForm: '脱ぐ', reading: 'ヌギタイ' },
      { surfaceForm: '騒ぎたい', baseForm: '騒ぐ', reading: 'サワギタイ' },
      { surfaceForm: '注ぎたい', baseForm: '注ぐ', reading: 'ソソギタイ' },
      { surfaceForm: '稼ぎたい', baseForm: '稼ぐ', reading: 'カセギタイ' },
      { surfaceForm: '繋ぎたい', baseForm: '繋ぐ', reading: 'ツナギタイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });

  describe('たがる', function () {
    const verbs = [
      { surfaceForm: '泳ぎたがる', baseForm: '泳ぐ', reading: 'オヨギタガル' },
      { surfaceForm: '脱ぎたがる', baseForm: '脱ぐ', reading: 'ヌギタガル' },
      { surfaceForm: '騒ぎたがる', baseForm: '騒ぐ', reading: 'サワギタガル' },
      { surfaceForm: '注ぎたがる', baseForm: '注ぐ', reading: 'ソソギタガル' },
      { surfaceForm: '稼ぎたがる', baseForm: '稼ぐ', reading: 'カセギタガル' },
      { surfaceForm: '繋ぎたがる', baseForm: '繋ぐ', reading: 'ツナギタガル' },
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
      { surfaceForm: '泳ぎまい', baseForm: '泳ぐ', reading: 'オヨギマイ' },
      { surfaceForm: '脱ぎまい', baseForm: '脱ぐ', reading: 'ヌギマイ' },
      { surfaceForm: '騒ぎまい', baseForm: '騒ぐ', reading: 'サワギマイ' },
      { surfaceForm: '注ぎまい', baseForm: '注ぐ', reading: 'ソソギマイ' },
      { surfaceForm: '稼ぎまい', baseForm: '稼ぐ', reading: 'カセギマイ' },
      { surfaceForm: '繋ぎまい', baseForm: '繋ぐ', reading: 'ツナギマイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });
}