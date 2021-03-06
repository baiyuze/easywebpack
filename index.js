'use strict';

const WebpackTool = require('webpack-tool');
exports.WebpackTool = WebpackTool;
exports.webpack = WebpackTool.webpack;
exports.merge = WebpackTool.merge;
exports.Utils = require('./utils/utils');
exports.WebpackBuilder = require('./lib/builder');
exports.WebpackBaseBuilder = require('./lib/base');
exports.WebpackClientBuilder = require('./lib/client');
exports.WebpackServerBuilder = require('./lib/server');
exports.WebpackDllBuilder = require('./lib/dll');


exports.getConfig = (config = {}, option = {}) => {
  return exports.WebpackBuilder.getConfig(config, option);
};

exports.getWebpackConfig = (config = {}, option = {}) => {
  if (config.framework === 'dll' || option.onlyDll) {
    return exports.getDllWebpackConfig(config, option);
  }
  if (config.framework === 'js' || config.framework === 'web' || config.target === 'web' || option.onlyWeb) {
    return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackClientBuilder]);
  }
  if (config.framework === 'node' || config.target === 'node' || option.onlyNode) {
    return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackServerBuilder]);
  }
  return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackClientBuilder, exports.WebpackServerBuilder], option);
};

exports.getWebWebpackConfig = (config = {}, option = {}) => {
  return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackClientBuilder], option);
};

exports.getNodeWebpackConfig = (config = {}, option = {}) => {
  return exports.WebpackBuilder.getWebpackConfig(config, [exports.WebpackServerBuilder], option);
};

exports.getDllWebpackConfig = (config = {}, option = {}) => {
  if (option.singleConfig) {
    return new exports.WebpackDllBuilder(config).create();
  }
  return exports.WebpackBuilder.getDllWebpackConfig(config);
};

exports.build = (webpackConfig, config, callback) => {
  return new WebpackTool(config).build(webpackConfig, config, callback);
};

exports.server = (webpackConfig, config, callback) => {
  return new WebpackTool(config).server(webpackConfig, config, callback);
};
