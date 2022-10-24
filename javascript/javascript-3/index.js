// Chapter 1 - Section 3: 函数式编程

// 主要目的：
// 1. 学习如何使用第三方库
// 2. 学习什么是函数式编程(FP)

// 为什么要在工程中使用函数式编程：
// 1. 尽量用表达式（expression）而不用语句（statement），干掉for(let i = 0; i < n; i++) 这样繁琐的代码，专注于高层次的抽象而不是细枝末节的边界检查等
// 2. 不修改状态：不要修改变量，变量值一旦被指派就永远不要改变。写业务逻辑时尽量总是创建一个新的变量。这样可以避免在复杂场景（例如多线程）中的死锁等问题。
// 3. 引用透明性：表达式的值不要依赖于可以改变全局状态，同样的输入总是得到同样的结果，因为异步编程时你很可能无法控制全局，而且你永远不知道别的线程如何修改了变量。
// 4. 杜绝副作用：使代码的逻辑总是可控，代码结构尽量可控。

// 库的引用
// 实战中，我们主要使用lodash这个库在进行函数式编程
const _ = require('lodash');
const fs = require('fs');
const fsPromise = fs.promises;
const Fraction = require('./fraction.js');

main();

async function main() {

  // 基本的函数式编程
  // 注意，我们尽量使用const让编译器帮助我们检查我们是不是在不注意时进行了修改
  const arr = [1, 2, 3]
  console.log(arr);

  // map
  // 理解这里的第二个参数(n) => (n + 1)是把函数作为一个输入传递给了_.map
  const arr_plus = _.map(arr, (n) => (n + 1));
  console.log("arr_plus:", arr_plus);

  // reduce (这也是大数据处理中的map-reduce思想，参考lodash的文档理解各个参数的含义)
  const sum_of_arr = _.reduce(arr, (sum, n) => (sum + n), 0);
  console.log("sum_of_arr:", sum_of_arr);

  // 这是不使用函数式编程的做法，不建议使用:
  let sum_of_arr_2 = 0;
  for(let i = 0; i < arr.length; i++) {
    sum_of_arr_2 = sum_of_arr_2 + arr[i];
  }
  console.log("sum_of_arr_2:", sum_of_arr_2);

  // 一些其他的函数式编程方法
  //// filter
  const arr_filtered = _.filter(arr, (n) => (n % 2 === 0));
  console.log("arr_filtered:", arr_filtered);

  //// countBy
  const arr_counted = _.countBy(arr, (n) => (n % 2));
  console.log("arr_counted:", arr_counted);

  //// sortBy
  const arr_sorted_reverse = _.sortBy(arr, (value) => (-value));
  console.log("arr_sorted_reverse:", arr_sorted_reverse);

  //// forEach
  _.forEach(arr, (value, index) => {
    console.log("arr foreach: value - ", value," - index -", index);
  })

  // 另外一种适合链式调用的写法：
  const arr2 = [{
    "name": "Alice",
    "age": 25
  }, {
    "name": "Bob",
    "age": 23
  }, {
    "name": "Charlie",
    "age": 18
  }]

  const result = _(arr2)            // 用_()把对象包装起来
    .sortBy((user) => (user.age))   // 按年纪排列
    .map((user) => (user.name))     // 筛选出name属性
    .value()                        // 用.value()把包装起来的对象解开

  console.log(result);

  // 函数式编程 + 异步编程

  // 方式一：
  // 使用forEach方法进行3次异步调用，并在调用结束时直接打印异步调用的结果
  // 注意，这里文件1、2、3的读取顺序是**不确定**的，因此打印的顺序也是**不确定**的，可以多运行几次看看区别。

  console.log("===========Parallel async call #1 begin===========");

  _.forEach(arr, async (value) => {
    const content = await fsPromise.readFile(`./resources/plain-${value}.txt`);
    console.log(`read file plain-${value}.txt: ${content.toString()}`);
  })

  // 忽略此条（等待1秒确保之前的事件已经执行完毕）。
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("===========Parallel async call #1 end===========");


  // 方式二：
  // 使用map方法返回3次异步调用结果的promise，即Promise(content)。
  // 使用Promise.all方法等待调用结束，并根据传入的Promise顺序组织content的顺序，以保证结果顺序的一致性。
  // 这样，这里文件1、2、3的读取顺序是**不确定**的，但是Promise.all使得他们返回的变量顺序是**确定**的，可以多运行几次看看区别。

  console.log("===========Parallel async call #2 begin===========");

  const contentPromises = _.map(arr, (value) => {
    const contentPromise = fsPromise.readFile(`./resources/plain-${value}.txt`);
    // 注意区别，这里不是直接等待异步调用结束，而是将promise作为变量返回
    return contentPromise;
  })

  const contents = await Promise.all(contentPromises);
  _.forEach(contents, (content, index) => {
    console.log(`content #${index}: ${content.toString()}`);
  })

  // 忽略此条（等待1秒确保之前的事件已经执行完毕）。
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("===========Parallel async call #2 end===========");

  exercise();
}

// 练习：
// * 使用_.map方法或_.forEach方法，计算 1/2 + 1/3 + 1/4 + 1/5 + 1/6 + ... + 1/50的值
// * 使用_.reduce方法，同样计算 1/2 + 1/3 + 1/4 + 1/5 + 1/6 + ... + 1/50的值

function exercise() {

  // 构造数组[1/2, 1/3, 1/4, 1/5 ... 1/50]
  const fractions = _.map(_.range(2, 51), (number) => (new Fraction(1, number)))

  // TODO: 在此处编写练习逻辑
  //
  // const sum_of_fractions = ???
  //
  // console.log("sum_of_fractions is:", sum_of_fractions);
  //

  // 答案： 6212902343998726 / 1775518080046387
  console.log("sum_of_fractions should be 6212902343998726 / 1775518080046387");
}






