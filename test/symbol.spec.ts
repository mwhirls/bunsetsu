import * as bunsetsu from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  const runTestCase = (cases: string[], symbolType: bunsetsu.SymbolType, wordType?: bunsetsu.WordType) => {
    const type = wordType ?? bunsetsu.WordType.Known;
    for (const c of cases) {
      it(`should identify ${c} as one alphabetical character`, function () {
        assert.ok(context.segmenter);
        const words = context.segmenter.segmentAsWords(c);
        assert.equal(words.length, 1);

        const word = words[0];
        assert.equal(word.pos, bunsetsu.PartOfSpeech.Symbol);
        assert.equal(word.surfaceForm, c);
        if (type === bunsetsu.WordType.Known) {
          assert.equal(word.basicForm, c);
        }

        assert.equal(word.tokens.length, 1);
        const token = word.tokens[0];
        assert.ok(token.detail);
        assert.equal(token.detail.type, bunsetsu.DetailType.SymbolDetail);
        const detail = token.detail as bunsetsu.SymbolDetail;
        assert.equal(detail.symbolType, symbolType);
      });
    }
  };

  describe('PartOfSpeech.Symbol', async function () {
    describe('alphabet', function () {
      const alphabet = [...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'];
      runTestCase(alphabet, bunsetsu.SymbolType.Alphabet);
    });

    describe('opening brackets/parenthesis', function () {
      const brackets = [...'「『（'];
      runTestCase(brackets, bunsetsu.SymbolType.OpeningBracketParens);
    });

    describe('closing brackets/parenthesis', function () {
      const brackets = [...'」』）'];
      runTestCase(brackets, bunsetsu.SymbolType.ClosingBracketParens);
    });

    describe('period', function () {
      const c = '。';
      runTestCase([c], bunsetsu.SymbolType.Period);
    });

    describe('exclamation mark', function () {
      const c = '！';
      runTestCase([c], bunsetsu.SymbolType.Unknown);
    });


    describe('question mark', function () {
      const c = '？';
      runTestCase([c], bunsetsu.SymbolType.Unknown);
    });

    describe('interpunct', function () {
      const c = '・';
      runTestCase([c], bunsetsu.SymbolType.Unknown);
    });

    describe('space', function () {
      const space = '　';
      runTestCase([space], bunsetsu.SymbolType.Space);
    });

    describe('common', function () {
      const comma = '、';
      runTestCase([comma], bunsetsu.SymbolType.Comma);
    });

    describe('misc. special characters', function () {
      const brackets = [...'!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~'];
      runTestCase(brackets, bunsetsu.SymbolType.Unknown, bunsetsu.WordType.Unknown);
    });
  });
}