import count from './js/count.js';
import sum from './js/sum.js';
import { add } from './js/math.js'; // 引入 core-js 的稳定版本
import './css/index.css';
import './css/index.less';
import './css/index.scss';
import './css/index.styl';
let sumVal = sum(1, 2, 3, 4);
console.log(sumVal); // Outputs: 10
console.log(count('a', 'b', 'c')); // Outputs: 3
console.log(add(5, 10)); // Outputs: 15