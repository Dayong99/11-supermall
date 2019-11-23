<template>
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;/*弹性布局*/
    line-height: 44px;/*导航栏高度*/
    /*height: 44px;*/
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left,.right {
    width: 60px;/*左右插槽宽度*/
  }

  .center {
    flex: 1;/*占据剩余部分*/
  }
</style>
