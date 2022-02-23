<template>
  <div class="loading-section">
    <div class="loading-header" />
    <div class="loading-body">
      <div class="loading-img">
        <img :src="require('@/assets/imgs/loading.gif')" alt="">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name : 'Loading',
  mounted() {
  },
  methods : {
    hideLoading() {

    }
  }
}
</script>

<style scoped lang="scss">
  .loading-section{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 1.5rem;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
    .loading-img{
      position: absolute;
      transform: translate(-50%,-50%);
      left: 50%;
      width: 45%;
      height: auto;
      top: 46%;
      img{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
