/**
 * 读取excel文件
 * readAsText
 */
import XLSX from 'xlsx';
export const importf = (file) => {
  return new Promise((resolve, reject) => {

    /*
      FileReader共有4种读取方法：
      1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
      2.readAsBinaryString(file)：将文件读取为二进制字符串
      3.readAsDataURL(file)：将文件读取为Data URL
      4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
      */
    var wb;//读取完成的数据
    var rABS = false; //是否将文件读取为二进制字符串

    if(!file) {
      return reject()
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      if(rABS) {
          wb = XLSX.read(btoa(fixdata(data)), {//手动转化
              type: 'base64'
          });
      } else {
          wb = XLSX.read(data, {
              type: 'binary'
          });
      }
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      //wb.Sheets[Sheet名]获取第一个Sheet的数据
      resolve( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) )
    };
    if(rABS) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsBinaryString(file);
    }

  })
}