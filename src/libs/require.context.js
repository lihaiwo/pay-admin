const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/svg', false, /\.svg$/);
const iconsMap = requireAll(req)

const data ={
  svgList: null
}

export const getAllIcons = () => {
  if (!data.svgList) {
    data.svgList = []
    for(let item of iconsMap.values()) {
      data.svgList.push(item.substring(4).split('.')[0])
    }
  }
  return data.svgList;
}
