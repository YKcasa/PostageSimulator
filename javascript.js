
// コンポーネント用の配列
const components = [
  {id:'NormalPaper', label:'普通紙 : ', weight:55, thickness:0.12, havingSize: true, max: 20},
  {id:'HeavyPaper', label:'厚紙 : ', weight:90, thickness:0.15, havingSize: true, max: 10},
  {id:'ClearFile', label:'クリアファイル : ', weight:120, thickness:1.5, havingSize: true, max: 5},
  {id:'Clips', label:'クリップ : ', weight:120, thickness:1.0, havingSize: false, max: 5}
  // コンポーネントを適宜追加
]

// サイズ一覧
const sizeStandard = {
  'サイズを選択': {long:0, short:0},
  'A4': {long:297, short:210, thicknessFactor:1},
  'A4（２つ折り）': {long:210, short:148.5, thicknessFactor:2},
  'A4（３つ折り）': {long:210, short:99, thicknessFactor:3},
  'B4': {long:364, short:257, thicknessFactor:1},
  'B4（２つ折り）': {long:257, short:182, thicknessFactor:2},
  'B4（３つ折り）': {long:257, short:121.3, thicknessFactor:3}
}    

// 封筒ボタンのデータセット
const envelopeData = {
  'K1': {value:"角型１号", long:382, short:270},
  'K2': {value:"角型２号", long:332, short:240},
  'K20': {value:"角型20号", long:324, short:229},
  'K3': {value:"角型３号", long:277, short:216},
  'T1': {value:"長型１号", long:332, short:142},
  'T2': {value:"長型２号", long:277, short:119},
  'T3': {value:"長型３号", long:235, short:120},
  'T4': {value:"長型４号", long:205, short:90}
}   

// 郵便種別メッセージ
const postalClassMessage = [
  {id:'calculating', message:'計算中です・・・'},
  {id:'standard', message:'定形郵便物'},
  {id:'nonstandard', message:'定形外・規格内郵便物'},
  {id:'extra', message:'定形外・規格外郵便物'},
  {id:'parcel', message:'郵便小包での扱いとなります'},
]

// 定形郵便物
const standardPostageArray = [
  { weight:25, fee:84 },
  { weight:50, fee:94 },
];

// 定形外・規格内郵便物
const nonstandardPostageArray = [
  { weight:50, fee:120 },
  { weight:100, fee:140 },
  { weight:150, fee:210 },
  { weight:250, fee:250 },
  { weight:500, fee:390 },
  { weight:1000, fee:580 },
];

// 定形外・規格外郵便物
const extraPostageArray = [
  { weight:50, fee:200 },
  { weight:100, fee:220 },
  { weight:150, fee:300 },
  { weight:250, fee:350 },
  { weight:500, fee:510 },
  { weight:1000, fee:710 },
  { weight:2000, fee:1040 },
  { weight:4000, fee:1350 },
];  


// // 点滅表示
// function flashOff(targetElement){
//   const blinkTarget = targetElement;
//   blinkTarget.classList.add('hidden');
// }

// function flashOn(targetElement){
//   const blinkTarget = targetElement;
//   blinkTarget.classList.remove('hidden');
// }

// アコーディオンメニュー（現在未使用）
const acbtns = document.querySelectorAll(".accordion-btn");

acbtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});

