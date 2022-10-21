// Chapter 1 - Section 2: 同步 / 异步编程

// 库的引用
const fs = require("fs");

main();

async function main() {
  // 同步式响应式编程
  let content;
  try {
    content = fs.readFileSync("./plain.txt");
    console.log("fetch txt file using synchronous programming:", content.toString());
  } catch(e) {
    console.error("failed to fetch txt file using synchronous programming");
  }


  // 异步式响应式编程：使用回调函数callback
  fs.readFile("./plain.txt", (err, content) => {
    if(err) {
      console.error(err);
    } else {
      console.log("fetch txt file using asynchronous programming callback:", content.toString());
    }
  })

  // 异步式响应式编程：使用Promise
  const promise1 = new Promise((resolve, reject) => {
    fs.readFile("./plain.txt", (err, data)=> {
      if(err) {
        reject(err);
      } {
        resolve(data);
      }
    });
  });
  promise1.then((content) => {
    console.log("fetch txt file using asynchronous programming promise:", content.toString());
  });

  // 异步式响应式编程：使用 async / await语法糖
  const promise2 = new Promise((resolve, reject) => {
    fs.readFile("./plain.txt", (err, data)=> {
      if(err) {
        reject(err);
      } {
        resolve(data);
      }
    });
  });

  content = await promise2;
  console.log("fetch txt file using asynchronous programming async/await:", content.toString());
}

// 练习

