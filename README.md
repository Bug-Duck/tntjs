![TNT.js](tntjs-banner.png)
![GitHub](https://img.shields.io/github/license/Bug-Duck/tntjs)
![version](https://img.shields.io/badge/version-0.0.3-green)
![watch](https://img.shields.io/github/watchers/Bug-Duck/tntjs?color=blue&logo=github&style=flat-square)
![Star](https://img.shields.io/github/stars/Bug-Duck/tntjs?color=yellow&logo=github&style=flat-square)
![Fork](https://img.shields.io/github/forks/Bug-Duck/tntjs?color=green&logo=github&style=flat-square)
[![website](https://img.shields.io/badge/website-bugduck.cn-yellowgreen)](https://www.bugduck.cn)
[![BiliBili](https://img.shields.io/static/v1?label=bilibili&message=BugDuck开源团队&color=ff69b4&logo=bilibili)](https://space.bilibili.com/1959824394?spm_id_from=333.337.0.0)

# TNT.js

The JavaScript framework for modern web.

## Notice

This is the **development branch** of TNT.js. Everything is under heavy development is may be unstable.

## Roadmap

Please refer to [TNT.js Roadmap](https://github.com/Bug-Duck/tntjs/blob/master/roadmap.md).

## Introduction

TNTjs was separated into two parts:

- TNT is a lightweight hot update language framework
- TNTScript is a script language based on JavaScript. Its main goal is to create a lightweight, easy-to-learn but still powerful language like Python. TNTScript solved the issue that TypeScript can't be ran directly in the browsers. The topmost feature of TNTScript is dynamic, meaning that the values on the webpage will change regarding to the actual values stored inside TNT!

## Demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Page</title>
    <script src="tnt.js"></script>
  </head>
  <body>
    <tnt> x = 2333; </tnt>
    <div id="content">
      <v>x</v> <br />
      You are using the: <v>explorerType</v>
    </div>
  </body>
</html>
```

Outputs:

```
2333
You are using the: Chrome
```

And the variable defined inside the `v` tag will be rendered as its actual value.

## Documentation

Please refer to <https://bug-duck.github.io/tntjs> for more information.

## File structure

Below is the basic structure of TNTjs (might not be up-to-date):

> tntjs
>
> > LICENSE 开源许可证
> >
> > src 主文件
> >
> > > runtime tntjs 的底层实现
> > >
> > > > TNT.ts
> > > >
> > > > TypeInfo.ts
> > > >
> > > > SymbolTable.ts
> > > >
> > > > GlobalEnvironment.ts
> > > >
> > > > Pliggable.ts
> > > >
> > > > VTagRenderer.ts
> > > >
> > > > tntscript TNTscript 轻量编程语言开发目录
> > > > ScriptExecutor.ts 主文件
> > > >
> > > > PluginMain.ts
> > > >
> > > > TagRenderer.ts
> > > >
> > > > lexicalAnalysis.ts 词法分析
> > > >
> > > > debug
> > > > DebugRenderTracer.ts
> > > >
> > > > PluginMain.ts
> > > >
> > > > dist 编译产物
> > > > tnt.d.ts
> > >
> > > tnt.js 代码
> > >
> > > tnt.js.map
> > >
> > > tnt.min.js 发布版混淆文件
> > >
> > > tnt.fuck.js ♂♂♂ 哲学文件 ♂♂♂

## Sponsoring

We're all middle school students and we don't have that much money. So sponsoring TNTjs will give us an extra reward to let us keep updating!

![Sponsor us](https://img-blog.csdnimg.cn/369cf4080e44416b9e78e58872615d6b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA566x5a2Q5ZCbc2hlZXA=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## CHANGELOG

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

Enjoy!
