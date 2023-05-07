const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_colors.scss";
          @import "@/assets/scss/_tokens.scss";
          @import "@/assets/scss/_fonts.scss";
        `
      }
    }
  }
})
