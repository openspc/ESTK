﻿(function(){    // ==============================================    // Bridgeで定期的に時間を出力する関数    // ==============================================    function displayTime(){        function myTask(){            $.writeln(new Date());        }        var taskID = app.scheduleTask(uneval(myTask)+"()", 1000, true);        app.scheduleTask("app.cancelTask(taskID);", 10*1000, false);    }    // BridgeTalkオブジェクトを生成    var bt = new BridgeTalk();    // 実行するアプリケーションをBridgeにする    bt.target = BridgeTalk.getSpecifier("bridge");    // 実行する関数とパラメーターを設定    bt.body = uneval(displayTime)+"()";    bt.send();  // 実行開始})();