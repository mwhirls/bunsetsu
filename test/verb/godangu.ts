import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in ぐ', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '泳げば', basicForm: '泳ぐ', reading: 'オヨゲバ' },
        { surfaceForm: '脱げば', basicForm: '脱ぐ', reading: 'ヌゲバ' },
        { surfaceForm: '騒げば', basicForm: '騒ぐ', reading: 'サワゲバ' },
        { surfaceForm: '注げば', basicForm: '注ぐ', reading: 'ソソゲバ' },
        { surfaceForm: '稼げば', basicForm: '稼ぐ', reading: 'カセゲバ' },
        { surfaceForm: '繋げば', basicForm: '繋ぐ', reading: 'ツナゲバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '泳ぎゃ', basicForm: '泳ぐ', reading: 'オヨギャ' },
        { surfaceForm: '脱ぎゃ', basicForm: '脱ぐ', reading: 'ヌギャ' },
        { surfaceForm: '騒ぎゃ', basicForm: '騒ぐ', reading: 'サワギャ' },
        { surfaceForm: '注ぎゃ', basicForm: '注ぐ', reading: 'ソソギャ' },
        { surfaceForm: '稼ぎゃ', basicForm: '稼ぐ', reading: 'カセギャ' },
        { surfaceForm: '繋ぎゃ', basicForm: '繋ぐ', reading: 'ツナギャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '泳ぐ', basicForm: '泳ぐ', reading: 'オヨグ' },
        { surfaceForm: '脱ぐ', basicForm: '脱ぐ', reading: 'ヌグ' },
        { surfaceForm: '騒ぐ', basicForm: '騒ぐ', reading: 'サワグ' },
        { surfaceForm: '注ぐ', basicForm: '注ぐ', reading: 'ソソグ' },
        { surfaceForm: '稼ぐ', basicForm: '稼ぐ', reading: 'カセグ' },
        { surfaceForm: '繋ぐ', basicForm: '繋ぐ', reading: 'ツナグ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '泳ごう', basicForm: '泳ぐ', reading: 'オヨゴウ' },
        { surfaceForm: '脱ごう', basicForm: '脱ぐ', reading: 'ヌゴウ' },
        { surfaceForm: '騒ごう', basicForm: '騒ぐ', reading: 'サワゴウ' },
        { surfaceForm: '注ごう', basicForm: '注ぐ', reading: 'ソソゴウ' },
        { surfaceForm: '稼ごう', basicForm: '稼ぐ', reading: 'カセゴウ' },
        { surfaceForm: '繋ごう', basicForm: '繋ぐ', reading: 'ツナゴウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '泳がない', basicForm: '泳ぐ', reading: 'オヨガナイ' },
        { surfaceForm: '脱がない', basicForm: '脱ぐ', reading: 'ヌガナイ' },
        { surfaceForm: '騒がない', basicForm: '騒ぐ', reading: 'サワガナイ' },
        { surfaceForm: '注がない', basicForm: '注ぐ', reading: 'ソソガナイ' },
        { surfaceForm: '稼がない', basicForm: '稼ぐ', reading: 'カセガナイ' },
        { surfaceForm: '防がない', basicForm: '防ぐ', reading: 'フセガナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '泳ぎなさい', basicForm: '泳ぐ', reading: 'オヨギナサイ' },
        { surfaceForm: '脱ぎなさい', basicForm: '脱ぐ', reading: 'ヌギナサイ' },
        { surfaceForm: '騒ぎなさい', basicForm: '騒ぐ', reading: 'サワギナサイ' },
        { surfaceForm: '注ぎなさい', basicForm: '注ぐ', reading: 'ソソギナサイ' },
        { surfaceForm: '稼ぎなさい', basicForm: '稼ぐ', reading: 'カセギナサイ' },
        { surfaceForm: '繋ぎなさい', basicForm: '繋ぐ', reading: 'ツナギナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '泳ぎな', basicForm: '泳ぐ', reading: 'オヨギナ' },
        { surfaceForm: '脱ぎな', basicForm: '脱ぐ', reading: 'ヌギナ' },
        { surfaceForm: '騒ぎな', basicForm: '騒ぐ', reading: 'サワギナ' },
        { surfaceForm: '注ぎな', basicForm: '注ぐ', reading: 'ソソギナ' },
        { surfaceForm: '稼ぎな', basicForm: '稼ぐ', reading: 'カセギナ' },
        { surfaceForm: '繋ぎな', basicForm: '繋ぐ', reading: 'ツナギナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });

  describe('te-form', function () {
    const verbs = [
      { surfaceForm: '泳いで', basicForm: '泳ぐ', reading: 'オヨイデ' },
      { surfaceForm: '脱いで', basicForm: '脱ぐ', reading: 'ヌイデ' },
      { surfaceForm: '騒いで', basicForm: '騒ぐ', reading: 'サワイデ' },
      { surfaceForm: '注いで', basicForm: '注ぐ', reading: 'ソソイデ' },
      { surfaceForm: '稼いで', basicForm: '稼ぐ', reading: 'カセイデ' },
      { surfaceForm: '繋いで', basicForm: '繋ぐ', reading: 'ツナイデ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
  });

  describe('past form', function () {
    const verbs = [
      { surfaceForm: '泳いだ', basicForm: '泳ぐ', reading: 'オヨイダ' },
      { surfaceForm: '脱いだ', basicForm: '脱ぐ', reading: 'ヌイダ' },
      { surfaceForm: '騒いだ', basicForm: '騒ぐ', reading: 'サワイダ' },
      { surfaceForm: '注いだ', basicForm: '注ぐ', reading: 'ソソイダ' },
      { surfaceForm: '稼いだ', basicForm: '稼ぐ', reading: 'カセイダ' },
      { surfaceForm: '繋いだ', basicForm: '繋ぐ', reading: 'ツナイダ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
  });

  describe('polite form', function () {
    const verbs = [
      { surfaceForm: '泳ぎます', basicForm: '泳ぐ', reading: 'オヨギマス' },
      { surfaceForm: '脱ぎます', basicForm: '脱ぐ', reading: 'ヌギマス' },
      { surfaceForm: '騒ぎます', basicForm: '騒ぐ', reading: 'サワギマス' },
      { surfaceForm: '注ぎます', basicForm: '注ぐ', reading: 'ソソギマス' },
      { surfaceForm: '稼ぎます', basicForm: '稼ぐ', reading: 'カセギマス' },
      { surfaceForm: '繋ぎます', basicForm: '繋ぐ', reading: 'ツナギマス' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });

  describe('passive form', function () {
    const verbs = [
      { surfaceForm: '泳がれる', basicForm: '泳ぐ', reading: 'オヨガレル' },
      { surfaceForm: '脱がれる', basicForm: '脱ぐ', reading: 'ヌガレル' },
      { surfaceForm: '騒がれる', basicForm: '騒ぐ', reading: 'サワガレル' },
      { surfaceForm: '注がれる', basicForm: '注ぐ', reading: 'ソソガレル' },
      { surfaceForm: '稼がれる', basicForm: '稼ぐ', reading: 'カセガレル' },
      { surfaceForm: '繋がれる', basicForm: '繋ぐ', reading: 'ツナガレル' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
  });
  describe('causative form', function () {
    // can be a bit tricky to test because some causative forms are considered
    // their own separate word
    const verbs = [
      { surfaceForm: '急がせる', basicForm: '急ぐ', reading: 'イソガセル' },
      { surfaceForm: '塞がせる', basicForm: '塞ぐ', reading: 'フサガセル' },
      { surfaceForm: '防がせる', basicForm: '防ぐ', reading: 'フセガセル' },
      { surfaceForm: '注がせる', basicForm: '注ぐ', reading: 'ソソガセル' },
      { surfaceForm: '稼がせる', basicForm: '稼ぐ', reading: 'カセガセル' },
      { surfaceForm: '繋がせる', basicForm: '繋ぐ', reading: 'ツナガセル' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
  });

  describe('causative-passive form', function () {
    // can be a bit tricky to test because some causative forms are considered
    // their own separate word
    const verbs = [
      { surfaceForm: '急がせられる', basicForm: '急ぐ', reading: 'イソガセラレル' },
      { surfaceForm: '塞がせられる', basicForm: '塞ぐ', reading: 'フサガセラレル' },
      { surfaceForm: '防がせられる', basicForm: '防ぐ', reading: 'フセガセラレル' },
      { surfaceForm: '注がせられる', basicForm: '注ぐ', reading: 'ソソガセラレル' },
      { surfaceForm: '稼がせられる', basicForm: '稼ぐ', reading: 'カセガセラレル' },
      { surfaceForm: '繋がせられる', basicForm: '繋ぐ', reading: 'ツナガセラレル' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
  });

  describe('てほしい', function () {
    const verbs = [
      { surfaceForm: '泳いでほしい', basicForm: '泳ぐ', reading: 'オヨイデホシイ' },
      { surfaceForm: '脱いでほしい', basicForm: '脱ぐ', reading: 'ヌイデホシイ' },
      { surfaceForm: '騒いでほしい', basicForm: '騒ぐ', reading: 'サワイデホシイ' },
      { surfaceForm: '注いでほしい', basicForm: '注ぐ', reading: 'ソソイデホシイ' },
      { surfaceForm: '稼いでほしい', basicForm: '稼ぐ', reading: 'カセイデホシイ' },
      { surfaceForm: '繋いでほしい', basicForm: '繋ぐ', reading: 'ツナイデホシイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
  });

  describe('たい', function () {
    const verbs = [
      { surfaceForm: '泳ぎたい', basicForm: '泳ぐ', reading: 'オヨギタイ' },
      { surfaceForm: '脱ぎたい', basicForm: '脱ぐ', reading: 'ヌギタイ' },
      { surfaceForm: '騒ぎたい', basicForm: '騒ぐ', reading: 'サワギタイ' },
      { surfaceForm: '注ぎたい', basicForm: '注ぐ', reading: 'ソソギタイ' },
      { surfaceForm: '稼ぎたい', basicForm: '稼ぐ', reading: 'カセギタイ' },
      { surfaceForm: '繋ぎたい', basicForm: '繋ぐ', reading: 'ツナギタイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });

  describe('たがる', function () {
    const verbs = [
      { surfaceForm: '泳ぎたがる', basicForm: '泳ぐ', reading: 'オヨギタガル' },
      { surfaceForm: '脱ぎたがる', basicForm: '脱ぐ', reading: 'ヌギタガル' },
      { surfaceForm: '騒ぎたがる', basicForm: '騒ぐ', reading: 'サワギタガル' },
      { surfaceForm: '注ぎたがる', basicForm: '注ぐ', reading: 'ソソギタガル' },
      { surfaceForm: '稼ぎたがる', basicForm: '稼ぐ', reading: 'カセギタガル' },
      { surfaceForm: '繋ぎたがる', basicForm: '繋ぐ', reading: 'ツナギタガル' },
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
      { surfaceForm: '泳ぎまい', basicForm: '泳ぐ', reading: 'オヨギマイ' },
      { surfaceForm: '脱ぎまい', basicForm: '脱ぐ', reading: 'ヌギマイ' },
      { surfaceForm: '騒ぎまい', basicForm: '騒ぐ', reading: 'サワギマイ' },
      { surfaceForm: '注ぎまい', basicForm: '注ぐ', reading: 'ソソギマイ' },
      { surfaceForm: '稼ぎまい', basicForm: '稼ぐ', reading: 'カセギマイ' },
      { surfaceForm: '繋ぎまい', basicForm: '繋ぐ', reading: 'ツナギマイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
  });

  describe('まい after plain form', function () {
    const verbs = [
      { surfaceForm: '泳ぐまい', basicForm: '泳ぐ', reading: 'オヨグマイ' },
      { surfaceForm: '脱ぐまい', basicForm: '脱ぐ', reading: 'ヌグマイ' },
      { surfaceForm: '騒ぐまい', basicForm: '騒ぐ', reading: 'サワグマイ' },
      { surfaceForm: '注ぐまい', basicForm: '注ぐ', reading: 'ソソグマイ' },
      { surfaceForm: '稼ぐまい', basicForm: '稼ぐ', reading: 'カセグマイ' },
      { surfaceForm: '繋ぐまい', basicForm: '繋ぐ', reading: 'ツナグマイ' },
    ];
    runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
  });
}