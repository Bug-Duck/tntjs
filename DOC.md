# TNT.js使用文档
欢迎使用tnt.js!本项目由箱子(850625057@qq.com)发起,27Onion(zzy20080201@qq.com)主要参与开发

## 快速入门
从这里,就可以开始你的tntjs之旅了ヾ(✿ﾟ▽ﾟ)ノ<br/>

tnt.js是一个基于javascript的编程语言,目的是为了创造一个和Python一样简单的,又不失前端特性的编程语言,同时避免了TypeScript不能直接运行在浏览器上的缺点,且与javascript的语法非常的不一样哦!<br/>
现在,让我们来看第一个示例
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

## 变量赋值
tntjs的数据类型目前有三种:<br/>
|类型|描述|
|-|-|
|num|数字类型|
|str|字符串类型|
|bool|布尔值类型|

变量赋值语句
```
x = 2333;
y = "Hello world!";
z = True;
```
使用
```html
<script src="tnt.js"></script>
<tnt>
    x = 2333;
    y = "Hello world!";
    z = True;
</tnt>
<v>x</v>
<v>y</v>
<v>z</v>
```
运行效果
```
2333 Hello world! True
```
