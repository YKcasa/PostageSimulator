### かんたん郵便料金シミュレーター
#### ver 0.8.8

### 概要
プルダウンメニューより送付したい内容物の種類と数量を入力し、封入する封筒を選択することで、郵便料金の試算を行います。

### ファイルの説明
top.html　：  
　メインのページです  
styles/style.css　：  
　スタイルシートです  
scripts/main.js　：  
　アプリ本体部分のスクリプトです  
　settings.jsの設定を読み込んで動的に要素を作成します 
scripts/settings.js　：  
　内容物や封筒の設定情報です  
　郵便料金の改訂時などはこのファイルを変更してください

### セットアップ方法
このリポジトリをクローンし、top.htmlをブラウザで開きます。

#

### 使用技術
JavaScript, HTML/CSS  

### 制作理由・選定理由
- 学習後初めて作るポートフォリオとして、JavaScriptの基本（オブジェクト指向とDOMの操作）を盛り込んだWEBアプリを作りたかった
- 前職在職時、社外への郵便について「これ切手いくらぶん貼ればいいの？」と話題になることが多く、簡単に見積もる方法が欲しかった
- 簡単な社内向け業務ツール…くらいの温度感を目指した
- 郵便局の価格決定要素が意外と複雑で、作っているうちにロジックを考える練習となった

### 気をつけた点、苦労した点
- 設定ファイルを別のjsファイルに切り出し、拡張性・メンテナンス性を考慮した（いずれはjsonファイル等、より設定管理しやすい方法を考えていきます）  
- 内容物の情報を都度変数に格納するのは非効率的と考え、内容物ごとにオブジェクトを作成し、そこに大きさ・重さを持たせることにした  
- 紙の重さを直感的な数値（紙の企画である連量など）で指定するため、重さの換算ロジックを加えた
- 算出できる内容が目安のため、試算の重さがギリギリかどうかわかるように、あとどのくらい同一料金で送れるかを表示することにした  
- 選択内容の変更により、封筒ボタン等の表示を初期化するタイミングを検討した

### 作成期間
ある程度形にするまで　70H  
（企画・仕様作成　10H、設計 10H、コーディング 30H、テスト・修正・コードの整理 20H）  

以降、機能追加やUI調整、リポジトリの整理で ＋30H～

#

### 今後修正していきたい点
Issueご参照ください（自分用メモのため見づらく恐縮です）

### 履歴
ver.0.8.8　速達チェックボックスの追加  
ver.0.8.7　初版

