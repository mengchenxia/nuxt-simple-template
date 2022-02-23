
import cheerio from 'cheerio'
import config from './config.js'
const path = require( 'path' )
import zhLocale from './plugins/lang/zh.js'
import enLocale from './plugins/lang/en.js'
import fs from 'fs'

function resolve( dir ) {
  return path.join( __dirname, dir )
}

const port = 9528 || 9527
const { DEV_API_URL, SSR_API_URL } = config
const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  ['component',
    {
      libraryName : 'element-ui',
      styleLibraryName : 'theme-chalk'
    }
  ]
  // ['@babel/plugin-proposal-private-methods', { loose: true }]
]
//  生产环境清除log
if ( isProduction ) {
  plugins.push( 'transform-remove-console' )
}

export default {
  alias : {
    '@img' : resolve( './assets/imgs' ),
    '@styles' : resolve( './assets/styles' ),
    '@icons' : resolve( './assets/icons' )
  },
  axios : {
    // proxyHeaders: false
    proxy : !isProduction
  },

  // publicRuntimeConfig : {
  //   axios : {
  //     baseURL : 'http://webapi-fat.shadowcreator.com/100061'
  //     // baseURL : 'https://api.nuxtjs.dev'
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build : {
    analyze : false,
    corejs : 'auto',
    // 生产环境抽离css
    extractCSS : isProduction,
    optimization : {
      splitChunks : {
        chunks : 'all',
        minSize : 100 * 100,
        maxSize : 10000 * 100,
        cacheGroups : {}
      }
    },
    transpile : [/^element-ui/],
    // element 按需加载
    // publicPath : 'https://cdn.nuxtjs.org', // 允许您将dist文件上传到 CDN 来获得最快渲染性能
    // svg处理
    extend( config, context ) {
      const { isClient, isDev } = context

      // Run ESLint on save
      if ( isDev && isClient ) {
        // config.devtool = 'eval-source-map'
        config.module.rules.push( {
          enforce : 'pre',
          test : /\.(js|vue)$/,
          loader : 'eslint-loader',
          exclude : /(node_modules)/
        } )
      }

      if ( isClient ) {
        // config.devtool = '#source-map'
      }

      // // 条件编译
      // config.module.rules.push( {
      //   enforce : 'pre',
      //   test : /\.(js|vue|css|scss)$/,
      //   loader : {
      //     loader : 'js-conditional-compile-loader',
      //     options : {
      //       isDebug : process.env.NODE_ENV === 'development',
      //       isPro : process.env.NODE_ENV === 'pro',
      //       default : process.env.default === 'default',
      //       others : process.env.default === 'others'
      //     }
      //   },
      //   exclude : /(node_modules)/
      // } )

      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find( rule => rule.test.test( '.svg' ) )
      svgRule.exclude = [resolve( 'assets/icons/svg' )]

      // 添加loader规则
      config.module.rules.push( {
        test : /\.svg$/,
        include : [resolve( 'assets/icons/svg' )], // 将存放svg的目录加入到loader处理目录
        use : [
          {
            loader : 'svg-sprite-loader',
            options : {
              symbolId : 'icon-[name]'
            }
          }
        ]
      } )
    },

    ssr : true

    // postcss : [
    //   require( 'postcss-px2rem' )( {
    //     remUnit : 100 //  代表 1rem = 14px
    //   } )
    // ]
  },

  cli : {
    badgeMessages : ['您使用的是小灰灰构建的nuxt-simple-template'],
    bannerColor : 'green'
  },

  // Global CSS
  css : [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/reset.scss',
    'video.js/dist/video-js.css'
  ],

  // 自动导入组件: https://go.nuxtjs.dev/config-components
  components : true,

  dev : process.env.NODE_ENV !== 'production',

  // 让你可以配置在客户端和服务端共享的环境变量。
  env : {
    domain : SSR_API_URL || DEV_API_URL,
    baseUrl : process.env.BASE_URL || '/',
    NODE_ENV : 'dev'
  },

  // 全局headers配置: https://go.nuxtjs.dev/config-head
  head : {
    title : 'nuxt simple template',
    htmlAttrs : {
      lang : 'zh'
    },
    meta : [
      { charset : 'utf-8' },
      { 'http-equiv' : 'expires', content : '0' },
      { 'http-equiv' : 'pragma', content : 'no-cache' },
      { 'http-equiv' : 'Cache-Control', content : 'no-cache, must-revalidate' },
      { 'http-equiv' : 'X-UA-Compatible', content : 'IE=edge,chrome=1' },
      { name : 'renderer', content : 'webkit|ie-comp|ie-stand' },
      { name : '360-site-verification', content : '39985e543e6120906b9a3a9f81d88444' },
      // { name : 'viewport', content : 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no' },
      { name : 'referrer', content : 'no-referrer' },
      { name : 'HandheldFriendly', content : 'true' },
      { hid : 'keywords', name : '影创, 影创Air, 影创Halo, 影创Nano, AR, 智能眼镜, shadowcreator, actionone,halomini, 影创科技,VR,shadow vr,影创VR,jimo,影创jimo', content : '' },
      { hid : 'description', name : '见，所未见，不同凡想，影创四大新品已经发布', content : '' }
    ],
    link : [
      { rel : 'icon', type : 'image/x-icon', href : '/favicon.ico' }
    ],
    noscript : [
      { innerHTML : 'This website requires JavaScript.' }
    ],
    script : [
      { src : '/js/jquery-1.8.2.js', type : 'text/javascript', charset : 'utf-8' },
      // { src : '/js/modernizr.js', type : 'text/javascript', charset : 'utf-8' },
      // { src : '/js/cute/cute.slider.js', type : 'text/javascript', charset : 'utf-8' },
      // { src : '/js/cute/cute.transitions.all.js', type : 'text/javascript', charset : 'utf-8' },
      // { src : '/js/respond.min.js', type : 'text/javascript', charset : 'utf-8' },

      // { src : '/script/skroller.min.js', type : 'text/javascript', charset : 'utf-8' },
      // { src : '/script/flexible.js', type : 'text/javascript', charset : 'utf-8' }
      { src : '/script/rem.js', type : 'text/javascript', charset : 'utf-8' }
    ]
  },
  // https://www.nuxtjs.cn/api/configuration-hooks
  hooks : {
    'render:route' : ( url, result ) => {
      // this.$ = cheerio.load( result.html, { decodeEntities : false } )
      // this.$( `meta` ).removeAttr( 'data-n-head' )
      // result.html = this.$.html()

      const $ = cheerio.load( result.html, { decodeEntities : false } )
      $( `meta` ).removeAttr( 'data-n-head' )
      result.html = $.html()
    }
  },

  // https://i18n.nuxtjs.org/options-reference
  i18n : {
    locales : ['zh', 'en'],
    defaultLocale : 'zh',
    vueI18n : {
      fallbackLocale : 'zh',
      messages : {
        en : {
          ...enLocale
        },
        zh : {
          ...zhLocale
        }
      }
    }
  },

  // generate : {
  //   cache : {
  //     ignore : [
  //       '.nuxt', // buildDir
  //       'static', // dir.static
  //       'dist', // generate.dir
  //       'node_modules',
  //       '.**/*',
  //       '.*',
  //       'README.md'
  //     ]
  //   },
  //   concurrency : 500,
  //   crawler : true,
  //   dir : 'dist', // 使用nuxt generate命令构建 Web 应用程序时创建的目录名称
  //   fallback : '404.html'
  // },

  general : {
    dir : 'dist',
    devtools : true,
    // 在将生成的站点部署到静态主机时，可以使用此文件。它将回退到模式：mode:'spa'。
    fallback : true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules : [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/proxy'
  ],

  // https://go.nuxtjs.dev/config-plugins
  plugins : [
    '@/plugins/axios',
    '@/plugins/element-ui',
    '@/plugins/svg-icon',
    '@/plugins/route',
    // 添加自动收录等埋点
    '@/plugins/included.js', // TODO
    { src : '@/plugins/gsap', ssr : false },
    { src : '@/plugins/video-player.js', ssr : false },
    { src : '@/plugins/move.js', ssr : false },
    { src : '@/plugins/swiper.js', ssr : false },
    { src : '@/plugins/aos.js', ssr : false },
    { src : '@/plugins/cropper', ssr : false } // false 只在客户端引入
  ],
  // 生产环境会一直运行
  proxy : isProduction ? {} : {
    '/v1' : {
      target : DEV_API_URL,
      changeOrigin : true,
      pathRewrite : {
        '^/v1' : ''
      }
    }
  },

  router : {
    // 在每页渲染前运行 middleware/header.js 中间件的逻辑
    middleware : 'header'
  },

  server : {
    port,
    https : {
      key : fs.readFileSync( resolve( 'cert.key' ) ),
      cert : fs.readFileSync( resolve( 'cert.crt' ) )
    }
  },

  target : 'server', // static 用于静态网站 npm run generate

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules : []

}
