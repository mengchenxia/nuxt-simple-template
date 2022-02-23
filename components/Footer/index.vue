
<template>
  <div class="foot-section syRegular">
    <div class="foot-wrap w1200">
      <el-row class="foot-row">

        <el-col :span="4">
          <div class="foot-item">
            <h4>影创产品</h4>
            <div class="foot-item-link">
              <nuxt-link to="/HongHu" class="txt-link">HONG HU</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/JIMO" class="txt-link">JIMO</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">ACTION ONE</nuxt-link>
            </div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="foot-item">
            <h4>软件服务</h4>
            <div class="foot-item-link">
              <nuxt-link to="/HongHu" class="txt-link">Tesseract OS</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/JIMO" class="txt-link">点云平台</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">全息会议</nuxt-link>
            </div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="foot-item">
            <h4>解决方案</h4>
            <div class="foot-item-link">
              <nuxt-link to="/HongHu" class="txt-link">教育</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/JIMO" class="txt-link">工业</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">医疗</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">文旅</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">娱乐</nuxt-link>
            </div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="foot-item">
            <h4>开放平台</h4>
            <div class="foot-item-link">
              <nuxt-link to="/HongHu" class="txt-link">SDK</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/JIMO" class="txt-link">系统</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">文档</nuxt-link>
            </div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="foot-item">
            <h4>关于影创</h4>
            <div class="foot-item-link">
              <nuxt-link to="/HongHu" class="txt-link">了解影创</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/JIMO" class="txt-link">加入我们</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">新闻中心</nuxt-link>
            </div>
            <div class="foot-item-link">
              <nuxt-link to="/ActionOne" class="txt-link">联系我们</nuxt-link>
            </div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="foot-item contact-item">
            <h4 />
            <div class="foot-item-link">
              <div class="txt-link">
                <span class="tt"> 商务电话： </span>
                <span class="txt"> 400-900-2287 </span>
              </div>
            </div>
            <div class="foot-item-link">
              <div class="txt-link">
                <span class="tt"> 商务邮箱： </span>
                <span class="txt"> bd@ivglass.com </span>
              </div>
            </div>

            <div class="foot-item-link">
              <div class="icon-item">
                <svg-icon icon-class="qq" class-name="icons" />
                <img :src="require('@/assets/imgs/erweima.jpg')" alt="">
              </div>
              <div class="icon-item">
                <svg-icon icon-class="wechat" class-name="icons" />
                <img :src="require('@/assets/imgs/erweima.jpg')" alt="">
              </div>
              <div class="icon-item">
                <svg-icon icon-class="weibo" class-name="icons" />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-divider />

      <div class="copyright">
        <div class="copyright-item">
          ©2021 Shadow Creator. All Rights Reserved.
          沪ICP备16035548号-1
          沪公网备31011502004213号
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name : 'Header',
  data() {
    return {
      activeIndex : 2
    }
  },
  mounted() {

  },
  methods : {
    link1() {
      // window.open( 'https://twitter.com/ShadowCreator_' )
    },
    link2() {
      // window.open( 'https://www.facebook.com/shshadowcreator' )
    },
    link3() {
      // window.open( 'https://www.instagram.com/shadow_creator_sh/' )
    },
    link4() {
      // window.open( 'https://www.linkedin.com/company/shadowcreator/' )
    }
  }
}
</script>

<style lang="scss" scoped>
  .foot-section {
    padding-top: 30px;
    padding-bottom: 30px;
    background: #000;
    .foot-wrap {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
  .foot-row {

  }
  .foot-item {
    text-align: left;
    color: #fff;
    h4 {
      font-size: 16px;
      line-height: 24px;
      height: 24px;
      margin-bottom: 20px;
    }
    .foot-item-link {
      color: #aaa;
      margin-bottom: 10px;
      .txt-link {
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        .tt {

        }
        .txt {
          color: #fff;
        }
      }

      .icon-item {
        display: inline-block;
        width: 30%;
        text-align: left;
        position: relative;
        cursor: pointer;
        &:hover {
          img {
            display: inline-block;
          }
        }
        .icons {
          width: 24px;
          height: 24px;
          color: #aaa;
        }
        img {
          position: absolute;
          top: 24px;
          left: 24px;
          width: 100px;
          height: 100px;
          display: none;
        }
      }
    }
  }

  .el-divider {
    background-color: #8A8A8A;
  }

  .copyright {
    color: #8A8A8A;
    text-align: center;
    font-size: 12px;
    line-height: 17px;
    height: 17px;
  }
</style>

