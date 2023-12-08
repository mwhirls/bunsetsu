import * as tokun from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Verb', async function () {
    const runTest = (testCases: { surfaceForm: string, basicForm: string }[]) => {
      for (const verb of testCases) {
        it(`should identify ${verb.surfaceForm} as one word`, async function () {
          assert.ok(context.segmenter);
          const words = await context.segmenter.segmentAsWords(verb.surfaceForm);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Verb);
          assert.equal(word.surfaceForm, verb.surfaceForm);
        });
      }
    };

    describe('VerbType.Kuru', function () {
      const runTestCase = (testCases: string[]) => {
        const cases = testCases.map((testCase) => { return { surfaceForm: testCase, basicForm: '来る' } });
        runTest(cases);
      };
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = ['来れば'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ConditionalContraction1', function () {
        const verbs = ['来りゃ'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.PlainForm', function () {
        const verbs = ['来る'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.SpecialIndeclinableNominalConjunction1', function () {
        const verbs = ['来ん'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.SpecialIndeclinableNominalConjunction2', function () {
        const verbs = ['来'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.IrrealisUConjunction', function () {
        const verbs = ['来よう'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Irrealis', function () {
        const verbs = ['来ない'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeI', function () {
        const verbs = ['来い'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeYo', function () {
        const verbs = ['来よ'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Continuative', function () {
        const verbs = ['来ます', '来ました', '来まして'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.TaConjunction', function () {
        const verbs = ['来た'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.TeConjunction', function () {
        const verbs = ['来て'];
        runTestCase(verbs);
      });
    });

    describe('VerbType.Suru', function () {
      const runTestCase = (testCases: string[]) => {
        const cases = testCases.map((testCase) => { return { surfaceForm: testCase, basicForm: 'する' } });
        runTest(cases);
      };
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = ['すれば'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ConditionalContraction1', function () {
        const verbs = ['すりゃ'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.PlainForm', function () {
        const verbs = ['する'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.SpecialIndeclinableNominalConjunction1', function () {
        const verbs = ['すん'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.SpecialIndeclinableNominalConjunction2', function () {
        const sentence = '今日すの？';
        const verb = 'す';
        it(`should identify ${verb} in ${sentence} as one word`, async function () {
          assert.ok(context.segmenter);
          const words = await context.segmenter.segmentAsWords(sentence);
          assert.equal(words.length, 4); // 今日、す、の、？
          const word = words[1];
          assert.equal(word.pos, tokun.PartOfSpeech.Verb);
          assert.equal(word.surfaceForm, verb);
          const detail = word.detail && word.detail.type === tokun.PartOfSpeech.Verb ? word.detail : undefined;
          assert.equal(true, detail);
          assert.equal(detail?.stem.basicForm, 'する');
        });
      });
      describe('ConjugatedForm.ClassicalPlainForm', function () {
        const sentence = 'このようにす？';
        const verb = 'す';
        it(`should identify ${verb} in ${sentence} as one word`, async function () {
          assert.ok(context.segmenter);
          const words = await context.segmenter.segmentAsWords(sentence);
          assert.equal(words.length, 5); // この、よう, に、す、？
          const word = words[3];
          assert.equal(word.pos, tokun.PartOfSpeech.Verb);
          assert.equal(word.surfaceForm, verb);
          const detail = word.detail && word.detail.type === tokun.PartOfSpeech.Verb ? word.detail : undefined;
          assert.equal(true, detail);
          assert.equal(detail?.stem.basicForm, 'する');
        });
      });
      describe('ConjugatedForm.IrrealisUConjunction', function () {
        const verbs = ['しよう'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.IrrealisNuConjunction', function () {
        const verbs = ['せぬ'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.IrrealisReruConjunction', function () {
        const verbs = ['される'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Irrealis', function () {
        const verbs = ['しない'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeRo', function () {
        const verbs = ['しろ'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeYo', function () {
        const verbs = ['せよ'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Continuative', function () {
        const verbs = ['します', 'しました', 'しまして'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.TaConjunction', function () {
        const verbs = ['した'];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.TeConjunction', function () {
        const verbs = ['して'];
        runTestCase(verbs);
      });
    });

    describe('VerbType.SpecialClassSuruVerb', function () {
      const runTestCase = (testCases: { surfaceForm: string, basicForm: string }[]) => {
        runTest(testCases);
      };
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = [{ surfaceForm: '愛すれば', basicForm: "愛する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ConditionalContraction1', function () {
        const verbs = [{ surfaceForm: '愛すりゃ', basicForm: "愛する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.PlainForm', function () {
        const verbs = [{ surfaceForm: '反する', basicForm: "反する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ClassicalPlainForm', function () {
        const sentence = '主命に反す';
        const verb = '反す';
        it(`should identify ${verb} in ${sentence} as one word`, async function () {
          assert.ok(context.segmenter);
          const words = await context.segmenter.segmentAsWords(sentence);
          assert.equal(words.length, 3); // 主命,に,反す
          const word = words[2];
          assert.equal(word.pos, tokun.PartOfSpeech.Verb);
          assert.equal(word.surfaceForm, verb);
        });
      });
      describe('ConjugatedForm.IrrealisUConjunction', function () {
        const verbs = [{ surfaceForm: '愛しよう', basicForm: "愛する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Irrealis', function () {
        const verbs = [{ surfaceForm: '反しない', basicForm: "反する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.IrrealisReruConjunction', function () {
        const verbs = [{ surfaceForm: '愛せらる', basicForm: "愛する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeRo', function () {
        const verbs = [{ surfaceForm: '反しろ', basicForm: "反する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeYo', function () {
        const verbs = [{ surfaceForm: '愛せよ', basicForm: "愛する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Continuative', function () {
        const verbs = [
          { surfaceForm: '反します', basicForm: "反する" },
          { surfaceForm: '反しました', basicForm: "反する" },
          { surfaceForm: '反しまして', basicForm: "反する" },
        ];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.TaConjunction', function () {
        const verbs = [{ surfaceForm: '愛した', basicForm: "愛する" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.TeConjunction', function () {
        const verbs = [{ surfaceForm: '愛して', basicForm: "愛する" }];
        runTestCase(verbs);
      });
    });

    describe('VerbType.ZuruVerb', function () {
      const runTestCase = (testCases: { surfaceForm: string, basicForm: string }[]) => {
        runTest(testCases);
      };
      describe('ConjugatedForm.ConditionalForm', function () {
        const verbs = [{ surfaceForm: '信ずれば', basicForm: "信ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ConditionalContraction1', function () {
        const verbs = [{ surfaceForm: '信ずりゃ', basicForm: "信ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.PlainForm', function () {
        const verbs = [{ surfaceForm: '信ずる', basicForm: "信ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ClassicalPlainForm', function () {
        const verbs = [{ surfaceForm: '減ず', basicForm: "減ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.IrrealisUConjunction', function () {
        const verbs = [{ surfaceForm: '命じよう', basicForm: "命ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.Irrealis', function () {
        const verbs = [{ surfaceForm: '信じない', basicForm: "信ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeRo', function () {
        const verbs = [{ surfaceForm: '信じない', basicForm: "信ずる" }];
        runTestCase(verbs);
      });
      describe('ConjugatedForm.ImperativeYo', function () {
        const verbs = [{ surfaceForm: '信ぜよ', basicForm: "信ずる" }];
        runTestCase(verbs);
      });
    });
  });
}