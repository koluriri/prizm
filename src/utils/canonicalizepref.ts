const variationPref: {
  [pref: string]: string[];
} = {
  北海道: ['北海道', 'ほっかいどう', 'hokkaidou'],
  青森県: ['青森県', 'あおもり', 'aomori'],
  岩手県: ['岩手県', 'いわて', 'iwate'],
  宮城県: ['宮城県', 'みやぎ', 'miyagi'],
  秋田県: ['秋田県', 'あきた', 'akita'],
  山形県: ['山形県', 'やまがた', 'yamagata'],
  福島県: [
    '福島県',
    'ふくしま',
    'fukushima',
    'hukushima',
    'fukusima',
    'hukusima',
  ],
  茨城県: ['茨城県', 'いばらき', 'ibaraki'],
  栃木県: ['栃木県', 'とちぎ', 'totigi', 'tochigi'],
  群馬県: ['群馬県', 'ぐんま', 'gunma', 'gunnma'],
  埼玉県: ['埼玉県', 'さいたま', 'saitama'],
  千葉県: ['千葉県', 'ちば', 'chiba', 'tiba'],
  東京都: ['東京都', 'とうきょう', 'toukyou', 'toukilyou', 'tokyo'],
  神奈川県: ['神奈川県', 'かながわ', 'kanagawa'],
  新潟県: ['新潟県', 'にいがた', 'niigata'],
  富山県: ['富山県', 'とやま', 'toyama'],
  石川県: ['石川県', 'いしかわ', 'ishikawa', 'isikawa'],
  福井県: ['福井県', 'ふくい', 'fukui', 'hukui'],
  山梨県: ['山梨県', 'やまなし', 'yamanasi', 'yamanashi'],
  長野県: ['長野県', 'ながの', 'nagano'],
  岐阜県: ['岐阜県', 'ぎふ', 'gihu', 'gifu'],
  静岡県: ['静岡県', 'しずおか', 'sizuoka', 'shizuoka'],
  愛知県: ['愛知県', 'あいち', 'aichi', 'aiti'],
  三重県: ['三重県', 'みえ', 'mie'],
  滋賀県: ['滋賀県', 'しが', 'siga', 'shiga'],
  京都府: ['京都府', 'きょうと', 'kyouto', 'kyoto'],
  大阪府: ['大阪府', 'おおさか', 'oosaka', 'osaka'],
  兵庫県: ['兵庫県', 'ひょうご', 'hyougo', 'hilyougo'],
  奈良県: ['奈良県', 'なら', 'nara'],
  和歌山県: ['和歌山県', 'わかやま', 'wakayama'],
  鳥取県: ['鳥取県', 'とっとり', 'tottori', 'toltutori'],
  島根県: ['島根県', 'しまね', 'simane', 'shimane'],
  岡山県: ['岡山県', 'おかやま', 'okayama'],
  広島県: ['広島県', 'ひろしま', 'hirosima', 'hiroshima'],
  山口県: ['山口県', 'やまぐち', 'yamaguti', 'yamaguchi'],
  徳島県: ['徳島県', 'とくしま', 'tokusima', 'tokushima'],
  香川県: ['香川県', 'かがわ', 'kagawa'],
  愛媛県: ['愛媛県', 'えひめ', 'ehime'],
  高知県: ['高知県', 'こうち', 'kouchi', 'kouti'],
  福岡県: ['福岡県', 'ふくおか', 'fukuoka', 'hukuoka'],
  佐賀県: ['佐賀県', 'さが', 'saga'],
  長崎県: ['長崎県', 'ながさき', 'nagasaki'],
  熊本県: ['熊本県', 'くまもと', 'kumamoto'],
  大分県: ['大分県', 'おおいた', 'ooita', 'oita'],
  宮崎県: ['宮崎県', 'みやざき', 'miyazaki'],
  鹿児島県: ['鹿児島県', 'かごしま', 'kagosima', 'kagoshima'],
  沖縄県: ['沖縄県', 'おきなわ', 'okinawa'],
};

const canonicalizePref = (input: string): [string | false, string] => {
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

export default canonicalizePref;
