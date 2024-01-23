
module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    //集中去配置webpack 内置的优化及功能
    optimization: {
        usedExports: true, //输出结果中只导出外部使用的成员
        concatenateModules: true,//尽可能将所有模块合并输出到一个函数中
        minimize: true, // 压缩使用的成员
    }
}