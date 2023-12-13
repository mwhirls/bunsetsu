import kuromoji, { IpadicFeatures } from "kuromoji";
import { Segmenter } from "../segmenter.js";
import { PartOfSpeech, ConjugatedForm, GrammaticalRole, DetailType } from "../token.js";
import { Sentence, Word } from "../word.js";
import { IpadicConjugatedType, IpadicConjugatedForm, getConjugatedForm, IpadicConjugation, IpadicConjugationDetail } from "./conjugation.js";
import { IpadicPOSDetails } from "./details.js";
import { IpadicSymbol } from "./symbol.js";
import { IpadicNode } from "./token.js";
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

function handleNoun(cursor: TokenCursor) {
    const token = cursor.token();
    const details = new IpadicPOSDetails(token);
    if (details.isSuruVerb(token)) {
        const next = cursor.next();
        if (next && next.token().basic_form === 'する') {
            const verb = handleVerbAdjective(next);
            if (verb.detail && verb.detail.type === DetailType.ConjugationDetail) {
                return new IpadicNode(PartOfSpeech.Noun, token, GrammaticalRole.Unknown, undefined, verb);
            }
        }
    }
    return new IpadicNode(PartOfSpeech.Noun, token, GrammaticalRole.Unknown);
}

function handleFiller(cursor: TokenCursor) {
    const specialCases = ['あのう', 'えっと', 'ええっと', 'ええと']; // tokenizer splits these into separate tokens
    const token = cursor.token();
    const next = cursor.next();
    if (next) {
        const compound = `${token.basic_form}${next.token().basic_form}`;
        if (specialCases.some((value) => compound === value)) {
            const aux = nextWord(next);
            return new IpadicNode(PartOfSpeech.Filler, token, GrammaticalRole.Unknown, undefined, aux);
        }
    }
    if (token.pos === PartOfSpeech.Filler) {
        return new IpadicNode(PartOfSpeech.Filler, token, GrammaticalRole.Unknown);
    }
    return null;
}

function handleInterjection(cursor: TokenCursor) {
    const token = cursor.token();
    const filler = handleFiller(cursor); // sometimes pieces of fillers are categorized as interjections
    return filler ?? new IpadicNode(PartOfSpeech.Interjection, token, GrammaticalRole.Unknown);
}

function handleSymbol(cursor: TokenCursor) {
    const token = cursor.token();
    return new IpadicSymbol(token);
}

function conjugatedWord(stem: kuromoji.IpadicFeatures, conjugatedForm: ConjugatedForm, auxillary?: IpadicNode): IpadicConjugation {
    const detail = new IpadicConjugationDetail(conjugatedForm);
    return new IpadicConjugation(stem, GrammaticalRole.Unknown, detail, auxillary);
}

function handleConditional(cursor: TokenCursor): IpadicConjugation {
    const token = cursor.token();
    const form = ConjugatedForm.Conditional;
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
            return conjugatedWord(token, ConjugatedForm.Imperative);
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
    if (token.conjugated_form !== IpadicConjugatedForm.Continuative) {
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

function getGrammaticalRole(token: IpadicFeatures) {
    switch (token.basic_form) {
        case 'ない':
            return GrammaticalRole.Negation;
        case 'だ':
            return GrammaticalRole.Copula;
        case 'です':
            return GrammaticalRole.CopulaPolite;
        case 'たい':
            return GrammaticalRole.Desire;
        case 'まい':
            return GrammaticalRole.NegativeInference;
        case 'た': {
            if (token.surface_form === 'たら') {
                return GrammaticalRole.TaraConditional;
            }
            return GrammaticalRole.Past;
        }
        case 'ます':
            return GrammaticalRole.Polite;
        case 'そう':
            return GrammaticalRole.Hearsay1;
        case 'らしい':
            return GrammaticalRole.Hearsay2;
        case 'う':
            return GrammaticalRole.Volitional;
        case 'よう':
            return GrammaticalRole.Similarity;
        case 'べし':
            return GrammaticalRole.Certainty;
        case 'やる': {
            // todo:
            return GrammaticalRole.Disdain;
        }
        case 'させる':
            return GrammaticalRole.Causative;
        case 'られる':
            return GrammaticalRole.PassivePotential;
    }
    const auxDetails = new IpadicPOSDetails(token);
    if (auxDetails.isSuffix()) {
        if (token.basic_form === 'せる') {
            return GrammaticalRole.Causative;
        } else if (token.basic_form === 'れる') {
            return GrammaticalRole.Passive;
        }
    }
    return GrammaticalRole.Unknown;
}
getGrammaticalRole; // TODO

function handleAuxillaryVerb(cursor: TokenCursor | null) {
    if (!cursor) {
        return undefined;
    }
    const token = cursor.token();
    const tokend = new IpadicPOSDetails(token);
    if (token.pos !== PartOfSpeech.AuxillaryVerb &&
        !tokend.isNotIndependent()) {
        return undefined;
    }
    const form = getConjugatedForm(token);
    const next = cursor.next();
    if (next) {
        const nextd = new IpadicPOSDetails(next.token());
        if (next.token().pos === PartOfSpeech.AuxillaryVerb ||
            nextd.isNotIndependent()) {
            const auxillary = nextWord(next);
            return conjugatedWord(token, form, auxillary);
        }
        const nextForm = getConjugatedForm(token);
        const stemForms = [
            ConjugatedForm.Conditional,
            ConjugatedForm.Continuative,
            ConjugatedForm.GaruForm,
            ConjugatedForm.GozaiForm,
            ConjugatedForm.Irrealis,
            ConjugatedForm.TaConjunction,
            ConjugatedForm.TeConjunction
        ];
        const isStem = stemForms.some(x => x === nextForm);
        if (isStem) {
            const auxillary = nextWord(next);
            return conjugatedWord(token, form, auxillary);
        }
    }
    return conjugatedWord(token, form);
}

function handleStemAuxillaryForm(cursor: TokenCursor, form: ConjugatedForm) {
    const token = cursor.token();
    const next = cursor.peek();
    const kureru = handleIchidanKureru(cursor);
    if (kureru) {
        return kureru;
    }
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
    const form = getConjugatedForm(token);
    switch (form) {
        case ConjugatedForm.PlainForm:
        case ConjugatedForm.ConditionalContraction:
        case ConjugatedForm.Imperative:
        case ConjugatedForm.IndeclinableNominal:
        case ConjugatedForm.ClassicalPlainForm:
            return conjugatedWord(token, form);
        case ConjugatedForm.Conditional:
            return handleConditional(cursor);
        case ConjugatedForm.Continuative:
        case ConjugatedForm.GaruForm:
        case ConjugatedForm.GozaiForm:
        case ConjugatedForm.Irrealis:
        case ConjugatedForm.TaConjunction:
            return handleStemAuxillaryForm(cursor, form);
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
            return handleFiller(cursor) ?? new IpadicNode(PartOfSpeech.Filler, token, GrammaticalRole.Unknown);
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
        default:
            return new IpadicNode(PartOfSpeech[token.pos as keyof typeof PartOfSpeech], token, GrammaticalRole.Unknown);
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
        const root = nextWord(new TokenCursor(tokens, index));
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