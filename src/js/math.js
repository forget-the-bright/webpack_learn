/**
* 将两个数相加
*
* @param {number} a - 第一个加数
* @param {number} b - 第二个加数
* @returns {number} - 两个数的和
*/
export function add(a, b) {
    return a + b;
}

/**
* 从第一个参数中减去第二个参数的值。
*
* @param {number} a - 被减数
* @param {number} b - 减数
* @returns {number} - 返回结果，即 a - b
*/
export function subtract(a, b) {
    return a - b;
}
/**
* 乘法函数
*
* @param a 第一个乘数
* @param b 第二个乘数
* @returns 返回两个数的乘积
*/
export function multiply(a, b) {
    return a * b;
}
/**
* 除法运算函数
*
* @param a 除数
* @param b 被除数
* @returns 除法运算结果
*/
export function divide(a, b) {
    return a / b;
}
/**
* 计算一个数的平方
*
* @param {number} a - 要计算平方的数
* @returns {number} 返回a的平方
*/
export function square(a) {
    return a * a;
}
/**
* 计算一个数的平方根
*
* @param {number} a 需要计算平方根的数字
* @returns {number} 返回数字a的平方根
*/
export function squareRoot(a) {
    return Math.sqrt(a);
}
/**
* 计算一个数的幂
*
* @param base 基数
* @param exponent 指数
* @returns 返回基数的指数次幂
*/
export function power(base, exponent) {
    return Math.pow(base, exponent);
}
/**
* 计算阶乘的函数
*
* @param n 需要计算阶乘的数字
* @returns 如果 n 是非负数，返回 n 的阶乘；如果 n 是负数，返回 undefined
*/
export function factorial(n) {
    if (n < 0) return undefined; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
/**
* 计算两个数的模运算结果
*
* @param a 第一个被除数
* @param b 除数
* @returns 返回a除以b的余数
*/
export function modulus(a, b) {
    return a % b;
}
/**
* 计算绝对值
*
* @param a 要计算绝对值的数字
* @returns 返回绝对值
*/
export function absolute(a) {
    return Math.abs(a);
}
/**
* 计算给定数值的对数值
*
* @param a - 要计算对数的数值
* @param base - 对数的底数，默认为自然对数的底数 Math.E
* @returns 返回给定数值的对数值
*/
export function logarithm(a, base = Math.E) {
    return Math.log(a) / Math.log(base);
}
/**
* 计算一个数的指数幂
*
* @param base 底数
* @param exponent 指数
* @returns 返回 base 的 exponent 次幂
*/
export function exponentiation(base, exponent) {
    return Math.pow(base, exponent);
}   