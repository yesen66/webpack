const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

class MyPlugin {
  apply(compiler) {
    console.log('myplugin 启动')

    compiler.hooks.emit.tap('MyPlugin', comilation => {
      // compilation => 可以理解为此次打包的上下文
      // assets 可以获取到资源文件信息
      for (const name in comilation.assets) {
        // console.log('---', name)
        if (name.endsWith('.js')) {
          const content = comilation.assets[name].source();
          const withoutComments = content.replace(/\/\*\*+\*\//g, '')
          comilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          }
        }
      }
    })
  }
}


module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  //生成 source-map
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10 KB
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      title: 'html plugin sample',
      meta: {
        viewport: 'with=device-width'
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    }),
    new MyPlugin()
  ]
}