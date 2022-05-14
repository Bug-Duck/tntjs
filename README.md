# TNT.js
![输入图片说明](tnt.js.logo.length.png)
![GitHub](https://img.shields.io/github/license/Bug-Duck/tntjs)
![version](https://img.shields.io/badge/version-0.0.3-green)
![watch](https://img.shields.io/github/watchers/Bug-Duck/tntjs?color=blue&logo=github&style=flat-square)
![Star](https://img.shields.io/github/stars/Bug-Duck/tntjs?color=yellow&logo=github&style=flat-square)
![Fork](https://img.shields.io/github/forks/Bug-Duck/tntjs?color=green&logo=github&style=flat-square)
[![star](https://gitee.com/BugDucker/tntjs/badge/star.svg?theme=dark)](https://gitee.com/BugDucker/tntjs/stargazers)
[![fork](https://gitee.com/BugDucker/tntjs/badge/fork.svg?theme=dark)](https://gitee.com/BugDucker/tntjs/members)
[![website](https://img.shields.io/badge/website-bugduck.cn-yellowgreen)](https://www.bugduck.cn)
[![BiliBili](https://img.shields.io/static/v1?label=bilibili&message=BugDuck开源团队&color=ff69b4&logo=bilibili)](https://space.bilibili.com/1959824394?spm_id_from=333.337.0.0)

### 公告
本项目正在重构中,我们创造性的将tntjs分为了两部分,一部分为tnt本体,负责更底层的热更新交互,一部分是TNTscript,用于实际开发

### 介绍
tntjs分为两部分:

TNT是一个动态热更新的语言框架,轻量级

TNTScript是一个基于Javascript的编程语言,目的是为了创造一个和Python一样简单的,又不失前端特性的编程语言。TNTScript避免了TypeScript不能直接运行在浏览器上的缺点。它的最大特点是动态,页面上的值会随着TNT内部的值变化而变化!<br/>



### demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Page</title>
    <script src="tnt.js"></script>
</head>
<body>
    <tnt>
        x = 2333;
    </tnt>
    <div id="content">
        <v>x</v> <br>
        You are using the: <v>explorerType</v>
    </div>
</body>
</html>
```
运行效果:
```
2333
You are using the: Chrome
```
此时在v标签内的变量名会被渲染为他的值
### 官方文档
bug-duck.github.io/tntjs

### 文件介绍
> tntjs
> > LICENSE 开源许可证
> > 
> > src 主文件
> > > runtime tntjs的底层实现
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
> > > tntscript TNTscript轻量编程语言开发目录
> > > >  ScriptExecutor.ts 主文件
> > > > 
> > > > PluginMain.ts
> > > > 
> > > > TagRenderer.ts
> > > > 
> > > > lexicalAnalysis.ts 词法分析
> > > > 
> > > debug
> > > > DebugRenderTracer.ts
> > > > 
> > > >  PluginMain.ts
> > > >
> > dist 编译产物
> > > tnt.d.ts
> > > 
> > > tnt.js 代码
> > > 
> > > tnt.js.map
> > > 
> > > tnt.min.js 发布版混淆文件
> > > 
> > > tnt.fuck.js ♂♂♂哲学文件♂♂♂


### 打赏
开发者们都是初中生，希望能给我们一点奖励，谢谢！
![开发者们都是初中生 希望能给我们一点奖励](https://img-blog.csdnimg.cn/369cf4080e44416b9e78e58872615d6b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA566x5a2Q5ZCbc2hlZXA=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 开发日记
> 开发阶段
> > 2022.4.1 开始在学校构思<br/>
> > 2022.4.5 项目启动<br/>
> > 2022.4.9 \<v\>\</v\>标签功能实现<br/>
> > 2022.4.10 变量赋值功能实现<br/>
> > 2022.4.17 函数调用功能实现<br/>
> > 2022.4.24 TypeScript重构项目

