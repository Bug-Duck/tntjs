# TNT.js User Guide

## Overview
Welcome to the world of TNT.js! To use TNT.js, you just need to reference the `tnt.min.js` by using a single `<script>` tag, and then you can start!

## HTML tags
There are a lot of custom HTML tags here. `<v>` tag allows you to insert a value directly into the DOM and some other tags can also affect the TNT.js. If you want to know more about it, you can go to the ***Portal Section*** to check the links.
## Integrated Plugins
There are two integrated plugins: `tntscript` and `tntdebug`. The `tntscript` plugin offers the functionility of TNTScript, a new programming language that makes TNT.js more convenient, and `tntdebug` provides more debug features. They're not different from other plugins, except that they are integrated into the `tnt.min.js`. You can disable them as well as other plugins, though disabling `tntscript` is not recommended.

## TNTScript or Javascript
We actually provide the Javascript API. But it's really long and complex. To simplify this, we introduced a new programming language called TNTScript that can directly run on the browser. You don't need to set up a compiler to compile it to Javascript. The `tntscript` plugin will parse and execute it dynamically.

## Portal
[TNT.js Javascript API Documentation](../api/Overview.md)
[HTML Tags](HTMLTags.md)
