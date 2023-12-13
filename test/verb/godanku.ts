import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Ku', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '聞けば', basicForm: '聞く', reading: 'キケバ' },
        { surfaceForm: '書けば', basicForm: '書く', reading: 'カケバ' },
        { surfaceForm: '置けば', basicForm: '置く', reading: 'オケバ' },
        { surfaceForm: '歩けば', basicForm: '歩く', reading: 'アルケバ' },
        { surfaceForm: '働けば', basicForm: '働く', reading: 'ハタラケバ' },
        { surfaceForm: '着けば', basicForm: '着く', reading: 'ツケバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '聞きゃ', basicForm: '聞く', reading: 'キキャ' },
        { surfaceForm: '書きゃ', basicForm: '書く', reading: 'カキャ' },
        { surfaceForm: '置きゃ', basicForm: '置く', reading: 'オキャ' },
        { surfaceForm: '歩きゃ', basicForm: '歩く', reading: 'アルキャ' },
        { surfaceForm: '働きゃ', basicForm: '働く', reading: 'ハタラキャ' },
        { surfaceForm: '着きゃ', basicForm: '着く', reading: 'ツキャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
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

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '聞こう', basicForm: '聞く', reading: 'キコウ' },
        { surfaceForm: '書こう', basicForm: '書く', reading: 'カコウ' },
        { surfaceForm: '置こう', basicForm: '置く', reading: 'オコウ' },
        { surfaceForm: '歩こう', basicForm: '歩く', reading: 'アルコウ' },
        { surfaceForm: '働こう', basicForm: '働く', reading: 'ハタラコウ' },
        { surfaceForm: '着こう', basicForm: '着く', reading: 'ツコウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '聞かない', basicForm: '聞く', reading: 'キカナイ' },
        { surfaceForm: '書かない', basicForm: '書く', reading: 'カカナイ' },
        { surfaceForm: '置かない', basicForm: '置く', reading: 'オカナイ' },
        { surfaceForm: '歩かない', basicForm: '歩く', reading: 'アルカナイ' },
        { surfaceForm: '働かない', basicForm: '働く', reading: 'ハタラカナイ' },
        { surfaceForm: '着かない', basicForm: '着く', reading: 'ツカナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '聞きなさい', basicForm: '聞く', reading: 'キキナサイ' },
        { surfaceForm: '書きなさい', basicForm: '書く', reading: 'カキナサイ' },
        { surfaceForm: '置きなさい', basicForm: '置く', reading: 'オキナサイ' },
        { surfaceForm: '歩きなさい', basicForm: '歩く', reading: 'アルキナサイ' },
        { surfaceForm: '働きなさい', basicForm: '働く', reading: 'ハタラキナサイ' },
        { surfaceForm: '着きなさい', basicForm: '着く', reading: 'ツキナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '聞きな', basicForm: '聞く', reading: 'キキナ' },
        { surfaceForm: '書きな', basicForm: '書く', reading: 'カキナ' },
        { surfaceForm: '置きな', basicForm: '置く', reading: 'オキナ' },
        { surfaceForm: '歩きな', basicForm: '歩く', reading: 'アルキナ' },
        { surfaceForm: '働きな', basicForm: '働く', reading: 'ハタラキナ' },
        { surfaceForm: '着きな', basicForm: '着く', reading: 'ツキナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '聞いて', basicForm: '聞く', reading: 'キイテ' },
        { surfaceForm: '書いて', basicForm: '書く', reading: 'カイテ' },
        { surfaceForm: '置いて', basicForm: '置く', reading: 'オイテ' },
        { surfaceForm: '歩いて', basicForm: '歩く', reading: 'アルイテ' },
        { surfaceForm: '働いて', basicForm: '働く', reading: 'ハタライテ' },
        { surfaceForm: '着いて', basicForm: '着く', reading: 'ツイテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '聞いた', basicForm: '聞く', reading: 'キイタ' },
        { surfaceForm: '書いた', basicForm: '書く', reading: 'カイタ' },
        { surfaceForm: '置いた', basicForm: '置く', reading: 'オイタ' },
        { surfaceForm: '歩いた', basicForm: '歩く', reading: 'アルイタ' },
        { surfaceForm: '働いた', basicForm: '働く', reading: 'ハタライタ' },
        { surfaceForm: '着いた', basicForm: '着く', reading: 'ツイタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '聞きます', basicForm: '聞く', reading: 'キキマス' },
        { surfaceForm: '書きます', basicForm: '書く', reading: 'カキマス' },
        { surfaceForm: '置きます', basicForm: '置く', reading: 'オキマス' },
        { surfaceForm: '歩きます', basicForm: '歩く', reading: 'アルキマス' },
        { surfaceForm: '働きます', basicForm: '働く', reading: 'ハタラキマス' },
        { surfaceForm: '着きます', basicForm: '着く', reading: 'ツキマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '聞かれる', basicForm: '聞く', reading: 'キカレル' },
        { surfaceForm: '書かれる', basicForm: '書く', reading: 'カカレル' },
        { surfaceForm: '置かれる', basicForm: '置く', reading: 'オカレル' },
        { surfaceForm: '歩かれる', basicForm: '歩く', reading: 'アルカレル' },
        { surfaceForm: '働かれる', basicForm: '働く', reading: 'ハタラカレル' },
        { surfaceForm: '着かれる', basicForm: '着く', reading: 'ツカレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '聞かせる', basicForm: '聞く', reading: 'キカセル' },
        { surfaceForm: '書かせる', basicForm: '書く', reading: 'カカセル' },
        { surfaceForm: '置かせる', basicForm: '置く', reading: 'オカセル' },
        { surfaceForm: '歩かせる', basicForm: '歩く', reading: 'アルカセル' },
        { surfaceForm: '吹かせる', basicForm: '吹く', reading: 'フカセル' },
        { surfaceForm: '着かせる', basicForm: '着く', reading: 'ツカセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '聞かせられる', basicForm: '聞く', reading: 'キカセラレル' },
        { surfaceForm: '書かせられる', basicForm: '書く', reading: 'カカセラレル' },
        { surfaceForm: '置かせられる', basicForm: '置く', reading: 'オカセラレル' },
        { surfaceForm: '歩かせられる', basicForm: '歩く', reading: 'アルカセラレル' },
        { surfaceForm: '吹かせられる', basicForm: '吹く', reading: 'フカセラレル' },
        { surfaceForm: '着かせられる', basicForm: '着く', reading: 'ツカセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });
  });
}