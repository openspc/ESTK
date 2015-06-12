(function(){
       // 限界文字数を指定する
       var LIMIT = 92;       // 半角文字で92文字まではOK
    // 文字数を調べるフォルダを指定する
    var folderObj = Folder.selectDialog("文字数をチェックしたいテキストファイルがあるフォルダを選択してください");
    if (!folderObj){ return; }  // キャンセルされた場合は何も処理しない
    // ファイル保存ダイアログを表示する
    var saveObj = File.saveDialog("結果の保存先を指定してください");
    if (!saveObj){ return; }    // キャンセルされた場合は何も処理しない
    // 書き込めるかどうか調べる
    var flag = saveObj.open("w");
    if (!flag){
        alert("ファイルが書き込めません");
    }
    // 保存する文字コードを指定する
    saveObj.encoding = "utf-8";
    // 改行コードをWindows (CR/LF) にする
    saveObj.lineFeed = "windows";
    // 1行の文字数を調べる関数を呼び出す
    check(folderObj);
    saveObj.close();
    alert("終了しました");
    // テキストファイルの1行の文字数を調べる関数
    function check(folderObj){
        // ファイル/フォルダ一覧を取得する
        var fileList = folderObj.getFiles("*.txt");       // genkou.txtといった固定されたファイル名も指定可
        // ファイルの数だけ読み出す
        for(var i=0; i<fileList.length; i++){
            // ファイルを開く
            var flag = fileList[i].open("r");   // ファイルを読み込みモードで開く
            if (flag == true){  // 開くのに成功した場合は以後の処理を行う
                            while(!fileList[i].eof){       // ファイルの末尾まで繰り返す
                                   var text = fileList[i].readln();  // 1行読み込む
                                   var n = count(text);       // 1行の文字数を調べる関数を呼び出す
                                   if (n > LIMIT){       // 半角で指定された文字数を超えているか？
                                          saveObj.writeln(fileList[i].fsName);       // ファイル名を書き出す
                                          break;       // ループから抜ける
                                   }
                                   }
            }
        }
        // フォルダを含めた一覧を取得する
        fileList = folderObj.getFiles();
        for(var i=0; i<fileList.length; i++){
            // フォルダかどうか調べる
            if(fileList[i].getFiles){
                check(fileList[i]);  // フォルダの場合は再帰呼び出し
            }
        }
    }
       // 文字数をカウントする関数
       function count(text){
              var total = 0;       // 文字数を入れる変数。最初は0にしておく
              for(var i=0; i<text.length; i++){       // 文字数の数だけ繰り返す
                     var c = text.charCodeAt(i);       // 文字コードを読み出す
                     if (c < 256){       // 256より小さい文字コードなら半角文字と見なす
                            total = total + 1;       // 半角文字なので1を加算する
                     }else{
                            total = total + 2;       // 半角文字ではないので2を加算する
                     }
              }
              return total;       // 文字数を返す
       }
})();
