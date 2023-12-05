import * as tokun from "../src"
import * as assert from 'assert'

const DICTIONARY_PATH = "./node_modules/kuromoji/dict"

describe('Segmenter', function () {
  describe('build', async function () {
    it('should successfully build when a valid path is provided', async function () {
      const _segmenter = await tokun.build(DICTIONARY_PATH);
      assert.equal(true, true);
    });
  });

  describe('build', async function () {
    it('should throw when an invalid path is provided', async function () {
      try {
        await tokun.build("invalid");
        assert.fail();
      } catch (err) {
        assert.equal(err.code, 'ENOENT');
      }
    });
  });
});