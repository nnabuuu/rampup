## 章节目标

使用HardHat框架进行智能合约开发，构建Accumulator智能合约。

* 学习Solidity语言
* 学习智能合约的测试与部署
* 学习智能合约的交互

## 章节内容

0. 环境安装

`npm install`

1. 本机部署合约

1.1 打开一个命令行，进入项目路径使用 `npx hardhat node` 启动hardhat的本地虚拟链，并保持

1.2 打开另一个命令行，进入项目路径使用 `npx hardhat run ./scripts/deploy.ts --network localhost` 部署合约

如果成功，则会打印如下内容，将地址拷贝
```
Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

1.3 使用 `npx hardhat run ./scripts/interact.ts --network localhost`查看与智能合约的交互方式
    
1.4 使用 `npx hardhat test`查看智能合约的测试用例执行
    
## 练习

设计并完成一个Accumulator合约，这是我们之前完成的累加器的智能合约版本。

智能合约包括如下内容： 
```solidity
    function add(uint256 numerator, uint256 denominator) public;
    function getSum() public view returns (uint256, uint256);
    function reset() public onlyOwner;
    
    event Added(uint256 indexed numerator, uint256 indexed denominator);
```

1. 完成合约内容
2. 完成合约测试
3. 完成合约部署
4. 完成合约交互