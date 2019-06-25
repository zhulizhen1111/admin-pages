# sagacloud-page-admin

> 管理系统模板,包含登录与权限功能

## Build Setup

```bash
# install dependencies
npm install
npm install vuex axios element-ui echarts font-awesome
npm install less less-loader node-sass sass-loader --save-dev

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#### 目录结构

```
│  .editorconfig                        # 格式化配置,修改缩进为4
│  index.html                           # 修改页面title
│  package.json                         # 包
│  README.md                            # 说明文档
│
├─build                                 # 不变
│
├─config
│      dev.env.js                       # 开发环境变量
│      index.js                         # 设置代理
│      prod.env.js                      # 生产环境变量
│
├─src
│  ├─api                                # 业务逻辑api, http的请求都放在这里
│  │  |─system                          # 权限管理相关功能,不要修改
│  │  |─httputils.js                    # http 工具类
│  │  └─menus.js                        # 菜单数据
│  ├─assets                             # 静态资源, 替换logo图片
│  ├─components                         # 业务相关组件
│  ├─framework                          # 样式与工具库,继承自sagacloud-page-admin,不要修改
│  │─layout                             # 页面布局,继承自sagacloud-page-admin,不要修改
│  │─system                             # 登录,权限, 不要修改
│  ├─router                             # 主路由
│  │  |─index.js
│  │  └─routes.js                       # 业务路由
│  │
│  ├─store                              # vuex
│  │      index.js
│  │
│  └─views                              # 业务页面根路径
|
└─static
        .gitkeep
```

#### 工具类说明

/src/frameworkd/utils/basicutils.js

```
    formatDateByPattern(date, pattern) // 日期格式化
    indexInArray(arr, key, val)        // 找出数组arr中第一个属性key的值等于val的元素的下标
    itemInArray(arr, key, val)         // 找出数组arr中第一个属性key的值等于val的元素
    deleteInArray(arr, key, val)       // 从数组中将属性key的值等于val的所有元素删除
```

/src/api/httputils.js // 一般在服务端接口 API 中使用,不建议在别的地方使用,有授权标记

```
    getCookie(name)                    // 获取cookie值
    getJson(url, params)               // 发送GET请求
    postJson(url, data)                // 发送POST请求
```

/src/framework/utils/storage.js

```
    set(key, value, fn)                // 在浏览器缓存中设置数据, 如果value是对象会转化成json
    get(key, fn)                       // 在浏览器缓存中取出数据, 取出数据后会尝试js对象返回
    remove(key)                        // 在浏览器缓存中删除数据
```

#### 设置面包屑方法

方法 1

```
在路由router中配置meta.breadcrumbs,在进入路由页面时会自动解析为面包屑
```

方法 2

```
    this.$store.dispatch('setBreadcrumb', [{ label: 'Demo' }, { label: 'Form' }])
```
