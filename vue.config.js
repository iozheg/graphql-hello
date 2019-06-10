module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/graphql': {
            target: 'http://localhost:4000/graphql',
        }
      }
    }
  }
}