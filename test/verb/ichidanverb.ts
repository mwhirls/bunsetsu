import * as bunsetsu from "../../src/index.js"
import { TestContext } from "../context.js";
import { runTest, runTestOnPhrase } from "./common.js";

export function runTestSuite(context: TestContext) {
  describe('VerbType.Ichidan', function () {
    describe('ConjugatedForm.ConditionalForm', function () {
      const verbs = [
        { surfaceForm: '食べれば', basicForm: '食べる', reading: 'タベレバ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Conditional, context);
    });

    describe('ConjugatedForm.ConditionalContraction', function () {
      const verbs = [
        { surfaceForm: '見りゃ', basicForm: '見る', reading: 'ミリャ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.ConditionalContraction, context);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const verbs = [
        { surfaceForm: '枯れる', basicForm: '枯れる', reading: 'カレル' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PlainForm, context);
    });

    describe('ConjugatedForm.Contracted', function () {
      // need full sentence context
      const phrases = [
        { phrase: 'これ食べんの？', index: 1, wordSurfaceForm: '食べん', basicForm: '食べる', reading: 'タベン' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Contracted, context);
    });

    describe('ConjugatedForm.Volitional', function () {
      const verbs = [
        { surfaceForm: '着よう', basicForm: '着る', reading: 'キヨウ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Volitional, context);
    });

    describe('ConjugatedForm.NaiForm', function () {
      const verbs = [
        { surfaceForm: '感じない', basicForm: '感じる', reading: 'カンジナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.NaiForm, context);
    });

    describe('ConjugatedForm.Imperative', function () {
      describe('as ろ variant', function () {
        const verbs = [
          { surfaceForm: '着ろ', basicForm: '着る', reading: 'キロ' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.Imperative, context);
      });

      describe('as よ variant', function () {
        // need full sentence context
        const phrases = [
          { phrase: 'これを見よ', index: 2, wordSurfaceForm: '見よ', basicForm: '見る', reading: 'ミヨ' },
        ];
        runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Imperative, context);
      });
    });

    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '食べて', basicForm: '食べる', reading: 'タベテ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });

    describe('ConjugatedForm.PastForm', function () {
      const verbs = [
        { surfaceForm: '食べた', basicForm: '食べる', reading: 'タベタ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.PastForm, context);
    });

    // todo: detect as progressive form
    describe('ConjugatedForm.TeForm', function () {
      const verbs = [
        { surfaceForm: '食べてます', basicForm: '食べる', reading: 'タベテマス' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
    });
  });

  // くれる is generally treated as 一段, but has a few irregularities
  describe('VerbType.Kureru', function () {
    describe('ConjugatedForm.Imperative', function () {
      const phrases = [
        { phrase: 'これをくれ', index: 2, wordSurfaceForm: 'くれ', basicForm: 'くれる', reading: 'クレ' },
      ];
      runTestOnPhrase(phrases, bunsetsu.ConjugatedForm.Imperative, context);
    });

    describe('ConjugatedForm.Contracted', function () {
      const verbs = [
        { surfaceForm: 'くんない', basicForm: 'くれる', reading: 'クンナイ' },
      ];
      runTest(verbs, bunsetsu.ConjugatedForm.Contracted, context);
    });
  });
}