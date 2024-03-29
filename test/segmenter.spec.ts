import * as bunsetsu from "../src/index.js"
import * as assert from 'assert'
import * as symbol from "./symbol.spec.js";
import * as adjective from "./adjective.spec.js";
import * as verb from "./verb/verb.spec.js";
import * as noun from "./noun.spec.js"
import * as auxillaryVerb from "./auxillaryVerb.spec.js"
import * as subsidiaryVerb from "./subsidiaryVerb.spec.js"
import * as particle from './particle.spec.js'
import * as copula from './copula.spec.js'
import * as conjunction from './conjunctions.spec.js'
import { TestContext } from "./context.js";

export const DICTIONARY_PATH = "./node_modules/kuromoji/dict"

describe('Segmenter', function () {
  describe('build', async function () {
    it('should successfully build when a valid path is provided', async function () {
      const segmenter = await bunsetsu.build(DICTIONARY_PATH);
      assert.equal(segmenter, segmenter);
    });
  });

  describe('build', async function () {
    it('should throw when an invalid path is provided', async function () {
      try {
        await bunsetsu.build("invalid");
        assert.fail();
      } catch (err) {
        assert.equal(true, err instanceof Error);
        assert.equal((err as NodeJS.ErrnoException).code, 'ENOENT');
      }
    });
  });

  describe('segmentAsWords', function () {
    // Using async in 'describe()' can cause the test not
    // to print: https://github.com/mochajs/mocha/issues/2975
    const context: TestContext = { segmenter: null };
    before(async () => {
      context.segmenter = await bunsetsu.build(DICTIONARY_PATH);
    });

    describe('PartOfSpeech.Filler', async function () {
      const fillerWords = ['あの', 'あのー', 'あのう', 'えっと', 'えーと', 'えーっと', 'ええと', 'ええっと'];
      for (const form of fillerWords) {
        it(`should identify ${form} as one filler word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(form);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, bunsetsu.PartOfSpeech.Filler);
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
          assert.equal(word.pos, bunsetsu.PartOfSpeech.Interjection);
          assert.equal(word.surfaceForm, form);
        });
      }
    });

    symbol.runTestSuite(context);
    adjective.runTestSuite(context);
    verb.runTestSuite(context);
    noun.runTestSuite(context);
    auxillaryVerb.runTestSuite(context);
    subsidiaryVerb.runTestSuite(context);
    particle.runTestSuite(context);
    copula.runTestSuite(context);
    conjunction.runTestSuite(context);
  });

  describe('segmentAsSentences', function () {
    const context: TestContext = { segmenter: null };
    before(async () => {
      context.segmenter = await bunsetsu.build(DICTIONARY_PATH);
    });

    describe('no punctuation', async function () {
      const sentence = 'これはペンです';
      it(`should identify ${sentence} as one sentence`, function () {
        assert.ok(context.segmenter);
        const sentences = context.segmenter.segmentAsSentences(sentence);
        assert.equal(sentences.length, 1);
        const s0 = sentences[0];
        assert.equal(s0.words.length, 4);
      });
    });

    describe('with full stop', async function () {
      const sentence = 'これはペンです。あれもペンです。';
      it(`should identify ${sentence} as two sentences`, function () {
        assert.ok(context.segmenter);
        const sentences = context.segmenter.segmentAsSentences(sentence);
        assert.equal(sentences.length, 2);
        const s0 = sentences[0];
        const s1 = sentences[1];
        assert.equal(s0.words.length, 5);
        assert.equal(s1.words.length, 5);
      });
    });

    describe('with question mark', async function () {
      const sentence = 'これはペンですか？あれもペンです。';
      it(`should identify ${sentence} as two sentences`, function () {
        assert.ok(context.segmenter);
        const sentences = context.segmenter.segmentAsSentences(sentence);
        assert.equal(sentences.length, 2);
        const s0 = sentences[0];
        const s1 = sentences[1];
        assert.equal(s0.words.length, 6);
        assert.equal(s1.words.length, 5);
      });
    });

    describe('with exclamation mark', async function () {
      const sentence = 'これはペンですよ！あれもペンですよ！';
      it(`should identify ${sentence} as two sentences`, function () {
        assert.ok(context.segmenter);
        const sentences = context.segmenter.segmentAsSentences(sentence);
        assert.equal(sentences.length, 2);
        const s0 = sentences[0];
        const s1 = sentences[1];
        assert.equal(s0.words.length, 6);
        assert.equal(s1.words.length, 6);
      });
    });

    describe('with tententen', async function () {
      const sentence = 'これはペンです…あれもペンです…';
      it(`should identify ${sentence} as two sentences`, function () {
        assert.ok(context.segmenter);
        const sentences = context.segmenter.segmentAsSentences(sentence);
        assert.equal(sentences.length, 2);
        const s0 = sentences[0];
        const s1 = sentences[1];
        assert.equal(s0.words.length, 5);
        assert.equal(s1.words.length, 5);
      });
    });
  });
});
