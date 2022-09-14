require("colors");
const { ethers } = require("ethers");

describe("UnitTest", () => {
	it("test", async ()=>{
		const from = '0xB15be0f638c8385386ef2ba0b20C7131BFfbf8eb'
		const fromPrivateKey = '0xbf63db69fed9629b6e23a7842e6a0cf67536eade8a099a2926c51c8eec98de23'
		const provider = new ethers.providers.JsonRpcProvider('https://testnet.neonlink.io')
		const signer = new ethers.Wallet(fromPrivateKey)
		const nonce = await provider.getTransactionCount(from)
		const to = '0xEAC94fDfCB98b0C19e9471EAa9aC1af212E05d8e'
		const chainId = 9559
		const value = "0.1"
		const gasLimit = ethers.utils.hexlify(1e5)
		const gasPrice = ethers.utils.hexlify(1e9)

		const tx = {
			nonce: ethers.utils.hexlify(nonce),
			from,
			to,
			value: ethers.utils.parseEther(value).toHexString(),
			gasLimit,
			gasPrice,
			chainId
		}
		// build the transaction
		const raw = await signer.signTransaction(tx)
		// send the transaction
		expect(raw).toEqual('0xf86e80843b9aca00830186a094eac94fdfcb98b0c19e9471eaa9ac1af212e05d8e88016345785d8a000080824ad1a0446d96a11ec4f85caf1a417548a913f59c4aa215d3b4761c10a18b173b9bb699a00418e915441ba3d077f7e07d8662da29f7fba54c8a21589e010bb9ed30812cc9')
	})

	it('send EIP1559 raw transaction', () => {
		// https://community.infura.io/t/axios-how-to-send-an-eip-1559-raw-transaction-in-js/5144
	})


	/*
	var signer = new ethers.Wallet('xxxxx', provider);

// .....

var contract = new ethers.Contract(ROUTER, CONTRACT_ABI);

var swap = contract.swapExactTokensForTokens(
	inputAmountHex,
	amountOutMinHex,
	path,
	WALLET,
	deadlineHex
);

var data = swap.encodeABI();

provider.getTransactionCount(WALLET).then(function(txCount){
	console.log(txCount);
	
	var gasPrice = tx.gasPrice;
	
	const txObject = {
		nonce: ethers.BigNumber.from(txCount),
		gasLimit: ethers.BigNumber.from('150000'),
		gasPrice: ethers.BigNumber.from(gasPrice),
		to: ROUTER,
		data: data,
	};
	
	const serializedTransaction = ownedTx.serialize();
	const raw = '0x' + serializedTransaction.toHexString();
	
	// Broadcast transaction
	signer.signTransaction(raw, function(err, txHash) {
		
	});
});

	
	*/
})
