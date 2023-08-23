// アコーディオンメニュー
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

// 封筒ボタン制御
const enbtns = document.querySelectorAll(".envelop-btn");
// const display = document.getElementById("display-area"); //メインファイルへ

enbtns.forEach(btn => {
  btn.addEventListener("click", function() {
    const data1 = buttonDataMap[btn.id][0];
    const data2 = buttonDataMap[btn.id][1];

    display.textContent = data1 + " x " + data2;

  });
});

// const buttonDataMap = {
//   'K1': ['27.0','38.2'],
//   'K5': ['19.0','24.0']
// };
