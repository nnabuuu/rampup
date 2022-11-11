## 章节目标

* 学习typescript语法基础，比较typescript与javascript的不同
* 学习typescript工具链的使用

## 章节内容

1. 使用`npm install`安装依赖
2. 查看src/index.ts的内容
3. 编译typescript
    * 使用`npx tsc`将typescript代码编译成javascript代码
    * 编译后工作目录下会生成dist文件夹，包含所有编译后的.js文件
    * 进入dist目录下，使用node index.js执行并查看结果
4. 使用工具链直接执行.ts文件
    * 运行`npx ts-node src/index.ts`执行并查看结果
5. 完成练习