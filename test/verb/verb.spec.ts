//import * as irregularVerb from './irregularverb.spec.js'
import * as ichidanVerb from './ichidanverb.js'
import * as godanru from './godanru.js'
import * as godanku from './godanru.js'
import { TestContext } from "../context.js";
import { runTest } from './common.js';
import * as bunsetsu from "../../src/index.js"

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Verb', function () {
    //irregularVerb.runTestSuite(context);
    ichidanVerb.runTestSuite(context);

    describe('VerbType.Godan', function () {
      godanru.runTestSuite(context);
      godanku.runTestSuite(context);
    });

    describe('ConjugatedForm.ProgressiveForm', function () {
      describe('as plain form', function () {
        const verbs = [
          { surfaceForm: '走っている', basicForm: '走る', reading: 'ハシッテイル', auxillary: 'いる' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
      });

      describe('as polite form', function () {
        const verbs = [
          { surfaceForm: '走っています', basicForm: '走る', reading: 'ハシッテイマス', auxillary: 'いる' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
      });

      describe('as contracted polite', function () {
        const verbs = [
          { surfaceForm: '食べてます', basicForm: '食べる', reading: 'タベテマス', auxillary: 'ます' },
          { surfaceForm: '走ってます', basicForm: '走る', reading: 'ハシッテマス', auxillary: 'ます' },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeForm, context);
      });
    });
  });
}