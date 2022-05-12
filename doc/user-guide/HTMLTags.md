# HTML Tags

## Overview
This article is about the custom HTML tags that TNT.js runtime provides.

## `<v>`
The `<v>` tag will insert a variable into the HTML tag. The value of the variable should be restored in the `TNT.Globals.symbolTable`. `<v>` tag's behavior may be changed by plugins.

## `<tnt-debug>`
Enable the Debug plugin.

## `<tnt-no-script>`
Disable the TNTScript plugin.

## `<tnt-disable-plugin plugin="xxx">`
Disable a plugin. The id of the plugin should be in the property `plugin`.

## `<tnt-pure-mode>` and `<tnt-no-plugin>`
Disable all the plugins. Not recommended.
