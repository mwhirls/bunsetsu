import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Ku', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '聞けば', basicForm: '聞く', reading: 'キケバ' },
        { surfaceForm: '書けば', basicForm: '書く', reading: 'カケバ' },
        { surfaceForm: '置けば', basicForm: '置く', reading: 'オケバ' },
        { surfaceForm: '歩けば', basicForm: '歩く', reading: 'アルケバ' },
        { surfaceForm: '働けば', basicForm: '働く', reading: 'ハタラケバ' },
        { surfaceForm: '着けば', basicForm: '着く', reading: 'ツケバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '聞きゃ', basicForm: '聞く', reading: 'キキャ' },
        { surfaceForm: '書きゃ', basicForm: '書く', reading: 'カキャ' },
        { surfaceForm: '置きゃ', basicForm: '置く', reading: 'オキャ' },
        { surfaceForm: '歩きゃ', basicForm: '歩く', reading: 'アルキャ' },
        { surfaceForm: '働きゃ', basicForm: '働く', reading: 'ハタラキャ' },
        { surfaceForm: '着きゃ', basicForm: '着く', reading: 'ツキャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const verbs = [
        { surfaceForm: '聞く', basicForm: '聞く', reading: 'キク' },
        { surfaceForm: '書く', basicForm: '書く', reading: 'カク' },
        { surfaceForm: '置く', basicForm: '置く', reading: 'オク' },
        { surfaceForm: '歩く', basicForm: '歩く', reading: 'アルク' },
        { surfaceForm: '働く', basicForm: '働く', reading: 'ハタラク' },
        { surfaceForm: '着く', basicForm: '着く', reading: 'ツク' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '聞こう', basicForm: '聞く', reading: 'キコウ' },
        { surfaceForm: '書こう', basicForm: '書く', reading: 'カコウ' },
        { surfaceForm: '置こう', basicForm: '置く', reading: 'オコウ' },
        { surfaceForm: '歩こう', basicForm: '歩く', reading: 'アルコウ' },
        { surfaceForm: '働こう', basicForm: '働く', reading: 'ハタラコウ' },
        { surfaceForm: '着こう', basicForm: '着く', reading: 'ツクコウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '聞かない', basicForm: '聞く', reading: 'キカナイ' },
        { surfaceForm: '書かない', basicForm: '書く', reading: 'カカナイ' },
        { surfaceForm: '置かない', basicForm: '置く', reading: 'オカナイ' },
        { surfaceForm: '歩かない', basicForm: '歩く', reading: 'アルカナイ' },
        { surfaceForm: '働かない', basicForm: '働く', reading: 'ハタラカナイ' },
        { surfaceForm: '着かない', basicForm: '着く', reading: 'ツクカナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      describe('as れ variant', function () {
        const verbs = [
          { surfaceForm: '聞け', basicForm: '聞く', reading: 'キケ' },
          { surfaceForm: '書け', basicForm: '書く', reading: 'カケ' },
          { surfaceForm: '置け', basicForm: '置く', reading: 'オケ' },
          { surfaceForm: '歩け', basicForm: '歩く', reading: 'アルケ' },
          { surfaceForm: '働け', basicForm: '働く', reading: 'ハタラケ' },
          { surfaceForm: '着け', basicForm: '着く', reading: 'ツクケ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '聞きなさい', basicForm: '聞く', reading: 'キキナサイ' },
          { surfaceForm: '書きなさい', basicForm: '書く', reading: 'カキナサイ' },
          { surfaceForm: '置きなさい', basicForm: '置く', reading: 'オキナサイ' },
          { surfaceForm: '歩きなさい', basicForm: '歩く', reading: 'アルキナサイ' },
          { surfaceForm: '働きなさい', basicForm: '働く', reading: 'ハタラキナサイ' },
          { surfaceForm: '着きなさい', basicForm: '着く', reading: 'ツクキナサイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '聞きな', basicForm: '聞く', reading: 'キキナ' },
          { surfaceForm: '書きな', basicForm: '書く', reading: 'カキナ' },
          { surfaceForm: '置きな', basicForm: '置く', reading: 'オキナ' },
          { surfaceForm: '歩きな', basicForm: '歩く', reading: 'アルキナ' },
          { surfaceForm: '働きな', basicForm: '働く', reading: 'ハタラキナ' },
          { surfaceForm: '着きな', basicForm: '着く', reading: 'ツクキナ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '聞いて', basicForm: '聞く', reading: 'キイテ' },
        { surfaceForm: '書いて', basicForm: '書く', reading: 'カイテ' },
        { surfaceForm: '置いて', basicForm: '置く', reading: 'オイテ' },
        { surfaceForm: '歩いて', basicForm: '歩く', reading: 'アルイテ' },
        { surfaceForm: '働いて', basicForm: '働く', reading: 'ハタライテ' },
        { surfaceForm: '着いて', basicForm: '着く', reading: 'ツクイテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '聞いた', basicForm: '聞く', reading: 'キイタ' },
        { surfaceForm: '書いた', basicForm: '書く', reading: 'カイタ' },
        { surfaceForm: '置いた', basicForm: '置く', reading: 'オイタ' },
        { surfaceForm: '歩いた', basicForm: '歩く', reading: 'アルイタ' },
        { surfaceForm: '働いた', basicForm: '働く', reading: 'ハタライタ' },
        { surfaceForm: '着いた', basicForm: '着く', reading: 'ツクイタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '聞きます', basicForm: '聞く', reading: 'キキマス' },
        { surfaceForm: '書きます', basicForm: '書く', reading: 'カキマス' },
        { surfaceForm: '置きます', basicForm: '置く', reading: 'オキマス' },
        { surfaceForm: '歩きます', basicForm: '歩く', reading: 'アルキマス' },
        { surfaceForm: '働きます', basicForm: '働く', reading: 'ハタラキマス' },
        { surfaceForm: '着きます', basicForm: '着く', reading: 'ツクキマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
    });

    describe('ConjugatedForm.Passive', function () {
      const verbs = [
        { surfaceForm: '聞かれる', basicForm: '聞く', reading: 'キカレル' },
        { surfaceForm: '書かれる', basicForm: '書く', reading: 'カカレル' },
        { surfaceForm: '置かれる', basicForm: '置く', reading: 'オカレル' },
        { surfaceForm: '歩かれる', basicForm: '歩く', reading: 'アルカレル' },
        { surfaceForm: '働かれる', basicForm: '働く', reading: 'ハタラカレル' },
        { surfaceForm: '着かれる', basicForm: '着く', reading: 'ツクカレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Passive, context);
    });

    describe('ConjugatedForm.Causative', function () {
      const verbs = [
        { surfaceForm: '聞かせる', basicForm: '聞く', reading: 'キカセル' },
        { surfaceForm: '書かせる', basicForm: '書く', reading: 'カカセル' },
        { surfaceForm: '置かせる', basicForm: '置く', reading: 'オカセル' },
        { surfaceForm: '歩かせる', basicForm: '歩く', reading: 'アルカセル' },
        { surfaceForm: '働かせる', basicForm: '働く', reading: 'ハタラカセル' },
        { surfaceForm: '着かせる', basicForm: '着く', reading: 'ツクカセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Causative, context);
    });

    describe('ConjugatedForm.CausativePassive', function () {
      const verbs = [
        { surfaceForm: '聞かせられる', basicForm: '聞く', reading: 'キカセラレル' },
        { surfaceForm: '書かせられる', basicForm: '書く', reading: 'カカセラレル' },
        { surfaceForm: '置かせられる', basicForm: '置く', reading: 'オカセラレル' },
        { surfaceForm: '歩かせられる', basicForm: '歩く', reading: 'アルカセラレル' },
        { surfaceForm: '働かせられる', basicForm: '働く', reading: 'ハタラカセラレル' },
        { surfaceForm: '着かせられる', basicForm: '着く', reading: 'ツクカセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.CausativePassive, context);
    });
  });
}