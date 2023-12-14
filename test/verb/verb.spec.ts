import * as irregularVerb from './irregularverb.spec.js'
import * as ichidanVerb from './ichidanverb.spec.js'
import * as godanru from './godanru.spec.js'
import * as godanbu from './godanbu.spec.js'
import * as godanku from './godanku.spec.js'
import * as godangu from './godangu.spec.js'
import * as godanmu from './godanmu.spec.js'
import * as godannu from './godannu.spec.js'
import * as godansu from './godansu.spec.js'
import * as godantsu from './godantsu.spec.js'
import * as godanwa from './godanwa.spec.js'
import { TestContext } from "../context.js";
import { runTest } from './common.js';
import * as bunsetsu from "../../src/index.js"

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Verb', function () {
    irregularVerb.runTestSuite(context);
    ichidanVerb.runTestSuite(context);

    describe('VerbType.Godan', function () {
      godanru.runTestSuite(context);
      godanbu.runTestSuite(context);
      godanku.runTestSuite(context);
      godangu.runTestSuite(context);
      godanmu.runTestSuite(context);
      godannu.runTestSuite(context);
      godansu.runTestSuite(context);
      godantsu.runTestSuite(context);
      godanwa.runTestSuite(context);
    });

    describe('ConjugatedForm.ProgressiveForm', function () {
      describe('as plain form', function () {
        const verbs = [
          { surfaceForm: '走っている', basicForm: '走る', reading: 'ハシッテイル', auxillary: 'いる', auxillaryIndex: 2 },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
      });

      describe('as polite form', function () {
        const verbs = [
          { surfaceForm: '走っています', basicForm: '走る', reading: 'ハシッテイマス', auxillary: 'いる', auxillaryIndex: 2 },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
      });

      describe('as contracted polite', function () {
        const verbs = [
          { surfaceForm: '食べてます', basicForm: '食べる', reading: 'タベテマス', auxillary: 'ます', auxillaryIndex: 2 },
          { surfaceForm: '走ってます', basicForm: '走る', reading: 'ハシッテマス', auxillary: 'ます', auxillaryIndex: 2 },
        ];
        runTest(verbs, bunsetsu.ConjugatedForm.TeConjunction, context);
      });
    });
  });
}