// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.attach(contractAddress);

  // 只读交互方式
  console.log("Greeting message:", await greeter.getGreetingMessage());
  console.log("Greeting address:", await greeter.getGreetingAddress());
  console.log("Greeting count:", await greeter.getGreetingCount("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"));

  // 写交互方式
  // 1. 构建transaction
  const setGreetingMessageTx = await greeter.setGreetingMessage("Here comes a new message");

  // 2. 等待transaction运行
  const result = await setGreetingMessageTx.wait();

  console.log("New greeting message:", await greeter.getGreetingMessage());

  // 事件交互方式：指定tx的事件

  // @ts-ignore
  const event = result?.events[0];
  console.log("event captured: ", event?.args?.greetingAddress);
  console.log("event captured: ", event?.args?.greetingMessage);

  // 事件交互方式：非指定tx的事件
  // @ts-ignore
  const filter = greeter.filters.GreetingAdded("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
  greeter.on(filter, (greetingAddress, greetingMessage, event) => {
    console.log("address:", greetingAddress);
    console.log("message:", greetingMessage);
  });

  // 重新执行setGreetingMessage因为我们刚刚绑定listener
  const setGreetingMessageTx2 = await greeter.setGreetingMessage("Here comes a second new message");
  await setGreetingMessageTx2.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
