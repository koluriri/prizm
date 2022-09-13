const variationPref: {
  [pref: string]: string[];
} = {
  北海道: ['北海道', 'ほっかいどう', 'hokkaidou', 'hkd北海道'],
  青森県: ['青森県', 'あおもり', 'aomori', 'amr青森', 'aomr青森'],
  岩手県: ['岩手県', 'いわて', 'iwate', 'iwt岩手'],
  宮城県: ['宮城県', 'みやぎ', 'miyagi', 'myg宮城'],
  秋田県: ['秋田県', 'あきた', 'akita', 'akt秋田'],
  山形県: ['山形県', 'やまがた', 'yamagata', 'ymgt山形'],
  福島県: [
    '福島県',
    'ふくしま',
    'fukushima',
    'hukushima',
    'fukusima',
    'hukusima',
  ],
  茨城県: ['茨城県', 'いばらき', 'ibaraki', 'ibrk茨城'],
  栃木県: ['栃木県', 'とちぎ', 'totigi', 'tochigi', 'tcg栃木', 'ttg栃木'],
  群馬県: ['群馬県', 'ぐんま', 'gunma', 'gunnma', 'gnm群馬'],
  埼玉県: ['埼玉県', 'さいたま', 'saitama', 'stm埼玉', 'sitm埼玉'],
  千葉県: ['千葉県', 'ちば', 'chiba', 'tiba', 'tb千葉', 'cb千葉', 'chb千葉'],
  東京都: ['東京都', 'とうきょう', 'toukyou', 'toukilyou', 'tokyo', 'tk東京'],
  神奈川県: ['神奈川県', 'かながわ', 'kanagawa', 'kngw神奈川'],
  新潟県: ['新潟県', 'にいがた', 'niigata', 'ngt新潟', 'nigt新潟'],
  富山県: ['富山県', 'とやま', 'toyama', 'tym富山'],
  石川県: ['石川県', 'いしかわ', 'ishikawa', 'isikawa', 'iskw石川'],
  福井県: ['福井県', 'ふくい', 'fukui', 'hukui', 'fk福井', 'hk福井'],
  山梨県: ['山梨県', 'やまなし', 'yamanasi', 'yamanashi', 'ymns山梨'],
  長野県: ['長野県', 'ながの', 'nagano', 'ngn長野'],
  岐阜県: ['岐阜県', 'ぎふ', 'gihu', 'gifu', 'gf岐阜', 'gh岐阜'],
  静岡県: ['静岡県', 'しずおか', 'sizuoka', 'shizuoka', 'szok静岡'],
  愛知県: ['愛知県', 'あいち', 'aichi', 'aiti', 'ac愛知', 'at愛知', 'aic愛知'],
  三重県: ['三重県', 'みえ', 'mie'],
  滋賀県: ['滋賀県', 'しが', 'siga', 'shiga', 'sig滋賀'],
  京都府: ['京都府', 'きょうと', 'kyouto', 'kyoto', 'kto京都'],
  大阪府: ['大阪府', 'おおさか', 'oosaka', 'osaka', 'osk大阪'],
  兵庫県: ['兵庫県', 'ひょうご', 'hyougo', 'hilyougo', 'hg兵庫', 'hyg兵庫'],
  奈良県: ['奈良県', 'なら', 'nara', 'nr奈良'],
  和歌山県: ['和歌山県', 'わかやま', 'wakayama', 'wkym和歌山'],
  鳥取県: ['鳥取県', 'とっとり', 'tottori', 'toltutori', 'ttr鳥取'],
  島根県: ['島根県', 'しまね', 'simane', 'shimane', 'smn島根'],
  岡山県: ['岡山県', 'おかやま', 'okayama', 'okym岡山'],
  広島県: ['広島県', 'ひろしま', 'hirosima', 'hiroshima', 'hrsm広島'],
  山口県: [
    '山口県',
    'やまぐち',
    'yamaguti',
    'yamaguchi',
    'ymgc山口',
    'ymgut山口',
  ],
  徳島県: ['徳島県', 'とくしま', 'tokusima', 'tokushima', 'tksm徳島'],
  香川県: ['香川県', 'かがわ', 'kagawa', 'kgw香川'],
  愛媛県: ['愛媛県', 'えひめ', 'ehime', 'ehm愛媛'],
  高知県: ['高知県', 'こうち', 'kouchi', 'kouti', 'kti高知'],
  福岡県: ['福岡県', 'ふくおか', 'fukuoka', 'hukuoka', 'fkok福岡', 'hkok福岡'],
  佐賀県: ['佐賀県', 'さが', 'saga', 'sag佐賀'],
  長崎県: ['長崎県', 'ながさき', 'nagasaki', 'ngsk長崎'],
  熊本県: ['熊本県', 'くまもと', 'kumamoto', 'kmmt熊本', 'kmt熊本'],
  大分県: ['大分県', 'おおいた', 'ooita', 'oita', 'oit大分'],
  宮崎県: ['宮崎県', 'みやざき', 'miyazaki', 'myzk宮崎'],
  鹿児島県: ['鹿児島県', 'かごしま', 'kagosima', 'kagoshima', 'kgsm鹿児島'],
  沖縄県: ['沖縄県', 'おきなわ', 'okinawa', 'oknw沖縄'],
};

export type canonicalizerReturn = [
  canonicalized: string | false,
  suggest: string,
];
export type canonicalizerFunction = (input: string) => canonicalizerReturn;

const useCanonicalizePref =
  (): canonicalizerFunction =>
  (input: string): canonicalizerReturn => {
    let canonicalizedInput: string = input
      .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
      .toLowerCase();
    if (/^[\u3040-\u309F]/gu.test(canonicalizedInput)) {
      canonicalizedInput = canonicalizedInput.replace(/[a-zA-z]/g, '');
    }
    let suggest = '';

    const filtered = Object.keys(variationPref).filter((pref) =>
      variationPref[pref].find((various: string) => {
        if (various.startsWith(canonicalizedInput)) {
          suggest = various;

          return true;
        }

        return false;
      }),
    );
    if (filtered.length === 1) return [filtered[0], suggest];

    return [false, suggest];
  };

export default useCanonicalizePref;
