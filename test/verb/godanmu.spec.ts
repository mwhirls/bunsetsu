import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('Godan verbs that end in む', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '飲めば', basicForm: '飲む', reading: 'ノメバ' },
        { surfaceForm: '読めば', basicForm: '読む', reading: 'ヨメバ' },
        { surfaceForm: '頼めば', basicForm: '頼む', reading: 'タノメバ' },
        { surfaceForm: '休めば', basicForm: '休む', reading: 'ヤスメバ' },
        { surfaceForm: '住めば', basicForm: '住む', reading: 'スメバ' },
        { surfaceForm: '楽しめば', basicForm: '楽しむ', reading: 'タノシメバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '飲みゃ', basicForm: '飲む', reading: 'ノミャ' },
        { surfaceForm: '読みゃ', basicForm: '読む', reading: 'ヨミャ' },
        { surfaceForm: '頼みゃ', basicForm: '頼む', reading: 'タノミャ' },
        { surfaceForm: '休みゃ', basicForm: '休む', reading: 'ヤスミャ' },
        { surfaceForm: '住みゃ', basicForm: '住む', reading: 'スミャ' },
        { surfaceForm: '楽しみゃ', basicForm: '楽しむ', reading: 'タノシミャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
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

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '飲もう', basicForm: '飲む', reading: 'ノモウ' },
        { surfaceForm: '読もう', basicForm: '読む', reading: 'ヨモウ' },
        { surfaceForm: '頼もう', basicForm: '頼む', reading: 'タノモウ' },
        { surfaceForm: '休もう', basicForm: '休む', reading: 'ヤスモウ' },
        { surfaceForm: '住もう', basicForm: '住む', reading: 'スモウ' },
        { surfaceForm: '楽しもう', basicForm: '楽しむ', reading: 'タノシモウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '飲まない', basicForm: '飲む', reading: 'ノマナイ' },
        { surfaceForm: '読まない', basicForm: '読む', reading: 'ヨマナイ' },
        { surfaceForm: '頼まない', basicForm: '頼む', reading: 'タノマナイ' },
        { surfaceForm: '休まない', basicForm: '休む', reading: 'ヤスマナイ' },
        { surfaceForm: '住まない', basicForm: '住む', reading: 'スマナイ' },
        { surfaceForm: '楽しまない', basicForm: '楽しむ', reading: 'タノシマナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '飲みなさい', basicForm: '飲む', reading: 'ノミナサイ' },
        { surfaceForm: '読みなさい', basicForm: '読む', reading: 'ヨミナサイ' },
        { surfaceForm: '頼みなさい', basicForm: '頼む', reading: 'タノミナサイ' },
        { surfaceForm: '休みなさい', basicForm: '休む', reading: 'ヤスミナサイ' },
        { surfaceForm: '住みなさい', basicForm: '住む', reading: 'スミナサイ' },
        { surfaceForm: '楽しみなさい', basicForm: '楽しむ', reading: 'タノシミナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '飲みな', basicForm: '飲む', reading: 'ノミナ' },
        { surfaceForm: '読みな', basicForm: '読む', reading: 'ヨミナ' },
        { surfaceForm: '休みな', basicForm: '休む', reading: 'ヤスミナ' },
        { surfaceForm: '住みな', basicForm: '住む', reading: 'スミナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '飲んで', basicForm: '飲む', reading: 'ノンデ' },
        { surfaceForm: '読んで', basicForm: '読む', reading: 'ヨンデ' },
        { surfaceForm: '頼んで', basicForm: '頼む', reading: 'タノンデ' },
        { surfaceForm: '休んで', basicForm: '休む', reading: 'ヤスンデ' },
        { surfaceForm: '住んで', basicForm: '住む', reading: 'スンデ' },
        { surfaceForm: '楽しんで', basicForm: '楽しむ', reading: 'タノシンデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '飲んじゃ', basicForm: '飲む', reading: 'ノンジャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '飲んだ', basicForm: '飲む', reading: 'ノンダ' },
        { surfaceForm: '読んだ', basicForm: '読む', reading: 'ヨンダ' },
        { surfaceForm: '頼んだ', basicForm: '頼む', reading: 'タノンダ' },
        { surfaceForm: '休んだ', basicForm: '休む', reading: 'ヤスンダ' },
        { surfaceForm: '住んだ', basicForm: '住む', reading: 'スンダ' },
        { surfaceForm: '楽しんだ', basicForm: '楽しむ', reading: 'タノシンダ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '飲みます', basicForm: '飲む', reading: 'ノミマス' },
        { surfaceForm: '読みます', basicForm: '読む', reading: 'ヨミマス' },
        { surfaceForm: '頼みます', basicForm: '頼む', reading: 'タノミマス' },
        { surfaceForm: '休みます', basicForm: '休む', reading: 'ヤスミマス' },
        { surfaceForm: '住みます', basicForm: '住む', reading: 'スミマス' },
        { surfaceForm: '楽しみます', basicForm: '楽しむ', reading: 'タノシミマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '飲みません', basicForm: '飲む', reading: 'ノミマセン' },
        { surfaceForm: '飲みませんでした', basicForm: '飲む', reading: 'ノミマセンデシタ' },
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
        { surfaceForm: '飲んでほしい', basicForm: '飲む', reading: 'ノンデホシイ' },
        { surfaceForm: '読んでほしい', basicForm: '読む', reading: 'ヨンデホシイ' },
        { surfaceForm: '頼んでほしい', basicForm: '頼む', reading: 'タノンデホシイ' },
        { surfaceForm: '休んでほしい', basicForm: '休む', reading: 'ヤスンデホシイ' },
        { surfaceForm: '住んでほしい', basicForm: '住む', reading: 'スンデホシイ' },
        { surfaceForm: '楽しんでほしい', basicForm: '楽しむ', reading: 'タノシンデホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '住みやがる', basicForm: '住む', reading: 'スミヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '飲みまい', basicForm: '飲む', reading: 'ノミマイ' },
        { surfaceForm: '読みまい', basicForm: '読む', reading: 'ヨミマイ' },
        { surfaceForm: '休みまい', basicForm: '休む', reading: 'ヤスミマイ' },
        { surfaceForm: '住みまい', basicForm: '住む', reading: 'スミマイ' },
        { surfaceForm: '楽しみまい', basicForm: '楽しむ', reading: 'タノシミマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}