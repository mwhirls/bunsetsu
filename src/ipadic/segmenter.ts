import kuromoji, { IpadicFeatures } from "kuromoji";
import { Segmenter } from "../segmenter.js";
import { PartOfSpeech, ConjugatedForm, IpadicConjugatedType } from "../token.js";
import { Sentence, Word } from "../word.js";
import { IpadicPOSDetails } from "../details.js";
import { IpadicConjugation, IpadicConjugationDetail, IpadicNode, IpadicSymbol } from "./token.js";
import { IpadicSentence, IpadicWord } from "./word.js";

class TokenCursor {
    private readonly tokens: kuromoji.IpadicFeatures[];
    private readonly curr: number;

    constructor(tokens: kuromoji.IpadicFeatures[], curr: number) {
        this.tokens = tokens;
        this.curr = curr;
    }

    token(): kuromoji.IpadicFeatures {
        return this.tokens[this.curr];
    }

    peek(): kuromoji.IpadicFeatures | null {
        const next = this.curr + 1;
        if (next >= this.tokens.length) {
            return null;
        }
        return this.tokens[next];
    }

    advanced(num: number): TokenCursor | null {
        const next = this.curr + num;
        if (next >= this.tokens.length) {
            return null;
        }
        return new TokenCursor(this.tokens, next);
    }

    next(): TokenCursor | null {
        return this.advanced(1);
    }
}

function handleSpecialCharacter(cursor: TokenCursor) {
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    const isSpecialCharacter = format.test(cursor.token().basic_form);
    if (isSpecialCharacter) {
        return handleSymbol(cursor);
    }
    return null;
}

function isNominalizer(token: IpadicFeatures) {
    const nominalizers = [
        'の',
        'ん',
        'こと',
    ];
    return nominalizers.some(x => x === token.surface_form);
}

function handleNominalizer(cursor: TokenCursor) {
    const token = cursor.token();
    if (!isNominalizer(token)) {
        return null;
    }
    if (token.surface_form === 'こと') {
        return new IpadicNode(PartOfSpeech.Noun, token);
    }
    return new IpadicNode(PartOfSpeech.Particle, token);
}

function handleNoun(cursor: TokenCursor) {
    const specialCharacter = handleSpecialCharacter(cursor);
    if (specialCharacter) {
        return specialCharacter;
    }
    const nominalizer = handleNominalizer(cursor);
    if (nominalizer) {
        return nominalizer;
    }
    const token = cursor.token();
    const details = new IpadicPOSDetails(token);
    const next = cursor.next();
    if (!next) {
        return new IpadicNode(PartOfSpeech.Noun, token);
    }
    const isSuruVerb = details.isSuruVerb() && next.token().basic_form === 'する';
    const isNaiAdjective = details.isNaiAdjectiveStem() && next.token().basic_form === 'ない';
    if (isSuruVerb || isNaiAdjective) {
        const auxillary = nextWord(next);
        return new IpadicNode(PartOfSpeech.Noun, token, undefined, auxillary);
    }
    return new IpadicNode(PartOfSpeech.Noun, token);
}

function handleFiller(cursor: TokenCursor) {
    const specialCases = ['あのう', 'えっと', 'ええっと', 'ええと']; // tokenizer splits these into separate tokens
    const token = cursor.token();
    const next = cursor.next();
    if (next) {
        const compound = `${token.basic_form}${next.token().basic_form}`;
        if (specialCases.some((value) => compound === value)) {
            const aux = nextWord(next);
            return new IpadicNode(PartOfSpeech.Filler, token, undefined, aux);
        }
    }
    if (token.pos === PartOfSpeech.Filler) {
        return new IpadicNode(PartOfSpeech.Filler, token);
    }
    return null;
}

function handleInterjection(cursor: TokenCursor) {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicNode(PartOfSpeech.Interjection, token);
}

function handleSymbol(cursor: TokenCursor) {
    const token = cursor.token();
    return new IpadicSymbol(token);
}

function conjugatedWord(stem: kuromoji.IpadicFeatures, conjugatedForm: ConjugatedForm, auxillary?: IpadicNode): IpadicConjugation {
    const detail = new IpadicConjugationDetail(conjugatedForm);
    return new IpadicConjugation(stem, detail, auxillary);
}

function handlePlainForm(cursor: TokenCursor) {
    const token = cursor.token();
    const form = token.conjugated_form as ConjugatedForm; // todo
    const next = cursor.next();
    if (!next) {
        // sometimes ん gets categorized as an auxillary verb (食べるん)
        if (isNominalizer(token)) {
            return new IpadicNode(PartOfSpeech.Particle, token);
        }
        return conjugatedWord(cursor.token(), form);
    }
    // handle cases like 食べるまい
    const nextToken = next.token();
    if (nextToken.pos === PartOfSpeech.AuxillaryVerb) {
        // sometimes ん gets categorized as an auxillary verb (食べるん)
        if (isNominalizer(nextToken)) {
            return conjugatedWord(token, form);
        }
        const auxillary = nextWord(next);
        return conjugatedWord(token, form, auxillary);
    }
    return conjugatedWord(token, form);
}

function handleConditional(cursor: TokenCursor): IpadicConjugation {
    const token = cursor.token();
    const form = ConjugatedForm.ConditionalForm;
    const next = cursor.next();
    if (next && next.token().surface_form === 'ば') { // group 来れ+ば
        const particle = nextWord(next);
        return conjugatedWord(token, form, particle);
    }
    return conjugatedWord(token, form);
}

function handleTeForm(cursor: TokenCursor) {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return null;
    }
    const nextToken = next.token();
    if (nextToken.surface_form === 'て' || // group 早く＋て
        nextToken.surface_form === 'で') { // group 泳い＋で
        const subsidiaryVerb = handleAuxillaryVerb(next.next());
        const particle = nextWord(next);
        particle.next = subsidiaryVerb;
        return conjugatedWord(token, ConjugatedForm.TeConjunction, particle);
    }
    return null;
}

function handleTeConjunction(cursor: TokenCursor) {
    const teForm = handleTeForm(cursor);
    if (teForm) {
        return teForm;
    }
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return conjugatedWord(cursor.token(), ConjugatedForm.TeConjunction);
    }
    // adverbial form, e.g. 早く
    const auxillary = nextWord(next);
    return conjugatedWord(token, ConjugatedForm.TeConjunction, auxillary);
}

function handleIchidanKureru(cursor: TokenCursor) {
    const token = cursor.token();
    if (token.conjugated_type === IpadicConjugatedType.IchidanKureru &&
        token.surface_form === 'くれ') { // irregular imperative of くれる can be miscategorized as continuative form
        const next = cursor.next()?.token();
        if (!next || next.pos === PartOfSpeech.Particle) {
            return conjugatedWord(token, ConjugatedForm.ImperativeE);
        }
    }
    return null;
}

function handleNasaiContraction(cursor: TokenCursor) {
    // attempt to manually infer the contracted ～なさい form (e.g. 食べな) 
    // since it tends to come through as stem + sentence-ending particle
    const token = cursor.token();
    if (token.pos !== PartOfSpeech.Verb &&
        token.pos !== PartOfSpeech.AuxillaryVerb) {
        return null;
    }
    if (token.conjugated_form !== ConjugatedForm.Continuative) {
        return null;
    }
    const next = cursor.next();
    if (!next) {
        return null;
    }
    const nextToken = next.token();
    if (nextToken.surface_form === 'な') {
        const auxillary = nextWord(next);
        return conjugatedWord(token, ConjugatedForm.Continuative, auxillary);
    }
}

function handleSuffix(cursor: TokenCursor, conjugatedForm: ConjugatedForm): IpadicNode | null {
    const token = cursor.token();
    const next = cursor.next();
    if (!next) {
        return null;
    }
    const nextToken = next.token();
    const details = new IpadicPOSDetails(nextToken);
    if (!details.isSuffix()) {
        return null;
    }
    const suffix = nextWord(next);
    return conjugatedWord(token, conjugatedForm, suffix);
}

function isAuxillaryVerb(cursor: TokenCursor) {
    const token = cursor.token();
    const tokend = new IpadicPOSDetails(token);
    return token.pos === PartOfSpeech.AuxillaryVerb ||
        tokend.isNotIndependent() ||
        token.basic_form === 'おる' || // ～ておる subsidiary verb gets marked as an independent verb
        token.basic_form === 'ある'; // ～てある subsidiary verb gets marked as an independent verb
}

function isEndOfClause(cursor: TokenCursor) {
    const token = cursor.token();
    const tokend = new IpadicPOSDetails(token);
    return tokend.isSentenceEndingParticle() || isNominalizer(token);
}

function handleAuxillaryVerb(cursor: TokenCursor | null) {
    if (!cursor) {
        return undefined;
    }
    const token = cursor.token();
    if (!isAuxillaryVerb(cursor)) {
        return undefined;
    }
    const form = token.conjugated_form as ConjugatedForm; // todo
    const suffix = handleSuffix(cursor, form);
    if (suffix) {
        return suffix;
    }
    const next = cursor.next();
    if (!next) {
        return conjugatedWord(token, form);
    }
    const nextd = new IpadicPOSDetails(next.token());
    if (isEndOfClause(next)) {
        return conjugatedWord(token, form);
    }
    if (next.token().pos === PartOfSpeech.AuxillaryVerb ||
        nextd.isNotIndependent()) {
        const auxillary = nextWord(next);
        return conjugatedWord(token, form, auxillary);
    }
    const stemForms = [
        ConjugatedForm.ConditionalForm,
        ConjugatedForm.Continuative,
        ConjugatedForm.GaruConjunction,
        ConjugatedForm.GozaiConjunction,
        ConjugatedForm.Irrealis,
        ConjugatedForm.TaConjunction,
        ConjugatedForm.TeConjunction
    ];
    const isStem = stemForms.some(x => x === token.conjugated_form);
    if (isStem) {
        const auxillary = nextWord(next);
        return conjugatedWord(token, form, auxillary);
    }
    return conjugatedWord(token, form);
}

function handleStemAuxillaryForm(cursor: TokenCursor) {
    const token = cursor.token();
    const next = cursor.peek();
    const kureru = handleIchidanKureru(cursor);
    if (kureru) {
        return kureru;
    }
    const form = token.conjugated_form as ConjugatedForm;
    if (!next) {
        return conjugatedWord(token, form);
    }
    const teForm = handleTeForm(cursor);
    if (teForm) {
        return teForm;
    }
    const nasai = handleNasaiContraction(cursor);
    if (nasai) {
        return nasai;
    }
    const suffixed = handleSuffix(cursor, form);
    if (suffixed) {
        return suffixed;
    }
    const auxillary = handleAuxillaryVerb(cursor.next());
    return conjugatedWord(token, form, auxillary);
}

function handleVerbAdjective(cursor: TokenCursor): IpadicConjugation {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as adjectives
    if (filler) {
        return filler;
    }
    switch (token.conjugated_form) {
        case ConjugatedForm.PlainForm:
            return handlePlainForm(cursor);
        case ConjugatedForm.ConditionalContraction1:
        case ConjugatedForm.ConditionalContraction2:
        case ConjugatedForm.ImperativeE:
        case ConjugatedForm.ImperativeI:
        case ConjugatedForm.ImperativeRo:
        case ConjugatedForm.ImperativeYo:
        case ConjugatedForm.IndeclinableNominalConjunction:
        case ConjugatedForm.SpecialIndeclinableNominalConjunction1:
        case ConjugatedForm.SpecialIndeclinableNominalConjunction2:
        case ConjugatedForm.ClassicalPlainForm:
            return conjugatedWord(token, token.conjugated_form);
        case ConjugatedForm.ConditionalForm:
            return handleConditional(cursor);
        case ConjugatedForm.Continuative:
        case ConjugatedForm.GaruConjunction:
        case ConjugatedForm.GozaiConjunction:
        case ConjugatedForm.Irrealis:
        case ConjugatedForm.IrrealisUConjunction:
        case ConjugatedForm.IrrealisNuConjunction:
        case ConjugatedForm.IrrealisReruConjunction:
        case ConjugatedForm.SpecialIrrealis:
        case ConjugatedForm.TaConjunction:
            return handleStemAuxillaryForm(cursor);
        case ConjugatedForm.TeConjunction:
            return handleTeConjunction(cursor);
        default:
            throw new Error("unhandled verb/adjective conjugation");
    }
}

function nextWord(cursor: TokenCursor): IpadicNode {
    const token = cursor.token();
    switch (token.pos) {
        case PartOfSpeech.Filler:
            return handleFiller(cursor) ?? new IpadicNode(PartOfSpeech.Filler, token);
        case PartOfSpeech.Interjection:
            return handleInterjection(cursor);
        case PartOfSpeech.Symbol:
            return handleSymbol(cursor);
        case PartOfSpeech.Verb:
        case PartOfSpeech.AuxillaryVerb:
        case PartOfSpeech.iAdjective:
            return handleVerbAdjective(cursor);
        case PartOfSpeech.Noun:
            return handleNoun(cursor);
        default: {
            const pos = Object.values(PartOfSpeech).find(x => x === token.pos) ?? PartOfSpeech.Unknown;
            return new IpadicNode(pos, token);
        }
    }
}

function nextSentence(tokens: kuromoji.IpadicFeatures[], start: number): IpadicSentence {
    const result = [];
    let index = start;
    while (index < tokens.length) {
        const root = nextWord(new TokenCursor(tokens, index));
        const word = new IpadicWord(root);
        index += word.tokens.length;
        result.push(word);
        // todo: break sentence
    }
    return { words: result, start, end: index };
}

function toSentences(tokens: kuromoji.IpadicFeatures[]): Sentence[] {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const sentence = nextSentence(tokens, index);
        index += sentence.end - sentence.start;
        result.push(sentence);
    }
    return result;
}

function toWords(tokens: kuromoji.IpadicFeatures[]): Word[] {
    const result = [];
    let index = 0;
    while (index < tokens.length) {
        const cursor = new TokenCursor(tokens, index);
        const root = nextWord(cursor);
        const word = new IpadicWord(root);
        index += word.tokens.length;
        result.push(word);
    }
    return result;
}

export class IpadicSegmenter implements Segmenter {
    tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>;

    constructor(tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>) {
        this.tokenizer = tokenizer;
    }

    segmentAsWords(text: string): Word[] {
        const tokens = this.tokenizer.tokenize(text);
        return toWords(tokens);
    }
    segmentAsSentences(text: string): Sentence[] {
        const tokens = this.tokenizer.tokenize(text);
        return toSentences(tokens);
    }
}

export function buildSegmenter(dicPath: string): Promise<Segmenter> {
    return new Promise((resolve, reject) => {
        const tokenizerBuilder = kuromoji.builder({ dicPath });
        tokenizerBuilder.build((err: Error, tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures>) => {
            if (err) {
                reject(err);
            } else {
                const segmenter = new IpadicSegmenter(tokenizer);
                resolve(segmenter);
            }
        });
    });
}

export default buildSegmenter;