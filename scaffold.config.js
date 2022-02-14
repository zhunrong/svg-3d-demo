module.exports = (webpackConf,type) => {
  if (type === 'build') {
    Object.assign(webpackConf.output, {
      publicPath: '/svg-3d-demo/'
    });
  }
  if (type === 'dev') {
    Object.assign(webpackConf.devServer, {
      port: 3000
    });
  }
};
