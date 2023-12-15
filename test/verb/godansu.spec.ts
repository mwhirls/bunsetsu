import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in す', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '話せば', basicForm: '話す', reading: 'ハナセバ' },
        { surfaceForm: '出せば', basicForm: '出す', reading: 'ダセバ' },
        { surfaceForm: '返せば', basicForm: '返す', reading: 'カエセバ' },
        { surfaceForm: '押せば', basicForm: '押す', reading: 'オセバ' },
        { surfaceForm: '渡せば', basicForm: '渡す', reading: 'ワタセバ' },
        { surfaceForm: '貸せば', basicForm: '貸す', reading: 'カセバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '話しゃ', basicForm: '話す', reading: 'ハナシャ' },
        { surfaceForm: '出しゃ', basicForm: '出す', reading: 'ダシャ' },
        { surfaceForm: '返しゃ', basicForm: '返す', reading: 'カエシャ' },
        { surfaceForm: '押しゃ', basicForm: '押す', reading: 'オシャ' },
        { surfaceForm: '渡しゃ', basicForm: '渡す', reading: 'ワタシャ' },
        { surfaceForm: '貸しゃ', basicForm: '貸す', reading: 'カシャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '話す', basicForm: '話す', reading: 'ハナス' },
        { surfaceForm: '出す', basicForm: '出す', reading: 'ダス' },
        { surfaceForm: '返す', basicForm: '返す', reading: 'カエス' },
        { surfaceForm: '押す', basicForm: '押す', reading: 'オス' },
        { surfaceForm: '渡す', basicForm: '渡す', reading: 'ワタス' },
        { surfaceForm: '貸す', basicForm: '貸す', reading: 'カス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '話そう', basicForm: '話す', reading: 'ハナソウ' },
        { surfaceForm: '出そう', basicForm: '出す', reading: 'ダソウ' },
        { surfaceForm: '返そう', basicForm: '返す', reading: 'カエソウ' },
        { surfaceForm: '押そう', basicForm: '押す', reading: 'オソウ' },
        { surfaceForm: '渡そう', basicForm: '渡す', reading: 'ワタソウ' },
        { surfaceForm: '貸そう', basicForm: '貸す', reading: 'カソウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '話さない', basicForm: '話す', reading: 'ハナサナイ' },
        { surfaceForm: '出さない', basicForm: '出す', reading: 'ダサナイ' },
        { surfaceForm: '返さない', basicForm: '返す', reading: 'カエサナイ' },
        { surfaceForm: '押さない', basicForm: '押す', reading: 'オサナイ' },
        { surfaceForm: '渡さない', basicForm: '渡す', reading: 'ワタサナイ' },
        { surfaceForm: '貸さない', basicForm: '貸す', reading: 'カサナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative form because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '話しなさい', basicForm: '話す', reading: 'ハナシナサイ' },
        { surfaceForm: '出しなさい', basicForm: '出す', reading: 'ダシナサイ' },
        { surfaceForm: '返しなさい', basicForm: '返す', reading: 'カエシナサイ' },
        { surfaceForm: '押しなさい', basicForm: '押す', reading: 'オシナサイ' },
        { surfaceForm: '渡しなさい', basicForm: '渡す', reading: 'ワタシナサイ' },
        { surfaceForm: '貸しなさい', basicForm: '貸す', reading: 'カシナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '話しな', basicForm: '話す', reading: 'ハナシナ' },
        { surfaceForm: '出しな', basicForm: '出す', reading: 'ダシナ' },
        { surfaceForm: '返しな', basicForm: '返す', reading: 'カエシナ' },
        { surfaceForm: '押しな', basicForm: '押す', reading: 'オシナ' },
        { surfaceForm: '渡しな', basicForm: '渡す', reading: 'ワタシナ' },
        { surfaceForm: '貸しな', basicForm: '貸す', reading: 'カシナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '話して', basicForm: '話す', reading: 'ハナシテ' },
        { surfaceForm: '出して', basicForm: '出す', reading: 'ダシテ' },
        { surfaceForm: '返して', basicForm: '返す', reading: 'カエシテ' },
        { surfaceForm: '押して', basicForm: '押す', reading: 'オシテ' },
        { surfaceForm: '渡して', basicForm: '渡す', reading: 'ワタシテ' },
        { surfaceForm: '貸して', basicForm: '貸す', reading: 'カシテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '話しちゃ', basicForm: '話す', reading: 'ハナシチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '話した', basicForm: '話す', reading: 'ハナシタ' },
        { surfaceForm: '出した', basicForm: '出す', reading: 'ダシタ' },
        { surfaceForm: '返した', basicForm: '返す', reading: 'カエシタ' },
        { surfaceForm: '押した', basicForm: '押す', reading: 'オシタ' },
        { surfaceForm: '渡した', basicForm: '渡す', reading: 'ワタシタ' },
        { surfaceForm: '貸した', basicForm: '貸す', reading: 'カシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '話します', basicForm: '話す', reading: 'ハナシマス' },
        { surfaceForm: '出します', basicForm: '出す', reading: 'ダシマス' },
        { surfaceForm: '返します', basicForm: '返す', reading: 'カエシマス' },
        { surfaceForm: '押します', basicForm: '押す', reading: 'オシマス' },
        { surfaceForm: '渡します', basicForm: '渡す', reading: 'ワタシマス' },
        { surfaceForm: '貸します', basicForm: '貸す', reading: 'カシマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '話しません', basicForm: '話す', reading: 'ハナシマセン' },
        { surfaceForm: '話しませんでした', basicForm: '話す', reading: 'ハナシマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '話される', basicForm: '話す', reading: 'ハナサレル' },
        { surfaceForm: '出される', basicForm: '出す', reading: 'ダサレル' },
        { surfaceForm: '返される', basicForm: '返す', reading: 'カエサレル' },
        { surfaceForm: '押される', basicForm: '押す', reading: 'オサレル' },
        { surfaceForm: '渡される', basicForm: '渡す', reading: 'ワタサレル' },
        { surfaceForm: '貸される', basicForm: '貸す', reading: 'カサレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '話させる', basicForm: '話す', reading: 'ハナサセル' },
        { surfaceForm: '出させる', basicForm: '出す', reading: 'ダサセル' },
        { surfaceForm: '返させる', basicForm: '返す', reading: 'カエサセル' },
        { surfaceForm: '押させる', basicForm: '押す', reading: 'オサセル' },
        { surfaceForm: '渡させる', basicForm: '渡す', reading: 'ワタサセル' },
        { surfaceForm: '貸させる', basicForm: '貸す', reading: 'カサセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '話させられる', basicForm: '話す', reading: 'ハナサセラレル' },
        { surfaceForm: '出させられる', basicForm: '出す', reading: 'ダサセラレル' },
        { surfaceForm: '返させられる', basicForm: '返す', reading: 'カエサセラレル' },
        { surfaceForm: '押させられる', basicForm: '押す', reading: 'オサセラレル' },
        { surfaceForm: '渡させられる', basicForm: '渡す', reading: 'ワタサセラレル' },
        { surfaceForm: '貸させられる', basicForm: '貸す', reading: 'カサセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '話してほしい', basicForm: '話す', reading: 'ハナシテホシイ' },
        { surfaceForm: '出してほしい', basicForm: '出す', reading: 'ダシテホシイ' },
        { surfaceForm: '返してほしい', basicForm: '返す', reading: 'カエシテホシイ' },
        { surfaceForm: '押してほしい', basicForm: '押す', reading: 'オシテホシイ' },
        { surfaceForm: '渡してほしい', basicForm: '渡す', reading: 'ワタシテホシイ' },
        { surfaceForm: '貸してほしい', basicForm: '貸す', reading: 'カシテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '話しまい', basicForm: '話す', reading: 'ハナシマイ' },
        { surfaceForm: '出しまい', basicForm: '出す', reading: 'ダシマイ' },
        { surfaceForm: '返しまい', basicForm: '返す', reading: 'カエシマイ' },
        { surfaceForm: '押しまい', basicForm: '押す', reading: 'オシマイ' },
        { surfaceForm: '渡しまい', basicForm: '渡す', reading: 'ワタシマイ' },
        { surfaceForm: '貸しまい', basicForm: '貸す', reading: 'カシマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}