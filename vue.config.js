// 导入mock数据
const mockJson = require("./src/data.json");
const seller = mockJson.seller
const goods = mockJson.goods
const ratings = mockJson.ratings

// ====定义函数addStyleResource===
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/common/stylus/index.styl")] //后面跟着的路径是你自己放公共stylus变量的路径
    });
}

const path = require('path')


module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  // 配置使用stylus全局变量
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    port: 8080,
    before(app) {
      app.get("/api/sellers", (req, res) => {
        res.json(seller);
      })
      app.get("/api/goods", (req, res) => {
        res.json(goods);
      })
      app.get("/api/ratings", (req, res) => {
        res.json(ratings);
      })
    }
  }
}
