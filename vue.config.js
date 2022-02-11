const path = require("path");

const PrerenderSpaPlugin = require("prerender-spa-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "@/assets/style/abstract/_index.scss" as *;
        `,
      },
    },
  },
  configureWebpack: (config) => {
    if (isProduction) {
      config.plugins.push(
        // 預渲染外掛配置
        new PrerenderSpaPlugin({
          // 靜態資源路徑
          staticDir: path.join(__dirname, "dist"),
          // 預渲染路由
          // 如有動態param請完整定義在這裡
          routes: ["/", "/theme-setting"],
        })
      );
    }
  },
};
