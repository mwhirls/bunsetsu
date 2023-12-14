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
  });
}