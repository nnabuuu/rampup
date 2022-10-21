// Chapter 1 - Section 2: 同步 / 异步编程

// 库的引用
const fs = require("fs");
const fsPromise = fs.promises;
const events = require('events');

// main函数的调用
main();

// main函数定义
async function main() {
  // 同步式编程
  let content;
  try {
    content = fs.readFileSync("./plain.txt");
    console.log("fetch txt file using synchronous programming:", content.toString());
  } catch(e) {
    console.error("failed to fetch txt file using synchronous programming");
  } finally {

  }


  // 异步式编程：使用回调函数callback风格
  fs.readFile("./plain.txt", (err, content) => {
    if(err) {
      console.error(err);
    } else {
      console.log("fetch txt file using asynchronous programming callback:", content.toString());
    }
    // finally goes here.
  })

  // 异步式编程：使用Promise风格
  const promise = fsPromise.readFile("./plain.txt");
  promise.then((content) => {
    console.log("fetch txt file using asynchronous programming promise:", content.toString());
  }).catch((err) => {
    console.error(err);
  }).finally(() => {

  });

  // 异步式编程：使用 async / await语法糖风格
  try{
    content = await fsPromise.readFile("./plain.txt");
    console.log("fetch txt file using asynchronous programming async/await:", content.toString());
  } catch(e) {
    console.error("failed to fetch txt file using asynchronous programming async/await");
  } finally {

  }

  // 异步式编程：使用事件驱动风格
  const readableStream = fs.createReadStream("./plain.txt");
  readableStream.on('error', (error) => {
    console.log("failed to fetch txt file using asynchronous programming event");
  })

  readableStream.on('data', (chunk) => {
    console.log("fetch txt file using asynchronous programming event:", content.toString());
  })

  readableStream.on('end', () => {
    console.log("fetch txt file using asynchronous programming event is done.");
  })

  // 总结：
  // 我们在实际项目中倾向于使用async/await语法糖的异步编程方式和事件驱动两种方式
  // 简单理解的话：async/await通常用在单个js文件中，事件驱动的方式通常用在多个js文件相互协作的场景中


  // 忽略此条（等待1秒确保之前的事件已经执行完毕）。
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 练习：
  console.log("=====================EXERCISE=====================")
  // 请在下方完成练习内容，练习题见最后：

  // 练习1：


  // 练习2（利用以下代码片段）：
  const eventEmitter = new events.EventEmitter();

  // 练习3：
  // （无）

}

// 练习题 1:
// 在main方法里面使用async / await方式分别打印oddAddAsyncStyle(1) 和 oddAddAsyncStyle(2)的结果

/**
 * 功能函数，返回一个Promise，
 * 如果n是奇数，则resolve(n+1)
 * 如果n是偶数，则reject一个错误。
 * @param number: 输入的数字n
 */
function oddAddAsyncStyle(number) {
  return new Promise((resolve, reject) => {
    if(number % 2 === 0) {
      reject(new Error("n is not an odd number"))
    } else {
      resolve(number + 1);
    }
  });
}

// 练习题 2:
// 在main方法里面使用事件驱动的方式分别打印oddAddEventStyle(1) 和 oddAddEventStyle(2)的结果
// 注意：尽可能先绑定事件监听器，再运行oddAddEventStyle方法

/**
 * 功能函数，接收一个eventEmitter，
 * 如果n是奇数，则使用eventEmitter发送一个'data'事件，并将(n + 1)传输给该事件的监听者；
 * 如果n是偶数，则使用eventEmitter发送一个'error'事件，并将错误信息传输给该事件的监听者；
 * 处理结束后，使用eventEmitter发送一个'end'事件
 * @param number: 输入的数字n
 * @param eventEmitter: 输入的事件发送器
 */
function oddAddEventStyle(number, eventEmitter) {
  if(number % 2 === 0) {
    eventEmitter.emit('error', new Error("n is not an odd number"));
  } else {
    eventEmitter.emit('data', number + 1);
  }
  eventEmitter.emit('end');
}

// 练习题 3（补充阅读）:
// 自行查找资料并了解以下内容：
// * 回调函数
// * EventLoop模型
// * Promise规范