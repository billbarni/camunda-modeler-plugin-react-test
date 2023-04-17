const path = require('path');

const basePath = '.';

const absoluteBasePath = path.resolve(path.join(__dirname, basePath));

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react'
            ],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  'importSource': '@bpmn-io/properties-panel/preact',
                  'runtime': 'automatic'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body'
            }
          },
          'css-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // maybe needs 'options: { insert: 'body' }' if going to use CSS shim like calendar
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [ 'react-svg-loader' ]
      }
    ]
  },
  resolve: {
    mainFields: [
      'browser',
      'module',
      'main'
    ],
    alias: {
      'react': 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/preact/compat',
      '@bpmn-io/properties-panel': 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel',
      'bpmn-js-properties-panel': 'camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel'
    },
    modules: [
      'node_modules',
      absoluteBasePath
    ]
  }
};