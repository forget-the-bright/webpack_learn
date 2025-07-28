const {
    defineConfig,
    globalIgnores
} = require("eslint/config");

const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([
    {
        languageOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            parserOptions: {},

            globals: {
                ...globals.node, // 启用node中全局变量
                ...globals.browser, // 启用browser中全局变量
            },
        },

        rules: {
            //"off" 或 0 - 关闭规则
            //"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
            //"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
            "no-var": 2, // 不能使用 var 定义变量
        },
        // 继承其他规则
        extends: compat.extends("eslint:recommended"),
    },
    globalIgnores(["dist/**/*","node_modules/**/*","eslint.config.js","package.json"], "Ignore Build Directory")
]);