const path = require('path'); //内置的node模块
const htmlWebpackPlugin = require('html-webpack-plugin'); //html插件
// const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
   //入口， 配置要打包的对象
   entry:path.resolve(__dirname,'./src/main.js'),
    //输出，配置打包后文件的输出路径以及打包后的js文件名
   output:{
      path:path.resolve(__dirname,'./dist'),
      filename:'bundle.js'
   },

   plugins:[
    //  自动把打包js注入到html
     new htmlWebpackPlugin({
        template:path.resolve(__dirname,'./src/index.html'),
        filename:'index.html'
     }),
     //每次打包前先清除dist目录
    //  new cleanWebpackPlugin(['./dist']),
   ],
   
   //loader的作用是为了让webpack可以打包其他类型的模块
   module:{
      // 配置非js模块的处理规则
      rules:[
         //css模块
         {
            test:/\.css$/,
            use:['style-loader','css-loader']
         },
          //less模块
          {
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader']
          },   
        //  静态资源引入模块
        {
          test:/\.(gif|png|jpg|svg|mp3|mp4|avi|woff|ttf)/,
          use:[
             //小于10kb的才打包
             {
                loader:'url-loader',
                options:{ limit:10240}
             }
          ]
        },
        //js模块
        {
           test:/\.js$/,
           use:['babel-loader'],
           exclude:/node_modules/    //第三方的js，不需要语法转换，所以排除掉
        },
        //vue模块
         {
            test:/\.vue$/,  
            use:['vue-loader']       
        },
      ]
   },
   //webpack-dev-server的配置
   devServer:{
       open:true,   //服务启动后自动打开浏览器
       port:8888,    //服务端口
       contentBase:'dist'  //开启服务的目录
   }

}