module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 1rem的大小
      rootValue: 37.5,
      // 把所有属性的px转为rem
      propList: ['*']
    }
  }
}
