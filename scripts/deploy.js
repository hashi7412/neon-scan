require('dotenv').config();
require('colors');
const fs = require('fs');
const testnet = process.env.TESTNET==="1"

const configFile = __dirname + '/../src/config/networks' + (testnet ? '.testnet' : '') + '.json'

const networks = require(configFile);

/* const abiIrc20 = require("../artifacts/contracts/ERC20.sol/ERC20.json");
const abiBridge = require("../artifacts/contracts/Bridge.sol/Bridge.json");
 */
const hre = require("hardhat");

async function main() {
	const netid = 'AXIS'
	const newToken = 'ETH'

	const admin = process.env.ADMIN_PUBKEY;
	const signer = await hre.ethers.getSigner();
	console.log('Starting ' + netid + ' deploy by ', signer.address.yellow);
	const Bridge = await hre.ethers.getContractFactory("Bridge");
	const bridge = await Bridge.deploy(admin);
	await bridge.deployed();
	console.log('Bridge ' + bridge.address);

	const Token = await hre.ethers.getContractFactory('Token');
	const token = await Token.deploy("Pegged " + newToken, newToken, 18);
	await token.deployed();
	console.log(newToken + ' ' + token.address);

	const tx1 = await token.transferOwnership(bridge.address)
	await tx1.wait()

	const tx2 = await bridge.addToken(token.address)
	await tx2.wait()

	fs.writeFileSync(configFile, JSON.stringify({
		...networks, 
		[netid]: {
			...networks[netid],
			bridge: bridge.address,
			tokens: {
				...networks[netid].tokens,
				[newToken]: {
					...networks[netid].tokens[newToken],
					contract: token.address
				}
			}
		}
	}, null, 4));
}

main().then(() => {
}).catch((error) => {
	console.error(error);
	process.exit(1);
});
