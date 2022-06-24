# tt-template-typescript
基于gulp，使用TS+Less 开发字节小程序的项目模板

## 安装依赖

```
npm install
```
或者
```
yarn install
```


## 使用
将小程序项目原封不动拷贝至`src`目录下，将js文件后缀名改成`.ts`，将`.ttss`改成`.less`

开发运行命令：
```
npm run dev
```
`dev`命令会在根目录生成`dist`文件夹，用[字节开发者工具](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/developer-instrument/overview)打开`dist`文件夹即可
***
小程序构建npm(确保`src目录`下有`package.json`):

```
npm run buildNpm
```

***
发布生产运行命令：
```
npm run build
```
将`dist`目录代码提交至后台审核即可

- `npm run dev` 命令会自动监听文件变化，从而更新至dist文件夹，新增文件无需重新运行该命令
- `npm run build` 命令会自动压缩js代码