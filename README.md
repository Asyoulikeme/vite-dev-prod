# vite 开发与生产 bundle 实践

目标是寻找方法额外生成一份bundle作为 legacy mode 的方式引入script。用于支持 IE 11。
注意，这只是一个学习项目，并不能用于生产环境。
本项目未来解决的问题是，使用vue3 + vite 开发需要兼容ie11 的场景，如果要配合 UI框架一起使用，那还得看看基于Vue3的UI框架是否支持 Vue3 的ie11 的解决方案。。。。。

## 起因

用browserslist 查表出来的IE肯定还有11的版本，11- 版本已经死了，是由于微软不支持

```bash
npx browserslist --mobile-to-desktop "> 1%,last 2 versions,not dead"
```

总而言之就是因为 ie11 not dead，并且还具有一定的市场，关于IE11兼容性参考资料如下：

- https://www.caniuse.com/?search=ECMAScript%202015  IE11仅支持部分 ES6

- https://www.caniuse.com/usage-table 查看IE11 市场份额
- https://www.techrepublic.com/article/microsoft-this-is-when-ie11-and-legacy-edge-support-ends/ IE11 仍还有很多的份额，导致微软have to 对IE11进行支持



## 等待结果

- https://v3.cn.vuejs.org/guide/reactivity.html Vue3 官网说的IE兼容

- https://github.com/vuejs/vue-next/issues/1925 尤雨溪：关于Vue3 支持 IE11的想法
- https://github.com/vuejs/rfcs/issues/183 尤雨溪：关于使用Vue3时你需要先了解这些



## 总结

现在在vue3中已经出现了说要兼容IE11的苗头（will supported，but not now），至于最后到底是不是在vue3的版本中捆绑IE回退策略，或者是将 vue3 的 composition-api 向后移植到 vue2 版本中（vue2是支持IE11的），现在还不知道。尤雨溪说现在的 vue2最新版本已经是可以使用composition api 的了。。。但是我还没试过

如果以后 await 到了 IE11CompatBuild ，鉴于ie11 不支持 module 标签，所以本项目借助了@vitejs/plugin-legacy 插件，用 nomodule tag 来支持IE11，
现阶段使用本项目构建出的ESModule bundle 可以跑在支持 script module的新浏览器上，但是运行于IE11的时候会报很多错误（const、proxy 未经过babel构建的代码问题），



