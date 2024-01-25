import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('godan verbs that end in う', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '言えば', baseForm: '言う', reading: 'イエバ' },
        { surfaceForm: '買えば', baseForm: '買う', reading: 'カエバ' },
        { surfaceForm: '使えば', baseForm: '使う', reading: 'ツカエバ' },
        { surfaceForm: '洗えば', baseForm: '洗う', reading: 'アラエバ' },
        { surfaceForm: '会えば', baseForm: '会う', reading: 'アエバ' },
        { surfaceForm: '違えば', baseForm: '違う', reading: 'チガエバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '言う', baseForm: '言う', reading: 'イウ' },
        { surfaceForm: '買う', baseForm: '買う', reading: 'カウ' },
        { surfaceForm: '使う', baseForm: '使う', reading: 'ツカウ' },
        { surfaceForm: '洗う', baseForm: '洗う', reading: 'アラウ' },
        { surfaceForm: '会う', baseForm: '会う', reading: 'アウ' },
        { surfaceForm: '違う', baseForm: '違う', reading: 'チガウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '言おう', baseForm: '言う', reading: 'イオウ' },
        { surfaceForm: '買おう', baseForm: '買う', reading: 'カオウ' },
        { surfaceForm: '使おう', baseForm: '使う', reading: 'ツカオウ' },
        { surfaceForm: '洗おう', baseForm: '洗う', reading: 'アラオウ' },
        { surfaceForm: '会おう', baseForm: '会う', reading: 'アオウ' },
        { surfaceForm: '違おう', baseForm: '違う', reading: 'チガオウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '言わない', baseForm: '言う', reading: 'イワナイ' },
        { surfaceForm: '買わない', baseForm: '買う', reading: 'カワナイ' },
        { surfaceForm: '使わない', baseForm: '使う', reading: 'ツカワナイ' },
        { surfaceForm: '洗わない', baseForm: '洗う', reading: 'アラワナイ' },
        { surfaceForm: '会わない', baseForm: '会う', reading: 'アワナイ' },
        { surfaceForm: '違わない', baseForm: '違う', reading: 'チガワナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    // TODO: hard to test imperative form because potential forms have their own
    // dictionary entries, and when they're in their continuative form
    // they look really similar to the imperative form

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '言いなさい', baseForm: '言う', reading: 'イイナサイ' },
        { surfaceForm: '買いなさい', baseForm: '買う', reading: 'カイナサイ' },
        { surfaceForm: '使いなさい', baseForm: '使う', reading: 'ツカイナサイ' },
        { surfaceForm: '洗いなさい', baseForm: '洗う', reading: 'アライナサイ' },
        { surfaceForm: '会いなさい', baseForm: '会う', reading: 'アイナサイ' },
        { surfaceForm: '吸いなさい', baseForm: '吸う', reading: 'スイナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '言いな', baseForm: '言う', reading: 'イイナ' },
        { surfaceForm: '買いな', baseForm: '買う', reading: 'カイナ' },
        { surfaceForm: '使いな', baseForm: '使う', reading: 'ツカイナ' },
        { surfaceForm: '洗いな', baseForm: '洗う', reading: 'アライナ' },
        { surfaceForm: '会いな', baseForm: '会う', reading: 'アイナ' },
        { surfaceForm: '吸いな', baseForm: '吸う', reading: 'スイナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '言って', baseForm: '言う', reading: 'イッテ' },
        { surfaceForm: '買って', baseForm: '買う', reading: 'カッテ' },
        { surfaceForm: '使って', baseForm: '使う', reading: 'ツカッテ' },
        { surfaceForm: '洗って', baseForm: '洗う', reading: 'アラッテ' },
        { surfaceForm: '会って', baseForm: '会う', reading: 'アッテ' },
        { surfaceForm: '違って', baseForm: '違う', reading: 'チガッテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '言っちゃ', baseForm: '言う', reading: 'イッチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '言った', baseForm: '言う', reading: 'イッタ' },
        { surfaceForm: '買った', baseForm: '買う', reading: 'カッタ' },
        { surfaceForm: '使った', baseForm: '使う', reading: 'ツカッタ' },
        { surfaceForm: '洗った', baseForm: '洗う', reading: 'アラッタ' },
        { surfaceForm: '会った', baseForm: '会う', reading: 'アッタ' },
        { surfaceForm: '違った', baseForm: '違う', reading: 'チガッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '言います', baseForm: '言う', reading: 'イイマス' },
        { surfaceForm: '買います', baseForm: '買う', reading: 'カイマス' },
        { surfaceForm: '使います', baseForm: '使う', reading: 'ツカイマス' },
        { surfaceForm: '洗います', baseForm: '洗う', reading: 'アライマス' },
        { surfaceForm: '会います', baseForm: '会う', reading: 'アイマス' },
        { surfaceForm: '違います', baseForm: '違う', reading: 'チガイマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '言いません', baseForm: '言う', reading: 'イイマセン' },
        { surfaceForm: '言いませんでした', baseForm: '言う', reading: 'イイマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '言われる', baseForm: '言う', reading: 'イワレル' },
        { surfaceForm: '買われる', baseForm: '買う', reading: 'カワレル' },
        { surfaceForm: '使われる', baseForm: '使う', reading: 'ツカワレル' },
        { surfaceForm: '洗われる', baseForm: '洗う', reading: 'アラワレル' },
        { surfaceForm: '会われる', baseForm: '会う', reading: 'アワレル' },
        { surfaceForm: '違われる', baseForm: '違う', reading: 'チガワレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });
    describe('causative form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '言わせる', baseForm: '言う', reading: 'イワセル' },
        { surfaceForm: '買わせる', baseForm: '買う', reading: 'カワセル' },
        { surfaceForm: '使わせる', baseForm: '使う', reading: 'ツカワセル' },
        { surfaceForm: '洗わせる', baseForm: '洗う', reading: 'アラワセル' },
        { surfaceForm: '会わせる', baseForm: '会う', reading: 'アワセル' },
        { surfaceForm: '違わせる', baseForm: '違う', reading: 'チガワセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '言わせられる', baseForm: '言う', reading: 'イワセラレル' },
        { surfaceForm: '買わせられる', baseForm: '買う', reading: 'カワセラレル' },
        { surfaceForm: '使わせられる', baseForm: '使う', reading: 'ツカワセラレル' },
        { surfaceForm: '洗わせられる', baseForm: '洗う', reading: 'アラワセラレル' },
        { surfaceForm: '会わせられる', baseForm: '会う', reading: 'アワセラレル' },
        { surfaceForm: '違わせられる', baseForm: '違う', reading: 'チガワセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '言ってほしい', baseForm: '言う', reading: 'イッテホシイ' },
        { surfaceForm: '買ってほしい', baseForm: '買う', reading: 'カッテホシイ' },
        { surfaceForm: '使ってほしい', baseForm: '使う', reading: 'ツカッテホシイ' },
        { surfaceForm: '洗ってほしい', baseForm: '洗う', reading: 'アラッテホシイ' },
        { surfaceForm: '会ってほしい', baseForm: '会う', reading: 'アッテホシイ' },
        { surfaceForm: '違ってほしい', baseForm: '違う', reading: 'チガッテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TaConjunction, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '買いやがる', baseForm: '買う', reading: 'カイヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい', function () {
      const verbs = [
        { surfaceForm: '言いまい', baseForm: '言う', reading: 'イイマイ' },
        { surfaceForm: '買いまい', baseForm: '買う', reading: 'カイマイ' },
        { surfaceForm: '使いまい', baseForm: '使う', reading: 'ツカイマイ' },
        { surfaceForm: '洗いまい', baseForm: '洗う', reading: 'アライマイ' },
        { surfaceForm: '会いまい', baseForm: '会う', reading: 'アイマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });
}