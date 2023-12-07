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
          it(`should identify ${c} as one space character`, async function () {
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
      const runTest = (testCases: { surfaceForm: string, basicForm: string }[]) => {
        for (const adjective of testCases) {
          it(`should identify ${adjective.surfaceForm} as one word`, async function () {
            const words = await segmenter.segmentAsWords(adjective.surfaceForm);
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
        runTest(adjectives);
      });

      describe('ConjugatedForm.ConditionalForm', function () {
        const adjectives = [
          { surfaceForm: '美味しければ', basicForm: "美味しい" },
          { surfaceForm: '早ければ', basicForm: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ConditionalContraction1', function () {
        const adjectives = [
          { surfaceForm: '美味しけりゃ', basicForm: "美味しい" },
          { surfaceForm: '早けりゃ', basicForm: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ConditionalContraction2', function () {
        const adjectives = [
          { surfaceForm: '美味しきゃ', basicForm: "美味しい" },
          { surfaceForm: '早きゃ', basicForm: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.PlainForm', function () {
        const adjectives = [
          { surfaceForm: '美味しい', basicForm: "美味しい" },
          { surfaceForm: '早い', basicForm: "早い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.IndeclinableNominalConjunction', function () {
        const adjectives = [
          { surfaceForm: '美しき', basicForm: "美しい" },
          { surfaceForm: '親しき', basicForm: "親しい" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ClassicalPlainForm', function () {
        const adjectives = [
          { surfaceForm: '赤し', basicForm: "赤い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.IrrealisUConjunction', function () {
        const adjectives = [
          { surfaceForm: '高かろう', basicForm: "高い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.IrrealisNuConjunction', function () {
        const adjectives = [
          { surfaceForm: '高からぬ', basicForm: "高い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.ImperativeE', function () {
        const adjectives = [
          { surfaceForm: '多かれ', basicForm: "多い" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.GozaiConjunction', function () {
        const adjectives = [
          { surfaceForm: '愛しうございます', basicForm: "愛しい" },
          { surfaceForm: '苦しゅうない', basicForm: "苦しい" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.TaConjunction', function () {
        const adjectives = [
          { surfaceForm: 'うるさかった', basicForm: "うるさい" },
        ];
        runTest(adjectives);
      });

      describe('ConjugatedForm.TeConjunction', function () {
        const adjectives = [
          { surfaceForm: '女々しくて', basicForm: "女々しい" },
          { surfaceForm: 'うるさく', basicForm: "うるさい" },
          { surfaceForm: '芳しくない', basicForm: "芳しい" },
        ];
        runTest(adjectives);
      });

    });

    describe('PartOfSpeech.Verb', function () {
      const runTestVerb = (testCases: { surfaceForm: string, basicForm: string }[]) => {
        for (const verb of testCases) {
          it(`should identify ${verb.surfaceForm} as one word`, async function () {
            const words = await segmenter.segmentAsWords(verb.surfaceForm);
            assert.equal(words.length, 1);
            const word = words[0];
            assert.equal(word.pos, tokun.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, verb.surfaceForm);
          });
        }
      };

      describe('VerbType.Kuru', function () {
        const runTest = (testCases: string[]) => {
          const cases = testCases.map((testCase) => { return { surfaceForm: testCase, basicForm: '来る' } });
          runTestVerb(cases);
        };
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

      describe('VerbType.Suru', function () {
        const runTest = (testCases: string[]) => {
          const cases = testCases.map((testCase) => { return { surfaceForm: testCase, basicForm: 'する' } });
          runTestVerb(cases);
        };
        describe('ConjugatedForm.ConditionalForm', function () {
          const verbs = ['すれば'];
          runTest(verbs);
        });
        describe('ConjugatedForm.ConditionalContraction1', function () {
          const verbs = ['すりゃ'];
          runTest(verbs);
        });
        describe('ConjugatedForm.PlainForm', function () {
          const verbs = ['する'];
          runTest(verbs);
        });
        describe('ConjugatedForm.SpecialIndeclinableNominalConjunction1', function () {
          const verbs = ['すん'];
          runTest(verbs);
        });
        describe('ConjugatedForm.SpecialIndeclinableNominalConjunction2', function () {
          const sentence = '今日すの？';
          const verb = 'す';
          it(`should identify ${verb} in ${sentence} as one word`, async function () {
            const words = await segmenter.segmentAsWords(sentence);
            assert.equal(words.length, 4); // 今日、す、の、？
            const word = words[1];
            assert.equal(word.pos, tokun.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, verb);
            assert.equal(word.basicForm, 'する');
          });
        });
        describe('ConjugatedForm.ClassicalPlainForm', function () {
          const sentence = 'このようにす？';
          const verb = 'す';
          it(`should identify ${verb} in ${sentence} as one word`, async function () {
            const words = await segmenter.segmentAsWords(sentence);
            assert.equal(words.length, 5); // この、よう, に、す、？
            const word = words[3];
            assert.equal(word.pos, tokun.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, verb);
            assert.equal(word.basicForm, 'する');
          });
        });
        describe('ConjugatedForm.IrrealisUConjunction', function () {
          const verbs = ['しよう'];
          runTest(verbs);
        });
        describe('ConjugatedForm.IrrealisNuConjunction', function () {
          const verbs = ['せぬ'];
          runTest(verbs);
        });
        describe('ConjugatedForm.IrrealisReruConjunction', function () {
          const verbs = ['される'];
          runTest(verbs);
        });
        describe('ConjugatedForm.Irrealis', function () {
          const verbs = ['しない'];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeRo', function () {
          const verbs = ['しろ'];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeYo', function () {
          const verbs = ['せよ'];
          runTest(verbs);
        });
        describe('ConjugatedForm.Continuative', function () {
          const verbs = ['します', 'しました', 'しまして'];
          runTest(verbs);
        });
        describe('ConjugatedForm.TaConjunction', function () {
          const verbs = ['した'];
          runTest(verbs);
        });
        describe('ConjugatedForm.TeConjunction', function () {
          const verbs = ['して'];
          runTest(verbs);
        });
      });

      describe('VerbType.SpecialClassSuruVerb', function () {
        const runTest = (testCases: { surfaceForm: string, basicForm: string }[]) => {
          runTestVerb(testCases);
        };
        describe('ConjugatedForm.ConditionalForm', function () {
          const verbs = [{ surfaceForm: '愛すれば', basicForm: "愛する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ConditionalContraction1', function () {
          const verbs = [{ surfaceForm: '愛すりゃ', basicForm: "愛する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.PlainForm', function () {
          const verbs = [{ surfaceForm: '反する', basicForm: "反する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ClassicalPlainForm', function () {
          const sentence = '主命に反す';
          const verb = '反す';
          it(`should identify ${verb} in ${sentence} as one word`, async function () {
            const words = await segmenter.segmentAsWords(sentence);
            assert.equal(words.length, 3); // 主命,に,反す
            const word = words[2];
            assert.equal(word.pos, tokun.PartOfSpeech.Verb);
            assert.equal(word.surfaceForm, verb);
          });
        });
        describe('ConjugatedForm.IrrealisUConjunction', function () {
          const verbs = [{ surfaceForm: '愛しよう', basicForm: "愛する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.Irrealis', function () {
          const verbs = [{ surfaceForm: '反しない', basicForm: "反する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.IrrealisReruConjunction', function () {
          const verbs = [{ surfaceForm: '愛せらる', basicForm: "愛する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeRo', function () {
          const verbs = [{ surfaceForm: '反しろ', basicForm: "反する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeYo', function () {
          const verbs = [{ surfaceForm: '愛せよ', basicForm: "愛する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.Continuative', function () {
          const verbs = [
            { surfaceForm: '反します', basicForm: "反する" },
            { surfaceForm: '反しました', basicForm: "反する" },
            { surfaceForm: '反しまして', basicForm: "反する" },
          ];
          runTest(verbs);
        });
        describe('ConjugatedForm.TaConjunction', function () {
          const verbs = [{ surfaceForm: '愛した', basicForm: "愛する" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.TeConjunction', function () {
          const verbs = [{ surfaceForm: '愛して', basicForm: "愛する" }];
          runTest(verbs);
        });
      });

      describe('VerbType.ZuruVerb', function () {
        const runTest = (testCases: { surfaceForm: string, basicForm: string }[]) => {
          runTestVerb(testCases);
        };
        describe('ConjugatedForm.ConditionalForm', function () {
          const verbs = [{ surfaceForm: '信ずれば', basicForm: "信ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ConditionalContraction1', function () {
          const verbs = [{ surfaceForm: '信ずりゃ', basicForm: "信ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.PlainForm', function () {
          const verbs = [{ surfaceForm: '信ずる', basicForm: "信ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ClassicalPlainForm', function () {
          const verbs = [{ surfaceForm: '減ず', basicForm: "減ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.IrrealisUConjunction', function () {
          const verbs = [{ surfaceForm: '命じよう', basicForm: "命ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.Irrealis', function () {
          const verbs = [{ surfaceForm: '信じない', basicForm: "信ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeRo', function () {
          const verbs = [{ surfaceForm: '信じない', basicForm: "信ずる" }];
          runTest(verbs);
        });
        describe('ConjugatedForm.ImperativeYo', function () {
          const verbs = [{ surfaceForm: '信ぜよ', basicForm: "信ずる" }];
          runTest(verbs);
        });
      });
    });
  });
});


/*
        describe('ConjugatedForm.ImperativeI', function () {
          const verbs = [{ surfaceForm: '掃除せい', basicForm: "掃除する" }];
          runTest(verbs);
        });
*/