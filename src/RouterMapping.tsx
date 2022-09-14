import { useParams } from "react-router-dom";
import Home 				from "./Pages/Home";
import { validateAddress } from "./useStore";

import Login 				from "./Pages/auth/Login";
import Register 			from "./Pages/auth/Register";
import Lostpass 			from "./Pages/auth/Lostpass";

import TopAccounts 			from "./Pages/blockchain/TopAccounts";
import Block 				from "./Pages/blockchain/Block";
import Txs 					from "./Pages/blockchain/Txlist";
import Tx 					from "./Pages/blockchain/Tx";
import Account 				from "./Pages/blockchain/Account";
import Blocks 				from "./Pages/blockchain/Blocks";
import Pending 				from "./Pages/blockchain/Pending";
import TxsInternal 			from "./Pages/blockchain/TxInternal";

import Verify 				from "./Pages/more/Verifycontract";
import Pushtx 				from "./Pages/more/Pushtx";
import Vyper 				from "./Pages/more/Vyper";
import Opcodetool 			from "./Pages/more/Opcodetool";
import TxChart				from "./Pages/resources/charts/TxChart";


import Epochs 				from "./Pages/staking/Epochs";
import Validators 			from "./Pages/staking/Validators";

import Erc20TopTokens		from "./Pages/tokens/Erc20TokenList";
import Erc20Transfers		from "./Pages/tokens/Erc20Transfers";
import Erc721TopTokens		from "./Pages/tokens/Erc721TopTokens";
import Erc721Transfers		from "./Pages/tokens/Erc721Transfers";
import Erc1155TopTokens		from "./Pages/tokens/Erc1155TopTokens";
import Erc1155Transfers		from "./Pages/tokens/Erc1155Transfers";

import Charts				from "./Pages/resources/Charts";
import Erc20txns			from "./Pages/resources/charts/Erc20txns";
import AddressChart			from "./Pages/resources/charts/Address";
import Blocksize			from "./Pages/resources/charts/Blocksize";
import Blocktime			from "./Pages/resources/charts/Blocktime";
import Gasprice				from "./Pages/resources/charts/Gasprice";
import Gasused				from "./Pages/resources/charts/Gasused";
import BlocksChart			from "./Pages/resources/charts/Blocks";
import PendingtxChart 		from "./Pages/resources/charts/Pendingtx";
import TxFeeChart 			from "./Pages/resources/charts/Transactionfee";
import VerifiedContractChart from "./Pages/resources/charts/VerifiedContracts";

import MyAccount 			from "./Pages/account/MyAccount";
import MyAddress 			from "./Pages/account/MyAddress";
import Mynotestx 			from "./Pages/account/Mynotestx";
import Mynotesaddress 		from "./Pages/account/Mynotesaddress";
import Mytokenignore 		from "./Pages/account/Mytokenignore";
import MyApikey 			from "./Pages/account/MyApikeys";
import Myverifyaddress 		from "./Pages/account/Myverifyaddress";
import Mycustomaddress 		from "./Pages/account/Mycustomaddress";
import TopStatistics 		from "./Pages/resources/TopStat";
import ContractsVerified 	from "./Pages/blockchain/ContractsVerified";
import NoPage 				from "./Pages/404";
import VerifySolc 			from "./Pages/more/VerifyContractSolc";
import VerifySolcMultiple 	from "./Pages/more/VerifyContractSolcMulti";
import VerifySolcJson 		from "./Pages/more/VerifyContractSolcJson";
import VerifyVyper 			from "./Pages/more/VerifyContractVyper";
import UnitConverter 		from "./Pages/more/UnitConverter";
import TokenApprovals 		from "./Pages/more/TokenApprovals";
import VerifiedSignatures 	from "./Pages/more/VerifiedSignatures";
import VerifySig 			from "./Pages/more/VerifySig";
import SearchContract 		from "./Pages/more/SearchContract";
import SearchContractList 	from "./Pages/more/SearchContractList";
import GasTracker 			from "./Pages/more/GasTracker";
import MySetting 			from "./Pages/account/MySetting";
import MyProfile 			from "./Pages/account/MyProfile";
import Profile 				from "./Pages/account/Profile";
import NftProfile from "./Pages/nft/Profile";
import NftTxAssets from "./Pages/nft/TxAssets";
import NftHolders from "./Pages/nft/Holders";
import NftTxs from "./Pages/nft/Transactions";
import NftAssets from "./Pages/nft/Assets";


function AccountPage() {
	const params = useParams<{address: string}>();
	if (validateAddress(params.address)) return <Account type="address" address={params.address} />
	return NoPage
}

function TokenPage() {
	const params = useParams<{address: string}>();
	if (validateAddress(params.address)) return <Account type="token" address={params.address} />
	return NoPage
}

function NftPage() {
	const params = useParams<{address: string, tokenId: string}>();
	if (validateAddress(params.address)) return <Account type="token" address={params.address} extra={params.tokenId} />
	return NoPage
}

const mapping = {
	"/":								Home,									// Home page

	"/block/:height":					Block,						// block detail
	"/tx/:txId":						Tx,							// transaction detail
	"/address/:address":				AccountPage,				// address detail
	"/token/:address":					TokenPage,					// token detail	- https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52?a=0xB8c77482e45F1F44dE1745F52C74426C631bDD52
	"/nft/:address/:tokenId":			NftPage,					// nft detail - https://etherscan.io/nft/0xc4f57eaf046befcb6d1b4a6ad8ca4432ba98e5cb/1

	"/blocks":							Blocks,						// block list
	"/txs":								Txs,						// transaction list - ?block={number}
	"/txs/block":						Txs,						// transaction list - ?block={number}
	"/accounts":						TopAccounts,				// top accounts
	"/pending":							Pending,					// pending transactions
	"/txsInternal":						TxsInternal,				// internal transactions in contract
	"/contractsVerified":				ContractsVerified,						// verified contract

	"/validators":						Validators,					// validator list
	"/epochs":							Epochs,						// epoch list

	"/tokens":							Erc20TopTokens,				// erc20 top tokens
	"/tokentxns":						Erc20Transfers,				// erc20 transfers
	"/tokens-nft":						Erc721TopTokens,			// erc721 tokens
	"/tokentxns-nft":					Erc721Transfers,			// erc721 transfers
	"/tokens-nft1155":					Erc1155TopTokens,			// (new) erc1155 tokens
	"/tokentxns-nft1155":				Erc1155Transfers,			// (new) erc1155 transfers

	"/charts":							Charts,						// various statistics charts
	"/topstat":							TopStatistics,				// Top Statistics

	"/verifyContract":					Verify,						// Verify Contract
	"/verifyContract-solc":				VerifySolc,					// Verify Contract with solidity (single file)
	"/verifyContract-solc-multiple":	VerifySolcMultiple,			// Verify Contract with solidity (multiple)
	"/verifyContract-solc-json":		VerifySolcJson,				// Verify Contract with solidity (json)
	"/verifyContract-vyper":			VerifyVyper,				// Verify Contract with vyper
	"/opcode-tool":						Opcodetool,					// Bytecode to Opcode Disassembler
	"/pushTx":							Pushtx,						// Broadcast Raw Transaction
	"/vyper":							Vyper,						// Vyper Online Compiler (Experimental)
	"/labelcloud":						Home,						// Label Word Cloud
	"/tokenapprovalchecker":			TokenApprovals,						// Token Approvals
	"/gastracker":						GasTracker,					// chain Gas Tracker
	"/contactus":						Home,						// contact us
	"/solcversions":					Home,		
	"/unitconverter":					UnitConverter,				// unit converter
	"/verifiedSignatures":				VerifiedSignatures,			// verified signatures
	"/verifySig/:id":					VerifySig,					// verify sign details
	"/searchcontract":					SearchContract,				// search contract with keywords, address txhash date, block number etc.
	"/searchcontractlist":				SearchContractList,			// search contract list

	"/chart/tx":						TxChart,
	"/chart/erc20txns":					Erc20txns,
	"/chart/address":					AddressChart,
	"/chart/blocksize":					Blocksize,
	"/chart/blocktime":					Blocktime,
	"/chart/gasprice":					Gasprice,
	"/chart/gasused":					Gasused,
	"/chart/blocks":					BlocksChart,
	"/chart/pendingtx":					PendingtxChart,
	"/chart/transactionfee":			TxFeeChart,
	"/chart/verifiedcontracts":			VerifiedContractChart,

	

	"/myaccount":						MyAccount,					// my account page
	"/mysetting":						MySetting,					// my account page
	"/myprofile":						MyProfile,					// my account page
	"/myaddress":						MyAddress,					// My Watch List
	"/mynotes_tx":						Mynotestx,					// My Transactions Private Notes
	"/mynotes_address":					Mynotesaddress,				// My Address Private Notes
	"/mytokenignore":					Mytokenignore,				// My Token Ignore List
	"/myapikey":						MyApikey,					// My API Keys
	"/myverify_address":				Myverifyaddress,			// My Verified Addresses
	"/mycustomabi":						Mycustomaddress,			// My Custom ABIs
	"/profile/:userId":					Profile,					// My Custom ABIs
	// "*": 							NoPage						// Not found 

	"/nft/profile":						NftProfile,
	"/nft/tx-assets":					NftTxAssets,
	"/nft/tx-holders":					NftHolders,
	"/nft/txs":							NftTxs,
	"/nft/assets":						NftAssets
}
/* 

https://NeonScan.com/exportData?type=open-source-contract-codes
https://NeonScan.com/solcversions
https://NeonScan.com/contract-license-types

*/
export const authMappting = {
	"/login":							Login,						// login page
	"/register":						Register,					// register page
	"/lostpassword":					Lostpass,					// lost password
	"/reset-password":					Home,						// reset password
	"/confirmemail":					Home,						// confirmemail in regster
}

export default mapping;