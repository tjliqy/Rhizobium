<template>
<div id='body-container'>
<container  title='实时线程调度'>
  <node-chart v-bind:nodes="nodes" v-bind:time="time" v-bind:link="link" v-on:choose="choose" ></node-chart>
</container>
</div>
</template>

<script>
import Container from './Container.vue'
import NodeChart from './NodeChart.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      websocket: null,
      nodes: {
        name: '线程1',
        info: '测试'
      },
      time: 0,
      responseCode: 1,
      link: false,
    }
  },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.websocketclose()
  },
  methods: {
    websocketonopen () {
      console.log('WebSocket连接成功')
      this.link = true
    },
    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage (e) {
      console.log(e)
      if (e.data.substring(0, 1) !== '{') { return }
      const redata = JSON.parse(e.data)
      console.log(redata)
      this.responseCode = redata.response_code
      this.nodes = redata.data
      console.log(e.timeStamp)
      this.time = parseInt(e.timeStamp) / 1000
    },

    choose (id) {
      let req = {
        response_code: this.responseCode,
        router: '/choose',
        data: {
          index: id // -1 是随机选择 0,1,2是常规选择那种。
        }
      }
      console.log(id)
      this.websocket.send(JSON.stringify(req))
    },
    initWebSocket () {
      const wsuri = 'ws://localhost:4444'
      this.websocket = new WebSocket(wsuri)
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.websocketonmessage
      this.websocket.onclose = this.websocketclose
    },

    websocketclose (e) {
      console.log('connection closed (' + e.code + ')')
      this.link = false
    }
  },
  components: {
    Container,
    NodeChart
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#body-container{
  max-width: 1200px;
  margin: 80px auto 0 auto;
}
</style>
