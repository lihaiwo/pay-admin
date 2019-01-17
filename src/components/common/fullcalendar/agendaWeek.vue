<template>
  <div class="fc-agendaWeek-view">
    <div class="fc-widget-title">
      <span class="arrow"><Icon type="ios-arrow-back"></Icon></span>
      <h2>{{allWeekday | titleFilter}}</h2>
      <span class="arrow"><Icon type="ios-arrow-forward"></Icon></span>
    </div>
    <div class="fc-widget-header">
      <div class="fc-day-axis"></div>
      <div class="fc-day-header" v-for="day in allWeekday"><span>{{day | weekFilters}}</span></div>
    </div>
    <div class="fc-widget-content">
      <div class="fc-divider"></div>
      <div class="fc-content-skeleton">
        <div class="fc-axis"></div>
        <div class="fc-content-col" v-for="i in 7">
          <div class="fc-event-container">
            <a class="fc-v-event" @click="modifyEvent(item)" :class="item.color" :type="item.type"
              :style="{top: item.top, bottom: item.bottom, left: item.left, right: item.right}" v-for="item in allTask[i]">
              <div class="fc-content">
                <span>{{item.workers.length}}人</span><br>
                <span>员工：{{item.workers | workersFilter}}</span><br>
                <span>时间：{{item | timeFilters}}</span><br>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="fc-bg">
        <div class="fc-axis"></div>
        <div class="item" v-for="i in 7"></div>
      </div>
      <!-- @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" -->
      <div class="fc-slats"  >
        <template v-for="(i,index) in times">
          <div class="row">
            <div class="fc-axis fc-time fc-widget-line"><span>{{i}}</span></div>
            <div class="fc-widget-line fc-extend" @click="addEvent($event, index, 0)"></div>
          </div>
          <div class="row fc-minor">
            <div class="fc-axis fc-widget-line"></div>
            <div class="fc-widget-line fc-extend" @click="addEvent($event, index, 1)"></div>
          </div>
        </template>
      </div>
    </div>
    <Modal v-model="addEventModal" width="696" title="添加" :loading="loading" @on-ok="submitAdd" @on-cancel="cancel">
      <Form :model="addForm" :label-width="80">
        <FormItem label="开始时间">
          <DatePicker type="datetime" v-model="addForm.dutyDateStart" format="yyyy-MM-dd HH:mm"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="datetime" v-model="addForm.dutyDateEnd" format="yyyy-MM-dd HH:mm"></DatePicker>
        </FormItem>
        <FormItem label="颜色">
          <common-list :options="allColor" v-model="addForm.color" class="color-selector">
            <div slot-scope="{ option }" :class="option.color" class="item">
              <Icon type="right" class="color"></Icon>
            </div>
          </common-list>
        </FormItem>
        <FormItem label="值班人员">
          <Tag v-for="item in addForm.workers" closable :key="item.userId" :name="item.userId" closable @on-close="handleClose">{{ item.userName }}</Tag>
          <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { dateFtt } from '@/libs/tools'
import CommonList from '_c/common-list'
import { saveDutyRoster } from '@/api/duty'
export default {
  components: {
    CommonList
  },
  data () {
    return {
      current: {},
      colIndex: 0,
      mousedownState: false,
      loading: true,
      addEventModal: false,
      allColor: [
        {id:1,color:'bg-primary-600',value:'bg-primary-600'},
        {id:2,color:'bg-info-600',value:'bg-info-600'},
        {id:3,color:'bg-success-600',value:'bg-success-600'},
        {id:4,color:'bg-warning-600',value:'bg-warning-600'}
      ],
      times: ['24:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00',
      '09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00',
      '18:00','19:00','20:00','21:00','22:00','23:00'],
      allTask:{
        1:[],2:[],3:[],4:[],5:[],6:[],7:[]
      },
      allWeekday:[],
      addForm:{},
    }
  },
  filters: {
    titleFilter: (weekday) => {
      if (!weekday || weekday.length===0) return ''
      return `${dateFtt(weekday[0],'yyyy年MM月dd日')}-${dateFtt(weekday[6],'MM月dd日')}`
    },
    weekFilters: (data) => {
      var a = new Array("日", "一", "二", "三", "四", "五", "六");  
      var value = `星期${a[data.getDay()]}  ${dateFtt(data,'MM/dd')}`
      return value
    },
    timeFilters: (item) => {
      if (!item) return ''
      return `${dateFtt(item.dutyDateStart,'hh:mm')}-${dateFtt(item.dutyDateEnd,'hh:mm')}`
    },
    workersFilter: (workers) => {
      if (!workers) return ''
      return workers.map(x => x.userName).join('/')
    },
    sumFilters: (item) => {
      if (!item) return ''
      var times = item.dutyDateEnd.getTime() - item.dutyDateStart.getTime()
      var minutes = Math.round(times/ (1000 * 60 ))
      var hours = Math.floor(minutes/60)
      minutes = minutes%60 
      return `${hours}小时${minutes}分钟`
    }
  },
  methods: {
    handleAdd () {
      this.addForm.workers = this.addForm.workers || []
      this.addForm.workers.push({ userId: this.addForm.workers.length, 
        userCode:`员工${this.addForm.workers.length+1}`, userName:`员工${this.addForm.workers.length+1}` });
    },
    handleClose (event, name) {
      const index = this.addForm.workers.findIndex(x => x.id === name)
      this.addForm.workers.splice(index, 1);
    },
    // mousedown () {
    //   this.mousedownState = true;
    // },
    // mousemove (event) {
    //   if(this.mousedownState) {
    //     console.log(event)
    //   }
    // },
    // mouseup () {
    //   this.mousedownState = false;
    // },
    addEvent ($event, index, flag) {
      var colIndex = Math.ceil( $event.offsetX / ($event.target.offsetWidth / 7) )
      var dutyDateStart = this.getDateByPosition(colIndex, index, flag)
      var dutyDateEnd = this.getDateByPosition(colIndex, index, flag+1)
      var top = this.getPositionByDate(dutyDateStart,1)
      var bottom = this.getPositionByDate(dutyDateEnd,-1)
      this.current = {
        color: this.allColor[0].value, top, bottom, left: 0, right: 0, id: 0,
        dutyDateStart, dutyDateEnd, colIndex,workers: []
      }
      this.allTask[colIndex].push(this.current)
      this.addForm = this.current
      this.addEventModal = true;
    },
    modifyEvent (item) {
      this.current = Object.assign({}, item)
      this.addForm = this.current
      this.addEventModal = true;
    },
    submitAdd () {
      var top = this.getPositionByDate(this.addForm.dutyDateStart,1)
      var bottom = this.getPositionByDate(this.addForm.dutyDateEnd,-1)
      var colIndex = this.addForm.colIndex
      Object.assign(this.addForm,{top,bottom})
      //新增
      if(!this.addForm.id) {
      // saveDutyRoster(this.addForm).then( res => {
      //   console.log(res)
      // })
        this.addForm.id = this.allTask[colIndex].length
      //修改
      }else {
        var index = this.allTask[colIndex].findIndex(x => x.id === this.addForm.id)
        this.allTask[colIndex].splice(index, 1,this.addForm)
      }
      this.resizePosition(this.addForm.colIndex)
      this.addEventModal = false
      this.addForm = {}
    },
    cancel () {
      if(!this.addForm.id) {
        var index = this.allTask[this.addForm.colIndex].findIndex(x => x.id === this.addForm.id)
        this.allTask[this.addForm.colIndex].splice(index, 1)
      }
      this.resizePosition(this.addForm.colIndex)
      this.addForm = {}
    },
    resizePosition(colIndex) {
      var cols = this.allTask[colIndex]
      var tpmCols= [...cols]
      //开始时间升序
      tpmCols.sort((a,b) => {
        if(a.dutyDateStart < b.dutyDateStart) {
          return -1
        }else if(a.dutyDateStart <= b.dutyDateStart){
          return 0
        }else {
          return 1
        }
      })
      //初始化
      tpmCols= tpmCols.map( x=> {
        return {
          ...x,type: {
            in: 0,out:0,top:0,bottom:0
          }
        }
      })
      //算法
      for (let i = 0; i < tpmCols.length; i++) {
        const item = tpmCols[i];
        for (let j = i+1; j < tpmCols.length; j++) {
          const col = tpmCols[j];
          //上下边距都在col中
          if(col.dutyDateStart < item.dutyDateStart && col.dutyDateEnd > item.dutyDateEnd) {
            item.type.in++
            col.type.out++
          //上边距在col中
          }else if(item.dutyDateStart > col.dutyDateStart && item.dutyDateStart < col.dutyDateEnd){
            item.type.top++
            col.type.bottom++
          //下边距在rest中
          }else if(item.dutyDateEnd > col.dutyDateStart && item.dutyDateEnd < col.dutyDateEnd){
            item.type.bottom++
            col.type.top++
          //相等或者包括col
          }else if(item.dutyDateStart <= col.dutyDateStart && item.dutyDateEnd >= col.dutyDateEnd){
            item.type.out++
            col.type.in++
          }
        }
      }
      // debugger
      for(let item of tpmCols.values()) {
        var type = item.type
        //在中间的task
        if(type.out + type.bottom >0 && type.in + type.top >0) {
          var rn = type.out + type.bottom
          var ln = type.in + type.top
          item.left = (100* ln/(rn + ln +1) ).toFixed(2) + '%'
          item.right = ( 100* (rn-1)/(rn + ln +1) ).toFixed(2) + '%'
          item.type = 1
        //父task
        }else if(type.out || type.bottom){
          var n = type.out + type.bottom
          item.left = 0
          item.right = ( 100* (n-1)/(n+1) ).toFixed(2) + '%'
          item.type = 1
        //子task
        }else if(type.in || type.top) {
          var n = type.in + type.top
          item.left = (100* n/(n+1) ).toFixed(2) + '%'
          item.right = 0
          item.type = 0
        }else {
          item.left = 0
          item.right = 0
          item.type = 0
        }
      }
      this.allTask[colIndex] = tpmCols
    },
    getDateByPosition (x, y, flag) {
      var cDay = this.allWeekday[x-1]
      var timeStamps = cDay.getTime()+ 1000 * 1800 * (y * 2 + flag)
      if(y===23 && flag===2) {
        timeStamps -= flag
      }
      return new Date(timeStamps); 
    },
    getPositionByDate (date, flag=1) {
      var space = 22 * (2 * date.getHours() + date.getMinutes()/30)
      return flag * space.toFixed(2) +'px'
    }
  },
  mounted () {
    var allWeekday = []
    var week = new Date().getDay();  
    for (let i = 0; i < 7; i++) {
      var now = new Date(dateFtt(new Date(),'yyyy-MM-dd'));
      now.setHours(0)
      now.setDate( now.getDate() - week + i)
      allWeekday.push(now)
    }
    this.allWeekday = allWeekday
    this.eventHub.$on('week', data =>{
    })
  },
  destroyed () {
    this.eventHub.$off('week')
  },
}
</script>
<style lang="less" src="./agendaWeek.less">
</style>