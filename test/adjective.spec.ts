import * as tokun from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.iAdjective', function () {
    const runTestCase = (testCases: { surfaceForm: string, basicForm: string }[]) => {
      for (const adjective of testCases) {
        it(`should identify ${adjective.surfaceForm} as one word`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(adjective.surfaceForm);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.iAdjective);
          assert.equal(word.surfaceForm, adjective.surfaceForm);
          assert.equal(word.basicForm, adjective.basicForm);
        });
      }
    };

    describe('ConjugatedForm.GaruConjunction', function () {
      const adjectives = [
        { surfaceForm: '嬉しがる', basicForm: "嬉しい" },
        { surfaceForm: '早すぎる', basicForm: '早い' },
        { surfaceForm: '悲しさ', basicForm: '悲しい' },
        { surfaceForm: '虚しそう', basicForm: '虚しい' },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.ConditionalForm', function () {
      const adjectives = [
        { surfaceForm: '美味しければ', basicForm: "美味しい" },
        { surfaceForm: '早ければ', basicForm: "早い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.ConditionalContraction1', function () {
      const adjectives = [
        { surfaceForm: '美味しけりゃ', basicForm: "美味しい" },
        { surfaceForm: '早けりゃ', basicForm: "早い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.ConditionalContraction2', function () {
      const adjectives = [
        { surfaceForm: '美味しきゃ', basicForm: "美味しい" },
        { surfaceForm: '早きゃ', basicForm: "早い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.PlainForm', function () {
      const adjectives = [
        { surfaceForm: '美味しい', basicForm: "美味しい" },
        { surfaceForm: '早い', basicForm: "早い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.IndeclinableNominalConjunction', function () {
      const adjectives = [
        { surfaceForm: '美しき', basicForm: "美しい" },
        { surfaceForm: '親しき', basicForm: "親しい" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.ClassicalPlainForm', function () {
      const adjectives = [
        { surfaceForm: '赤し', basicForm: "赤い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.IrrealisUConjunction', function () {
      const adjectives = [
        { surfaceForm: '高かろう', basicForm: "高い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.IrrealisNuConjunction', function () {
      const adjectives = [
        { surfaceForm: '高からぬ', basicForm: "高い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.ImperativeE', function () {
      const adjectives = [
        { surfaceForm: '多かれ', basicForm: "多い" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.GozaiConjunction', function () {
      const adjectives = [
        { surfaceForm: '愛しうございます', basicForm: "愛しい" },
        { surfaceForm: '苦しゅうない', basicForm: "苦しい" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.TaConjunction', function () {
      const adjectives = [
        { surfaceForm: 'うるさかった', basicForm: "うるさい" },
      ];
      runTestCase(adjectives);
    });

    describe('ConjugatedForm.TeConjunction', function () {
      const adjectives = [
        { surfaceForm: '女々しくて', basicForm: "女々しい" },
        { surfaceForm: 'うるさく', basicForm: "うるさい" },
        { surfaceForm: '芳しくない', basicForm: "芳しい" },
      ];
      runTestCase(adjectives);
    });
  });
}