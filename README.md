<div align="center">
    <h1>bunsetsu</h1>
</div>
<p align="center">
  A wrapper library written in Typescript around <a href="https://github.com/takuyaa/kuromoji.js">kuromoji</a> that intelligently groups Japanese morphemes into words
</p>
<div align="center">
    <a href="https://github.com/mwhirls/bunsetsu/actions"><img src="https://img.shields.io/github/actions/workflow/status/mwhirls/bunsetsu/build.yml?branch=main" alt="Build Status"></a>
    <a href="https://github.com/mwhirls/bunsetsu/blob/main/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/mwhirls/bunsetsu"></a>
    <img alt="Static Badge" src="https://img.shields.io/badge/stability-experimental-yellow?style=flat">
</div>

## About

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

## Support
bunsetsu is ESM library that supports both server and browser.

## Debugging Unit Tests in VSCode

The source code is written in Typescript using ES modules, and the unit tests are written using [MochaJS](https://mochajs.org/). In order to debug the Typescript unit tests, you must run the tests with `ts-node`.  Add the following configuration to your `launch.json` file in VSCode to get started:

```
{
    "args": [
        "${workspaceRoot}/test/**/*.spec.ts",
        "--no-timeouts"
    ],
    "runtimeArgs": [
        "--loader",
        "ts-node/esm",
    ],
    "env": {
        "TS_NODE_LOG_ERROR": "true"
    },
    "internalConsoleOptions": "openOnSessionStart",
    "name": "Mocha Tests",
    "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
    "request": "launch",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "type": "node"
}
```

## License

bunsetsu is licensed under the MIT license.

### Kuromoji

This project uses [kuromoji](https://github.com/takuyaa/kuromoji.js), which is licensed under the Apache 2.0 license. 
