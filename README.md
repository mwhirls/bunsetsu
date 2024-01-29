[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# bunsetsu
A wrapper library around [kuromoji](https://github.com/takuyaa/kuromoji.js) that intelligently groups Japanese morphemes into words

Kuromoji and other morphological parsers tokenize Japanese sentences into morphemes, which may or may not correspond to what we typically think of as word unit.  This means that conjugations of a verb are typically parsed as multiple tokens separate from the stem-form of the word.  For example, the te-form of a verb, such as 食べる (taberu), is parsed as 食べ and て instead of together as 食べて.

However, for language learning applications, this is often too granular.  It can be useful to include conjugations and other auxillary tokens as part of the word itself, i.e. for indicating to the user that a word is conjugated, and if so what form.  

This library builds on top of kuromoji to group the morphemes it produces into full "words."  The definition of a word is a bit subjective, but bunsetsu takes a fairly aggressively approach in grouping tokens together.  Some examples of words include:
* In the case of verbs, the verb stem plus the conjugated part, such as te-form, past form, or polite form.
* In the case of adjectives, the adjectival stem plus the te-form or the past tense suffix, such as:
    * 暑かった
    * 明るくて
* The base verb plus subsidiary verbs (verbs that attach to the te-form) as in:
    * 置いておいた
    * 調べてみる
* The base verb plus some auxillary verbs, such as ～てくれる・～てもらう・～てあげる (tekureru / temorau / teageru) and their polite equivalents.

See the test cases under '/test/' to get a sense of the types of tokens bunsetsu groups together as a single word unit.

## License

bunsetsu is licensed under the MIT license.

### Kuromoji

This project uses [kuromoji](https://github.com/takuyaa/kuromoji.js), which is licensed under the Apache 2.0 license. 