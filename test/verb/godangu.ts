import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Gu', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '泳げば', basicForm: '泳ぐ', reading: 'オヨゲバ' },
        { surfaceForm: '脱げば', basicForm: '脱ぐ', reading: 'ヌゲバ' },
        { surfaceForm: '騒げば', basicForm: '騒ぐ', reading: 'サワゲバ' },
        { surfaceForm: '注げば', basicForm: '注ぐ', reading: 'ソソゲバ' },
        { surfaceForm: '稼げば', basicForm: '稼ぐ', reading: 'カセゲバ' },
        { surfaceForm: '繋げば', basicForm: '繋ぐ', reading: 'ツナゲバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '泳ぎゃ', basicForm: '泳ぐ', reading: 'オヨギャ' },
        { surfaceForm: '脱ぎゃ', basicForm: '脱ぐ', reading: 'ヌギャ' },
        { surfaceForm: '騒ぎゃ', basicForm: '騒ぐ', reading: 'サワギャ' },
        { surfaceForm: '注ぎゃ', basicForm: '注ぐ', reading: 'ソソギャ' },
        { surfaceForm: '稼ぎゃ', basicForm: '稼ぐ', reading: 'カセギャ' },
        { surfaceForm: '繋ぎゃ', basicForm: '繋ぐ', reading: 'ツナギャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
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

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '泳ごう', basicForm: '泳ぐ', reading: 'オヨゴウ' },
        { surfaceForm: '脱ごう', basicForm: '脱ぐ', reading: 'ヌゴウ' },
        { surfaceForm: '騒ごう', basicForm: '騒ぐ', reading: 'サワゴウ' },
        { surfaceForm: '注ごう', basicForm: '注ぐ', reading: 'ソソゴウ' },
        { surfaceForm: '稼ごう', basicForm: '稼ぐ', reading: 'カセゴウ' },
        { surfaceForm: '繋ごう', basicForm: '繋ぐ', reading: 'ツナゴウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '泳がない', basicForm: '泳ぐ', reading: 'オヨガナイ' },
        { surfaceForm: '脱がない', basicForm: '脱ぐ', reading: 'ヌガナイ' },
        { surfaceForm: '騒がない', basicForm: '騒ぐ', reading: 'サワガナイ' },
        { surfaceForm: '注がない', basicForm: '注ぐ', reading: 'ソソガナイ' },
        { surfaceForm: '稼がない', basicForm: '稼ぐ', reading: 'カセガナイ' },
        { surfaceForm: '防がない', basicForm: '防ぐ', reading: 'フセガナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      // TODO: hard to test this because potential forms have their own
      // dictionary entries, and when they're in their continuative form
      // they look really similar to the imperative form
      /* 
      describe('as げ variant', function () {
        const verbs = [
          { surfaceForm: '泳げ', basicForm: '泳ぐ', reading: 'オヨゲ' },
          { surfaceForm: '脱げ', basicForm: '脱ぐ', reading: 'ヌゲ' },
          { surfaceForm: '騒げ', basicForm: '騒ぐ', reading: 'サワゲ' },
          { surfaceForm: '注げ', basicForm: '注ぐ', reading: 'ソソゲ' },
          { surfaceForm: '稼げ', basicForm: '稼ぐ', reading: 'カセゲ' },
          { surfaceForm: '繋げ', basicForm: '繋ぐ', reading: 'ツナゲ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
      */

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '泳ぎなさい', basicForm: '泳ぐ', reading: 'オヨギナサイ' },
          { surfaceForm: '脱ぎなさい', basicForm: '脱ぐ', reading: 'ヌギナサイ' },
          { surfaceForm: '騒ぎなさい', basicForm: '騒ぐ', reading: 'サワギナサイ' },
          { surfaceForm: '注ぎなさい', basicForm: '注ぐ', reading: 'ソソギナサイ' },
          { surfaceForm: '稼ぎなさい', basicForm: '稼ぐ', reading: 'カセギナサイ' },
          { surfaceForm: '繋ぎなさい', basicForm: '繋ぐ', reading: 'ツナギナサイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '泳ぎな', basicForm: '泳ぐ', reading: 'オヨギナ' },
          { surfaceForm: '脱ぎな', basicForm: '脱ぐ', reading: 'ヌギナ' },
          { surfaceForm: '騒ぎな', basicForm: '騒ぐ', reading: 'サワギナ' },
          { surfaceForm: '注ぎな', basicForm: '注ぐ', reading: 'ソソギナ' },
          { surfaceForm: '稼ぎな', basicForm: '稼ぐ', reading: 'カセギナ' },
          { surfaceForm: '繋ぎな', basicForm: '繋ぐ', reading: 'ツナギナ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '泳いで', basicForm: '泳ぐ', reading: 'オヨイデ' },
        { surfaceForm: '脱いで', basicForm: '脱ぐ', reading: 'ヌイデ' },
        { surfaceForm: '騒いで', basicForm: '騒ぐ', reading: 'サワイデ' },
        { surfaceForm: '注いで', basicForm: '注ぐ', reading: 'ソソイデ' },
        { surfaceForm: '稼いで', basicForm: '稼ぐ', reading: 'カセイデ' },
        { surfaceForm: '繋いで', basicForm: '繋ぐ', reading: 'ツナイデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '泳いだ', basicForm: '泳ぐ', reading: 'オヨイダ' },
        { surfaceForm: '脱いだ', basicForm: '脱ぐ', reading: 'ヌイダ' },
        { surfaceForm: '騒いだ', basicForm: '騒ぐ', reading: 'サワイダ' },
        { surfaceForm: '注いだ', basicForm: '注ぐ', reading: 'ソソイダ' },
        { surfaceForm: '稼いだ', basicForm: '稼ぐ', reading: 'カセイダ' },
        { surfaceForm: '繋いだ', basicForm: '繋ぐ', reading: 'ツナイダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '泳ぎます', basicForm: '泳ぐ', reading: 'オヨギマス' },
        { surfaceForm: '脱ぎます', basicForm: '脱ぐ', reading: 'ヌギマス' },
        { surfaceForm: '騒ぎます', basicForm: '騒ぐ', reading: 'サワギマス' },
        { surfaceForm: '注ぎます', basicForm: '注ぐ', reading: 'ソソギマス' },
        { surfaceForm: '稼ぎます', basicForm: '稼ぐ', reading: 'カセギマス' },
        { surfaceForm: '繋ぎます', basicForm: '繋ぐ', reading: 'ツナギマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
    });

    describe('ConjugatedForm.Passive', function () {
      const verbs = [
        { surfaceForm: '泳がれる', basicForm: '泳ぐ', reading: 'オヨガレル' },
        { surfaceForm: '脱がれる', basicForm: '脱ぐ', reading: 'ヌガレル' },
        { surfaceForm: '騒がれる', basicForm: '騒ぐ', reading: 'サワガレル' },
        { surfaceForm: '注がれる', basicForm: '注ぐ', reading: 'ソソガレル' },
        { surfaceForm: '稼がれる', basicForm: '稼ぐ', reading: 'カセガレル' },
        { surfaceForm: '繋がれる', basicForm: '繋ぐ', reading: 'ツナガレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Passive, context);
    });
    describe('ConjugatedForm.Causative', function () {
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
      runTest(verbs, bunsetsu.ConjugatedForm.Causative, context);
    });

    describe('ConjugatedForm.CausativePassive', function () {
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
      runTest(verbs, bunsetsu.ConjugatedForm.CausativePassive, context);
    });
  });
}