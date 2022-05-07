module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://mubytes-api.herokuapp.com",
        changeOrigin: true,
        cookieDomainRewrite: "localhost:8080",
      },
    },
  },
};
