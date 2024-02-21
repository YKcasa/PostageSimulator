// --- 表示域との紐づけ
// 封筒ボタンエリア
const envelopeArea = document.getElementById('envelope-select');
// シミュレーションエリア
const displayPostage = document.getElementById('display-postage');
const displayMailType = document.getElementById('display-mailtype');
const displayWeightLimit = document.getElementById('display-weight-limit');
const displaySize = document.getElementById('display-size-area');
const displayThickness = document.getElementById('display-thickness-area');
const displayWeight = document.getElementById('display-weight-area');

// --- 変数定義
let componentsInstances;
let inclMaxLong, inclMaxShort, inclTotalThicknes, inclTotalWeight; // 内容物の最大長辺と短辺、内容物全体の厚さと重さ
let evLongSide, evShortSide, totalThickness, totalWeight; // 封筒の長辺と短辺、封筒込みの厚さと重さ
let nextWeightLimit;


// --- 内容物のクラス
class Inclusion {
    constructor(key, label, weight, thickness, type, max, unitName){
        this.key = key;
        this.label = label;
        if (type == 'paper' || type == 'file'){
            this.basicWeight = weight / (788 * 1091); // 紙の重さ単位：kg/四六判(788mm*1091mm)1000枚　→　g/1mm2　に変換する
        }else{
            this.basicWeight = weight;
        }
        this.unitWeight = 0;
        this.basicThickness = thickness;
        this.foldingFactor = 1; // 二つ折り・三つ折り換算用の係数
        this.unitThickness = 0;
        this.materialType = type;
        this.longSide = 0;
        this.shortSide = 0;
        this.quantity = 0;
        this.quantityMax = max; // ドロップダウンメニューの最大値
        this.unitName = unitName;
        this.sizeStandard = sizeStandards[this.materialType] || sizeStandards.default;
        this.paperSizeSelect = null;
        this.quantitySelect = null;

        this.createElements(); // インスタンス作成時に画面要素を作成
        this.attachListeners(); // 作成した画面要素にイベントリスナーを付与
    }

    createElements() {
        // 要素を配置するdiv
        const div = document.createElement('div');
        div.classList.add('inclusion');
        document.getElementById('inclusion').appendChild(div);

        // 内容物名称のラベル
        const label = document.createElement('label');
        label.textContent = this.label;
        div.appendChild(label);

        // サイズ選択ドロップダウンメニュー
        const sizeSelectMenu = document.createElement('select');
        sizeSelectMenu.id = this.key + '-size';       
        
        for (const size in this.sizeStandard) { 
            const option = document.createElement('option');
            option.value = size;
            option.text = size;
            sizeSelectMenu.appendChild(option);
        }

        div.appendChild(sizeSelectMenu);
        this.paperSizeSelect = document.getElementById(sizeSelectMenu.id);

        if (this.materialType == 'others'){
            this.paperSizeSelect.disabled = true;
        }
        
        // 数量選択ドロップダウンメニュー
        const quantityInputMenu = document.createElement('select');
        quantityInputMenu.id = this.key + '-quantity';
        for (let i = 0; i <= this.quantityMax; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            quantityInputMenu.appendChild(option);
        }
        div.appendChild(quantityInputMenu);
        this.quantitySelect = document.getElementById(quantityInputMenu.id);
        
        // 単位のラベル
        const unitLabel = document.createElement('label');
        unitLabel.textContent = this.unitName;
        div.appendChild(unitLabel);
    }
    
    attachListeners() {
        this.paperSizeSelect.addEventListener('change', this.updateInclusion.bind(this));
        this.quantitySelect.addEventListener('change', this.updateInclusion.bind(this));
    }

    updateInclusion(){ // ドロップダウンの選択内容で内容物のインスタンスを更新する
        this.clearDisplay();

        const selectedSize = this.paperSizeSelect.value;
        const quantity = this.quantitySelect.value;
        
        this.longSide = this.sizeStandard[selectedSize].long;
        this.shortSide = this.sizeStandard[selectedSize].short;
        this.foldingFactor = this.sizeStandard[selectedSize].foldingFactor;
        
        this.quantity = Number(quantity);
        this.unitWeight = Number(this.basicWeight * this.longSide * this.shortSide * this.foldingFactor * this.quantity);
        this.unitThickness = Number(this.basicThickness * this.foldingFactor * quantity);
        
        console.log(this.key, this.quantity, this.unitWeight, this.unitThickness)
        
        calculateInclusionTotal();
        generateEnvelopeButtons();
        
        if (selectedSize === 'サイズを選択'){
            if (quantity !== '0'){
                this.paperSizeSelect.classList.add('select-emphasis');
                envelopeArea.innerHTML = '';
            }
        }else if (quantity === '0'){
            if (selectedSize !== 'サイズ指定なし'){
                this.quantitySelect.classList.add('select-emphasis');
                envelopeArea.innerHTML = '';
            }
        }else{
            scrollToButtons();
        }
    }

    clearDisplay(){ // 表示部分のクリア
        updateDisplay(displayPostage, '');
        updateDisplay(displayMailType, '');
        updateDisplay(displayWeightLimit, '');
        this.quantitySelect.classList.remove('select-emphasis');
        this.paperSizeSelect.classList.remove('select-emphasis');
    }
}

// --- 内容物の合算 --- 内容物の最大の長辺・短辺、内容物全体の厚さ・重さを計算
function calculateInclusionTotal() {
    inclMaxLong = componentsInstances.reduce((max, instance) => Math.max(max, instance.longSide), 0);
    inclMaxShort = componentsInstances.reduce((max, instance) => Math.max(max, instance.shortSide), 0);
    
    inclTotalThicknes = componentsInstances.map(item => item.unitThickness).reduce((sum, curr) => sum + curr, 0);
    updateDisplay(displayThickness, `${inclTotalThicknes.toFixed(1)} mm`, 500);
    
    inclTotalWeight = componentsInstances.map(item => item.unitWeight).reduce((sum, curr) => sum + curr, 0);
    updateDisplay(displayWeight, `${inclTotalWeight.toFixed(2)} g`, 500);
    
    console.log(`長辺:${inclMaxLong}, 短辺:${inclMaxShort}, 厚さ:${inclTotalThicknes}, 重さ:${inclTotalWeight}`);  
}    

// --- 封筒ボタン生成 --- 内容物が入るサイズの封筒ボタンを表示し、イベントリスナーを設置
function generateEnvelopeButtons() {
    envelopeArea.innerHTML = ''; 
    updateDisplay(displaySize, '');

    Object.keys(envelopeData).forEach(envelopeId => {
        const data = envelopeData[envelopeId];
        if(data.long > inclMaxLong && data.short > inclMaxShort){
            const button = document.createElement("button");
            button.id = envelopeId;
            button.textContent = `${data.value}`;
            button.classList.add('envelope-btn');
            envelopeArea.appendChild(button);
        }
    });
    
    const envelopeButtons = document.querySelectorAll('.envelope-btn');
    envelopeButtons.forEach(btns => btns.addEventListener('click', calculatePostage));
}

// --- 画面スクロール（封筒ボタンを見せるため。STEP１を画面最上部へ）
function scrollToButtons(){
    const scrollTarget = document.getElementById('inclusion');
    scrollTarget.scrollIntoView({behavior: 'smooth', block: 'start'})
}

// --- 封筒ボタン選択時　-> 封筒サイズ読み込み、郵便種別判定
function calculatePostage(){
    loadEnvelopDatas();
    postalClassify();
}

// 封筒サイズ読み込み
function loadEnvelopDatas(){
    updateDisplay(displayThickness,'');
    updateDisplay(displayWeight,'');

    const selectedEnvelopeSize = envelopeData[event.target.id]; //封筒データセットから
    evLongSide = selectedEnvelopeSize.long; 
    evShortSide = selectedEnvelopeSize.short;
    updateDisplay(displaySize, `${evLongSide} mm × ${evShortSide} mm`, 500);
    
    totalThickness = inclTotalThicknes + selectedEnvelopeSize.thickness;
    updateDisplay(displayThickness, `${totalThickness.toFixed(1)} mm`, 500);
    
    totalWeight = inclTotalWeight + selectedEnvelopeSize.weight;
    updateDisplay(displayWeight, `${totalWeight.toFixed(2)} g`, 500);
    
    // 計算確認用
    console.log(`封筒長辺：${evLongSide},封筒短辺：${evShortSide},厚さ：${totalThickness},重さ：${totalWeight}`);
    // 計算確認用ここまで
}

// 郵便種別判定 -> 郵便料金判定
// --- !!! 料金変更の閾値はここにハードコーディングしているので郵便仕様変更時は修正する !!! ---
function postalClassify() {
    let mailType, diplayFee;
    
    if (totalWeight > 4000){ // 4kg超は取扱い不可。除外
        mailType = "４ｋｇを超えるものは、手紙ではなくゆうパック等をお使いください";
    }else if( evLongSide > 600 || (evLongSide + evShortSide + totalThickness) > 900 ){
        mailType = "９０サイズをオーバーしています。ゆうパック等をお使いください";
    }else{
        if(totalWeight > 1000){ // 1kg超は定形外・規格外
            mailType = `定形外郵便物・規格外`;
            displayFee = determinePostage(extraPostageArray, totalWeight);
        }else if(totalWeight > 50){ // 50g超は定形外
            if (evLongSide > 340 || evShortSide > 250 || totalThickness > 30){
                mailType = `定形外郵便物・規格外`;
                displayFee = determinePostage(extraPostageArray, totalWeight);
            }else{
                mailType = `定形外郵便物・規格内`;
                displayFee = determinePostage(nonstandardPostageArray, totalWeight);
            }   
        }else{ //50g以内は大きさで３パターン
            if(evLongSide > 340 || evShortSide > 250 || totalThickness > 30){
                mailType = `定形外郵便物・規格外`;
                displayFee = determinePostage(extraPostageArray, totalWeight);
            }else if(evLongSide > 235 || evShortSide > 120 || totalThickness > 10){
                mailType = `定形外郵便物・規格内`;
                displayFee = determinePostage(nonstandardPostageArray, totalWeight);
            }else{
                mailType = `定形郵便物`;
                displayFee = determinePostage(standardPostageArray, totalWeight);
            };
        };
    };

    updateDisplay(displayMailType, mailType, 500);
    updateDisplay(displayWeightLimit, `あと ${(nextWeightLimit - totalWeight).toFixed(1)}ｇまで同一料金です`, 500);
    displayPostage.textContent = `${displayFee} 円`;
    
}

// 郵便料金判定
function determinePostage(postalClassArray, weight) {
    for (i = 0; i < postalClassArray.length; i++){
        if (weight <= postalClassArray[i].weightLimit){
            nextWeightLimit = postalClassArray[i].weightLimit;
            return postalClassArray[i].fee;
        };
    }
}


// --- 表示エリアへの表示用共通処理
function updateDisplay(area, contents, delay = 0){
    area.animate([{opacity: '0'},{opacity: '1'}], delay);
    area.textContent = `${contents}`;
}

// --- 郵便料金の値が変更するとき、カウントアップ・カウントダウン表示する（作成中）
function turnPostageCounter(){
}


// --- 初期化処理　配列データより、インスタンスを作成する
function initialize() {
    componentsInstances = inclusions.map(data => new Inclusion(data.id, data.label, data.weight, data.thickness, data.type, data.max, data.unitName));
}


// --- 画面読み込み時に初期化処理を行う
document.addEventListener('DOMContentLoaded', initialize);
    