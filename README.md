# 框架
ant design vue    文档地址： https://pro.loacg.com/docs/getting-started


# 调试开发步骤

#### 1、编辑.env.development 里的VUE_APP_BASE_URL为自己的开发api地址
#### 2、安装node_module：   npm install
#### 3、运行调试:  npm run serve

<br/>

# 正式打包静态文件步骤

#### 1、复制.env.development为.env
#### 2、编辑.env里的正式api地址
#### 3、运行打包命令:  npm run build
#### 4、打包后的表态文件位于 dist 目录下，把dist复制到网站服务器上即可
