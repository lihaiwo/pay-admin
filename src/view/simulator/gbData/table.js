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
  { title: "VIN码", key: "vin" ,width: 180},
  { title: "车型", key: "vinType" },
  { title: "任务名称", key: "taskName" ,width: 120},
  { title: "4s店", key: "dealerName" },
  { title: "是否启动", render: (h, params) => {
    return h("span",params.row.startFlag== '1'?'是':'否')
  } },
  { title: "启动时间",width: 180, render: (h, params) => {
    return h("span",params.row.startFlag== '1'?(dataFilter(new Date(params.row.startTime))):'')
  } },
  { title: "操作",
    width: 150,
    align: "center",
    render: (h, params) => {
      var settingBtn = h("Button",{
        props: {
          type: "info",
          size: "small"
        },
        style: {
          marginRight: "5px"
        },
        on: {
          click: () => {
            vm.setUrl(params.index);
          }
        }
      },"设置")
      if (params.row.startFlag== '1') {
        return h("div", [settingBtn,
          h("Button",{
              props: {
                type: "warning",
                size: "small"
              },
              on: {
                click: () => {
                  vm.startOrStop(params.row.id,0);
                }
              }
            },"停止")
        ]);
      }else {
        return h("div", [settingBtn,
          h("Button",{
              props: {
                type: "warning",
                size: "small"
              },
              on: {
                click: () => {
                  vm.startOrStop(params.row.id,1);
                }
              }
            },"启动")
        ]);
      }
    }
  }
]