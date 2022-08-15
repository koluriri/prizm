const variationPref: {
  [pref: string]: string[];
} = {
  北海道: ['北海道', 'ほっかいどう', 'hokkaidou'],
  青森県: ['青森県', 'あおもりけん', 'aomori'],
  岩手県: ['岩手県', 'いわてけん', 'iwate'],
  宮城県: ['宮城県', 'みやぎけん', 'miyagi'],
  秋田県: ['秋田県', 'あきたけん', 'akita'],
  山形県: ['山形県', 'やまがたけん', 'yamagata'],
  福島県: ['福島県', 'ふくしまけん', 'fukushima', 'hukushima'],
  茨城県: ['茨城県', 'いばらきけん', 'ibaraki'],
  栃木県: ['栃木県', 'とちぎけん', 'totigi', 'tochigi'],
  群馬県: ['群馬県', 'ぐんまけん', 'gunma', 'gunnma'],
  埼玉県: ['埼玉県', 'さいたまけん', 'saitama'],
  千葉県: ['千葉県', 'ちばけん', 'chiba', 'tiba'],
  東京都: ['東京都', 'とうきょうと', 'toukyou', 'toukilyou', 'tokyo'],
  神奈川県: ['神奈川県', 'かながわけん', 'kanagawa'],
  新潟県: ['新潟県', 'にいがたけん', 'niigata'],
  富山県: ['富山県', 'とやまけん', 'toyama'],
  石川県: ['石川県', 'いしかわけん', 'ishikawa', 'isikawa'],
  福井県: ['福井県', 'ふくいけん', 'fukui', 'hukui'],
  山梨県: ['山梨県', 'やまなしけん', 'yamanasi', 'yamanashi'],
  長野県: ['長野県', 'ながのけん', 'nagano'],
  岐阜県: ['岐阜県', 'ぎふけん', 'gihu', 'gifu'],
  静岡県: ['静岡県', 'しずおかけん', 'sizuoka', 'shizuoka'],
  愛知県: ['愛知県', 'あいちけん', 'aichi', 'aiti'],
  三重県: ['三重県', 'みえけん', 'mie'],
  滋賀県: ['滋賀県', 'しがけん', 'siga', 'shiga'],
  京都府: ['京都府', 'きょうとふ', 'kyouto', 'kyoto'],
  大阪府: ['大阪府', 'おおさかふ', 'oosaka', 'osaka'],
  兵庫県: ['兵庫県', 'ひょうごけん', 'hyougo', 'hilyougo'],
  奈良県: ['奈良県', 'ならけん', 'nara'],
  和歌山県: ['和歌山県', 'わかやまけん', 'wakayama'],
  鳥取県: ['鳥取県', 'とっとりけん', 'tottori', 'toltutori'],
  島根県: ['島根県', 'しまねけん', 'simane', 'shimane'],
  岡山県: ['岡山県', 'おかやまけん', 'okayama'],
  広島県: ['広島県', 'ひろしまけん', 'hirosima', 'hiroshima'],
  山口県: ['山口県', 'やまぐちけん', 'yamaguti', 'yamaguchi'],
  徳島県: ['徳島県', 'とくしまけん', 'tokusima', 'tokushima'],
  香川県: ['香川県', 'かがわけん', 'kagawa'],
  愛媛県: ['愛媛県', 'えひめけん', 'ehime'],
  高知県: ['高知県', 'こうちけん', 'kouchi', 'kouti'],
  福岡県: ['福岡県', 'ふくおかけん', 'fukuoka', 'hukuoka'],
  佐賀県: ['佐賀県', 'さがけん', 'saga'],
  長崎県: ['長崎県', 'ながさきけん', 'nagasaki'],
  熊本県: ['熊本県', 'くまもとけん', 'kumamoto'],
  大分県: ['大分県', 'おおいたけん', 'ooita', 'oita'],
  宮崎県: ['宮崎県', 'みやざきけん', 'miyazaki'],
  鹿児島県: ['鹿児島県', 'かごしまけん', 'kagosima', 'kagoshima'],
  沖縄県: ['沖縄県', 'おきなわけん', 'okinawa'],
};

const canonicalizePref = (input: string) => {
  let canonicalizedInput: string = input
    .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .toLowerCase();
  if (/^[\u3040-\u309F]/gu.test(canonicalizedInput)) {
    canonicalizedInput = canonicalizedInput.replace(/[a-zA-z]/g, '');
  }

  const filtered = Object.keys(variationPref).filter((pref) =>
    variationPref[pref].find((various: string) =>
      various.startsWith(canonicalizedInput),
    ),
  );
  if (filtered.length === 1) return filtered[0];

  return false;
};

export default canonicalizePref;
