module.exports = {
    publicPath: '/bookMan/', //后缀与即将访问的一样
    // outputDir: 'vue', //输出目录
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5757/admin', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}