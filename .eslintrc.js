// 弃用了此配置，此配置未老版本eslint7-的配置
// 参考 https://eslint.org/docs/latest/use/configure/migration-guide  迁移文档进行配置迁移
// 新的配置文件名称为 eslint.config.js
// npx @eslint/migrate-config .eslintrc.json  旧配置迁移翻译成新版本配置
module.exports = {
    // 解析选项
    parserOptions: {
        ecmaVersion: 6, // ES 语法版本
        sourceType: "module", // ES 模块化
        // ES 其他特性
        // ecmaFeatures: {
        //       jsx: true // 如果是 React 项目，就需要开启 jsx 语法
        // }
    },
    // 具体检查规则
    rules: {
        //"off" 或 0 - 关闭规则
        //"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
        //"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
        "no-var": 2, // 不能使用 var 定义变量
    },

    // 继承其他规则
    extends: ['eslint:recommended'],
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    // ...
    // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};