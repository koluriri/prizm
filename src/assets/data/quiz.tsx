import { DefinedQuestions } from 'utils/types';

const quiz = (): DefinedQuestions => ({
  北海道: [
    'こたつの保有率は46位',
    '方言で「なまら」',
    'ガラナが有名',
    'アメリカンドッグには砂糖',
    '日本一長い直線道路がある',
    '節分には落花生を撒く',
    '空港が14個ある',
    '梅雨がない',
    'オーロラが見れる',
    'ソーラン節が有名',
    '松前漬が有名',
    'マリモが有名',
    '日本一寒い町がある',
    '唐揚げは「ザンギ」',
    '七夕が8月7日',
    '町の数が日本一',
    '日本三大がっかり名所の1つがある',
  ],
  青森県: [
    'りんごの生産量日本一',
    '日本最古のリンゴの木がある',
    'いちご煮が有名',
    '県の花はリンゴ',
    '日本三大美林の1つが存在',
    'せんべい汁が有名',
    'カップ麺の消費量日本一',
    'おでんには生姜味噌',
    '方言が3つ存在する',
    '銭湯の数が1位',
    '日本最大の砂丘がある',
    'ご当地パン「イギリストースト」',
    'ニンニクの生産量日本一',
    '県の鳥は白鳥',
  ],
  岩手県: [
    'わんこそばが有名',
    'びっくりドンキーの発祥地',
    '100円乗り放題バスがある',
    '最も大きな「県」',
    'たんぽぽは「てでっぽ」',
    '銘菓「かもめの玉子」',
    '世界遺産の中尊寺',
    '激安スーパー「オセン」',
    'カッパ釣りができる',
    '「{{盛岡}}三大麺」が存在',
    'ワカメの生産量日本一',
    'ばっきゃ味噌が有名',
    '方言で「じぇじぇじぇ」',
    '日本三大そばの1つがある',
  ],
  宮城県: [
    'すぐ止まる仙山線',
    '牛タンが有名',
    '狐と触れ合える施設がある',
    '笹かまぼこが有名',
    '枝豆をつぶした餡が有名',
    '5つの伝統こけしがある',
    'パプリカの生産量日本一',
    '冷やし中華の発祥地',
    '日本三景のひとつ、松島',
    '日本一長い運河がある',
    '日本一低い山がある',
    '県の花は{{ミヤギ}}ノハギ',
    '萩の月が有名',
  ],
  秋田県: [
    'きりたんぽが有名',
    '名物、ババヘラアイス',
    '県の鳥はヤマドリ',
    'なまはげが有名',
    '日本三大美林の1つが存在',
    '納豆の発祥地',
    'なんでも寒天で固める',
    '名物、バター餅',
    '県の花はふきのとう',
    '日本一深い湖がある',
    'TVで修学旅行の様子が流れる',
    '花火が有名',
    '米の生産量3位',
    '日本三大やきそばの1つがある',
    '納豆には砂糖',
  ],
  山形県: [
    'サクランボの生産量日本一',
    '特産品「だだちゃ豆」',
    'こんにゃくの消費量日本一',
    '玉こんにゃくが有名',
    '給食でイナゴの佃煮が出る',
    'ローカルスーパー「ヤマザワ」',
    '日本一安いタワマンがある',
    '日本一の芋煮会がある',
    '名物、冷やしシャンプー',
    'ラーメンの消費量日本一',
    '滝の数が日本一',
    '銀山温泉が有名',
    '世界最大の木造ホールがある',
    '日本三大和牛のひとつがある',
    '松尾芭蕉が訪れた立石寺',
  ],
  福島県: [
    'ご当地パン「クリームボックス」',
    'オーストラリアに似た形',
    'パンの消費量最下位',
    '納豆の消費量日本一',
    '元号のついた村がある',
    '野口英世の故郷',
    '日本三大ラーメンの1つがある',
    '面積は全国3位',
    '鍾乳石「かぼちゃ岩」がある',
    '郷土料理、天ぷらまんじゅう',
    '会津富士と呼ばれる磐梯山',
    '5文字の銘菓がある',
    '幸運の牛、赤べこ',
    '中学校で芋煮会が開催',
    '日本三大まんじゅうの1つがある',
    '名物、酪王カフェオレ',
    '日本三大ダムの1つがある',
  ],
  茨城県: [
    'レンコンの生産量が一位',
    '日本一大きい大仏がある',
    '日本一長い滑り台がある',
    '日本一低い百名山がある',
    '日本三名園の1つがある',
    'ひらがなの市が4つある',
    '新幹線は通過だけ',
    '名物、あんこう鍋',
    '日光より古い三猿がある',
    'トマトには砂糖',
    '納豆には砂糖',
    '水戸納豆が有名',
    '県の魚はヒラメ',
    '県の花はバラ',
    '県の木はウメ',
    '日本三名瀑の1つがある',
  ],
  栃木県: [
    'いちごの生産量が一位',
    '海なし県',
    '餃子が有名',
    '世界遺産「日光の社寺」',
    '日本一の高層湿原がある',
    '日本最古の学校がある',
    '世界一の並木道がある',
    '{{宇都宮}}駅前に餃子像がある',
    '名物、レモン牛乳',
    '郷土料理、しもつかれ',
    '3番目に広い市がある',
    '面積の1/5以上が{{日光}}市',
    'かんぴょうの98%を生産',
    '日本三名瀑の1つがある',
    '「県」という町がある',
    '特産の石、大谷石',
  ],
  群馬県: [
    'さやえんどうは「さやぶどう」',
    'すき焼きには豚肉',
    'ヤマダ電機の発祥地',
    '鶴に似た形',
    '郷土かるた「上毛かるた」',
    '名物、焼まんじゅう',
    '日本一安い遊園地がある',
    'ご当地パン「みそパン」',
    '海なし県',
    '日本三名泉の1つがある',
    'ハーゲンダッツの工場がある',
    '銀だこの発祥地',
    'ビックカメラの発祥地',
    'ブランド野菜、下仁田ねぎ',
    '日本初の機械製糸工場がある',
    'こんにゃくの生産量が一位',
    '湯もみで有名な温泉がある',
    '日本三大うどんの1つがある',
  ],
  埼玉県: [
    '県の愛称は「彩の国」',
    '市の数が日本一',
    '観測史上最高気温を記録',
    '巨大な地下神殿がある',
    'クレヨンしんちゃんの舞台',
    '成人式の発祥地',
    'うどんの生産量が2位',
    'ファミリーマート1号店がある',
    '深谷ねぎが有名',
    'ご当地グルメ、ゼリーフライ',
    '路線数が2位の駅がある',
    '東京都の飛び地がある',
    '県の鳥はシラコバト',
    '映画「翔んで{{埼玉}}」が有名',
    '県の木はケヤキ',
    '県の蝶はミドリシジミ',
    '世界最大のこいのぼりがある',
  ],
  千葉県: [
    '伊勢エビの漁獲量日本一',
    '県のゆるキャラが県の形',
    '県民体操、なのはな体操',
    '日本一のテーマパークがある',
    'ふなっしーが有名',
    'マザー牧場が有名',
    '駅前交番はフクロウの形',
    '6/15は{{千葉}}県民の日',
    'マッシュルームの生産量1位',
    '川が県境',
    '人工島の海ほたるがある',
    '地質年代「{{チバ}}ニアン」',
    '郷土料理、太巻き寿司',
    '日本なしの生産量1位',
    '都道府県の最高峰で最下位',
    '乗降客数日本一の空港がある',
  ],
  東京都: [
    'ラジオ体操発祥の地',
    '人口密度が日本一',
    '人口が日本一',
    '日本一高いタワーがある',
    '江戸切子が有名',
    '土産の定番、雷おこし',
    '日本一の待ち合わせ場所がある',
    'あんぱん発祥の地',
    '3番目に狭い都道府県',
    '父島・母島がある',
    '人口最小の村がある',
    '日本一地価の高い場所がある',
    '「日本電波塔」がある',
    'たい焼き発祥の地',
    '今川焼き発祥の地',
    '日本三大祭りの1つがある',
    '日本唯一の砂漠がある',
    'カレーうどん発祥の地',
    '冷やし中華発祥の地',
    '親子丼発祥の地',
    '{{東京}}ばな奈が有名',
  ],
  神奈川県: [
    '日本最初の鉄道駅がある',
    '海軍カレーが有名',
    '唯一政令指定都市が3つ存在する',
    '鎌倉幕府があった',
    'ご当地ラーメン、サンマー麺',
    '三浦大根が有名',
    '県の木はイチョウ',
    '県民の歌は「光あらたに」',
    '公衆トイレの発祥地',
    'ドリア発祥の地',
    'ナポリタン発祥の地',
    'プリンアラモード発祥の地',
    '日本一おいしい水がある',
    '世界一短いエスカレーターがある',
    '生しらすが有名',
    '人口が国内2位',
    '鳩サブレーが有名',
    'けんちん汁発祥の地',
    '落花生発祥の地',
    '生チョコレート発祥の地',
    'コーヒー牛乳発祥の地',
    'アイスクリーム発祥の地',
    'かき氷発祥の地',
  ],
  新潟県: [
    'お米にこだわりがある',
    '電気の周波数が50と60混在',
    '日本三大花火大会の1つがある',
    '枝豆の消費量日本一',
    '郷土料理、笹だんご',
    '名物、ぽっぽ焼き',
    '日本一長い川がある',
    '男子の平均身長日本一',
    'ル・レクチェの産地',
    '神社が日本一多い',
    '日本一短い山脈がある',
    '日本最初の公立学校がある',
    'チューリップの一大産地',
    'ご当地アイス、もも太郎',
    '駅前には忠犬タマ公',
    'B級グルメ、イタリアン',
    '名物、イカながも丼',
    '錦鯉の発祥地',
    '人口が1位だった時代がある',
    'コシヒカリが有名',
    '新幹線駅直結のスキー場がある',
    '日本一大きいスキー場がある',
  ],
  富山県: [
    '日本最古の水族館がある',
    '日本最古の鉱物がある',
    '日本一小さい市町村がある',
    'ご当地ラーメン、{{富山}}ブラック',
    'ご当地コロッケ、高岡コロッケ',
    '持ち家率が2位',
    'ブリの消費量1位',
    '空港の愛称は{{富山}}きときと空港',
    'ホタルイカが有名',
    'ご当地パン「コーヒースナック」',
    '公立高校では修学旅行がない',
    '日本一地震が少ない',
    '日本三大ダムの1つがある',
    '鱒寿司が有名',
    '落差日本一の滝がある',
    '蜃気楼が見れる',
    '白エビがたくさんとれる',
    'そろばん教室が最も多い',
    '世界一かわいい美術館がある',
    '日本一小さい神社がある',
  ],
  石川県: [
    'ご当地ラーメン、8番らーめん',
    'アイスの消費量日本一',
    '冷奴にはからし',
    '唯一県章が存在しない',
    '日本三大きんつばの1つがある',
    '雨が多い',
    'ブランド牛、能登牛',
    '郷土料理、みたま',
    '上履きは「ズッパ」',
    'ブランドガニ、加能ガニ',
    'ブランドガニ、香箱ガニ',
    'フグの漁獲量1位',
    '鏡餅の色が紅白',
    '日本三大庭園の1つがある',
    '日本一長いベンチがある',
    '車で走れる砂浜がある',
    '金箔の98%以上を生産',
  ],
  福井県: [
    'メガネの生産量日本一',
    '世界3大恐竜博物館の1つがある',
    '「恐竜のまち」がある',
    '塗り箸の生産量日本一',
    '国産ハープの100%を生産',
    'カーブミラーの生産量日本一',
    'ご当地グルメ、ソースカツ丼',
    '水ようかんは冬に食べる',
    '幸福度日本一',
    '郷土料理、ぼっかけ',
    '郷土料理、葉っぱずし',
    'ナツメの生産量日本一',
    'ご当地グルメ、ボルガライス',
    '越前ガニが有名',
    '国内随一の恐竜化石の産地',
    '唯一イオンがない',
    'コシヒカリ発祥の地',
  ],
  山梨県: [
    '日本一高い山がある',
    '赤飯には甘納豆',
    '桃の収穫量日本一',
    'B級グルメ、鳥もつ煮',
    'カツ丼=ソースカツ丼',
    '海なし県',
    '名前に反し約8割が森林',
    'マグロの消費量2位',
    'ミネラルウォーター生産量1位',
    'ミネラルウォーター発祥の地',
    '郷土料理、ほうとう',
    '{{富士}}急ハイランドが有名',
    'ぶどうの収穫量日本一',
    'ワインの生産量日本一',
    '日本三大奇祭の1つがある',
    '日本三大急流の1つがある',
  ],
  長野県: [
    '村の数が日本一',
    '隣接県が日本一多い',
    '日本一長い川がある',
    '日本三大奇祭の1つがある',
    '日本三大そばの1つがある',
    '海から一番遠い地点がある',
    '日本一標高の高い湖がある',
    '日本一標高の高い駅がある',
    '野沢菜漬が有名',
    'ギターの生産量日本一',
    'レタスの生産量日本一',
    '温泉に入る猿が唯一見れる',
    'お盆には天ぷらまんじゅう',
    '日本一のパラボラアンテナがある',
    '昆虫食が盛ん',
    '軽井沢が有名',
    '台風の被害が少ない',
    'りんごの生産量2位',
    '温泉の数が2位',
  ],
  岐阜県: [
    '日本三大巨桜の1つがある',
    '日本三大清流の1つがある',
    '日本三名泉の1つがある',
    '日本三大山城の1つがある',
    '日本三大ダムの1つがある',
    '日本三大秘境の1つがある',
    '日本一大きい市町村がある',
    '日本一滝の多い町がある',
    '日本一標高の高い湖がある',
    '日本一急勾配の駅がある',
    '換気扇の生産量日本一',
    '柿の消費量日本一',
    'モーニングサービスが人気',
    '日本の人口重心の中心',
    'お雑煮には砂糖',
    '世界遺産の合掌造り集落がある',
    '名物、漬物ステーキ',
    '世界最大級のバラ園がある',
    'さるぼぼが有名',
  ],
  静岡県: [
    '日本一高い山がある',
    '日本三大清流の1つがある',
    'B級グルメ、{{富士}}宮やきそば',
    '苺の名産地',
    'ちびまる子ちゃんの舞台',
    '日本一長い吊り橋がある',
    'ハート型の洞窟がある',
    '方言「だら」「だに」',
    'さわやかのハンバーグが人気',
    '深海魚がテーマの水族館がある',
    '三ヶ日みかんの産地',
    'うなぎパイが有名',
    '緑茶が有名',
    'お好み焼きにはたくあん',
    '名物、黒はんぺん',
    '月まで3kmという看板がある',
    '「地名」という地名がある',
    '金魚に似た形',
    '世界一の花時計がある',
    '{{浜松}}餃子が有名',
    '世界一長い木造歩道橋がある',
  ],
  愛知県: [
    '日本一お寺が多い',
    'モーニングサービスが人気',
    '日本初の地下街がある',
    '日本一の貸本屋がある',
    '味噌カツが有名',
    '名物、ひつまぶし',
    'トヨタの発祥地',
    '戦国三英傑の出身地',
    '日本初の歩道橋があった',
    '世界最大のプラネタリウムがある',
    '寺院の数が日本一',
    'コメダ珈琲発祥の地',
    '「豊」とつく地名が多い',
    '日本三大都市の1つがある',
    'ジブリパークがある',
    '日本最大の水槽がある',
    '世界最大のボウリング場がある',
    '台湾まぜそば発祥の地',
    '台湾ラーメン発祥の地',
    '県の魚はクルマエビ',
    '名物、ういろう',
  ],
  三重県: [
    '名物、赤福',
    '天むす発祥の地',
    '動物の漢字の地名が多い',
    'ご当地スーパー、ぎゅーとら',
    '松坂牛が有名',
    '伊勢海老が有名',
    'ソウルフード、あられ茶漬け',
    '名物、伊勢うどん',
    '世界一短い地名がある',
    '世界一短い駅名がある',
    '江戸川乱歩の出身地',
    '明後日は「ささって」',
    '自動販売機の生産量日本一',
    '名物、桑名カレー',
    '真珠の産地',
    '海女さんの数日本一',
    '日本三大和牛の1つがある',
    '和歌山の飛び地の村がある',
    '唯一ジュゴンに会える',
    '1年中みかんがとれる',
  ],
  滋賀県: [
    '日本一大きな湖がある',
    '世界一の積雪量が記録された',
    '面積の1/6が{{琵琶}}湖',
    'ブラックバス料理が食べられる',
    'ひこにゃんが有名',
    '世界で3番目に古い湖がある',
    'ご当地パン「サラダパン」',
    '名物、鮒ずし',
    'こんにゃくが赤い',
    '忍者発祥の地',
    '海なし県',
    '郷土料理、じゅんじゅん',
    '地元新聞がない',
    '郷土料理、いとこ煮',
    '県の花はシャクナゲ',
    '県の木はもみじ',
    '日本茶発祥の地',
    '日本そば発祥の地',
  ],
  京都府: [
    '八つ橋が有名',
    '任天堂の本社がある',
    '郷土料理、千枚漬け',
    'みたらし団子発祥の地',
    '天下一品発祥の地',
    '餃子の王将発祥の地',
    '日本一高い木がある',
    '道路しかない町がある',
    '国指定重要文化財が多い',
    '国宝の建造物が多い',
    'ほんしめじ生産量日本一',
    '緑茶発祥の地',
    '小倉あん発祥の地',
    '九条ねぎ発祥の地',
    'しば漬け発祥の地',
    '大丸発祥の地',
    '高島屋発祥の地',
    '日本初の路面電車があった',
    '最古の浦島伝説がある',
    '日本一高い木造塔がある',
  ],
  大阪府: [
    '日本三大きんつばの1つがある',
    '日本三大都市の1つがある',
    '粉もんが有名',
    '太陽の塔が有名',
    'インスタントラーメン発祥の地',
    '日本一長い商店街がある',
    '人気テーマパークがある',
    '日本一高いビルがある',
    '串カツが有名',
    'かつて首都だった',
    '一家に一台たこ焼き器',
    'アイスコーヒーは「レイコー」',
    'グリコの看板が有名',
    '食パンの生産量日本一',
    'つまようじの生産量日本一',
    '毛布の生産額日本一',
    '歯ブラシの生産量日本一',
    '日本一長い古墳がある',
    '回転寿司発祥の地',
    'オムライス発祥の地',
    'たこ焼き発祥の地',
  ],
  兵庫県: [
    '7つの旧国の集合体',
    '日本列島の形の人工島がある',
    '日本海と瀬戸内海に面する',
    '「日本のへそ」がある',
    '郷土料理、くぎ煮',
    'メロンパンは「サンライズ」',
    '名物、御座候',
    '日本のピザ発祥の地',
    '名物、明石焼き',
    'バレンタインチョコ発祥の地',
    '日本一人口の多い島がある',
    '世界最長だった吊り橋がある',
    '唯一、パンダとコアラがいる',
    '県の木はクスノキ',
    '県の鳥はコウノトリ',
    '小中学校で上履きを使わない',
    'サイダー発祥の地',
    '古墳の数が日本一',
    'ため池の数が日本一',
    '日本一短い国道がある',
    '丸亀製麺発祥の地',
  ],
  奈良県: [
    '日本三大山城の1つがある',
    '日本最古の神社がある',
    '{{奈良}}公園には約1200頭の鹿が生息',
    'かつて「{{奈良}}府」だった',
    'グローブの生産量日本一',
    '最も小さい海なし県',
    '金魚の販売数日本一',
    'せんとくんが有名',
    '県の木は杉',
    '郷土料理、{{奈良}}漬',
    '日本最長の路線バスがある',
    '日本最古のロープウェイがある',
    '日本最古の大仏がある',
    '日本で2番目に高い木造塔がある',
    '世界最大の金銅仏がある',
    '饅頭発祥の地',
    'そうめん発祥の地',
    'わらび餅発祥の地',
    '名物、柿の葉寿司',
    '日本最古のお寺がある',
    '靴下の生産量日本一',
    '割り箸の生産量日本一',
  ],
  和歌山県: [
    '唯一、村まるごと飛び地がある',
    '梅の生産量日本一',
    '柿の生産量日本一',
    '日本三古湯の1つがある',
    '有田みかんが有名',
    '県の花は梅',
    '県の鳥はメジロ',
    '人気の飴、那智黒',
    'パンダ飼育数日本一',
    '鰹節発祥の地',
    '郷土料理、雀寿司',
    '醤油発祥の地',
    'ケチャップの消費量日本一',
    '世界一深い海底ポストがある',
    '日本最古の石造り灯台がある',
    '本州最南端がある',
    '日本一短い単独路線鉄道がある',
    '日本一短い川がある',
    'みかんの生産量日本一',
    'グリーンピースの生産量日本一',
    '蚊取り線香発祥の地',
    'はっさくの生産量日本一',
    '山椒の生産量日本一',
    'いちじくの生産量日本一',
  ],
  鳥取県: [
    'カニの漁獲量日本一',
    '「{{鳥取砂丘}}コナン空港」がある',
    '「米子鬼太郎空港」がある',
    'カレー消費量日本一',
    '国内2位の砂丘がある',
    '日本一人口が少ない',
    'らっきょうの生産量日本一',
    '喫茶店「すなば珈琲」',
    '給食では白バラ牛乳',
    '郷土料理、とうふちくわ',
    '県の鳥はオシドリ',
    '県の花は二十世紀梨',
    '茶碗蒸しには春雨',
    '水木しげるロードがある',
    '日本一大きな池がある',
    '梨の博物館がある',
    '遠足で砂丘に行く',
    'パンケーキが人気',
    'カニが世界最高額で落札された',
    '世界一高いお弁当がある',
    '日本一海岸線が短い',
    '日本一低いタワーがある',
  ],
  島根県: [
    '日本三大そばの1つがある',
    '2番目に人口が少ない',
    '見送る際に「ようこそ」',
    '雷は「どんどろげ」',
    '郷土料理、どんどろげ飯',
    'ありがとうは「だんだん」',
    '唯一県庁所在地に原発がある',
    '名物、赤天',
    '郷土料理、かしわ餅',
    '郷土料理、つみれ汁',
    '別名「千鳥城」の国宝がある',
    '世界最大の砂時計がある',
    '郷土料理、ぼてぼて茶',
    '世界初の缶コーヒーが生まれた',
    '日本一大きな露天風呂がある',
    '日本一高い灯台がある',
    '日本一の縁結び神社がある',
    'べた踏み坂が有名',
    '日本初の和歌が詠まれた',
    '世界遺産の石見銀山がある',
    '出雲そばが有名',
  ],
  岡山県: [
    '日本三大庭園の1つがある',
    '日本三大山城の1つがある',
    '国産ジーンズ発祥の地',
    '黄ニラ発祥の地',
    'カラオケボックス発祥の地',
    '「晴れの国」と呼ばれる',
    '白桃発祥の地',
    '桃太郎伝説発祥の地',
    '郷土料理、ままかり寿司',
    '世界一長い鉄道道路併用橋がある',
    '「トマト銀行」がある',
    '珍しい「アユモドキ」がいる',
    '皮ごと食べられるバナナがある',
    '県の鳥はキジ',
    '県の花は桃',
    'ご当地グルメ、ひるぜん焼きそば',
    'ご当地グルメ、カキオコ',
    '桃太郎トマトの産地',
    '卵かけご飯発祥の地',
    '青汁発祥の地',
    'きびだんご発祥の地',
    '点字ブロック発祥の地',
  ],
  広島県: [
    '牡蠣の生産量日本一',
    'もみじ饅頭が有名',
    '県の鳥はアビ',
    '県の魚は牡蠣',
    'レモンの生産量日本一',
    '{{広島}}城の別名は「鯉城」',
    '厳島神社の鳥居は高さ約17m',
    'サメのことをワニという',
    'お好み焼きには麺',
    '日本三景のひとつ、宮島',
    'うさぎがいる島がある',
    '珍しい「ミヤジマトンボ」がいる',
    '日本のピラミッドがある',
    '日本一高い送電鉄塔がある',
    '日本一駅から近い城がある',
    '一家に一本オタフクソース',
    'しゃもじが有名な神社がある',
    '日本初のヨーグルトが生まれた',
    '日本初のバウムクーヘンが焼かれた',
    'カニカマ発祥の地',
    '汁なし担々麺発祥の地',
  ],
  山口県: [
    '名物、ういろう',
    '給食でフグが出る',
    'ガードレールがオレンジ色',
    '名物、とんちゃん鍋',
    '笠戸ひらめが有名',
    'おみくじの生産量日本一',
    '人気店、いろり山賊',
    'あんこうの水揚量日本一',
    '名物、みかん鍋',
    '日本最古のピアノがある',
    '日本最古の夏みかんがある',
    '日本最古の天満宮がある',
    '日本初の教会がある',
    '日本最大級のカルスト台地がある',
    '総理大臣輩出数1位',
    'ご当地グルメ、瓦そば',
    '伝統野菜、とっくり大根',
    'フグの展示数世界一',
    'ハート型の島がある',
    '123の鳥居が並ぶ神社がある',
    '日本一入れにくい賽銭箱がある',
  ],
  徳島県: [
    '日本三大秘境の1つがある',
    '唯一電車がない',
    '唯一自動改札機がない',
    '味噌汁にはすだち',
    '何にでもすだちをかける',
    '赤飯に砂糖',
    'すだちの生産量日本一',
    '国産すだちの98%を生産',
    '養殖わかめの生産量3位',
    '県の花はすだち',
    '県の鳥はシラサギ',
    'ゆるキャラ、すだちくん',
    'お好み焼きには金時豆',
    '小学校の運動会で阿波踊り',
    'たくあんは「こんこ」',
    'B級グルメ、ラーメン東大',
    '鳴門金時が有名',
    '郷土料理、たらいうどん',
    'ウミガメの博物館がある',
  ],
  香川県: [
    '世界一長い鉄道道路併用橋がある',
    'うどんの生産量日本一',
    'うどんの消費量日本一',
    '7月2日はうどんの日',
    '「うどん県」で郵便物が届く',
    '日本一小さな都道府県',
    'うどんは「ぴっぴ」',
    '県の鳥はホトトギス',
    'オリーブの生産量日本一',
    '"オリーブの島"がある',
    '日本初のオリーブ栽培に成功',
    '国産オリーブの9割以上を生産',
    'ローカル鉄道「ことでん」',
    '名物、うどんアイス',
    '手袋の生産量日本一',
    '台風の被害が少ない',
    'お雑煮には餡餅',
    '県の魚はハマチ',
    '日本一長いエスカレーターがある',
    '日本最大のため池がある',
    '世界一狭い海峡がある',
    '日本一長いアーケードがある',
    'ダイソー1号店ができた',
  ],
  愛媛県: [
    '真珠の生産量日本一',
    '日本三古湯の1つがある',
    'キウイフルーツの生産量日本一',
    '唯一、神様の名前がついた県名',
    '給食でポンジュースが出る',
    '給食でポンジュースごはんが出る',
    'みかんの生産量2位',
    '日本最古の温泉がある',
    'いよかんの生産量日本一',
    '銘菓、坊ちゃん団子',
    '県の鳥はコマドリ',
    '県の魚はマダイ',
    '公式キャラ、みきゃん',
    '今治タオルが有名',
    'タルト=ロールケーキ',
    'B級グルメ、焼豚玉子飯',
    '郷土料理、じゃこ天',
    '銘菓、母恵夢',
    '手すき和紙の出荷額日本一',
    '日本一長い半島がある',
    '日本初の夕日の博物館がある',
  ],
  高知県: [
    '日本三大清流の1つがある',
    '郷土料理、こけらずし',
    '県の魚、カツオ',
    '郷土料理、カツオのたたき',
    '坂本龍馬の出身地',
    '「謝る電車」がある',
    '伝統のタレ「ぬた」',
    'よさこいが有名',
    '飲酒費用日本一',
    '日本三大がっかり名所の1つがある',
    'ゆるキャラ、カツオ人間',
    'ご当地飲料、リープル',
    'なすの生産量日本一',
    'ニラの生産量日本一',
    '生姜の生産量日本一',
    'ししとうの生産量日本一',
    'みょうがの生産量日本一',
    'ゆずの生産量日本一',
    'ソウダガツオの生産量日本一',
    '森林率日本一',
  ],
  福岡県: [
    'うどん発祥の地',
    '県の花はウメ',
    '県の花はうぐいす',
    '県の木はつつじ',
    '県民歌は「希望の光」',
    '校庭を新幹線が走る学校がある',
    '300円で乗れる新幹線がある',
    'ゆるキャラ、聖徳明太子',
    '竹炭の生産量日本一',
    '日本一高い海浜タワーがある',
    'あまおうの産地',
    '名産品はスケトウダラの魚卵',
    '歩いて渡れる海峡がある',
    'たけのこの生産量日本一',
    'タンスの出荷額日本一',
    'たらこの消費量日本一',
    'うどんにはごぼう天',
    'ヤクルト発祥の地',
    '年越しそば発祥の地',
    '銘菓、{{博多}}通りもん',
    'ホワイトデー発祥の地',
    'サザエさん発案の地',
  ],
  佐賀県: [
    '道路舗装率が日本一',
    'ご当地アイス、ブラックモンブラン',
    'ご当地アイス、ミルクック',
    'B級グルメ、シシリアンライス',
    '{{佐賀}}空港の駐車場は無料',
    '「見えない世界遺産」がある',
    '有田焼が有名',
    '自転車がカラフル',
    '銘菓、丸ぼうろ',
    '海苔の生産量日本一',
    '人気イベント、ガタリンピック',
    '県の鳥はカササギ',
    '県の木はクスの木',
    '日本三大松原の1つがある',
    '名物、呼子の活イカ',
    '吉野ヶ里遺跡がある',
    'ラーメンには生卵',
    '電子黒板整備率日本一',
    '二条大麦の収穫量日本一',
    'イカの活き造り発祥の地',
    '日本茶栽培発祥の地',
    'カキ小屋発祥の地',
  ],
  長崎県: [
    '隣接県が日本一少ない',
    '真珠の産地',
    '海岸線が2番目に長い',
    '島が日本一多い',
    '日本三大がっかり名所の1つがある',
    'お盆にはお墓で花火',
    '日本一高いタワーがあった',
    '精霊流しが有名',
    '豆乳が甘い',
    '世界初の海上空港がある',
    'ジャガイモの生産量2位',
    '郷土料理、みりん干し',
    '電車といえば路面電車',
    '日本最古の洋館がある',
    '日本最大のテーマパークがある',
    'カステラが有名',
    '白い鉄火巻きがある',
    'からすみが有名',
    '日本一小さな公園がある',
    '日本一短い駅間距離がある',
    '日本一小さい陥没湖がある',
    '世界最北のサンゴ礁がある',
  ],
  熊本県: [
    '日本三大急流の1つがある',
    '装飾古墳の数が日本一',
    '郷土料理、辛子蓮根',
    '日本初のスクランブル交差点がある',
    '食べられるお城がある',
    'ゆるキャラ、{{くま}}モン',
    'トマトの生産量日本一',
    '県の花はリンドウ',
    'メロンの生産量2位',
    '郷土料理、だご汁',
    '日本一高い石段がある',
    'B級グルメ、ちくわサラダ',
    '裏側から見れる滝がある',
    'ふりかけ発祥の地',
    '郷土料理、太平燕',
    'あんたがたどこさの舞台',
    'ONE PIECE発祥の地',
    'カリフラワーの生産量日本一',
    'スイカの生産量日本一',
    'い草の生産量日本一',
    '名水百選の選定数が最多',
  ],
  大分県: [
    '県の鳥はめじろ',
    'トンネルの数が日本一',
    '関サバが有名',
    '関アジが有名',
    '地獄温泉が有名',
    'かぼすの生産量日本一',
    '郷土料理、もみじ',
    '温泉の源泉数日本一',
    'から揚げ発祥の地',
    'サンリオのテーマパークがある',
    '県の花は豊後梅',
    'ご当地グルメ、とり天',
    '郷土料理、だんご汁',
    '努力遠足という行事がある',
    '郷土料理、りゅうきゅう',
    '日本最大の地熱発電所がある',
    '最も出力量の多い地熱発電所',
    '郷土料理、やせうま',
    '温泉湧出量日本一',
    '地熱発電電力量日本一',
    '柚子胡椒発祥の地',
  ],
  宮崎県: [
    '日本三大秘境の1つがある',
    '本家公認のモアイ像がある',
    '空港は「{{宮崎}}ブーゲンビリア空港」',
    '木刀の生産量日本一',
    '象が黄色くなる',
    'キャビアの生産量日本一',
    '「鬼の洗濯板」がある',
    '日向夏の生産量日本一',
    'ご当地パン「ジャリパン」',
    '唯一、野生の馬が生息',
    'マンゴーが有名',
    '冷や汁が有名',
    'ご当地スパイス、マキシマム',
    'チキン南蛮発祥の地',
    '{{宮崎}}牛が有名',
    '辛麺が有名',
    '「太陽のタマゴ」が有名',
    'きんかんの収穫量日本一',
    'きゅうりの収穫量日本一',
    '焼酎の出荷量日本一',
  ],
  鹿児島県: [
    '日本最大だった杉がある',
    '養殖うなぎの生産量日本一',
    '金の産出量日本一',
    '日本初の国立公園がある',
    '{{桜}}島は島ではない',
    '天気予報で降灰予報が出る',
    'かき氷「白くま」発祥の地',
    '西郷隆盛の出身地',
    '砂蒸し風呂が有名',
    'さつまいも生産量日本一',
    '日本一大きいスーパーがある',
    '郷土料理、鶏刺し',
    '火山灰専用のゴミ袋がある',
    '郷土料理、へちま汁',
    '世界一大きい大根がとれた',
    '郷土料理、さつま汁',
    '日本一長い村がある',
    '日本一宇宙に近い',
    'ツルの渡来数日本一',
    'ウミガメの上陸数日本一',
    '竹林の面積日本一',
    '日本最大のお茶の木がある',
  ],
  沖縄県: [
    '自転車保有率最下位',
    '日本最西端の駅がある',
    'みなみじゅうじ座が見れる',
    '塩水の川がある',
    'お正月が2回ある',
    '泡盛が有名',
    'パイナップルの99.9%を生産',
    '世界最古の釣り針が発見された',
    '{{イリオモテ}}ヤマネコが生息',
    '通行無料の日本最長の橋がある',
    '卒業式に小麦粉をかけ合う',
    '方言「めんそーれ」',
    '郷土料理、イラブ―汁',
    'お盆の踊り、エイサー',
    '県の花、デイゴ',
    '日本最大の蝶が生息',
    'ちんすこうが有名',
    '「ぜんざい」はかき氷',
    '東京都の隣',
    'ゴーヤの生産量日本一',
    '冬瓜の生産量日本一',
    'マンゴーの生産量日本一',
    'サトウキビの生産量日本一',
    '養殖もずくの99%を生産',
    '年平均気温日本一',
  ],
});

export default quiz;
