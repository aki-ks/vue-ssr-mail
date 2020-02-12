const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const serverConfig = {
    entry: './src/entry-server.ts',
    target: 'node',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    optimization: {
        splitChunks: false
    },
    plugins: [
        new VueSSRServerPlugin()
    ]
}

const clientConfig = {
    entry: './src/entry-client.ts',
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new VueSSRClientPlugin()
    ]
}

module.exports = {
    configureWebpack: process.env.TARGET_ENV === 'server' ? serverConfig : clientConfig
}
