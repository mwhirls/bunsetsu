import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Su', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '話せば', basicForm: '話す', reading: 'ハナセバ' },
        { surfaceForm: '出せば', basicForm: '出す', reading: 'ダセバ' },
        { surfaceForm: '返せば', basicForm: '返す', reading: 'カエセバ' },
        { surfaceForm: '押せば', basicForm: '押す', reading: 'オセバ' },
        { surfaceForm: '渡せば', basicForm: '渡す', reading: 'ワタセバ' },
        { surfaceForm: '貸せば', basicForm: '貸す', reading: 'カセバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '話せば', basicForm: '話す', reading: 'ハナセバ' },
        { surfaceForm: '出せば', basicForm: '出す', reading: 'ダセバ' },
        { surfaceForm: '返せば', basicForm: '返す', reading: 'カエセバ' },
        { surfaceForm: '押せば', basicForm: '押す', reading: 'オセバ' },
        { surfaceForm: '渡せば', basicForm: '渡す', reading: 'ワタセバ' },
        { surfaceForm: '貸せば', basicForm: '貸す', reading: 'カセバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
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

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '話そう', basicForm: '話す', reading: 'ハナソウ' },
        { surfaceForm: '出そう', basicForm: '出す', reading: 'ダソウ' },
        { surfaceForm: '返そう', basicForm: '返す', reading: 'カエソウ' },
        { surfaceForm: '押そう', basicForm: '押す', reading: 'オソウ' },
        { surfaceForm: '渡そう', basicForm: '渡す', reading: 'ワタソウ' },
        { surfaceForm: '貸そう', basicForm: '貸す', reading: 'カソウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '話さない', basicForm: '話す', reading: 'ハナサナイ' },
        { surfaceForm: '出さない', basicForm: '出す', reading: 'ダサナイ' },
        { surfaceForm: '返さない', basicForm: '返す', reading: 'カエサナイ' },
        { surfaceForm: '押さない', basicForm: '押す', reading: 'オサナイ' },
        { surfaceForm: '渡さない', basicForm: '渡す', reading: 'ワタサナイ' },
        { surfaceForm: '貸さない', basicForm: '貸す', reading: 'カサナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      // TODO: hard to test this because potential forms have their own
      // dictionary entries, and when they're in their continuative form
      // they look really similar to the imperative form
      describe('as げ variant', function () {
        const verbs = [
          { surfaceForm: '話せ', basicForm: '話す', reading: 'ハナセ' },
          { surfaceForm: '出せ', basicForm: '出す', reading: 'ダセ' },
          { surfaceForm: '返せ', basicForm: '返す', reading: 'カエセ' },
          { surfaceForm: '押せ', basicForm: '押す', reading: 'オセ' },
          { surfaceForm: '渡せ', basicForm: '渡す', reading: 'ワタセ' },
          { surfaceForm: '貸せ', basicForm: '貸す', reading: 'カセ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '話しなさい', basicForm: '話す', reading: 'ハナシナサイ' },
          { surfaceForm: '出しなさい', basicForm: '出す', reading: 'ダシナサイ' },
          { surfaceForm: '返しなさい', basicForm: '返す', reading: 'カエシナサイ' },
          { surfaceForm: '押しなさい', basicForm: '押す', reading: 'オシナサイ' },
          { surfaceForm: '渡しなさい', basicForm: '渡す', reading: 'ワタシナサイ' },
          { surfaceForm: '貸しなさい', basicForm: '貸す', reading: 'カシナサイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '話しな', basicForm: '話す', reading: 'ハナシナ' },
          { surfaceForm: '出しな', basicForm: '出す', reading: 'ダシナ' },
          { surfaceForm: '返しな', basicForm: '返す', reading: 'カエシナ' },
          { surfaceForm: '押しな', basicForm: '押す', reading: 'オシナ' },
          { surfaceForm: '渡しな', basicForm: '渡す', reading: 'ワタシナ' },
          { surfaceForm: '貸しな', basicForm: '貸す', reading: 'カシナ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '話して', basicForm: '話す', reading: 'ハナシテ' },
        { surfaceForm: '出して', basicForm: '出す', reading: 'ダシテ' },
        { surfaceForm: '返して', basicForm: '返す', reading: 'カエシテ' },
        { surfaceForm: '押して', basicForm: '押す', reading: 'オシテ' },
        { surfaceForm: '渡して', basicForm: '渡す', reading: 'ワタシテ' },
        { surfaceForm: '貸して', basicForm: '貸す', reading: 'カシテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '話した', basicForm: '話す', reading: 'ハナシタ' },
        { surfaceForm: '出した', basicForm: '出す', reading: 'ダシタ' },
        { surfaceForm: '返した', basicForm: '返す', reading: 'カエシタ' },
        { surfaceForm: '押した', basicForm: '押す', reading: 'オシタ' },
        { surfaceForm: '渡した', basicForm: '渡す', reading: 'ワタシタ' },
        { surfaceForm: '貸した', basicForm: '貸す', reading: 'カシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '話します', basicForm: '話す', reading: 'ハナシマス' },
        { surfaceForm: '出します', basicForm: '出す', reading: 'ダシマス' },
        { surfaceForm: '返します', basicForm: '返す', reading: 'カエシマス' },
        { surfaceForm: '押します', basicForm: '押す', reading: 'オシマス' },
        { surfaceForm: '渡します', basicForm: '渡す', reading: 'ワタシマス' },
        { surfaceForm: '貸します', basicForm: '貸す', reading: 'カシマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
    });

    describe('ConjugatedForm.Passive', function () {
      const verbs = [
        { surfaceForm: '話される', basicForm: '話す', reading: 'ハナサレル' },
        { surfaceForm: '出される', basicForm: '出す', reading: 'ダサレル' },
        { surfaceForm: '返される', basicForm: '返す', reading: 'カエサレル' },
        { surfaceForm: '押される', basicForm: '押す', reading: 'オサレル' },
        { surfaceForm: '渡される', basicForm: '渡す', reading: 'ワタサレル' },
        { surfaceForm: '貸される', basicForm: '貸す', reading: 'カサレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Passive, context);
    });

    describe('ConjugatedForm.Causative', function () {
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
      runTest(verbs, bunsetsu.ConjugatedForm.Causative, context);
    });

    describe('ConjugatedForm.CausativePassive', function () {
      const verbs = [
        { surfaceForm: '話させられる', basicForm: '話す', reading: 'ハナサセラレル' },
        { surfaceForm: '出させられる', basicForm: '出す', reading: 'ダサセラレル' },
        { surfaceForm: '返させられる', basicForm: '返す', reading: 'カエサセラレル' },
        { surfaceForm: '押させられる', basicForm: '押す', reading: 'オサセラレル' },
        { surfaceForm: '渡させられる', basicForm: '渡す', reading: 'ワタサセラレル' },
        { surfaceForm: '貸させられる', basicForm: '貸す', reading: 'カサセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.CausativePassive, context);
    });
  });
}