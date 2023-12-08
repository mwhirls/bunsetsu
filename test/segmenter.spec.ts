import * as tokun from "../src/index.js"
import * as assert from 'assert'
import * as symbol from "./symbol.spec.js";
import * as adjective from "./adjective.spec.js";
import * as verb from "./verb.spec.js";
import { TestContext } from "./context.js";

export const DICTIONARY_PATH = "./node_modules/kuromoji/dict"

describe('Segmenter', function () {
  describe('build', async function () {
    it('should successfully build when a valid path is provided', async function () {
      const segmenter = await tokun.build(DICTIONARY_PATH);
      assert.equal(segmenter, segmenter);
    });
  });

  describe('build', async function () {
    it('should throw when an invalid path is provided', async function () {
      try {
        await tokun.build("invalid");
        assert.fail();
      } catch (err) {
        assert.equal(true, err instanceof Error);
        assert.equal((err as NodeJS.ErrnoException).code, 'ENOENT');
      }
    });
  });

  describe('PartOfSpeech', function () {
    // Using async in 'describe()' can cause the test not
    // to print: https://github.com/mochajs/mocha/issues/2975
    const context: TestContext = { segmenter: null };
    before(async () => {
      context.segmenter = await tokun.build(DICTIONARY_PATH);
    });

    describe('PartOfSpeech.Filler', async function () {
      const fillerWords = ['あの', 'あのー', 'あのう', 'えっと', 'えーと', 'えーっと', 'ええと', 'ええっと'];
      for (const form of fillerWords) {
        it(`should identify ${form} as one filler word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(form);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Filler);
          assert.equal(word.surfaceForm, form);
        });
      }
    });

    describe('PartOfSpeech.Interjection', async function () {
      const interjections = ['こんにちは', 'おはよう', 'じゃあ', 'こんばんは', 'おめでとう'];
      for (const form of interjections) {
        it(`should identify ${form} as one interjection`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(form);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Interjection);
          assert.equal(word.surfaceForm, form);
        });
      }
    });

    //symbol.runTestSuite(context);
    adjective.runTestSuite(context);
    //verb.runTestSuite(context);
  });
});
