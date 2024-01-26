import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ichidan verbs', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '食べれば', baseForm: '食べる', reading: 'タベレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalForm, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '見りゃ', baseForm: '見る', reading: 'ミリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction1, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '枯れる', baseForm: '枯れる', reading: 'カレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('contracted form', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'これ食べんの？', index: 1, wordSurfaceForm: '食べん', baseForm: '食べる', reading: 'タベン' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.SpecialIndeclinableNominalConjunction1, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '着よう', baseForm: '着る', reading: 'キヨウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.IrrealisUConjunction, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '感じない', baseForm: '感じる', reading: 'カンジナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('nai-form (euphonic change)', function () {
      const verbs = [
        { surfaceForm: '助けねえ', baseForm: '助ける', reading: 'タスケネエ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('ないで', function () {
      const verbs = [
        { surfaceForm: '話しかけないで', baseForm: "話しかける", reading: 'ハナシカケナイデ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('ず', () => {
      const verbs = [
        { surfaceForm: '食べず', baseForm: "食べる", reading: 'タベズ' },
        { surfaceForm: '食べずに', baseForm: "食べる", reading: 'タベズニ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('imperative as ろ variant', function () {
      const verbs = [
        { surfaceForm: '着ろ', baseForm: '着る', reading: 'キロ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ImperativeRo, context);
    });

    describe('imperative as よ variant', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'これを見よ', index: 2, wordSurfaceForm: '見よ', baseForm: '見る', reading: 'ミヨ' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.ImperativeYo, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '食べて', baseForm: '食べる', reading: 'タベテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('ちゃ (ては contracted)', function () {
      const verbs = [
        { surfaceForm: '食べちゃ', baseForm: '食べる', reading: 'タベチャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '食べた', baseForm: '食べる', reading: 'タベタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });


    describe('polite form', function () {
      const verbs = [
        { surfaceForm: '食べます', baseForm: '食べる', reading: 'タベマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('polite form (conjugated)', function () {
      const verbs = [
        { surfaceForm: '食べません', baseForm: '食べる', reading: 'タベマセン' },
        { surfaceForm: '食べませんでした', baseForm: '食べる', reading: 'タベマセンデシタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '食べられる', baseForm: '食べる', reading: 'タベラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '食べさせる', baseForm: '食べる', reading: 'タベサセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '食べさせられる', baseForm: '食べる', reading: 'タベサセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '寝なさい', baseForm: '寝る', reading: 'ネナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '寝な', baseForm: '寝る', reading: 'ネナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('てほしい', function () {
      const verbs = [
        { surfaceForm: '食べてほしい', baseForm: '食べる', reading: 'タベテホシイ' },
        { surfaceForm: '見てほしい', baseForm: '見る', reading: 'ミテホシイ' },
        { surfaceForm: '寝てほしい', baseForm: '寝る', reading: 'ネテホシイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('やがる', function () {
      const verbs = [
        { surfaceForm: '食べやがる', baseForm: '食べる', reading: 'タベヤガル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('まい ', function () {
      const verbs = [
        { surfaceForm: '食べまい', baseForm: '食べる', reading: 'タベマイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });
  });

  // くれる is generally treated as 一段, but has a few irregularities
  describe('irregular くれる', function () {
    describe('imperative form', function () {
      const phrases = [
        { phrase: 'これをくれ', index: 2, wordSurfaceForm: 'くれ', baseForm: 'くれる', reading: 'クレ' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.ImperativeE, context);
    });

    describe('contracted form', function () {
      const verbs = [
        { surfaceForm: 'くんない', baseForm: 'くれる', reading: 'クンナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.SpecialIrrealis, context);
    });
  });
}