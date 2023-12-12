import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ConjugatedType.Wa', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '言えば', basicForm: '言う', reading: 'イエバ' },
        { surfaceForm: '買えば', basicForm: '買う', reading: 'カエバ' },
        { surfaceForm: '使えば', basicForm: '使う', reading: 'ツカエバ' },
        { surfaceForm: '洗えば', basicForm: '洗う', reading: 'アラエバ' },
        { surfaceForm: '会えば', basicForm: '会う', reading: 'アエバ' },
        { surfaceForm: '違えば', basicForm: '違う', reading: 'チガエバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const verbs = [
        { surfaceForm: '言う', basicForm: '言う', reading: 'イウ' },
        { surfaceForm: '買う', basicForm: '買う', reading: 'カウ' },
        { surfaceForm: '使う', basicForm: '使う', reading: 'ツカウ' },
        { surfaceForm: '洗う', basicForm: '洗う', reading: 'アラウ' },
        { surfaceForm: '会う', basicForm: '会う', reading: 'アウ' },
        { surfaceForm: '違う', basicForm: '違う', reading: 'チガウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '言おう', basicForm: '言う', reading: 'イオウ' },
        { surfaceForm: '買おう', basicForm: '買う', reading: 'カオウ' },
        { surfaceForm: '使おう', basicForm: '使う', reading: 'ツカオウ' },
        { surfaceForm: '洗おう', basicForm: '洗う', reading: 'アラオウ' },
        { surfaceForm: '会おう', basicForm: '会う', reading: 'アオウ' },
        { surfaceForm: '違おう', basicForm: '違う', reading: 'チガオウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '言わない', basicForm: '言う', reading: 'イワナイ' },
        { surfaceForm: '買わない', basicForm: '買う', reading: 'カワナイ' },
        { surfaceForm: '使わない', basicForm: '使う', reading: 'ツカワナイ' },
        { surfaceForm: '洗わない', basicForm: '洗う', reading: 'アラワナイ' },
        { surfaceForm: '会わない', basicForm: '会う', reading: 'アワナイ' },
        { surfaceForm: '違わない', basicForm: '違う', reading: 'チガワナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      // TODO: hard to test this because potential forms have their own
      // dictionary entries, and when they're in their continuative form
      // they look really similar to the imperative form
      describe('as え variant', function () {
        const verbs = [
          { surfaceForm: '言え', basicForm: '言う', reading: 'イエ' },
          { surfaceForm: '買え', basicForm: '買う', reading: 'カエ' },
          { surfaceForm: '使え', basicForm: '使う', reading: 'ツカエ' },
          { surfaceForm: '洗え', basicForm: '洗う', reading: 'アラエ' },
          { surfaceForm: '会え', basicForm: '会う', reading: 'アエ' },
          { surfaceForm: '違え', basicForm: '違う', reading: 'チガエ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as い variant (なさい）', function () {
        const verbs = [
          { surfaceForm: '言いなさい', basicForm: '言う', reading: 'イイナサイ' },
          { surfaceForm: '買いなさい', basicForm: '買う', reading: 'カイナサイ' },
          { surfaceForm: '使いなさい', basicForm: '使う', reading: 'ツカイナサイ' },
          { surfaceForm: '洗いなさい', basicForm: '洗う', reading: 'アライナサイ' },
          { surfaceForm: '会いなさい', basicForm: '会う', reading: 'アイナサイ' },
          { surfaceForm: '違いなさい', basicForm: '違う', reading: 'チガイナサイ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as contracted い variant (な）', function () {
        const verbs = [
          { surfaceForm: '言いな', basicForm: '言う', reading: 'イイナ' },
          { surfaceForm: '買いな', basicForm: '買う', reading: 'カイナ' },
          { surfaceForm: '使いな', basicForm: '使う', reading: 'ツカイナ' },
          { surfaceForm: '洗いな', basicForm: '洗う', reading: 'アライナ' },
          { surfaceForm: '会いな', basicForm: '会う', reading: 'アイナ' },
          { surfaceForm: '違いな', basicForm: '違う', reading: 'チガイナ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '言って', basicForm: '言う', reading: 'イッテ' },
        { surfaceForm: '買って', basicForm: '買う', reading: 'カッテ' },
        { surfaceForm: '使って', basicForm: '使う', reading: 'ツカッテ' },
        { surfaceForm: '洗って', basicForm: '洗う', reading: 'アラッテ' },
        { surfaceForm: '会って', basicForm: '会う', reading: 'アッテ' },
        { surfaceForm: '違って', basicForm: '違う', reading: 'チガッテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '言った', basicForm: '言う', reading: 'イッタ' },
        { surfaceForm: '買った', basicForm: '買う', reading: 'カッタ' },
        { surfaceForm: '使った', basicForm: '使う', reading: 'ツカッタ' },
        { surfaceForm: '洗った', basicForm: '洗う', reading: 'アラッタ' },
        { surfaceForm: '会った', basicForm: '会う', reading: 'アッタ' },
        { surfaceForm: '違った', basicForm: '違う', reading: 'チガッタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    describe('ConjugatedForm.PoliteForm', function () {
      const verbs = [
        { surfaceForm: '言います', basicForm: '言う', reading: 'イイマス' },
        { surfaceForm: '買います', basicForm: '買う', reading: 'カイマス' },
        { surfaceForm: '使います', basicForm: '使う', reading: 'ツカイマス' },
        { surfaceForm: '洗います', basicForm: '洗う', reading: 'アライマス' },
        { surfaceForm: '会います', basicForm: '会う', reading: 'アイマス' },
        { surfaceForm: '違います', basicForm: '違う', reading: 'チガイマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PoliteForm, context);
    });

    describe('ConjugatedForm.Passive', function () {
      const verbs = [
        { surfaceForm: '言われる', basicForm: '言う', reading: 'イワレル' },
        { surfaceForm: '買われる', basicForm: '買う', reading: 'カワレル' },
        { surfaceForm: '使われる', basicForm: '使う', reading: 'ツカワレル' },
        { surfaceForm: '洗われる', basicForm: '洗う', reading: 'アラワレル' },
        { surfaceForm: '会われる', basicForm: '会う', reading: 'アワレル' },
        { surfaceForm: '違われる', basicForm: '違う', reading: 'チガワレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Passive, context);
    });
    describe('ConjugatedForm.Causative', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '言わせる', basicForm: '言う', reading: 'イワセル' },
        { surfaceForm: '買わせる', basicForm: '買う', reading: 'カワセル' },
        { surfaceForm: '使わせる', basicForm: '使う', reading: 'ツカワセル' },
        { surfaceForm: '洗わせる', basicForm: '洗う', reading: 'アラワセル' },
        { surfaceForm: '会わせる', basicForm: '会う', reading: 'アワセル' },
        { surfaceForm: '違わせる', basicForm: '違う', reading: 'チガワセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Causative, context);
    });

    describe('ConjugatedForm.CausativePassive', function () {
      // can be a bit tricky to test because some causative forms are considered
      // their own separate word
      const verbs = [
        { surfaceForm: '言わせられる', basicForm: '言う', reading: 'イワセラレル' },
        { surfaceForm: '買わせられる', basicForm: '買う', reading: 'カワセラレル' },
        { surfaceForm: '使わせられる', basicForm: '使う', reading: 'ツカワセラレル' },
        { surfaceForm: '洗わせられる', basicForm: '洗う', reading: 'アラワセラレル' },
        { surfaceForm: '会わせられる', basicForm: '会う', reading: 'アワセラレル' },
        { surfaceForm: '違わせられる', basicForm: '違う', reading: 'チガワセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.CausativePassive, context);
    });
  });
}