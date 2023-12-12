import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Mu', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '飲めば', basicForm: '飲む', reading: 'ノメバ' },
        { surfaceForm: '読めば', basicForm: '読む', reading: 'ヨメバ' },
        { surfaceForm: '頼めば', basicForm: '頼む', reading: 'タノメバ' },
        { surfaceForm: '休めば', basicForm: '休む', reading: 'ヤスメバ' },
        { surfaceForm: '住めば', basicForm: '住む', reading: 'スメバ' },
        { surfaceForm: '楽しめば', basicForm: '楽しむ', reading: 'タノシメバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '飲みゃ', basicForm: '飲む', reading: 'ノミャ' },
        { surfaceForm: '読みゃ', basicForm: '読む', reading: 'ヨミャ' },
        { surfaceForm: '頼みゃ', basicForm: '頼む', reading: 'タノミャ' },
        { surfaceForm: '休みゃ', basicForm: '休む', reading: 'ヤスミャ' },
        { surfaceForm: '住みゃ', basicForm: '住む', reading: 'スミャ' },
        { surfaceForm: '楽しめば', basicForm: '楽しむ', reading: 'タノシメバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const verbs = [
        { surfaceForm: '飲む', basicForm: '飲む', reading: 'ノム' },
        { surfaceForm: '読む', basicForm: '読む', reading: 'ヨム' },
        { surfaceForm: '頼む', basicForm: '頼む', reading: 'タノム' },
        { surfaceForm: '休む', basicForm: '休む', reading: 'ヤスム' },
        { surfaceForm: '住む', basicForm: '住む', reading: 'スム' },
        { surfaceForm: '楽しむ', basicForm: '楽しむ', reading: 'タノシム' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '飲もう', basicForm: '飲む', reading: 'ノモウ' },
        { surfaceForm: '読もう', basicForm: '読む', reading: 'ヨモウ' },
        { surfaceForm: '頼もう', basicForm: '頼む', reading: 'タノモウ' },
        { surfaceForm: '休もう', basicForm: '休む', reading: 'ヤスモウ' },
        { surfaceForm: '住もう', basicForm: '住む', reading: 'スモウ' },
        { surfaceForm: '楽しもう', basicForm: '楽しむ', reading: 'タノシモウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '飲まない', basicForm: '飲む', reading: 'ノマナイ' },
        { surfaceForm: '読まない', basicForm: '読む', reading: 'ヨマナイ' },
        { surfaceForm: '頼まない', basicForm: '頼む', reading: 'タノマナイ' },
        { surfaceForm: '休まない', basicForm: '休む', reading: 'ヤスマナイ' },
        { surfaceForm: '住まない', basicForm: '住む', reading: 'スマナイ' },
        { surfaceForm: '楽しまない', basicForm: '楽しむ', reading: 'タノシマナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      // TODO: hard to test this because potential forms have their own
      // dictionary entries, and when they're in their continuative form
      // they look really similar to the imperative form
      /* 
      describe('as け variant', function () {
        const verbs = [
          { surfaceForm: '飲め', basicForm: '飲む', reading: 'ノメ' },
          { surfaceForm: '読め', basicForm: '読む', reading: 'ヨメ' },
          { surfaceForm: '頼め', basicForm: '頼む', reading: 'タノシメ' },
          { surfaceForm: '休め', basicForm: '休む', reading: 'ヤスメ' },
          { surfaceForm: '住め', basicForm: '住む', reading: 'スメ' },
          { surfaceForm: '楽しめ', basicForm: '楽しむ', reading: 'タノシメ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
      */

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '飲みなさい', basicForm: '飲む', reading: 'ノミナサイ' },
          { surfaceForm: '読みなさい', basicForm: '読む', reading: 'ヨミナサイ' },
          { surfaceForm: '頼みなさい', basicForm: '頼む', reading: 'タノシミナサイ' },
          { surfaceForm: '休みなさい', basicForm: '休む', reading: 'ヤスミナサイ' },
          { surfaceForm: '住みなさい', basicForm: '住む', reading: 'スミナサイ' },
          { surfaceForm: '楽しんで', basicForm: '楽しむ', reading: 'タノシンデ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '飲みな', basicForm: '飲む', reading: 'ノミナ' },
          { surfaceForm: '読みな', basicForm: '読む', reading: 'ヨミナ' },
          { surfaceForm: '頼みな', basicForm: '頼む', reading: 'タノシミナ' },
          { surfaceForm: '休みな', basicForm: '休む', reading: 'ヤスミナ' },
          { surfaceForm: '住みな', basicForm: '住む', reading: 'スミナ' },
          { surfaceForm: '楽しんで', basicForm: '楽しむ', reading: 'タノシンデ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '飲んで', basicForm: '飲む', reading: 'ノンデ' },
        { surfaceForm: '読んで', basicForm: '読む', reading: 'ヨンデ' },
        { surfaceForm: '頼んで', basicForm: '頼む', reading: 'タノンデ' },
        { surfaceForm: '休んで', basicForm: '休む', reading: 'ヤスンデ' },
        { surfaceForm: '住んで', basicForm: '住む', reading: 'スンデ' },
        { surfaceForm: '楽しんで', basicForm: '楽しむ', reading: 'タノシンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '飲んだ', basicForm: '飲む', reading: 'ノンダ' },
        { surfaceForm: '読んだ', basicForm: '読む', reading: 'ヨンダ' },
        { surfaceForm: '頼んだ', basicForm: '頼む', reading: 'タノンダ' },
        { surfaceForm: '休んだ', basicForm: '休む', reading: 'ヤスンダ' },
        { surfaceForm: '住んだ', basicForm: '住む', reading: 'スンダ' },
        { surfaceForm: '楽しんだ', basicForm: '楽しむ', reading: 'タノシンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '飲みます', basicForm: '飲む', reading: 'ノミマス' },
        { surfaceForm: '読みます', basicForm: '読む', reading: 'ヨミマス' },
        { surfaceForm: '頼みます', basicForm: '頼む', reading: 'タノシミマス' },
        { surfaceForm: '休みます', basicForm: '休む', reading: 'ヤスミマス' },
        { surfaceForm: '住みます', basicForm: '住む', reading: 'スミマス' },
        { surfaceForm: '楽しみます', basicForm: '楽しむ', reading: 'タノシミマス' },
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