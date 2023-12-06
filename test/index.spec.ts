import * as tokun from "../src"
import * as assert from 'assert'

const DICTIONARY_PATH = "./node_modules/kuromoji/dict"

describe('Factory Methods', function () {
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
});


describe('Segmenter', async function () {
  const segmenter = await tokun.build(DICTIONARY_PATH);
  describe('segmentAsWords()', function () {
    describe('PartOfSpeech.Filler', function () {
      const fillerWords = ['あの', 'あのー', 'あのう', 'えっと', 'えーと', 'えーっと', 'ええと', 'ええっと'];
      for (const form of fillerWords) {
        it(`should identify ${form} as one filler word`, async function () {
          const words = await segmenter.segmentAsWords(form);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.surfaceForm, form);
          assert.equal(word.pos, tokun.PartOfSpeech.Filler);
        });
      }
    });

    describe('PartOfSpeech.Interjection', function () {
      const interjections = ['こんにちは', 'おはよう', 'じゃあ', 'こんばんは', 'おめでとう'];
      for (const form of interjections) {
        it(`should identify ${form} as one interjection`, async function () {
          const words = await segmenter.segmentAsWords(form);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.surfaceForm, form);
          assert.equal(word.pos, tokun.PartOfSpeech.Interjection);
        });
      }
    });

    describe('PartOfSpeech.Symbol', function () {
      describe('SymbolType.Alphabet', function () {
        const alphabet = [...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'];
        for (const c of alphabet) {
          it(`should identify ${c} as one alphabetical character`, async function () {
            const words = await segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.symbolType, tokun.SymbolType.Alphabet);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
          });
        }
      });

      describe('SymbolType.OpeningBracketParens', function () {
        const brackets = [...'「『（'];
        for (const c of brackets) {
          it(`should identify ${c} as one opening bracket/parentheses`, async function () {
            const words = await segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.symbolType, tokun.SymbolType.OpeningBracketParens);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
          });
        }
      });

      describe('SymbolType.ClosingBracketParens', function () {
        const brackets = [...'」』）'];
        for (const c of brackets) {
          it(`should identify ${c} as one closing bracket/parentheses`, async function () {
            const words = await segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.symbolType, tokun.SymbolType.ClosingBracketParens);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
          });
        }
      });


      describe('SymbolType.Period', function () {
        const c = '。';
        it(`should identify ${c} as one full stop character`, async function () {
          const words = await segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.symbolType, tokun.SymbolType.Period);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
        });
      });


      describe('SymbolType.ExclamationMark', function () {
        const c = '！';
        it(`should identify ${c} as one exclamation mark`, async function () {
          const words = await segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.symbolType, tokun.SymbolType.ExclamationMark);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
        });
      });


      describe('SymbolType.QuestionMark', function () {
        const c = '？';
        it(`should identify ${c} as one question mark`, async function () {
          const words = await segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.symbolType, tokun.SymbolType.QuestionMark);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
        });
      });

      describe('SymbolType.Interpunct', function () {
        const c = '・';
        it(`should identify ${c} as one interpunt character`, async function () {
          const words = await segmenter.segmentAsWords(c);
          assert.equal(words.length, 1);
          const word = words[0];
          assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
          assert.equal(word.symbolType, tokun.SymbolType.Interpunct);
          assert.equal(word.surfaceForm, c);
          assert.equal(word.basicForm, c);
        });
      });

      describe('SymbolType.Space', function () {
        const spaces = [...'　'];
        for (const c of spaces) {
          it(`should identify ${c} as one full stop character`, async function () {
            const words = await segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.symbolType, tokun.SymbolType.Space);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
          });
        }
      });

      describe('SymbolType.Comma', function () {
        const spaces = [...'、'];
        for (const c of spaces) {
          it(`should identify ${c} as one comma`, async function () {
            const words = await segmenter.segmentAsWords(c);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Symbol);
            assert.equal(word.symbolType, tokun.SymbolType.Comma);
            assert.equal(word.surfaceForm, c);
            assert.equal(word.basicForm, c);
          });
        }
      });
    });
  });

});