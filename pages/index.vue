<template>
  <div class="section main-section">
    <div class="main-body">

      <!--cute -slider-->
      <MagicSliderCute />

      <!--masters -slider-->
      <!--<MagicSliderMasters>
        <template v-slot:captions>
          <div class="ms-layer ms-caption master-slider-item&#45;&#45;caption">我是一个图层文字</div>
        </template>
      </MagicSliderMasters>-->

      <!--tween max -->
      <!--<div style="width: 60%;height: 50px;margin: 0 auto;  ">
        <el-slider v-model="currentSlider" @input="inputSlider" />
      </div>
      <el-button @click="play"> play </el-button>-->

      <!--测试鼠标跟随-->
      <div v-if="showBall" ref="ball" class="ball" />
      <div class="tween-max-section">
        <div ref="tween-max-item1" class="tween-max-item tween-max-item1" />
      </div>
    </div>
  </div>

</template>

<script>
import env from '@/utils/env'
import MagicSliderCute from '@/components/MagicSlider/cute'
// import * as Cookie from '@/utils/cookie'
// import LocalBridge from '@/utils/storages'
// const storages = new LocalBridge( { prefix : 'hh_' } )
// import http from '@/utils/request'

export default {
  name : 'Index',
  layout : 'base',
  components : { MagicSliderCute },
  // 异步数据用法
  async asyncData( context ) {},
  data() {
    return {
      isSpider : env.isSpider,
      loading : false,
      headTitle : '',
      headKeywords : '',
      headDesc : '',

      tween : null, // 实例
      currentSlider : 0,
      showBall : false
    }
  },
  async mounted() {
    if ( !this.headTitle ) {
      this.getInfo()
    }

    // GSAP 动画测试组件 TODO
    this.animate1()
    this.initBall()
  },
  methods : {
    async getInfo() {
      const params = {
        headTitle : '2_不是爬虫',
        headKeywords : '2_不是爬虫',
        headDesc : '2_不是爬虫'
      }
      const { headTitle, headKeywords, headDesc } = await this.$store.dispatch( 'test/getTestInfo', params )
      this.headTitle = headTitle
      this.headKeywords = headKeywords
      this.headDesc = headDesc
    },
    /** *******tween max animation**********/
    play() {
      this.tween.play()

      // setTimeout( () => {
      //   this.$gsap.killTweensOf( this.$refs['tween-max-item1'], 'opacity,y' )
      // }, 2000 )
    },
    inputSlider( val ) {
      // console.log( 'inputSlider', val )
      this.tween.pause()
      this.tween.progress( val * 0.01 )

      // // 干掉指定得动画,多个用都好分割
      // this.$gsap.killTweensOf( this.$refs['tween-max-item1'], 'opacity' )

      // // 暂停/完成/未开始 返回false
      // console.log( 'isTweening', this.$gsap.isTweening( this.$refs['tween-max-item1'] ) )

      // this.getTweensOf( this.$refs['tween-max-item1'] )
      // this.getProperty()
    },
    animate1() {
      const gsap = this.$gsap

      console.log( 'gsap', gsap )

      const el = this.$refs['tween-max-item1']
      if ( !gsap || !el ) return

      // 透明度动画

      // const tween = gsap.fromTo(
      //   el,
      //   {
      //     opacity : 1
      //   },
      //   {
      //     opacity : 0
      //     // duration : 1,
      //     // ease : 'elastic'
      //   }
      // )

      const tween = gsap.from( el, {
        id : 'toAnimate',
        opacity : 0,
        y : 400,
        duration : 6
      } )

      // const tween = gsap.set( el, { y : 400, opacity : 0 } )

      tween.pause()

      console.log( 'tween', tween )
      this.tween = tween
    },
    initBall() {
      this.showBall = true
      this.$nextTick( () => {
        const gsap = this.$gsap
        const el = this.$refs['ball']
        if ( !gsap || !el ) return
        gsap.set( el, { xPercent : -50, yPercent : -50 } )

        const pos = { x : window.innerWidth / 2, y : window.innerHeight / 2 }
        const mouse = { x : pos.x, y : pos.y }
        const speed = 0.35

        const xSet = gsap.quickSetter( el, 'x', 'px' )
        const ySet = gsap.quickSetter( el, 'y', 'px' )

        window.addEventListener( 'mousemove', e => {
          mouse.x = e.x
          mouse.y = e.y
        } )

        gsap.ticker.add( () => {
          // adjust speed for higher refresh monitors
          const dt = 1.0 - Math.pow( 1.0 - speed, gsap.ticker.deltaRatio() )
          pos.x += ( mouse.x - pos.x ) * dt
          pos.y += ( mouse.y - pos.y ) * dt
          xSet( pos.x )
          ySet( pos.y )
        } )
      } )
    },
    // 获取元素属性
    getProperty() {
      const gsap = this.$gsap
      const el = this.$refs['tween-max-item1']
      const res = gsap.getProperty( el, 'width', 'px' )
      console.log( 'getProperty res', res )
    },
    //
    getTweensOf( target ) {
      var res = this.$gsap.getTweensOf( target )
      console.log( 'getTweensOf', res )
    }
  },
  head() {
    return {
      title : this.headTitle,
      meta : [
        { hid : 'keywords', name : 'keywords', content : this.headKeywords },
        { hid : 'description', name : 'description', content : this.headDesc }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-body {
    /*min-height: 200px;*/
    /*background: #000;*/
  }
  .tween-max-section {
    position: relative;
  }
  .tween-max-item {
    display: block;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 10px;
    left: 10px;
    background: #1D3F49;
    /*opacity: 1;*/
  }
  .ball {
    width: 50px;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    border: 3px solid dodgerblue;
    border-radius: 50%;
  }
</style>
