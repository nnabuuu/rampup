## 章节目标

构建一个简单的REST API后端服务

* 学习使用Swagger进行REST API设计
* 学习使用express搭建web后端应用
* 学习使用Postman进行REST API的调试与调用

## 章节内容

1. 启动服务

    1.1 使用`npm install`安装依赖

    1.2 使用`npm run build`编译
    
    1.3 使用`npm run start`启动服务

2. 下载Swagger

    2.1 安装docker：

    2.2 运行以下命令在本地启动swagger服务
    ```
    docker pull swaggerapi/swagger-editor
    docker run -d -p 80:8080 swaggerapi/swagger-editor
    ```
   
    2.3 在浏览器中打开http://localhost

    2.4 使用File -> import file导入docs/openapi.yaml文件 

    2.5 查看api文档或导出html格式文档
    
3. 下载Postman

    3.1 使用 import 导入 docs/openapi.yaml文件 

    3.2 到APIs -> Rampup Fraction Service - OpenAPI 3.0 打开API并运行
    
## 练习

设计并完成一个 REST API：

POST - /api/fraction/{fractionId}/add

该方法接收下面类型的参数：
```
{
    numerator: number,
    denominator: number
}
```
将fractionId对应的fraction更新为新的fraction值。

例如：系统中已有该fraction:
```
{
    id: 1
    numerator: 1,
    denominator: 2
}
```

调用 POST - /api/fraction/1/add 并提交参数
```
{
        numerator: 1,
        denominator: 3
}
```

之后对应的值被修改为
```
{
        id: 1
        numerator: 5,
        denominator: 6
}
```

更新Swagger文档，更新代码，并使用Postman进行测试。