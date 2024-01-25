import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Ku', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '聞けば', baseForm: '聞く', reading: 'キケバ' },
        { surfaceForm: '書けば', baseForm: '書く', reading: 'カケバ' },
        { surfaceForm: '置けば', baseForm: '置く', reading: 'オケバ' },
        { surfaceForm: '歩けば', baseForm: '歩く', reading: 'アルケバ' },
        { surfaceForm: '働けば', baseForm: '働く', reading: 'ハタラケバ' },
        { surfaceForm: '着けば', baseForm: '着く', reading: 'ツケバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '聞きゃ', baseForm: '聞く', reading: 'キキャ' },
        { surfaceForm: '書きゃ', baseForm: '書く', reading: 'カキャ' },
        { surfaceForm: '置きゃ', baseForm: '置く', reading: 'オキャ' },
        { surfaceForm: '歩きゃ', baseForm: '歩く', reading: 'アルキャ' },
        { surfaceForm: '働きゃ', baseForm: '働く', reading: 'ハタラキャ' },
        { surfaceForm: '着きゃ', baseForm: '着く', reading: 'ツキャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '聞く', baseForm: '聞く', reading: 'キク' },
        { surfaceForm: '書く', baseForm: '書く', reading: 'カク' },
        { surfaceForm: '置く', baseForm: '置く', reading: 'オク' },
        { surfaceForm: '歩く', baseForm: '歩く', reading: 'アルク' },
        { surfaceForm: '働く', baseForm: '働く', reading: 'ハタラク' },
        { surfaceForm: '着く', baseForm: '着く', reading: 'ツク' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '聞こう', baseForm: '聞く', reading: 'キコウ' },
        { surfaceForm: '書こう', baseForm: '書く', reading: 'カコウ' },
        { surfaceForm: '置こう', baseForm: '置く', reading: 'オコウ' },
        { surfaceForm: '歩こう', baseForm: '歩く', reading: 'アルコウ' },
        { surfaceForm: '働こう', baseForm: '働く', reading: 'ハタラコウ' },
        { surfaceForm: '着こう', baseForm: '着く', reading: 'ツコウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '聞かない', baseForm: '聞く', reading: 'キカナイ' },
        { surfaceForm: '書かない', baseForm: '書く', reading: 'カカナイ' },
        { surfaceForm: '置かない', baseForm: '置く', reading: 'オカナイ' },
        { surfaceForm: '歩かない', baseForm: '歩く', reading: 'アルカナイ' },
        { surfaceForm: '働かない', baseForm: '働く', reading: 'ハタラカナイ' },
        { surfaceForm: '着かない', baseForm: '着く', reading: 'ツカナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '聞きなさい', baseForm: '聞く', reading: 'キキナサイ' },
        { surfaceForm: '書きなさい', baseForm: '書く', reading: 'カキナサイ' },
        { surfaceForm: '置きなさい', baseForm: '置く', reading: 'オキナサイ' },
        { surfaceForm: '歩きなさい', baseForm: '歩く', reading: 'アルキナサイ' },
        { surfaceForm: '働きなさい', baseForm: '働く', reading: 'ハタラキナサイ' },
        { surfaceForm: '着きなさい', baseForm: '着く', reading: 'ツキナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '聞きな', baseForm: '聞く', reading: 'キキナ' },
        { surfaceForm: '書きな', baseForm: '書く', reading: 'カキナ' },
        { surfaceForm: '置きな', baseForm: '置く', reading: 'オキナ' },
        { surfaceForm: '歩きな', baseForm: '歩く', reading: 'アルキナ' },
        { surfaceForm: '働きな', baseForm: '働く', reading: 'ハタラキナ' },
        { surfaceForm: '着きな', baseForm: '着く', reading: 'ツキナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '聞いて', baseForm: '聞く', reading: 'キイテ' },
        { surfaceForm: '書いて', baseForm: '書く', reading: 'カイテ' },
        { surfaceForm: '置いて', baseForm: '置く', reading: 'オイテ' },
        { surfaceForm: '歩いて', baseForm: '歩く', reading: 'アルイテ' },
        { surfaceForm: '働いて', baseForm: '働く', reading: 'ハタライテ' },
        { surfaceForm: '着いて', baseForm: '着く', reading: 'ツイテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '聞いちゃ', baseForm: '聞く', reading: 'キイチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '聞いた', baseForm: '聞く', reading: 'キイタ' },
        { surfaceForm: '書いた', baseForm: '書く', reading: 'カイタ' },
        { surfaceForm: '置いた', baseForm: '置く', reading: 'オイタ' },
        { surfaceForm: '歩いた', baseForm: '歩く', reading: 'アルイタ' },
        { surfaceForm: '働いた', baseForm: '働く', reading: 'ハタライタ' },
        { surfaceForm: '着いた', baseForm: '着く', reading: 'ツイタ' },
        { surfaceForm: '行った', baseForm: '行く', reading: 'イッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '聞きます', baseForm: '聞く', reading: 'キキマス' },
        { surfaceForm: '書きます', baseForm: '書く', reading: 'カキマス' },
        { surfaceForm: '置きます', baseForm: '置く', reading: 'オキマス' },
        { surfaceForm: '歩きます', baseForm: '歩く', reading: 'アルキマス' },
        { surfaceForm: '働きます', baseForm: '働く', reading: 'ハタラキマス' },
        { surfaceForm: '着きます', baseForm: '着く', reading: 'ツキマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '聞きません', baseForm: '聞く', reading: 'キキマセン' },
        { surfaceForm: '聞きませんでした', baseForm: '聞く', reading: 'キキマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '聞かれる', baseForm: '聞く', reading: 'キカレル' },
        { surfaceForm: '書かれる', baseForm: '書く', reading: 'カカレル' },
        { surfaceForm: '置かれる', baseForm: '置く', reading: 'オカレル' },
        { surfaceForm: '歩かれる', baseForm: '歩く', reading: 'アルカレル' },
        { surfaceForm: '働かれる', baseForm: '働く', reading: 'ハタラカレル' },
        { surfaceForm: '着かれる', baseForm: '着く', reading: 'ツカレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '聞かせる', baseForm: '聞く', reading: 'キカセル' },
        { surfaceForm: '書かせる', baseForm: '書く', reading: 'カカセル' },
        { surfaceForm: '置かせる', baseForm: '置く', reading: 'オカセル' },
        { surfaceForm: '歩かせる', baseForm: '歩く', reading: 'アルカセル' },
        { surfaceForm: '吹かせる', baseForm: '吹く', reading: 'フカセル' },
        { surfaceForm: '着かせる', baseForm: '着く', reading: 'ツカセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '聞かせられる', baseForm: '聞く', reading: 'キカセラレル' },
        { surfaceForm: '書かせられる', baseForm: '書く', reading: 'カカセラレル' },
        { surfaceForm: '置かせられる', baseForm: '置く', reading: 'オカセラレル' },
        { surfaceForm: '歩かせられる', baseForm: '歩く', reading: 'アルカセラレル' },
        { surfaceForm: '吹かせられる', baseForm: '吹く', reading: 'フカセラレル' },
        { surfaceForm: '着かせられる', baseForm: '着く', reading: 'ツカセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '聞いてほしい', baseForm: '聞く', reading: 'キイテホシイ' },
        { surfaceForm: '書いてほしい', baseForm: '書く', reading: 'カイテホシイ' },
        { surfaceForm: '置いてほしい', baseForm: '置く', reading: 'オイテホシイ' },
        { surfaceForm: '歩いてほしい', baseForm: '歩く', reading: 'アルイテホシイ' },
        { surfaceForm: '働いてほしい', baseForm: '働く', reading: 'ハタライテホシイ' },
        { surfaceForm: '着いてほしい', baseForm: '着く', reading: 'ツイテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '聞きやがる', baseForm: '聞く', reading: 'キキヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '聞きまい', baseForm: '聞く', reading: 'キキマイ' },
        { surfaceForm: '書きまい', baseForm: '書く', reading: 'カキマイ' },
        { surfaceForm: '置きまい', baseForm: '置く', reading: 'オキマイ' },
        { surfaceForm: '歩きまい', baseForm: '歩く', reading: 'アルキマイ' },
        { surfaceForm: '働きまい', baseForm: '働く', reading: 'ハタラキマイ' },
        { surfaceForm: '着きまい', baseForm: '着く', reading: 'ツキマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}