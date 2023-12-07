export enum ConjugatedForm {
    ClassicalPlainForm = '文語基本形', // (いと)エモし
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
    SpecialIndeclinableNominalConjunction1 = '体言接続特殊', // (今日)来ん(の)？
    SpecialIndeclinableNominalConjunction2 = '体言接続特殊２', // (今日)来(の)？
    TaConjunction = '連用タ接続', // うるさかっ(た)
    TeConjunction = '連用テ接続', // 女々しく(て), うるさく(する), 芳しく(ない)
}

export interface Stem {
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
}

export interface Conjugation {
    conjugatedForm: ConjugatedForm;
    surfaceForm: string;
    basicForm: string;
    reading: string | undefined;
    pronunciation: string | undefined;
}