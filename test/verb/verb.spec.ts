import * as irregularVerb from './irregularverb.spec.js'
import * as ichidanVerb from './ichidanverb.js'
import { TestContext } from "../context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Verb', function () {
    irregularVerb.runTestSuite(context);
    ichidanVerb.runTestSuite(context);
  });
}