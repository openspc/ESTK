var $kfLib = new Object();
$kfLib.setOpacity = function(layerName, n){
    try{
        if(activeDocument.layers[layerName]){
            activeDocument.layers[layerName].opacity = n;
            return true;
        }
    }catch(e){
        return false;
    }
}
$kfLib.setOpacity("���C���[ 1", 50);
$kfLib.setOpacity("���C���[ 2", 75);
