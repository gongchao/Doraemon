<p>
  <img height="70" src="./assets/logo.png" />
</p>

Doraemon
---

Doraemon 基于 Github Issues 的博客生成器。

使用简单，只需要更改下配置，使用 Github pages 就可以快速搭建出自己的博客。

> [使用 Doraemon 的博客列表](https://github.com/gongchao/Doraemon/issues/1)

<div>
    <img width="650" src="http://blog-cdn.dian.io/2018-04-01-021850.png">
</div>


## 使用方法

> 安装依赖

```bash
npm install
```

> 更改配置，根目录下的 config.yml

| 属性 | 说明 |
| ---- | ---- |
| title | 网站标题 |
| url | 网站域名 |
| repository | Blog 的仓库地址，以 ``username/repository`` 方式填写 |
| token | 这里获取 [token](https://github.com/settings/tokens/new) |
| date_format | 日期格式 |
| time_format | 时间格式 |
| per_page | 每页显示的 Issues 数量 |
| theme | 当前使用的主题，对应 ``themes`` 目录里的文件夹 |
| output_dir | 编译后的输出文件夹 |

⚠️ token，的权限只需要勾选以下两个，即可

- read: user Read all user profile data
- user: email Access user email addresses (read-only)

> 编译

```bash
npm run build
```

## 主题

目前只有 ``default`` 一个模版，非常欢迎将您的主题共享

## 开发日志

- 多用户支持
- 分类标签
- ~~多 Theme 支持 [2018/4/1]~~
- ~~基础的文章展示 [2018/4/1]~~

## 类似项目

- [Mirror](https://github.com/LoeiFy/Mirror)
- [BGAIssueBlog](https://github.com/bingoogolapple/BGAIssueBlog)

## 许可

MIT License (MIT)

