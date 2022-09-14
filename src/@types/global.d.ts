declare interface Window {
	connector: 			IConnector
	ethereum: 			any
	ethers: 			any
	soljsonReleases: 	any
	PR: 				any
}

declare interface RpcRequestType {
	jsonrpc: 		"2.0"
	method: 		string
	params: 		Array<any>
	id: 			string|number
}

declare interface RpcResponseType {
	jsonrpc: 		"2.0"
	id: 			string|number
	result?: 		any
	error?: 		number
}

declare interface ServerResponse {
	result?:    		any
	error?:     		number
}

declare interface TokenObjectType {
	decimals:			number
	contract?:			string
}

declare interface NetworkType {
	bridge:				string
	chainId:			number
	confirmations:		number
	blocktime:			number
	rpc:				string
	explorer:			string
	erc20:				string
	tokens:				{[symbol: string]: TokenObjectType}
}

declare interface TxType {
	txId:				string
	chain:				string
	targetChain:		string
	address:			string
	token:				string
	value:				number
	created:			number
	receivedAmount?:	number | boolean // if failed, false
	updated:			number
}

declare interface MetmaskTxType {
	to:					string
	from:				string
	value:				string
	data:				string
	chainId:			string
}

declare interface AuthObject {
	uid:				string
	username: 			string
	email: 				string
	emailVerified:		boolean
	lastLogin: 			number
	lastIp: 			string
}

declare interface VerifyContractObject {
	address?:			string
	codeformat?:		string
	solc?:				string
	license?:			number
	args?: 				string
	libs?:				{[index: number]: {name: "", address: ""}}
	optimized?:			boolean
	runs?:				number
	evmVersion?:		string
	sourceCode?:		string
}

declare interface StoreObject {
	lang:				string
	theme:				string
	cookie?:			string
	account:			AuthObject|null
	tokenIcons:			{[address: string]: string}
	verify:				VerifyContractObject|null
	loading:			boolean
}