import vue from '@vitejs/plugin-vue';
import { babel } from '@rollup/plugin-babel';
import legacy from '@vitejs/plugin-legacy'
import rollupBuildState from "./rollup-plugin-build-state";
const writeBuildInfo  =  require("./rollup-plugin-write");

const isProd = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)
const basePlugins = []
const devPlugins = []
/* 仅对构建阶段有意义的插件，置于 rollupOptions.plugins 中 */
const buildPhasePlugins = [
  rollupBuildState(),
  babel({ 
    babelHelpers: 'bundled',
    exclude:"node_module/**"
  }),
  writeBuildInfo()
]
const prodPlugins = [...buildPhasePlugins]
const plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins)
/**
 * @type {import('vite').UserConfig}
 */
export default ({ command, mode }) => {
  if (command === 'serve') {
    return {
      // serve specific config
      plugins: [
        vue(),
      ],
      server:{
        host:"127.0.0.1",
        port:"8888",
        open:true,
        proxy:{
          '/api': {
            target: 'http://jsonplaceholder.typicode.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      },
    }
  } else {
    return {
      plugins: [
        legacy(),
        vue(),
      ],
      build:{
        rollupOptions:{
          output:
          {
            //dir:"./dist",
            // assetFileNames:"" // js 文件不包含在此输出，只有 字体、图片、css 等文件才能在此输出
            // banner:"/* 在vite中行不通，所以我自定义了插件来解决这个问题。 */",
            // manualChunks(id) {
            //   /* rename chunks */
            //   if(id.includes('node_modules')) {
            //     return "vendor";
            //   }
            // }
          },
          plugins:plugins
        }
      }
    }
  }
}

/**
 * https://github.com/rollup/plugins/tree/master/packages/babel#readme rollup > plugins > babel 用法
 * https://gitmemory.com/issue/rollup/rollup/2688/477362145   行不通的分 split chunk 提议
 * https://blog.liuyunzhuge.com/2019/08/31/babel%E8%AF%A6%E8%A7%A3%EF%BC%88%E4%B8%89%EF%BC%89-presets/  babel 配置
 */