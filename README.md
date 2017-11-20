# moyu-egret-tools

集成了一系列工具
1. tinypng
2. 文件md5
3. ...

##用法
在`egret publish`之后，再利用`moyu-egret-tools`对发布的版本进行优化处理
```
npm install -g moyu-egret-tools
moyu-egret-tools -s<原始发布路径> -d<目标路径> -k<tinypng api key>
```
