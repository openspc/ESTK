(function(){
       // ���E���������w�肷��
       var LIMIT = 92;       // ���p������92�����܂ł�OK
    // �������𒲂ׂ�t�H���_���w�肷��
    var folderObj = Folder.selectDialog("���������`�F�b�N�������e�L�X�g�t�@�C��������t�H���_��I�����Ă�������");
    if (!folderObj){ return; }  // �L�����Z�����ꂽ�ꍇ�͉����������Ȃ�
    // �t�@�C���ۑ��_�C�A���O��\������
    var saveObj = File.saveDialog("���ʂ̕ۑ�����w�肵�Ă�������");
    if (!saveObj){ return; }    // �L�����Z�����ꂽ�ꍇ�͉����������Ȃ�
    // �������߂邩�ǂ������ׂ�
    var flag = saveObj.open("w");
    if (!flag){
        alert("�t�@�C�����������߂܂���");
    }
    // �ۑ����镶���R�[�h���w�肷��
    saveObj.encoding = "utf-8";
    // ���s�R�[�h��Windows (CR/LF) �ɂ���
    saveObj.lineFeed = "windows";
    // 1�s�̕������𒲂ׂ�֐����Ăяo��
    check(folderObj);
    saveObj.close();
    alert("�I�����܂���");
    // �e�L�X�g�t�@�C����1�s�̕������𒲂ׂ�֐�
    function check(folderObj){
        // �t�@�C��/�t�H���_�ꗗ���擾����
        var fileList = folderObj.getFiles("*.txt");       // genkou.txt�Ƃ������Œ肳�ꂽ�t�@�C�������w���
        // �t�@�C���̐������ǂݏo��
        for(var i=0; i<fileList.length; i++){
            // �t�@�C�����J��
            var flag = fileList[i].open("r");   // �t�@�C����ǂݍ��݃��[�h�ŊJ��
            if (flag == true){  // �J���̂ɐ��������ꍇ�͈Ȍ�̏������s��
                            while(!fileList[i].eof){       // �t�@�C���̖����܂ŌJ��Ԃ�
                                   var text = fileList[i].readln();  // 1�s�ǂݍ���
                                   var n = count(text);       // 1�s�̕������𒲂ׂ�֐����Ăяo��
                                   if (n > LIMIT){       // ���p�Ŏw�肳�ꂽ�������𒴂��Ă��邩�H
                                          saveObj.writeln(fileList[i].fsName);       // �t�@�C�����������o��
                                          break;       // ���[�v���甲����
                                   }
                                   }
            }
        }
        // �t�H���_���܂߂��ꗗ���擾����
        fileList = folderObj.getFiles();
        for(var i=0; i<fileList.length; i++){
            // �t�H���_���ǂ������ׂ�
            if(fileList[i].getFiles){
                check(fileList[i]);  // �t�H���_�̏ꍇ�͍ċA�Ăяo��
            }
        }
    }
       // ���������J�E���g����֐�
       function count(text){
              var total = 0;       // ������������ϐ��B�ŏ���0�ɂ��Ă���
              for(var i=0; i<text.length; i++){       // �������̐������J��Ԃ�
                     var c = text.charCodeAt(i);       // �����R�[�h��ǂݏo��
                     if (c < 256){       // 256��菬���������R�[�h�Ȃ甼�p�����ƌ��Ȃ�
                            total = total + 1;       // ���p�����Ȃ̂�1�����Z����
                     }else{
                            total = total + 2;       // ���p�����ł͂Ȃ��̂�2�����Z����
                     }
              }
              return total;       // ��������Ԃ�
       }
})();
