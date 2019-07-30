<template>
<div>
  <div class="table-container">
    <div class="scroll-container" ref="scrollTable1">
      <table class="table" v-bind:style="{'min-width': scrollTableWidth}">
        <col :width="idColWidthNum + 'px'">
        <col :width="nameColWidthNum + 'px'">
        <colgroup :span="statusNum + 1" width="128px"></colgroup>
        <thead>
        <tr>
          <th class="right-solid">ID</th>
          <th class="right-solid">线程</th>
          <th :colspan="statusNum+1">线程调度流</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="info in threadInfos" :key="info.id">
          <td class="right-solid">{{ info.id }}</td>
          <td class="right-solid">{{ info.name }}</td>
          <td class="status-cell" v-for="(s,index) in status(info.id)" :key="index" v-bind:style="{statusCellWidthNum} + 'px'">
            <div v-if="s == 1" class="write-node active">
              <div class="line"></div><div class="dot" :ref="'dot'+info.id+'x'+index" @mouseover="showDialog(info.id,index)" @mouseout="hideDialog()"></div>
            </div>
            <div v-else-if="s == -1" class="chose">
              <div class="line"></div>
              <div class="dot" v-on:click="choose(info.id)" :ref="'dot'+info.id" @mouseover="showDialog(info.id,-1)" @mouseout="hideDialog()"></div>
            </div>
          </td>
          <td class="status-cell"></td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td class="time-cell" v-for="s in scheduleQueue" :key="s.id">{{ s.id }}) {{ s.sec }}s</td>
          <td></td>
        </tr>
        </tfoot>
      </table>
    </div>
    <div class="left lock-container" :style="{width : idColWidthNum+nameColWidthNum+'px'}">
      <table class="table">
        <col :width="idColWidthNum + 'px'">
        <col :width="nameColWidthNum + 'px'">
        <thead>
        <tr>
          <th class="right-solid" v-bind:style="{'min-width': idColWidthNum + 'px'}">ID</th>
          <th class="right-solid" v-bind:style="{'min-width': nameColWidthNum + 'px'}">线程</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="info in threadInfos" :key="info.id">
          <td class="right-solid">{{ info.id }}</td>
          <td class="right-solid">{{ info.name }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td class="right-solid">&nbsp;</td>
          <td class="right-solid">&nbsp;</td>
        </tr>
        </tfoot>
      </table>
    </div>
    <div class="top lock-container">
      <table class="table">
        <col :width="idColWidthNum + 'px'">
        <col :width="nameColWidthNum + 'px'">
        <thead>
        <tr>
          <th class="right-solid" v-bind:style="{'min-width': idColWidthNum + 'px'}">ID</th>
          <th class="right-solid" v-bind:style="{'min-width': nameColWidthNum + 'px'}">线程</th>
          <th>线程调度流</th>
        </tr>
        </thead>
      </table>
    </div>
  </div>
  <div class="table-container">
    <div class="scroll-container" v-on:scroll="handleBodyScrollTop">
      <table class="table">
        <col :width="idColWidthNum + 'px'">
        <col :width="nameColWidthNum + 'px'">
        <col width="100%">
        <thead>
        <tr>
          <th class="right-solid">ID</th>
          <th class="right-solid">时间节点</th>
          <th>节点详细信息</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="s in scheduleQueue" :key="s.id" v-on:click="scrollSchedule(s.id)">
          <td class="right-solid">{{ s.id }}</td>
          <td class="right-solid">{{ s.sec }}</td>
          <td>{{ s.info }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="left lock-container" ref="leftLock" :style="{width : idColWidthNum+nameColWidthNum+'px'}">
      <table class="table">
        <col :width="idColWidthNum + 'px'">
        <col :width="nameColWidthNum + 'px'">
        <thead>
        <tr>
          <th class="right-solid" v-bind:style="{'min-width': idColWidthNum + 'px'}">ID</th>
          <th class="right-solid" v-bind:style="{'min-width': nameColWidthNum + 'px'}">线程</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="s in scheduleQueue" :key="s.id">
          <td class="right-solid">{{ s.id }}</td>
          <td class="right-solid">{{ s.sec }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="top lock-container">
      <table class="table">
        <col :width="idColWidthNum + 'px'">
        <col :width="nameColWidthNum + 'px'">
        <thead>
        <tr>
          <th class="right-solid" v-bind:style="{'min-width': idColWidthNum + 'px'}">ID</th>
          <th class="right-solid" v-bind:style="{'min-width': nameColWidthNum + 'px'}">时间节点</th>
          <th>线程详细信息</th>
        </tr>
        </thead>
      </table>
    </div>
  </div>

  <div class="dialog" ref="dialog">测试内容</div>

  <button id="stop-button" v-on:click="choose(-1)">结束调试</button>
</div>
</template>

<script>
export default {
  name: 'NodeChart',
//  data () {
//    return {
//      statusNum: 9,
//      idColWidthNum: 64,
//      nameColWidthNum: 128,
//      statusCellWidthNum: 128,
//      canBeChosenThread: [],
//      threadInfos: [
//        {
//          id: 0,
//          name: 'main',
//          curInfo: '超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级长'
//        },
//        {
//          id: 1,
//          name: 'thread$1'
//        },
//        {
//          id: 2,
//          name: 'thread$2'
//        }
//      ],
//      scheduleQueue: [
//        {
//          id: 0,
//          threadId: 0,
//          sec: 0.12,
//          info: '这是一次线程调度信息哦0'
//        },
//        {
//          id: 1,
//          threadId: 1,
//          sec: 0.22,
//          info: '超级超级超级超级超级超级超级超级超级超级超级级超级超级超级超级超级超级超级超级超级超级超级超超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级长'
//        },
//        {
//          id: 2,
//          threadId: 2,
//          sec: 0.32,
//          info: '这是一次线程调度信息哦'
//        },
//        {
//          id: 3,
//          threadId: 0,
//          sec: 0.42,
//          info: '这是一次线程调度信息哦'
//        },
//        {
//          id: 4,
//          threadId: 1,
//          sec: 0.52,
//          info: '这是一次线程调度信息哦'
//        },
//        {
//          id: 5,
//          threadId: 2,
//          sec: 0.62,
//          info: '这是一次线程调度信息哦'
//        },
//        {
//          id: 6,
//          threadId: 2,
//          sec: 0.72,
//          info: '这是一次线程调度信息哦'
//        },
//        {
//          id: 7,
//          threadId: 2,
//          sec: 0.82,
//          info: '这是一次线程调度信息哦'
//        },
//        {
//          id: 8,
//          threadId: 2,
//          sec: 0.92,
//          info: '这是一次线程调度信息哦'
//        }
//      ]
//    }
//  },
  data () {
    return {
      statusNum: 0,
      idColWidthNum: 64,
      nameColWidthNum: 128,
      statusCellWidthNum: 128,
      canBeChosenThread: [],
      threadInfos: [],
      scheduleQueue: [],
    }
  },
  props: {
    nodes: null,
    time: 0,
    link: false
  },
  computed: {
    scrollTableWidth: function () {
      return this.statusNum * 128 + this.idColWidthNum + this.nameColWidthNum + 'px'
    }
  },
  methods: {
    handleBodyScrollTop (event) {
      this.$refs.leftLock.scrollTop = event.target.scrollTop
    },
    scrollSchedule (id) {
      this.$refs.scrollTable1.scrollLeft = id * this.statusCellWidthNum
    },
    choose (id) {
      console.log(id)
      if (id !== -1) {
        for (let i = 0, len = this.threadInfos.length; i < len; i++) {
          if (id === this.threadInfos[i].id) {
            console.log(this.threadInfos[i])
            let schedule = {
              id: this.scheduleQueue.length,
              threadId: id,
              sec: this.time,
              info: this.threadInfos[i].curInfo
            }
            this.scheduleQueue.push(schedule)
            this.statusNum += 1
            break
          }
        }
      }
      this.$emit('choose', id)
    },
    status: function (threadId) {
      let ret = new Array(this.scheduleQueue.length).fill(0)
      for (let i = 0, len = this.scheduleQueue.length; i < len; i++) {
        if (threadId === this.scheduleQueue[i].threadId) {
          ret[i] = 1
        }
      }
      if (this.link){
        for (let i = 0, len = this.canBeChosenThread.length; i < len; i++) {
          if (threadId === this.canBeChosenThread[i]) {
            ret.push(-1)
          }
        }
      }
      return ret
    },
    showDialog (infoId, statusIndex) {
      let dot = this.$refs['dot' + infoId + (statusIndex !== -1 ? 'x' + statusIndex : '')][0]
      let dialog = this.$refs.dialog

      dialog.style.top = (dot.getBoundingClientRect().top + 16) + 'px'
      dialog.style.left = (dot.getBoundingClientRect().left - 64) + 'px'
      dialog.style.display = 'block'

      console.log(statusIndex)
      if (statusIndex === -1) {
        console.log(this.threadInfos[infoId])
        console.log(this.threadInfos[infoId].curInfo)
        dialog.innerText = this.threadInfos[infoId].curInfo
      } else {
        dialog.innerText = this.scheduleQueue[statusIndex].info
      }
      return true
    },
    hideDialog () {
      this.$refs.dialog.style.display = 'none'
      return true
    }
  },
  watch: {
    nodes: function (val, oldVal) {
      if (val instanceof Array) {
        this.canBeChosenThread = []
        for (let i = 0, len1 = val.length; i < len1; i++) {
          let threadInfo = null
          let threadNode = val[i]
          for (let j = 0, len2 = this.threadInfos.length; j < len2; j++) {
            if (threadNode.thread === this.threadInfos[j].name) {
              this.threadInfos[j].curInfo = threadNode.event
              threadInfo = this.threadInfos[j]
              break
            }
          }
          // 创建新的threadInfo对象
          if (threadInfo === null) {
            threadInfo = {
              id: this.threadInfos.length,
              name: threadNode.thread,
              curInfo: threadNode.event
            }
            this.threadInfos.push(threadInfo)
          }
          // 改变状态值
          this.canBeChosenThread.push(threadInfo.id)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-container{
  width:100%;
  height:300px;
  position: relative;
}
.scroll-container{
  overflow-x: auto;
  overflow-y: auto;
  height: 100%;
  position: relative;
}
.left{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  top:0;
  left:0;
}
.top{
  position: absolute;
  width: 100%;
  top:0;
  left:0;
}
.table{
  border: 1px solid;
  border-collapse:collapse;
  table-layout: fixed;
  line-height: 30px;
  width: 100%;
  top: 0;
  left: 0;
}
.table tr{
  height:33px;
}


thead{
  background: #a4d4d9;
  border-bottom: 1px solid;
}
td,th{
  /*white-space: nowrap;*/
  text-align: center;
  border-width: 1px;
  border-style: none dashed;
}
tr:nth-child(odd){
  background: #fff;
}
tr:nth-child(even){
  background: #edf6f7;
}
tbody > tr:last-child{
  border-bottom: 1px solid;
}
.right-solid{
  border-right: 1px solid;
}
.status-cell{
  width: 128px;
  position: relative;
}
.line{
  width: 100%;
  height: 4px;
  margin: auto 0;
  background: #67D5B5;
  z-index: -1;
}
.dot {
  width: 16px;
  height: 16px;
  position: absolute;
  right: -8px;
  top:8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  background: #84B1ED;
}
.dialog {
  position: fixed;
  display: none;
  /*top: 170px;*/
  /*left: 448px;*/
  font-size:10px;
  width: 128px;
  background: #FFF;
  border-radius: 8px;
}
.write-node > .dot{
  background: #84B1ED;
}
.chose > .line{
  background: #D8D8D8;
}
.time-cell{

}
#stop-button{
  border: 1px solid;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  text-align: center;
  margin: 0 auto;
}
</style>
