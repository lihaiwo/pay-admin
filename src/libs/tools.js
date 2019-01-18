/**
 * 获取路径参数，在path后面的问号
 */
export const getQueryString = () => {
  let searchStr = (window.location.search || "?").substring(1)
  const query = {};
  for (let elem of searchStr.split("&").values()) {
    if(elem){
      let resAttr = elem.split("=")
      if(resAttr[0] && resAttr[1]){
        query[ resAttr[0] ] = resAttr[1]
      }
    }
  }
  return query;
}
/**
 * 获取树形结构数据，通用方法
 */
export const getTreeData = (list, { sId= 'children',pId= "parentId" }) => {
  var root = {id:-1}
  getChildren(root,list)
  const getChildren = (root, list) => {
    for (let i = list.length-1; i>= 0; i--) {
      const item = list[i];
      if(item[pId] === root.id) {
        root[sId] = root[sId] || []
        root[sId].push(item)
      }
      list.splice(i,1)
    }
    if(root[sId]) {
      root[sId].forEach(element => {
        getChildren(element,list)
      });
    }
  }
  return root[sId]
}
/**
 * list 是数组
 * 通过list里面的level获取树形数据
 */
export const getTreeDataByLevel = (list, { sId='children',pId="parentId" }) => {
  const data = []
  for(let item of list.values()) {
    data[item.level-1] = data[item.level-1] || []
    data[item.level-1].push(item)
  }
  for(let item of data.values()) { //2维数组
    for(let root of item.values()){ //上一级数组
      //如果存在下一级数组
      if(data[root.level]) {
        for(let child of data[root.level].values()) {
          if(child[pId] === root.id) {
            root[sId] = root[sId] || []
            root[sId].push(child)
          }
        }
      }
    }
  }
  return data[0]
}
/**
 * 日期格式化
 */
export const dateFtt = (date,fmt='yyyy-MM-dd hh:mm:ss') =>{
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 