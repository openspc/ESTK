﻿function setOpacity(layerName, n){    try{        if(activeDocument.layers[layerName]){            activeDocument.layers[layerName].opacity = n;            return true;        }    }catch(e){        return false;    }}if (setOpacity("樹木", 50) == false){ alert("樹木レイヤーがありません"); }if (setOpacity("レイヤー 1", 80) == false){ alert("レイヤー 1レイヤーがありません"); }if (setOpacity("テロップ", 75) == false){ alert("テロップレイヤーがありません"); }