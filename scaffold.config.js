module.exports = (webpackConf,type) => {
  if (type === 'build') {
    Object.assign(webpackConf.output, {
      publicPath: '/svg-3d-demo/'
    });
  }
};
