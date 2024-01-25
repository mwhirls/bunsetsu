import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('Godan verbs that end in む', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '飲めば', baseForm: '飲む', reading: 'ノメバ' },
        { surfaceForm: '読めば', baseForm: '読む', reading: 'ヨメバ' },
        { surfaceForm: '頼めば', baseForm: '頼む', reading: 'タノメバ' },
        { surfaceForm: '休めば', baseForm: '休む', reading: 'ヤスメバ' },
        { surfaceForm: '住めば', baseForm: '住む', reading: 'スメバ' },
        { surfaceForm: '楽しめば', baseForm: '楽しむ', reading: 'タノシメバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '飲みゃ', baseForm: '飲む', reading: 'ノミャ' },
        { surfaceForm: '読みゃ', baseForm: '読む', reading: 'ヨミャ' },
        { surfaceForm: '頼みゃ', baseForm: '頼む', reading: 'タノミャ' },
        { surfaceForm: '休みゃ', baseForm: '休む', reading: 'ヤスミャ' },
        { surfaceForm: '住みゃ', baseForm: '住む', reading: 'スミャ' },
        { surfaceForm: '楽しみゃ', baseForm: '楽しむ', reading: 'タノシミャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '飲む', baseForm: '飲む', reading: 'ノム' },
        { surfaceForm: '読む', baseForm: '読む', reading: 'ヨム' },
        { surfaceForm: '頼む', baseForm: '頼む', reading: 'タノム' },
        { surfaceForm: '休む', baseForm: '休む', reading: 'ヤスム' },
        { surfaceForm: '住む', baseForm: '住む', reading: 'スム' },
        { surfaceForm: '楽しむ', baseForm: '楽しむ', reading: 'タノシム' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '飲もう', baseForm: '飲む', reading: 'ノモウ' },
        { surfaceForm: '読もう', baseForm: '読む', reading: 'ヨモウ' },
        { surfaceForm: '頼もう', baseForm: '頼む', reading: 'タノモウ' },
        { surfaceForm: '休もう', baseForm: '休む', reading: 'ヤスモウ' },
        { surfaceForm: '住もう', baseForm: '住む', reading: 'スモウ' },
        { surfaceForm: '楽しもう', baseForm: '楽しむ', reading: 'タノシモウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '飲まない', baseForm: '飲む', reading: 'ノマナイ' },
        { surfaceForm: '読まない', baseForm: '読む', reading: 'ヨマナイ' },
        { surfaceForm: '頼まない', baseForm: '頼む', reading: 'タノマナイ' },
        { surfaceForm: '休まない', baseForm: '休む', reading: 'ヤスマナイ' },
        { surfaceForm: '住まない', baseForm: '住む', reading: 'スマナイ' },
        { surfaceForm: '楽しまない', baseForm: '楽しむ', reading: 'タノシマナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '飲みなさい', baseForm: '飲む', reading: 'ノミナサイ' },
        { surfaceForm: '読みなさい', baseForm: '読む', reading: 'ヨミナサイ' },
        { surfaceForm: '頼みなさい', baseForm: '頼む', reading: 'タノミナサイ' },
        { surfaceForm: '休みなさい', baseForm: '休む', reading: 'ヤスミナサイ' },
        { surfaceForm: '住みなさい', baseForm: '住む', reading: 'スミナサイ' },
        { surfaceForm: '楽しみなさい', baseForm: '楽しむ', reading: 'タノシミナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '飲みな', baseForm: '飲む', reading: 'ノミナ' },
        { surfaceForm: '読みな', baseForm: '読む', reading: 'ヨミナ' },
        { surfaceForm: '休みな', baseForm: '休む', reading: 'ヤスミナ' },
        { surfaceForm: '住みな', baseForm: '住む', reading: 'スミナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '飲んで', baseForm: '飲む', reading: 'ノンデ' },
        { surfaceForm: '読んで', baseForm: '読む', reading: 'ヨンデ' },
        { surfaceForm: '頼んで', baseForm: '頼む', reading: 'タノンデ' },
        { surfaceForm: '休んで', baseForm: '休む', reading: 'ヤスンデ' },
        { surfaceForm: '住んで', baseForm: '住む', reading: 'スンデ' },
        { surfaceForm: '楽しんで', baseForm: '楽しむ', reading: 'タノシンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '飲んじゃ', baseForm: '飲む', reading: 'ノンジャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '飲んだ', baseForm: '飲む', reading: 'ノンダ' },
        { surfaceForm: '読んだ', baseForm: '読む', reading: 'ヨンダ' },
        { surfaceForm: '頼んだ', baseForm: '頼む', reading: 'タノンダ' },
        { surfaceForm: '休んだ', baseForm: '休む', reading: 'ヤスンダ' },
        { surfaceForm: '住んだ', baseForm: '住む', reading: 'スンダ' },
        { surfaceForm: '楽しんだ', baseForm: '楽しむ', reading: 'タノシンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '飲みます', baseForm: '飲む', reading: 'ノミマス' },
        { surfaceForm: '読みます', baseForm: '読む', reading: 'ヨミマス' },
        { surfaceForm: '頼みます', baseForm: '頼む', reading: 'タノミマス' },
        { surfaceForm: '休みます', baseForm: '休む', reading: 'ヤスミマス' },
        { surfaceForm: '住みます', baseForm: '住む', reading: 'スミマス' },
        { surfaceForm: '楽しみます', baseForm: '楽しむ', reading: 'タノシミマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '飲みません', baseForm: '飲む', reading: 'ノミマセン' },
        { surfaceForm: '飲みませんでした', baseForm: '飲む', reading: 'ノミマセンデシタ' },
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
        { surfaceForm: '飲んでほしい', baseForm: '飲む', reading: 'ノンデホシイ' },
        { surfaceForm: '読んでほしい', baseForm: '読む', reading: 'ヨンデホシイ' },
        { surfaceForm: '頼んでほしい', baseForm: '頼む', reading: 'タノンデホシイ' },
        { surfaceForm: '休んでほしい', baseForm: '休む', reading: 'ヤスンデホシイ' },
        { surfaceForm: '住んでほしい', baseForm: '住む', reading: 'スンデホシイ' },
        { surfaceForm: '楽しんでほしい', baseForm: '楽しむ', reading: 'タノシンデホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '住みやがる', baseForm: '住む', reading: 'スミヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '飲みまい', baseForm: '飲む', reading: 'ノミマイ' },
        { surfaceForm: '読みまい', baseForm: '読む', reading: 'ヨミマイ' },
        { surfaceForm: '休みまい', baseForm: '休む', reading: 'ヤスミマイ' },
        { surfaceForm: '住みまい', baseForm: '住む', reading: 'スミマイ' },
        { surfaceForm: '楽しみまい', baseForm: '楽しむ', reading: 'タノシミマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}