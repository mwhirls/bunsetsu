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


    describe('PartOfSpeech.iAdjective', function () {
      const runTest = (testCases: { surface: string, basic: string }[]) => {
        for (const adjective of testCases) {
          it(`should identify ${adjective.surface} as one word`, async function () {
            const words = await segmenter.segmentAsWords(adjective.surface);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.iAdjective);
            assert.equal(word.surfaceForm, adjective.surface);
            assert.equal(word.basicForm, adjective.basic);
          });
        }
      };

      describe('ConjugatedForm.GaruConjunction', function () {
        const adjectives = [
          { surface: '嬉しがる', basic: "嬉しい" },
          { surface: '早すぎる', basic: '早い' },
          { surface: '悲しさ', basic: '悲しい' },
          { surface: '虚しそう', basic: '虚しい' },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ConditionalForm', function () {
        const adjectives = [
          { surface: '美味しければ', basic: "美味しい" },
          { surface: '早ければ', basic: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ConditionalContraction1', function () {
        const adjectives = [
          { surface: '美味しけりゃ', basic: "美味しい" },
          { surface: '早けりゃ', basic: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ConditionalContraction2', function () {
        const adjectives = [
          { surface: '美味しきゃ', basic: "美味しい" },
          { surface: '早きゃ', basic: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.PlainForm', function () {
        const adjectives = [
          { surface: '美味しい', basic: "美味しい" },
          { surface: '早い', basic: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.IndeclinableNominalConjunction', function () {
        const adjectives = [
          { surface: '美しき', basic: "美しい" },
          { surface: '親しき', basic: "親しい" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ClassicalPlainForm', function () {
        const adjectives = [
          { surface: '赤し', basic: "赤い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.IrrealisUConjunction', function () {
        const adjectives = [
          { surface: '高かろう', basic: "高い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.IrrealisNuConjunction', function () {
        const adjectives = [
          { surface: '高からぬ', basic: "高い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ImperativeE', function () {
        const adjectives = [
          { surface: '多かれ', basic: "多い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.GozaiConjunction', function () {
        const adjectives = [
          { surface: '愛しうございます', basic: "愛しい" },
          { surface: '苦しゅうない', basic: "苦しい" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.TaConjunction', function () {
        const adjectives = [
          { surface: 'うるさかった', basic: "うるさい" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.TeConjunction', function () {
        const adjectives = [
          { surface: '女々しくて', basic: "女々しい" },
          { surface: 'うるさく', basic: "うるさい" },
          { surface: '芳しくない', basic: "芳しい" },
        ];
        runTest(adjectives);
      });

    });

    describe('PartOfSpeech.Verb', function () {
      const runTest = (testCases: string[]) => {
        for (const verb of testCases) {
          it(`should identify ${verb} as one word`, async function () {
            const words = await segmenter.segmentAsWords(verb);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, verb);
            assert.equal(word.basicForm, '来る');
          });
        }
      };

      describe('VerbType.Kuru', function () {
        describe('ConjugatedForm.ConditionalForm', function () {
          const verbs = ['来れば'];
          runTest(verbs);
        });
        describe('ConjugatedForm.ConditionalContraction1', function () {
          const verbs = ['来りゃ'];
          runTest(verbs);
        });
        describe('ConjugatedForm.PlainForm', function () {
          const verbs = ['来る'];
          runTest(verbs);
        });
        describe('ConjugatedForm.SpecialIndeclinableNominalConjunction1', function () {
          const verbs = ['来ん'];
          runTest(verbs);
        });
        describe('ConjugatedForm.SpecialIndeclinableNominalConjunction2', function () {
          const verbs = ['来'];
          runTest(verbs);
        });
        describe('ConjugatedForm.IrrealisUConjunction', function () {
          const verbs = ['来よう'];
          runTest(verbs);
        });
        describe('ConjugatedForm.Irrealis', function () {
          const verbs = ['来ない'];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeI', function () {
          const verbs = ['来い'];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeYo', function () {
          const verbs = ['来よ'];
          runTest(verbs);
        });
        describe('ConjugatedForm.Continuative', function () {
          const verbs = ['来ます', '来ました', '来まして'];
          runTest(verbs);
        });
        describe('ConjugatedForm.TaConjunction', function () {
          const verbs = ['来た'];
          runTest(verbs);
        });
        describe('ConjugatedForm.TeConjunction', function () {
          const verbs = ['来て'];
          runTest(verbs);
        });
      });
    });

  });
});