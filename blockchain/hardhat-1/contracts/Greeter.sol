//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// 我们实现如下内容：
// 使用智能合约记录最近一次发送欢迎的地址和欢迎信息

contract Greeter {

    // 记录合约的实际拥有者地址
    address private _owner;

    // 最近一次的欢迎消息
    string private lastGreetingMessage;

    // 最近一个发送欢迎消息的地址
    address private lastGreetingAddress;

    // 记录所有人设置欢迎的次数
    mapping(address => uint256) private greetingCount;

    // 事件定义，注意indexed关键词，只有被索引的字段可以之后被filter检索
    event GreetingAdded (
        address indexed greetingAddress,
        string greetingMessage
    );

    constructor(string memory _greeting) {
        lastGreetingMessage = _greeting;
        lastGreetingAddress = msg.sender;
        greetingCount[msg.sender] = 1;
        _owner = msg.sender;
    }

    function getGreetingMessage() public view returns (string memory) {
        return lastGreetingMessage;
    }

    function getGreetingAddress() public view returns (address) {
        return lastGreetingAddress;
    }

    function getGreetingCount(address _address) public view returns (uint256) {
        return greetingCount[_address];
    }

    // 注意这里的onlyOwner，如果不是owner调用该方法则失败
    function resetGreetingCount(address _address) public onlyOwner {
        greetingCount[_address] = 0;
    }

    // 设置新的欢迎消息，并emit GreetingAdded事件
    function setGreetingMessage(string memory _greetingMessage) public {
        lastGreetingMessage = _greetingMessage;
        lastGreetingAddress = msg.sender;
        greetingCount[msg.sender]++;

        emit GreetingAdded(msg.sender, _greetingMessage);
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

}
