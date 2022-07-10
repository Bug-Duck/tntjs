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

## Introduction

TNTjs was separated into two parts:

- TNT is a lightweight hot update language framework
- TNTScript is a script language based on JavaScript. Its main goal is to create a lightweight, easy-to-learn but still powerful language like Python. TNTScript solved the issue that TypeScript can't be ran directly in the browsers. The topmost feature of TNTScript is dynamic, meaning that the values on the webpage will change regarding to the actual values stored inside TNT!

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
import TNTApp from "tntjs/src/index.js";
import DebugPlugin from "tntjs/src/plugins/debug/index.js";

window.onload = () => {
  const app = new TNTApp(
    document.getElementById("root"),  // TNTjs root element
    () => {  // the onload event
      console.log(app.variables);
      setTimeout(() => {  // testValue will be set to `456` in one second
        app.variables.testValue.setValue(456);
      }, 1000);
      // add a plugin
      app.addPlugins([new DebugPlugin()]);
      console.log(app.variables);
    }
  );
  app.data({  // custom data
    testValue: 233,
    testValue2: 456,
    link: {
      link: "https://example.com",
      target: "_blank",
    },
    style: {
      fontSize: 200,
    },
    links: [
      {
        link: "https://example.org",
        target: "_blank",
      },
      {
        link: "https://example.com",
        target: "_blank",
      },
      {
        link: "https://example.com",
        target: "_blank",
      },
    ],
    test: {
      a: [
        "a", "b", "c"
      ]
    }
  });
};
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <tnt-debug></tnt-debug>
      <v data="testValue + 233">Loading variable testValue...</v>  <!-- variable display -->
      <!-- Tag data rendering: tnt-td stands for `tnt-tag-data` and tnt-sd stands for `tnt-stylesheet-data` -->
      <!-- Both will change according to the variable values -->
      <a
        tnt-td="href -> links[0].link + '/example'; target -> link.target"
        tnt-sd="font-size -> `${style.fontSize}px`"
      >
        Click me
      </a>
      <v data="testValue - testValue2">a</v>  <!-- operations between variables are allowed! -->
      <t-for data="i in test.a">  <!-- for loops -->
        <p>
          <v data="i + testValue">Loading link...</v>  <!-- value display inside a for loop! -->
          LOL
        </p>
      </t-for>
    </div>
    <script type="module" src="./App.js"></script>  <!-- ES Modules! -->
  </body>
</html>
```

This is a kitchen-sink example of the current version of TNTjs. Might not be up-to-date though.

## Documentation

Please refer to <https://tntjs.bugduck.cn/doc.html> for more information.

## File structure

Below is the basic structure of TNTjs (might not be up-to-date):

<details>

- LICENSE 开源许可证
- src 主文件
  - runtime tntjs的底层实现
    - TNT.ts
    - TypeInfo.ts
    - SymbolTable.ts
    - GlobalEnvironment.ts
    - Pliggable.ts
    - VTagRenderer.ts
  - plugins
    - tntscript TNTscript 轻量编程语言开发目录
      - ScriptExecutor.ts 主文件
      - PluginMain.ts
      - TagRenderer.ts
      - lexicalAnalysis.ts 词法分析
    - debug
      - DebugRenderTracer.ts
      - PluginMain.ts
  - dist 编译产物
    - tnt.d.ts
    - tnt.js 代码
    - tnt.js.map
    - tnt.min.js 发布版混淆文件
    - tnt.fuck.js ♂♂♂ 哲学文件 ♂♂♂

</details>

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
- 2022.4.10 变量赋值功能实现
- 2022.4.17 函数调用功能实现
- 2022.4.24 TypeScript 重构项目
- 2022.5.22 项目重构完成
- 2022.5.29 发布 0.1.0 版本
- 2022.5.29 取消发布 0.1.0 版本
- 2022.6.9 ES6重构完成
- 2022.7.1 开发者们都放暑假啦!恢复开发

Enjoy!
