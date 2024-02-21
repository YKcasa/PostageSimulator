// 郵便料金表
const s = [
    { w:25, fee:84 },
    { w:50, fee:94 },
];

const nss = [
    { w:50, fee:120 },
    { w:100, fee:140 },
    { w:150, fee:210 },
    { w:250, fee:250 },
    { w:500, fee:390 },
    { w:1000, fee:580 },
];

const nsns = [
    { w:50, fee:200 },
    { w:100, fee:220 },
    { w:150, fee:300 },
    { w:250, fee:350 },
    { w:500, fee:510 },
    { w:1000, fee:710 },
    { w:2000, fee:1040 },
    { w:4000, fee:1350 },
];    

let a, b, c, d;
let height, width, thickness, weight;
let message, standard, fee;

let thickLimit1, thickLimit2;


// タテ欄にフォーカス
document.getElementById('input1').focus();

// ボタン要素の取得
let button1 = document.getElementById('checkButton');
let button2 = document.getElementById('thick1');
let button3 = document.getElementById('thick2');
let button4 = document.getElementById('thick3');
let button5 = document.getElementById('thick4');

// メッセージエリアの取得
let opmessageC = document.getElementById("checkMessage");
let opmessageS = document.getElementById("sizeMessage");

// 「次へ」ボタンをクリックすると入力欄チェックへ進む
button1.addEventListener('click', checkColumn);

// 厚みのボタンをクリックすると料金計算へ進む
button2.addEventListener('click', selectThick1);
button3.addEventListener('click', selectThick2);
button4.addEventListener('click', selectThick3);
button5.addEventListener('click', selectThick4);

const yupack = document.getElementById("yu-pack");


// 入力欄チェック：　入力内容の受け取りとチェック
function checkColumn(){
    // テスト用
    // let a = 95;
    // let b = 220;
    // let c = 10;
    // let d = null;
    // テスト用ここまで
    
    //　リセット処理をしたい　【未完成】
    checkMessage.innerText = "";
    sizeMessage.innerText = "";
    outputFee.innerText = "";
    outputStandard.innerText = "";

    const p1 = document.getElementById("input-area2");

    console.log(p1.style.visibility);

    if(p1.style.visibility == "visible"){
		// 非表示
		p1.style.visibility = "hidden";
	};

    if(yupack.style.visibility == "visible"){
		// 非表示
		yupack.style.visibility = "hidden";
	};
    
    let input1 = document.getElementById('input1');
    a = input1.value;
    let input2 = document.getElementById('input2');
    b = input2.value;

    // 空欄と半角のチェック
    if (a === "" || b === ""){ // 空欄チェック
        messageC = "空欄があります。２つの欄に入力してください";
        checkMessage.innerText = messageC;
    }else{
        if (a.match(/^[0-9]+$/)){ //aが半角数字とマッチ
            if (b.match(/^[0-9]+$/)){ //bが半角数字とマッチ
                messageC="";
                checkSide();
                // break;
            }else{    
                messageC = "半角数字で入力してください";
                checkMessage.innerText = messageC;
            }
        }else{
            messageC = "半角数字で入力してください";
            checkMessage.innerText = messageC;
        }
    };
};


function checkSide(){

    // 長辺短辺の調整
    console.log(a);
    console.log(b);

    if (a >= b) { //長辺をタテで固定する
    console.log('長辺と短辺の交換なし');
        height = Number(a);
        width = Number(b);
    }else{
        console.log('長辺と短辺の入力値を交換します');
        height = Number(b);
        width = Number(a);
    }
    // thickness = c;
    
    // // 重量が入力されているか？
    // if (d == 0){
    // console.log('重量未定義です');
    // weight = 9999;
    // }else{
    // weight = d;
    // };
    
    console.log(`height=${height},width=${width},thickness=${thickness},weight=${weight}`);

    // 最小未満と最大以上はサイズメッセージを出す
    if (height < 140 && width < 90){ // 入力値の単位の確認。短辺が90以下ならｍｍ入力ではない旨応答する
        messageS = "140mm × 90mm未満の封筒は郵便として送れません";
        sizeMessage.innerText = messageS;
    }else{
        if(height > 600 || (height + width) > 900 ){ // 最大サイズを超えているとその旨を応答する
            messageS = "郵便の最大サイズを超えています";
            sizeMessage.innerText = messageS;
        }else{
            messageS = ""; // OK、厚み入力エリアを表示する
            clickBtn1();
        }
    }; 
}
    
    // calcPostageFee(); // 問題なければ料金計算関数を呼び出す

function clickBtn1(){
    const p1 = document.getElementById("input-area2");
    const p2 = document.getElementById("thick3");
    const p3 = document.getElementById("thick4");

    console.log(height + width);

    thickLimit1 = 900 - (height + width);
    thickLimit2 = thickLimit1 / 10;

    console.log("ボタンは認識");
    console.log(p1);
    console.log(p1.style.visibility);

    if(p1.style.visibility == "hidden"){
		// 表示
		p1.style.visibility = "visible";
        p2.value = `${thickLimit2}cm以内`;
        p3.value = `${thickLimit2}cm超`;

        // clickBtn2();
        
	}else{
		// 非表示
		// p1.style.visibility ="hidden";
	}
};


// 厚みボタンをクリックした時の動き
function selectThick1(){
    outputStandard.innerText = "";
    outputFee.innerText = "";
    thickness = Number(10)
    calcPostageFee(); 
};

function selectThick2(){
    outputStandard.innerText = "";
    outputFee.innerText = "";
    thickness = Number(30)
    calcPostageFee(); 
};

function selectThick3(){
    outputStandard.innerText = "";
    outputFee.innerText = "";
    thickness = Number(thickLimit1) 
    calcPostageFee(); 
};

function selectThick4(){
    outputStandard.innerText = "";
    outputFee.innerText = "";
    thickness = Number(thickLimit1) + 1
    calcPostageFee(); 
};



// 料金計算
function calcPostageFee(){

height = Number(height);
width = Number(width);
// thickness = Number(thickness);
// weight = Number(weight);
weight = 9999;

console.log(`height=${height},width=${width},thickness=${thickness},weight=${weight}`);
console.log(thickLimit1);

if (weight == 9999){
    // （重量未定義版）定型かを判断　→　規格を判断
    if (height <= 235 && width <= 120 && thickness <= 10){
        standard = "定形郵便物です";
        fee = "\r\n２５ｇまで：８４円、 ５０ｇまで：９４円 \r\n５０ｇ超は定形外扱い";
    }else{
        if (height <= 340 && width <= 250 && thickness <= 30){
            standard = "定形外郵便物・規格内です";
            fee = "\r\n５０ｇまで：１２０円、 １００ｇまで：１４０円、 １５０ｇまで：２１０円 \r\n２５０ｇまで：２５０円、 ５００ｇまで：３９０円、 １ｋｇまで：５８０円 \r\n１ｋｇ超は規格外扱い ";
        }else if(thickness <= thickLimit1){
            standard = "定形外郵便物・規格外です";
            fee = "\r\n５０ｇまで：２００円、 １００ｇまで：２２０円、 １５０ｇまで：３００円 \r\n２５０ｇまで：３５０円、 ５００ｇまで：５１０円、 １ｋｇまで：７１０円 \r\n２ｋｇまで：１０４０円、 ４ｋｇまで：１３５０円 ";
        }else{
            standard = "９０サイズをオーバーしているため、ゆうパック等をお使いください";
            fee="未定";
            if(yupack.style.visibility == "hidden"){
                // 表示
                yupack.style.visibility = "visible";
            };
        }
    }
}else{
    // 重量定義版

    if (weight > 4000){ // 4kg超は取扱い不可。除外
        standard = "４ｋｇを超えるものは、手紙ではなくゆうパック等をお使いください";
    }else if( height > 600 || (height + width + thickness) > 900 ){ // 90サイズ超は取扱い不可。除外
        standard = "９０サイズをオーバーしています。ゆうパック等をお使いください";
    }else{
        if(weight > 1000){ // 1kg超は必然的に定形外・規格外扱い
            standard = "定形外郵便物・規格外です";
            for (i = 0; i < nsns.length; i++){
                if (weight <= nsns[i].w){
                    fee = nsns[i].fee + " 円"; // 配列のうち当てはまる重量から料金を返す
                    break;
                };
            }
        }else if(weight > 50){ // 50g超は定形外郵便物
            if (height <= 340 && width <= 250 && thickness <= 30){ // 定形外規格内
                standard = "定形外郵便物・規格内です";
                for (let i = 0; i < nss.length; i++){
                    if (weight <= nss[i].w){
                        fee = nss[i].fee + " 円"; // 配列のうち当てはまる重量から料金を返す
                        break;
                    };
                }
            }else{ // 定形外規格外
                standard = "定形外郵便物・規格外です";
                for (i = 0; i < nsns.length; i++){
                    if (weight <= nsns[i].w){
                        fee = nsns[i].fee + " 円"; // 配列のうち当てはまる重量から料金を返す
                        break;
                    };
                }
            }
        }else{ //50g以内は大きさで３パターンわかれる（定形内・定形外規格内・定形外規格外）
            if (height <= 235 && width <= 120 && thickness <= 10){ // 定形内
                standard = "定形郵便物です";
                for (i = 0; i < s.length; i++){
                    if (weight <= s[i].w){
                        fee = s[i].fee + " 円"; // 配列のうち当てはまる重量から料金を返す
                        break;
                    };
                }
            }else if(height <= 340 && width <= 250 && thickness <= 30){ // 定形外規格内
                standard = "定形外郵便物・規格内です";
                for (i = 0; i < nss.length; i++){
                    if (weight <= nss[i].w){
                        fee = nss[i].fee + " 円"; // 配列のうち当てはまる重量から料金を返す
                        break;
                    };
                }
            }else{ // 定形外規格外
                standard = "定形外郵便物・規格外です";
                for (i = 0; i < nsns.length; i++){
                    if (weight <= nsns[i].w){
                        fee = nsns[i].fee + " 円"; // 配列のうち当てはまる重量から料金を返す
                        break;
                    };
                };
            };
        };
    };
};

// テスト用
//console.log(`height=${height},width=${width},thickness=${thickness},weight=${weight}`);
console.log(standard);
console.log(fee);
// テスト用ここまで

let opstandard = document.getElementById("outputStandard");
outputStandard.innerText = standard;

let opfee = document.getElementById("outputFee");
outputFee.innerText = "料金は　" + fee + "となります";
};
