![TNT.js](https://img1.imgtp.com/2022/06/13/lPea2J3u.png)

![License](https://img.shields.io/github/license/Bug-Duck/tntjs?style=flat-square)
![version](https://img.shields.io/npm/v/tntjs?style=flat-square)
![Star](https://img.shields.io/github/stars/Bug-Duck/tntjs?color=yellow&logo=github&style=flat-square)
![Fork](https://img.shields.io/github/forks/Bug-Duck/tntjs?color=green&logo=github&style=flat-square)
![watch](https://img.shields.io/github/watchers/Bug-Duck/tntjs?color=blue&logo=github&style=flat-square)
[![OSCS Status](https://www.oscs1024.com/platform/badge/Bug-Duck/tntjs.svg?size=small)](https://www.oscs1024.com/project/Bug-Duck/tntjs?ref=badge_small)

[![website](https://img.shields.io/badge/website-bugduck.cn-yellowgreen?style=flat-square)](https://bugduck.cn)
[![ProjectWebsite](https://img.shields.io/badge/ProjectWebsite-tntjs.bugduck.cn-red?style=flat-square)](https://tntjs.bugduck.cn)
[![BiliBili](https://img.shields.io/static/v1?label=bilibili&message=BugDuck开源团队&color=ff69b4&logo=bilibili&style=flat-square)](https://space.bilibili.com/1959824394?spm_id_from=333.337.0.0)

# TNT.js

The JavaScript framework for modern web.

## Roadmap

Please refer to [TNT.js Roadmap](https://github.com/Bug-Duck/tntjs/blob/master/roadmap.md).

## Demo

### Installation

Simply use package managers to install TNT.js:

```bash
$ npm i tntjs
$ # or
$ yarn add tntjs
```

Then add two files `App.js` and `index.html`:

```js
import TNTApp from "tnt.min.js";

const app = new TNTApp()
  .useData({
    x: 233333,
    list: [
      "Alice",
      "Bob",
      "Candy"
    ]
  })
  .mount(document.getElementById("root"))

```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tntjs demo</title>
  </head>
  <body>
    <div id="root">
      <v data="x"></v>
      <t-for data="i in list">
        <v data="i"></v>
      </t-for>
    </div>
    <script type="module" src="./App.js"></script>  <!-- ES Modules! -->
  </body>
</html>
```

This is a kitchen-sink example of the current version of TNTjs. Might not be up-to-date though.

use `<v data="variableName"/>` to set variable and the bound variables are all reactive variables. They change the page as the value changes, and support expressions.

## Documentation

Please refer to <https://tntjs.bugduck.cn/doc.html> for more information.

## Sponsoring

We're all middle school students and we don't have that much money. So sponsoring TNTjs will give us an extra reward to let us keep updating!😉

![Sponsor us on ZhiFuBao](https://img1.imgtp.com/2022/06/13/19puVIav.jpg)
![Sponsor us on WeChat](https://image.bugduck.cn/other/skm-weixin.png)

## Contributors

- Emoji guidelines:
  - :star: : Community administrator
  - :pen: : Major contributor
  - :student: : Student

|![Acbox](https://github.com/sheepbox8646.png)|![samzhangjy](https://github.com/samzhangjy.png)|![mono](http://q1.qlogo.cn/g?b=qq&nk=3151435932&s=640)|![27Onion](https://github.com/onion108.png)|![鸭](http://q1.qlogo.cn/g?b=qq&nk=3593809064&s=640)|![Rotten-LKZ](https://github.com/Rotten-LKZ.png)|
|:-:|:-:|:-:|:-:|:-:|:-:|
|箱子Acbox<br /> :star: :pen: :student:|samzhangjy<br /> :star: :pen: :student:|mono <br /> :star: :pen:|27Onion<br /> :pen: :student:|leonfyr <br /> :pen: :student:|Rotten-LKZ <br /> :student:|

## Changelog

### Development Stage

- 2022.4.1 开始在学校构思
- 2022.4.5 项目启动
- 2022.4.9 `<v></v>`标签功能实现
- 2022.4.10 变量赋值功能实现(TNTScript已废弃)
- 2022.4.17 函数调用功能实现
- 2022.4.24 TypeScript 重构项目
- 2022.5.22 项目重构完成
- 2022.5.29 发布 0.1.0 版本
- 2022.5.29 取消发布 0.1.0 版本
- 2022.6.9 ES6重构完成
- 2022.7.1 开发者们都放暑假啦!恢复开发
- 2022.7.20 vdom(虚拟dom)实现
- 2022.8.3 重写完成

Enjoy!
