import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in す', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '話せば', baseForm: '話す', reading: 'ハナセバ' },
        { surfaceForm: '出せば', baseForm: '出す', reading: 'ダセバ' },
        { surfaceForm: '返せば', baseForm: '返す', reading: 'カエセバ' },
        { surfaceForm: '押せば', baseForm: '押す', reading: 'オセバ' },
        { surfaceForm: '渡せば', baseForm: '渡す', reading: 'ワタセバ' },
        { surfaceForm: '貸せば', baseForm: '貸す', reading: 'カセバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '話しゃ', baseForm: '話す', reading: 'ハナシャ' },
        { surfaceForm: '出しゃ', baseForm: '出す', reading: 'ダシャ' },
        { surfaceForm: '返しゃ', baseForm: '返す', reading: 'カエシャ' },
        { surfaceForm: '押しゃ', baseForm: '押す', reading: 'オシャ' },
        { surfaceForm: '渡しゃ', baseForm: '渡す', reading: 'ワタシャ' },
        { surfaceForm: '貸しゃ', baseForm: '貸す', reading: 'カシャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '話す', baseForm: '話す', reading: 'ハナス' },
        { surfaceForm: '出す', baseForm: '出す', reading: 'ダス' },
        { surfaceForm: '返す', baseForm: '返す', reading: 'カエス' },
        { surfaceForm: '押す', baseForm: '押す', reading: 'オス' },
        { surfaceForm: '渡す', baseForm: '渡す', reading: 'ワタス' },
        { surfaceForm: '貸す', baseForm: '貸す', reading: 'カス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '話そう', baseForm: '話す', reading: 'ハナソウ' },
        { surfaceForm: '出そう', baseForm: '出す', reading: 'ダソウ' },
        { surfaceForm: '返そう', baseForm: '返す', reading: 'カエソウ' },
        { surfaceForm: '押そう', baseForm: '押す', reading: 'オソウ' },
        { surfaceForm: '渡そう', baseForm: '渡す', reading: 'ワタソウ' },
        { surfaceForm: '貸そう', baseForm: '貸す', reading: 'カソウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '話さない', baseForm: '話す', reading: 'ハナサナイ' },
        { surfaceForm: '出さない', baseForm: '出す', reading: 'ダサナイ' },
        { surfaceForm: '返さない', baseForm: '返す', reading: 'カエサナイ' },
        { surfaceForm: '押さない', baseForm: '押す', reading: 'オサナイ' },
        { surfaceForm: '渡さない', baseForm: '渡す', reading: 'ワタサナイ' },
        { surfaceForm: '貸さない', baseForm: '貸す', reading: 'カサナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('ず', () => {
      const verbs = [
        { surfaceForm: '話さず', baseForm: "話す", reading: 'ハナサズ' },
        { surfaceForm: '話さずに', baseForm: "話す", reading: 'ハナサズニ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative form because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '話しなさい', baseForm: '話す', reading: 'ハナシナサイ' },
        { surfaceForm: '出しなさい', baseForm: '出す', reading: 'ダシナサイ' },
        { surfaceForm: '返しなさい', baseForm: '返す', reading: 'カエシナサイ' },
        { surfaceForm: '押しなさい', baseForm: '押す', reading: 'オシナサイ' },
        { surfaceForm: '渡しなさい', baseForm: '渡す', reading: 'ワタシナサイ' },
        { surfaceForm: '貸しなさい', baseForm: '貸す', reading: 'カシナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '話しな', baseForm: '話す', reading: 'ハナシナ' },
        { surfaceForm: '出しな', baseForm: '出す', reading: 'ダシナ' },
        { surfaceForm: '返しな', baseForm: '返す', reading: 'カエシナ' },
        { surfaceForm: '押しな', baseForm: '押す', reading: 'オシナ' },
        { surfaceForm: '渡しな', baseForm: '渡す', reading: 'ワタシナ' },
        { surfaceForm: '貸しな', baseForm: '貸す', reading: 'カシナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '話して', baseForm: '話す', reading: 'ハナシテ' },
        { surfaceForm: '出して', baseForm: '出す', reading: 'ダシテ' },
        { surfaceForm: '返して', baseForm: '返す', reading: 'カエシテ' },
        { surfaceForm: '押して', baseForm: '押す', reading: 'オシテ' },
        { surfaceForm: '渡して', baseForm: '渡す', reading: 'ワタシテ' },
        { surfaceForm: '貸して', baseForm: '貸す', reading: 'カシテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '話しちゃ', baseForm: '話す', reading: 'ハナシチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '話した', baseForm: '話す', reading: 'ハナシタ' },
        { surfaceForm: '出した', baseForm: '出す', reading: 'ダシタ' },
        { surfaceForm: '返した', baseForm: '返す', reading: 'カエシタ' },
        { surfaceForm: '押した', baseForm: '押す', reading: 'オシタ' },
        { surfaceForm: '渡した', baseForm: '渡す', reading: 'ワタシタ' },
        { surfaceForm: '貸した', baseForm: '貸す', reading: 'カシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '話します', baseForm: '話す', reading: 'ハナシマス' },
        { surfaceForm: '出します', baseForm: '出す', reading: 'ダシマス' },
        { surfaceForm: '返します', baseForm: '返す', reading: 'カエシマス' },
        { surfaceForm: '押します', baseForm: '押す', reading: 'オシマス' },
        { surfaceForm: '渡します', baseForm: '渡す', reading: 'ワタシマス' },
        { surfaceForm: '貸します', baseForm: '貸す', reading: 'カシマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '話しません', baseForm: '話す', reading: 'ハナシマセン' },
        { surfaceForm: '話しませんでした', baseForm: '話す', reading: 'ハナシマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '話される', baseForm: '話す', reading: 'ハナサレル' },
        { surfaceForm: '出される', baseForm: '出す', reading: 'ダサレル' },
        { surfaceForm: '返される', baseForm: '返す', reading: 'カエサレル' },
        { surfaceForm: '押される', baseForm: '押す', reading: 'オサレル' },
        { surfaceForm: '渡される', baseForm: '渡す', reading: 'ワタサレル' },
        { surfaceForm: '貸される', baseForm: '貸す', reading: 'カサレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '話させる', baseForm: '話す', reading: 'ハナサセル' },
        { surfaceForm: '出させる', baseForm: '出す', reading: 'ダサセル' },
        { surfaceForm: '返させる', baseForm: '返す', reading: 'カエサセル' },
        { surfaceForm: '押させる', baseForm: '押す', reading: 'オサセル' },
        { surfaceForm: '渡させる', baseForm: '渡す', reading: 'ワタサセル' },
        { surfaceForm: '貸させる', baseForm: '貸す', reading: 'カサセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '話させられる', baseForm: '話す', reading: 'ハナサセラレル' },
        { surfaceForm: '出させられる', baseForm: '出す', reading: 'ダサセラレル' },
        { surfaceForm: '返させられる', baseForm: '返す', reading: 'カエサセラレル' },
        { surfaceForm: '押させられる', baseForm: '押す', reading: 'オサセラレル' },
        { surfaceForm: '渡させられる', baseForm: '渡す', reading: 'ワタサセラレル' },
        { surfaceForm: '貸させられる', baseForm: '貸す', reading: 'カサセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '話してほしい', baseForm: '話す', reading: 'ハナシテホシイ' },
        { surfaceForm: '出してほしい', baseForm: '出す', reading: 'ダシテホシイ' },
        { surfaceForm: '返してほしい', baseForm: '返す', reading: 'カエシテホシイ' },
        { surfaceForm: '押してほしい', baseForm: '押す', reading: 'オシテホシイ' },
        { surfaceForm: '渡してほしい', baseForm: '渡す', reading: 'ワタシテホシイ' },
        { surfaceForm: '貸してほしい', baseForm: '貸す', reading: 'カシテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '話しまい', baseForm: '話す', reading: 'ハナシマイ' },
        { surfaceForm: '出しまい', baseForm: '出す', reading: 'ダシマイ' },
        { surfaceForm: '返しまい', baseForm: '返す', reading: 'カエシマイ' },
        { surfaceForm: '押しまい', baseForm: '押す', reading: 'オシマイ' },
        { surfaceForm: '渡しまい', baseForm: '渡す', reading: 'ワタシマイ' },
        { surfaceForm: '貸しまい', baseForm: '貸す', reading: 'カシマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}