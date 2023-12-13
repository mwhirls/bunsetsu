// string literals from kuromoji (MeCab IPADIC)

import { IpadicFeatures } from "kuromoji";
import { ConjugatedForm } from "../conjugation.js";

// https://qiita.com/ensan_hcl/items/885588c7d2d99de85b44
export enum IpadicConjugatedForm {
    ClassicalPlainForm = '文語基本形',
    ConditionalForm = '仮定形', // 美味しけれ(ば), etc
    ConditionalContraction1 = '仮定縮約１', // 美味しけりゃ
    ConditionalContraction2 = '仮定縮約２', // 美味しきゃ
    Continuative = '連用形', // -masu stem
    IndeclinableNominalConjunction = '体言接続', // ウザき(人)
    GaruConjunction = 'ガル接続', // 嬉し(がる), 早(すぎる), 悲し(さ), 虚し(そう), etc
    GozaiConjunction = '連用ゴザイ接続', // 愛しう(ございます), 苦しゅう(ない)
    Irrealis = '未然形', // 来(ない) -nai stem
    IrrealisNuConjunction = '未然ヌ接続', // 高から(ぬ)
    IrrealisReruConjunction = '未然レル接続', // （）される
    IrrealisUConjunction = '未然ウ接続', // 高かろ(う)
    ImperativeE = '命令ｅ', // (幸)多かれ
    ImperativeI = '命令ｉ', // 来い
    ImperativeRo = '命令ｒｏ', // しろ
    ImperativeYo = '命令ｙｏ', // 来よ
    PlainForm = '基本形',
    SpecialIndeclinableNominalConjunction1 = '体言接続特殊', // 今日（来ん）の？
    SpecialIndeclinableNominalConjunction2 = '体言接続特殊２', // 今日（来）の？
    SpecialIrrealis = '未然特殊', // やめて（くん）ない？
    TaConjunction = '連用タ接続', // （うるさかっ）た
    TeConjunction = '連用テ接続', // （女々しく）て, （うるさく）する, （芳しく）ない
}

export enum IpadicConjugatedType {
    Kuru = 'カ変・来ル',
    SuruSpecialClass = 'サ変・−スル',
    Zuru = 'サ変・−ズル',
    Suru = 'サ変・スル',
    Ra = 'ラ変',
    Ichidan = '一段',
    IchidanKureru = '一段・クレル',
    ShimoNidan = '下二段',
    KamiNidan = '上二段',
    Yodan = '四段',
    Godan = '五段',
    Masu = '特殊・マス',
    Ta = '特殊・タ',
}

export function getConjugatedForm(token: IpadicFeatures) {
    const form = token.conjugated_form;
    const ipadicForm = Object.values(IpadicConjugatedForm).find(x => x === form);
    switch (ipadicForm) {
        case IpadicConjugatedForm.PlainForm:
            return ConjugatedForm.PlainForm;
        case IpadicConjugatedForm.ConditionalContraction1:
        case IpadicConjugatedForm.ConditionalContraction2:
            return ConjugatedForm.ConditionalContraction;
        case IpadicConjugatedForm.ConditionalForm:
            return ConjugatedForm.Conditional;
        case IpadicConjugatedForm.Continuative:
            return ConjugatedForm.Continuative;
        case IpadicConjugatedForm.GaruConjunction:
            return ConjugatedForm.GaruForm;
        case IpadicConjugatedForm.GozaiConjunction:
            return ConjugatedForm.GozaiForm;
        case IpadicConjugatedForm.Irrealis:
        case IpadicConjugatedForm.IrrealisNuConjunction:
        case IpadicConjugatedForm.IrrealisReruConjunction:
        case IpadicConjugatedForm.IrrealisUConjunction:
        case IpadicConjugatedForm.SpecialIrrealis:
            return ConjugatedForm.Irrealis;
        case IpadicConjugatedForm.ImperativeI:
        case IpadicConjugatedForm.ImperativeRo:
        case IpadicConjugatedForm.ImperativeYo:
        case IpadicConjugatedForm.ImperativeE:
            return ConjugatedForm.Imperative;
        case IpadicConjugatedForm.ClassicalPlainForm:
            return ConjugatedForm.ClassicalPlainForm;
        case IpadicConjugatedForm.IndeclinableNominalConjunction:
        case IpadicConjugatedForm.SpecialIndeclinableNominalConjunction1:
        case IpadicConjugatedForm.SpecialIndeclinableNominalConjunction2:
            return ConjugatedForm.IndeclinableNominal;
        case IpadicConjugatedForm.TaConjunction:
            return ConjugatedForm.TaConjunction;
        case IpadicConjugatedForm.TeConjunction:
            return ConjugatedForm.TeConjunction;
        default:
            throw new Error("unhandled verb/adjective conjugation");
    }
}