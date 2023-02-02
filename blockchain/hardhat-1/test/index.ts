import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.getGreetingMessage()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreetingMessage("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.getGreetingMessage()).to.equal("Hola, mundo!");
  });
});
