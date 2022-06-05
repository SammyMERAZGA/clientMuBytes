module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/ui/",

  devServer: {
    proxy: {
      "/api": {
        target: "https://mubytes-api.herokuapp.com",
        ws: true,
        changeOrigin: true,
        cookieDomainRewrite: "localhost:8080",
      },
    },
  },
};
