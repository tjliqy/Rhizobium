<template>
  <div id="container">
    <div id="title-bar">
      <div id="title">{{title}}</div>
    </div>
    <div id="container-body">
      <slot>这里是slot内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: ['title'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{
  width:100%;
  box-shadow: 0 0 2px #000;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}
#title-bar{
  height:32px;
  background: #00ADB5;
  color: #fff;
  font-size:16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  -webkit-border-top-left-radius: 8px;
  -webkit-border-top-right-radius: 8px;
  -moz-border-radius-topleft: 8px;
  -moz-border-radius-topright: 8px;
  padding-left:16px;
  line-height: 32px;
}
#container-body{
  padding:16px;
}
</style>
