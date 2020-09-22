module.exports = {
    root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
    env: { //环配置 如 "browser": true, node: true,
      "browser": true,
      "node": true
    },
    extends: [
    ],
    rules: {
      "eqeqeq": "off",
      "curly": "error"
    },
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
  };