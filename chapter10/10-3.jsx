﻿(function(){    // ファイル選択ダイアログを表示する    var fileObj = File.openDialog("テキストファイルを選択してください");    if (!fileObj){ return; }    // キャンセルされた場合は何も処理しない    // ファイル保存ダイアログを表示する    var saveObj = File.saveDialog("保存先を指定してください");    if (!saveObj){ return; }    // キャンセルされた場合は何も処理しない    // ファイルが読み込めるかどうか調べる    var flag = fileObj.open("r");   // 読み込みモードで開く    if (!flag){        alert("ファイルが開けません");        return;    }    // 書き込めるかどうか調べる    flag = saveObj.open("w");    if (!flag){        alert("ファイルが書き込めません");    }    // HTML5のヘッダーを書き出す    saveObj.encoding = "utf-8";    saveObj.write("<!DOCTYPE html><html><head>");    saveObj.write('<meta charset="utf-8"><title>');    saveObj.write(decodeURI(fileObj.name));    saveObj.writeln("</title></head><body>");    // ファイルの最後まで繰り返し処理する    while(!fileObj.eof){        var line = fileObj.readln();    // 1行読み込む        line = "<p>"+line + "<p>";   // HTMLの段落タグを付加        saveObj.writeln(line);  // 書き出す    }    saveObj.writeln("</body></html>");})();