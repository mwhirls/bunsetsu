import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('ichidan verbs', function () {
    describe('conditional form', function () {
      const verbs = [
        { surfaceForm: '食べれば', basicForm: '食べる', reading: 'タベレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('contracted conditional form', function () {
      const verbs = [
        { surfaceForm: '見りゃ', basicForm: '見る', reading: 'ミリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('plain form', function () {
      const verbs = [
        { surfaceForm: '枯れる', basicForm: '枯れる', reading: 'カレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('contracted form', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'これ食べんの？', index: 1, wordSurfaceForm: '食べん', basicForm: '食べる', reading: 'タベン' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.IndeclinableNominal, context);
    });

    describe('volitional form', function () {
      const verbs = [
        { surfaceForm: '着よう', basicForm: '着る', reading: 'キヨウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('nai-form', function () {
      const verbs = [
        { surfaceForm: '感じない', basicForm: '感じる', reading: 'カンジナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('imperative as ろ variant', function () {
      const verbs = [
        { surfaceForm: '着ろ', basicForm: '着る', reading: 'キロ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
    });

    describe('imperative as よ variant', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'これを見よ', index: 2, wordSurfaceForm: '見よ', basicForm: '見る', reading: 'ミヨ' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Imperative, context);
    });

    describe('te-form', function () {
      const verbs = [
        { surfaceForm: '食べて', basicForm: '食べる', reading: 'タベテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
    });

    describe('past form', function () {
      const verbs = [
        { surfaceForm: '食べた', basicForm: '食べる', reading: 'タベタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('passive form', function () {
      const verbs = [
        { surfaceForm: '食べられる', basicForm: '食べる', reading: 'タベラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative form', function () {
      const verbs = [
        { surfaceForm: '食べさせる', basicForm: '食べる', reading: 'タベサセル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('causative-passive form', function () {
      const verbs = [
        { surfaceForm: '食べさせられる', basicForm: '食べる', reading: 'タベサセラレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });

    describe('なさい', function () {
      const verbs = [
        { surfaceForm: '寝なさい', basicForm: '寝る', reading: 'ネナサイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });

    describe('なさい (contracted)', function () {
      const verbs = [
        { surfaceForm: '寝な', basicForm: '寝る', reading: 'ネナ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Continuative, context);
    });
  });

  // くれる is generally treated as 一段, but has a few irregularities
  describe('irregular くれる', function () {
    describe('imperative form', function () {
      const phrases = [
        { phrase: 'これをくれ', index: 2, wordSurfaceForm: 'くれ', basicForm: 'くれる', reading: 'クレ' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Imperative, context);
    });

    describe('contracted form', function () {
      const verbs = [
        { surfaceForm: 'くんない', basicForm: 'くれる', reading: 'クンナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Irrealis, context);
    });
  });
}