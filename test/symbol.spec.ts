import * as tokun from "../src/index.js"
import * as assert from 'assert'
import { TestContext } from "./context.js";

export function runTestSuite(context: TestContext) {
  describe('PartOfSpeech.Symbol', async function () {
    describe('SymbolType.Alphabet', function () {
      const alphabet = [...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'];
      for (const c of alphabet) {
        it(`should identify ${c} as one alphabetical character`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
          assert.equal(word.detail !== undefined, true);
          assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
          const symbol = word.detail as tokun.SymbolDetail;
          assert.equal(symbol.symbolType, tokun.SymbolType.Alphabet);
        });
      }
    });

    describe('SymbolType.OpeningBracketParens', function () {
      const brackets = [...'「『（'];
      for (const c of brackets) {
        it(`should identify ${c} as one opening bracket/parentheses`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
          assert.equal(word.detail !== undefined, true);
          assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
          const symbol = word.detail as tokun.SymbolDetail;
          assert.equal(symbol.symbolType, tokun.SymbolType.OpeningBracketParens);
        });
      }
    });

    describe('SymbolType.ClosingBracketParens', function () {
      const brackets = [...'」』）'];
      for (const c of brackets) {
        it(`should identify ${c} as one closing bracket/parentheses`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
          assert.equal(word.detail !== undefined, true);
          assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
          const symbol = word.detail as tokun.SymbolDetail;
          assert.equal(symbol.symbolType, tokun.SymbolType.ClosingBracketParens);
        });
      }
    });


    describe('SymbolType.Period', function () {
      const c = '。';
      it(`should identify ${c} as one full stop character`, function () {
        assert.ok(context.segmenter);
        const words = context.segmenter.segmentAsWords(c);
        assert.equal(words.length, 1);
        const word = words[0];
        assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
        assert.equal(word.surfaceForm, c);
        assert.equal(word.basicForm, c);
        assert.equal(word.detail !== undefined, true);
        assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
        const symbol = word.detail as tokun.SymbolDetail;
        assert.equal(symbol.symbolType, tokun.SymbolType.Period);
      });


      describe('SymbolType.ExclamationMark', function () {
        const c = '！';
        it(`should identify ${c} as one exclamation mark`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
          assert.equal(word.detail !== undefined, true);
          assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
          const symbol = word.detail as tokun.SymbolDetail;
          assert.equal(symbol.symbolType, tokun.SymbolType.ExclamationMark);
        });
      });


      describe('SymbolType.QuestionMark', function () {
        const c = '？';
        it(`should identify ${c} as one question mark`, function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
          assert.equal(word.detail !== undefined, true);
          assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
          const symbol = word.detail as tokun.SymbolDetail;
          assert.equal(symbol.symbolType, tokun.SymbolType.QuestionMark);
        });
      });

      describe('SymbolType.Interpunct', function () {
        const c = '・';
        it(`should identify ${c} as one interpunt character`, async function () {
          assert.ok(context.segmenter);
          const words = context.segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
          assert.equal(word.detail !== undefined, true);
          assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
          const symbol = word.detail as tokun.SymbolDetail;
          assert.equal(symbol.symbolType, tokun.SymbolType.Interpunct);
        });
      });

      describe('SymbolType.Space', function () {
        const spaces = [...'　'];
        for (const c of spaces) {
          it(`should identify ${c} as one space character`, async function () {
            assert.ok(context.segmenter);
            const words = context.segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
            assert.equal(word.detail !== undefined, true);
            assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
            const symbol = word.detail as tokun.SymbolDetail;
            assert.equal(symbol.symbolType, tokun.SymbolType.Space);
          });
        }
      });

      describe('SymbolType.Comma', function () {
        const spaces = [...'、'];
        for (const c of spaces) {
          it(`should identify ${c} as one comma`, async function () {
            assert.ok(context.segmenter);
            const words = context.segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
            assert.equal(word.detail !== undefined, true);
            assert.equal(word.detail?.type, tokun.PartOfSpeech.Symbol);
            const symbol = word.detail as tokun.SymbolDetail;
            assert.equal(symbol.symbolType, tokun.SymbolType.Comma);

          });
        }
      });
    });
  });
}