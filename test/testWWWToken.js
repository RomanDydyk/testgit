const WWWToken = artifacts.require("./WWWToken.sol");

const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect} = require('chai');

let WWWTokenInstance;

contract("WWWToken", ([
    owner,
    user1, 
    user2,
    user3,
    user4,
    user5
]) => {
    beforeEach(async() => {
        WWWTokenInstance = await WWWToken.deployed();
    });

    it("should mint some token to owner balance correct", async function(){
        let _amount = new BN("1000");
        await WWWTokenInstance.mint(owner,_amount);
        expect(await WWWTokenInstance.balanceOf(owner)).to.be.bignumber.equal(_amount);
    });

    it("should transfer some token from owner account to user1 account correct", async function(){
        let _amount = new BN("100");
        await WWWTokenInstance.transfer(user1, _amount);
        expect(await WWWTokenInstance.balanceOf(owner)).to.be.bignumber.equal(new BN("900")); //because we mint 1000 in previous 
        expect(await WWWTokenInstance.balanceOf(user1)).to.be.bignumber.equal(_amount);
    });

    it("should approve some token from user1 account to user2 account correct",async function(){
        let _amount = new BN("50");
        await WWWTokenInstance.approve(user2,_amount,{from:user1});
        expect(await WWWTokenInstance.allowance(user1,user2)).to.be.bignumber.equal(_amount);
        await WWWTokenInstance.transferFrom(user1,user2,_amount,{from:user2});
        expect(await WWWTokenInstance.balanceOf(user2)).to.be.bignumber.equal(_amount);
    });

    it("should burn some token from user2 account correct",async function(){
        let _amount = new BN("50");
        await WWWTokenInstance.burn(_amount,{from:user2});
        expect(await WWWTokenInstance.balanceOf(user2)).to.be.bignumber.equal(new BN("0"));
        expect(await WWWTokenInstance.getTotalSupply()).to.be.bignumber.equal(new BN("950"));
    });

    it("should return name,symbol correct", async function(){
        let name = "WWWToken";
        let symbol = "WWW";
        expect( await WWWTokenInstance.getName()).to.be.bignumber.equal(name);
        expect( await WWWTokenInstance.getSymbol()).to.be.bignumber.equal(symbol);
    });

    it("shouldn\'t transfer token because contract on pause", async function(){
        await WWWTokenInstance.pause({from:owner});
        expect(await WWWTokenInstance.getPaused()).equal(true);
        await expectRevert(WWWTokenInstance.transfer(user3, new BN("100")), "Pausable: paused");
        await WWWTokenInstance.unpause({from:owner});
        expect(await WWWTokenInstance.getPaused()).equal(false);
    });

    it("shouldn\'t mint some token to owner account", async function(){
        await expectRevert(WWWTokenInstance.mint("0x0000000000000000000000000000000000000000",new BN("1000")), "ERC20: mint to the zero address");
        await expectRevert(WWWTokenInstance.mint(owner,new BN("1000000000000000001")), "Maximum number of tokens");
    }); 

    it("shouldn\'t burn some token from owner account", async function(){
        await WWWTokenInstance.mint(owner,new BN("1000"));
        await expectRevert(WWWTokenInstance.burn(new BN("100000000"),{from:owner}), "ERC20: burn amount exceeds balance");
    });

    it("shouldn\'t approve token for the zero address",async function(){
        await expectRevert(WWWTokenInstance.approve("0x0000000000000000000000000000000000000000",new BN("10"),{from:user1}),"ERC20: approve to the zero address");
    });

    it("shouldn\'t transfer  token for the zero address", async function(){
        await expectRevert(WWWTokenInstance.transfer("0x0000000000000000000000000000000000000000",new BN("100000")), "ERC20: transfer to the zero address");
    });
      
    it("shouldn\'t transfer token from owner account to user1 account", async function(){
        await expectRevert(WWWTokenInstance.transfer(user1,new BN("100000")), "ERC20: transfer amount exceeds balance");
    });

    it("shouldn\'t approve some token from user1 account to user2 account",async function(){
        await WWWTokenInstance.mint(user1,new BN("500"),{from:owner});
        await WWWTokenInstance.approve(user2,new BN("100"),{from:user1});
        await expectRevert(WWWTokenInstance.transferFrom(user1,user2,new BN("300"),{from:user2}), "ERC20: transfer amount exceeds allowance");
    });

    it("shouldn\'t not unpause contract", async function(){
        await expectRevert(WWWTokenInstance.unpause(), "Pausable: not paused");
    });
    it("shouldn\'t mint token because coller is not owner", async function(){
        await expectRevert(WWWTokenInstance.mint(user1, new BN("1000"),{from:user1}), "Ownable: caller is not the owner");
    });
    it("shouldn\'t pause contract because coller is not owner", async function(){
        await expectRevert(WWWTokenInstance.pause({from:user1}), "Ownable: caller is not the owner");
    });
    it("shouldn\'t unpause contract because coller is not owner", async function(){
        await WWWTokenInstance.pause({from:owner});
        await expectRevert(WWWTokenInstance.unpause({from:user1}), "Ownable: caller is not the owner");
    });
})