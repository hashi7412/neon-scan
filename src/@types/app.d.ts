declare type AddressType = 'none'|'Contract'|'ERC20'|'ERC721'|'ERC1155'
declare type CodeFormatAppType = "single"|"multi"|"json"|"vyper"
declare type CodeFormatServerType = "solidity-single-file"|"solidity-standard-json-input"

declare type EvmVersionType = "default"|"homestead"|"tangerineWhistle"|"spuriousDragon"|"byzantium"|"constantinople"|"petersburg"|"istanbul"
declare type LicenseType = "none"|"Unlicense"|"MIT"|"GPLv2"|"GPLv3"|"LGPLv2.1"|"LGPLv3"|"BSC2Clause"|"MPL2"|"OSL3"|"Apache2"|"AGPLv3"|"BSL11"

declare interface LatestBlockObject {
	number: 				number
	miner?: 				string
	txn: 			        number
	gasUsed?:               number
	rewards: 				number
	created: 				number
}

declare interface LatestTxObject {
	txId: 					string
	from: 					string
	to: 					string
	value: 					number
	created: 				number
}

declare interface BlockObject {
	latestBlock?:			number
	blockNumber: 			number
	hash: 					string
	parentHash:				string
	miner: 					string				// always be 0x0000000000000000000000000000000000000000 in Lachesis 
	txn: 					number				// transaction count
	txnIn: 					number				// internal transaction count
	rewards: 				number				// in wei
	difficulty: 			number				// always be 0 in POS
	totalDifficulty: 		number				// always be 0 in POS
	size: 					number
	gasUsed: 				number				// in ether
	sha3Uncles: 			string
	nonce: 					number
	timestamp: 				number
}

declare interface SimpleTxObject {
	txId: 					string
	blockNumber?:			number
	method?:				string
	n:						number
	from: 					string
	to: 					string
	value: 					number
	nonce: 					number
	gasPrice?: 				number
	gasLimit?: 				number
	fee?: 					number
	timestamp: 				number
	creation?: 				boolean
}

declare interface SfcObject {
	baseRewardPerSecond: 	number
	totalSupply: 			number
	currentSealedEpoch: 	number
	currentEpoch: 			number
	lastValidatorID: 		number
	totalStake: 			number
	totalActiveStake: 		number
	totalSlashedStake: 		number
}

declare interface ValidatorObject {
	id: 					number
	address: 				string
	name: 					string
	logo: 					string
	downtime: 				number
	stakedAmount: 			number
	delegatedAmount: 		number
	totalStaking: 			number
	stakingStartEpoch: 		number
	blocknumber: 			number
	active: 				boolean
	online: 				boolean
	created: 				number
}


interface ContractDetailType {
	address: 				string
	name: 					string
	solc:					string		// solc version
	license:				string		// source code license
	optimized:				boolean		// is optimized
	runs:					number
	evmVersion:				EvmVersionType
	libs:					Array<{name: string, address: string}>
	args:					string		// ConstructorArguments
	proxy:					boolean
	implementation:			string
	abi:					any[]		// contract abi
	hash: 					string
	swarm: 					string
	settings:				any
	sourceCode:				string		// source code
	object:					string		// compiled byte code
	opcodes:				string
	sourceMap:				string
	error:					string
	audited:				boolean		// audited timestamp
	created:				number
}


interface AccountTxListType {
	data: 				ServerTxListItem[]
	count: 				number
	total: 				number
	page: 				number
	limit: 				number
}

declare interface ServerTokenBalanceObject {
	token: 				string
	name:				string
	symbol:				string
	value:				number
}

declare interface ServerEpochObject {
    id:						number
	endTime:				number
	epochFee:				number
	totalStake:				number
	totalSupply:			number
	txRewardWeight:			number
	baseRewardWeight:		number
}
declare interface ServerTxObject {
	latestBlockNumber:		number
	txId: 					string
	blockNumber:			number
	method:					string
	from: 					string				// account.id
	to: 					string|null			// account.id, if to=0, means null
	toIsContract:			boolean
	// contract: 				string|null			// account.id, if to=0, means null
	n: 						number				// transactionIndex
	value: 					number
	gasPrice: 				number
	gasLimit: 				number
	gasUsed: 				number
	maxFeePerGas?: 			number
	maxPriorityFeePerGas?:  number
	cumulativeGasUsed: 		number
	input: 					string
	nonce: 					number
	status:					boolean
	timestamp:				number
	creates:				Array<ServerContractCreationObject>
	transfers:				Array<ServerTransferObject>
	tokens:					Array<ServerTokenTransferObject>
	logs: 					Array<ServerTxLogObject>
}
declare interface ServerContractCreationObject {
	from:					string
	to:						string
	type:					AddressType
	name?:					string
	symbol?:				string
}

declare interface ServerTransferObject {
	from:					string
	to:						string
	value:					number
}
declare interface ServerTokenTransferObject {
	from:					string
	to:						string
	token:					string			// 
	type?:					AddressType
	name?:					string
	symbol?:				string
	tokenId?:				string
	value?:					number
}
declare interface ServerTxLogObject {
	address:				string
	topics:					string[]
	data:					string
}

// declare interface ServerTxObject {
// 	latestBlockNumber:		number
// 	txId: 					string
// 	blockNumber:			number
// 	method:					string
// 	from: 					string				// account.id
// 	to: 					string|null			// account.id, if to=0, means null
// 	toIsContract:			boolean
// 	// contract: 				string|null			// account.id, if to=0, means null
// 	n: 						number				// transactionIndex
// 	value: 					number
// 	gasPrice: 				number
// 	gasLimit: 				number
// 	gasUsed: 				number
// 	maxFeePerGas?: 			number
// 	maxPriorityFeePerGas?:  number
// 	cumulativeGasUsed: 		number
// 	input: 					string
// 	nonce: 					number
// 	status:					boolean
// 	timestamp:				number
// 	transfers:				Array<TransferObject>
// 	creates:				Array<ContractCreationObject>
// 	tokens:					Array<TokenTransferObject>
// 	logs: 					Array<TxLogObject>
// }

declare interface ServerTxListItem {
	txId: 					string
	blockNumber:			number
	method?:				string
	type?:					string
	from: 					string
	to: 					string
	fromIsContract: 		boolean
	toIsContract: 			boolean
	value?: 				number
	fee?: 					number
	status?:				boolean
	timestamp:				number
	token?:					string
	tokenId?:				string
	name?:					string
	symbol?:				string
}

declare interface ServerNftListItem {
	tokenId: 				string
	owner:					string
	value?:					number
	updated:				number
	created:				number
}


declare interface ServerTopAccountObject {
	rank:					number
	address:				string
	isContract?:			boolean
	value:					number
	txn:					number
}
declare interface ServerVerifiedContract {
	address:				string
	name:					string
	compiler:				string
	version:				string
	balance:				number
	txn:					number
	optimized:				boolean
	hasArgs:				boolean
	license: 				string
	audited:				number
	created:				number
}
declare interface ServerAddressObject {
	address:				string
	value:					number
	type:					AddressType
	name?:					string
	symbol?:				string
	decimals?:				number
	tag?: 					string
	creator?:				string
	txId?:					string
	validated?:				boolean
	verified?:				boolean
	logoUri?:				string
	website?:				string
	socials?:				Array<{
		type:				SocialType
		url:				string
	}>
	txn:					number	// normal transactions
	txn20:					number
	txn721:					number
	txn1155:				number
	txnIn:					number	// internal transactions
	erc20: 					Array<ServerTokenBalanceObject>
	erc721: 				Array<ServerTokenBalanceObject>
	erc1155: 				Array<ServerTokenBalanceObject>
	validator?:				ValidatorObject
}
declare interface ServerTokenObject {
	address:				string
	type:					AddressType
	name:					string
	symbol:					string
	decimals?:				number
	txn:					number
	txn20:					number
	txn721:					number
	txn1155:				number
	txnIn:					number
	holderCount:			number
	transferCount:			number
	validated:				boolean
	creator:				string
	txId:					string
}

declare interface ServerUserApiKey {
	id:						number
	appName: 				string
	apiKey: 				string
	usage: 					number
	created: 				number
}