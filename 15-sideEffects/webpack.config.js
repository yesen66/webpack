
module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    optimization: {
        // 副作用 开启之后将会清理掉副作用函数
        // 另外还需要在package.json中设置 数组可以设置为不清理的范围
        sideEffects: true,
    }
}