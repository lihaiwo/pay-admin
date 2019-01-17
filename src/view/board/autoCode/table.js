import detail from './detail'
import { dataFilter } from '@/libs/filters'
export const columns = (vm) => [
  {
    type: "expand",
    width: 50,
    render: (h, params) => {
      return h(detail, {
        props: {
          row: params.row
        }
      });
    }
  },
  { title: "类型", key: "typeName" },
  { title: "名称", key: "cname" },
  { title: "字段名", key: "kname" },
  { title: "备注", key: "remarks" },
  { title: "更新时间", render: (h, params) => {
    return h("span",dataFilter(new Date(params.row.updateTime)))
  } },
  { title: "操作",
    width: 200,
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
              vm.produce(params.row);
            }
          }
        },"生成"),
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
                vm.create(false,params.row);
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