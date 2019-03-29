import { dataFilter } from '@/libs/filters'
export const columns = (vm) => [
  { type: 'index', width: 60, align: 'center' },
  { title: "名称", key: "title" },
  { title: "类型", key: "type" },
  { title: "键值", key: "value" },
  { title: "排序", key: "orderLine" },
  { title: "更新时间", render: (h, params) => {
    return h("span",dataFilter(new Date(params.row.updateTime)))
  } },
  { title: "操作",
    width: 250,
    align: "center",
    render: (h, params) => {
      return h("div", [
        h("Button",{
            props: {
              type: "info",
              size: "small"
            },
            style: {
              marginRight: "5px"
            },
            on: {
              click: () => {
                vm.create(false,params.index);
              }
            }
          },"修改"),
        h("Button",{
            props: {
              type: "error",
              size: "small"
            },
            on: {
              click: () => {
                vm.remove(params.row.id);
              }
            }
          },"删除")
      ]);
    }
  }
]