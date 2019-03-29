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
  { type: 'index', width: 60, align: 'center' },
  { title: "国标类型", key: "topic" },
  { title: "原始key", key: "originKey" },
  { title: "信号key", key: "signalKey" },
  { title: "信号名称", key: "signalName" },
  { title: "类型", render: (h, params) => {
    return h("span",params.row.type === '0' ? '枚举': '键值')
  } },
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