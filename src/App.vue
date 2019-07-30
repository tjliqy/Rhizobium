<template>
  <div id="app">
    <div id="nav-bar">
      <div id="nav-bar-container">
        <img src="./assets/logo.png">
        <div>Rhizobium</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav-bar{
  position: fixed;
  top:0;
  height:64px;
  width:100%;
  background: white;
  box-shadow: 0 0 2px #000;
  line-height: 64px;
  z-index: 999;
}
#nav-bar-container{
  margin:0 auto;
  width:100%;
  height:64px;
  max-width:1200px;
}
#nav-bar-container img{
  float: left;
}
#nav-bar-container div{
  float: left;
  height:64px;
  line-height:64px;
  margin-left:8px;
  font-size:32px;
  font-weight:bold;
}
</style>
