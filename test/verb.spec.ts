import * as irregularVerb from './irregularverb.spec.js'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Verb', function () {
    irregularVerb.runTestSuite(context);
  });
}