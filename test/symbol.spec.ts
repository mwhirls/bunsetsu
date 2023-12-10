import * as bunsetsu from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  const runTestCase = (cases: string[], symbolType: bunsetsu.SymbolType) => {
    for (const c of cases) {
      it(`should identify ${c} as one alphabetical character`, function () {
        assert.ok(context.segmenter);
        const words = context.segmenter.segmentAsWords(c);
        assert.equal(words.length, 1);

        const word = words[0];
        assert.equal(word.pos, bunsetsu.PartOfSpeech.Symbol);
        assert.equal(word.surfaceForm, c);
        assert.equal(word.basicForm, c);

        assert.ok(word.detail);
        assert.equal(word.detail.type, bunsetsu.PartOfSpeech.Symbol);
        const detail = word.detail as bunsetsu.SymbolDetail;
        assert.equal(detail.symbolType, symbolType);
      });
    }
  };

  describe('PartOfSpeech.Symbol', async function () {
    describe('SymbolType.Alphabet', function () {
      const alphabet = [...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'];
      runTestCase(alphabet, bunsetsu.SymbolType.Alphabet);
    });

    describe('SymbolType.OpeningBracketParens', function () {
      const brackets = [...'「『（'];
      runTestCase(brackets, bunsetsu.SymbolType.OpeningBracketParens);
    });

    describe('SymbolType.ClosingBracketParens', function () {
      const brackets = [...'」』）'];
      runTestCase(brackets, bunsetsu.SymbolType.ClosingBracketParens);
    });

    describe('SymbolType.Period', function () {
      const c = '。';
      runTestCase([c], bunsetsu.SymbolType.Period);
    });

    describe('SymbolType.ExclamationMark', function () {
      const c = '！';
      runTestCase([c], bunsetsu.SymbolType.ExclamationMark);
    });


    describe('SymbolType.QuestionMark', function () {
      const c = '？';
      runTestCase([c], bunsetsu.SymbolType.QuestionMark);
    });

    describe('SymbolType.Interpunct', function () {
      const c = '・';
      runTestCase([c], bunsetsu.SymbolType.Interpunct);
    });

    describe('SymbolType.Space', function () {
      const space = '　';
      runTestCase([space], bunsetsu.SymbolType.Space);
    });

    describe('SymbolType.Comma', function () {
      const comma = '、';
      runTestCase([comma], bunsetsu.SymbolType.Comma);
    });
  });
}