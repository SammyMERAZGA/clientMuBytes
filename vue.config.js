module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "mubytes-api.herokuapp.com",
        ws: true,
        changeOrigin: true,
        cookieDomainRewrite: "localhost:8080",
      },
    },
  },
};
