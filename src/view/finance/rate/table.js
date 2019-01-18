import detail from './detail'
import { percentFilter, moenyFilter } from '@/libs/filters'
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
  { title: "渠道", key: "name" },
  { title: "类型", key: "type" },
  { title: "利率", render: (h, params) => {
    return h("span",percentFilter(params.row.rate))
  } },
  { title: "限额", render: (h, params) => {
    return h("span",moenyFilter(params.row.maxLimit))
  } },
  { title: "操作",
    width: 150,
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