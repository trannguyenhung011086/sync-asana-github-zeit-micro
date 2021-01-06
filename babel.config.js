module.exports = {
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/proposal-class-properties",
      [
        "@babel/plugin-transform-runtime",
        {
          "absoluteRuntime": false,
          "corejs": false,
          "helpers": false,
          "regenerator": true,
          "useESModules": true,
          "version": "7.0.0-beta.0"
        }
      ]
    ],
    presets: ["@babel/env", "@babel/typescript"]
  };