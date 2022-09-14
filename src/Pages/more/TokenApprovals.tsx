import React from "react"
import { useHistory } from "react-router-dom"
import Icon from "../../components/Icon"
import useStore from "../../useStore"
import SortImg from "../../assets/sort.svg"
import TabBar, { TabHeader } from "../../components/TabBar"
import Table, { TableHeader } from "../../components/Table"

import "./tokenapproval.scss"

interface ERCObject {
	txnHash:			string
	lastUpdated:		number
	assets:				number
	approvedSpender:	string
	allowance?:			number
	tokenId?:			string
}

interface TableObject {
	data:				Array<ERCObject>
	count: 				number
	total: 				number
	page: 				number
	limit: 				number
}

interface TokenApprovalStatus {
	isWalletConnect:	boolean
	tabKey:				string
	erc20:				TableObject
	erc721:				TableObject
	erc1155:			TableObject
	erc721Mode:	boolean
}

const mockData = {
	erc20: [
		{
			txnHash:			"0x123123123123",
			lastUpdated:		34123123,
			assets:				121212,
			approvedSpender:	"0x123123123123",
			allowance:			2222
		}
	],
	erc721: [
		{
			txnHash:			"0x123123123123",
			lastUpdated:		34123123,
			assets:				121212,
			approvedSpender:	"0x123123123123",
			tokenId:			"123"
		}
	],
	erc1155: [
		{
			txnHash:			"0x123123123123",
			lastUpdated:		34123123,
			assets:				121212,
			approvedSpender:	"0x123123123123"
		}
	]
}

const TokenApprovals = () => {
	const { T, timeAgo, sendJson } = useStore()
	const history = useHistory()

	const onSearch = () => {
		const len = query.length
		if (len > 0) {
			if (/^[0-9]*$/i.test(query)) {
				history.push(`/block/${query}`)
			} else if (/^(0x)?[0-9a-fA-F]*$/i.test(query)) {
				if (len===42) {
					history.push(`/address/${query}`)
				} else if (len===66) {
					history.push(`/tx/${query}`)
				}
			}
		}
	}

	const [status, setStatus] = React.useState<TokenApprovalStatus>({
		isWalletConnect:        false,
		tabKey:					"erc20",
		erc20:					{
			data:				[],
			count: 				0,
			total: 				0,
			page: 				0,
			limit: 				10
		},
		erc721:					{
			data:				[],
			count: 				0,
			total: 				0,
			page: 				0,
			limit: 				10
		},
		erc1155:				{
			data:				[],
			count: 				0,
			total: 				0,
			page: 				0,
			limit: 				10
		},
		erc721Mode:		false
	})

	const [query, setQuery] = React.useState("")

	const walletConnect = () => {
		setStatus({
			...status,
			isWalletConnect: true,
		})
	}
	
	const onTabData = (k) => {
		setStatus({
			...status,
			tabKey: k
		})
	}

	const headers = [
		{key: 'erc20',		label: 'ERC-20'},
		{key: 'erc721',		label: 'ERC-721'},
		{key: 'erc1155',	label: 'ERC-1155'},
	] as TabHeader[]

	const ercFields = [
		{key: "txnHash",			label: "Txn Hash",				render: (v:string) => (<span>{v}</span>)},
		{key: "lastUpdated",		label: "Last Updated (UTC)",	render: (v:number) => (timeAgo(v))},
		{key: "assets",				label: "Assets",				render: (v:string) => (v)},
		{key: "approvedSpender",	label: "Approved Spender",		render: (v:string) => (v)},
	] as TableHeader[]

	const lastField = {
		key: "Allowance",
		label: "Allowance",
		render: (v:string) => (<code>{v}</code>)
	} as TableHeader

	const tokenField = {
		key: "tokenId",
		label: "Token ID",
		render: (v:string) => (<code>{v}</code>)
	} as TableHeader

	return (
		<div className="token-approvals">
			<section className="container">
				<h3 className="text-center m-b-2">Ethereum Token Approval<br /><small className="gray">Review and revoke your token approvals for an dApp. For more information, check our Knowledge Base <a href="https://info.deam.com/tokenapprovals">article</a></small></h3>
				<section className='search'>
					<div>
						<div>
							<input type="text" placeholder='Search by Address or ENS' value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={(e)=>(e.key==="Enter" && onSearch())} />
							<button className='d-middle' onClick={()=>onSearch()}><Icon icon="Search" size={20} /></button>
						</div>
					</div>
				</section>
				<button className="btn btn-primary m-b-2" onClick={walletConnect}>Connect to Web3</button>
				{!status.isWalletConnect 
					? (
						<div className="panel m-b-2" style={{padding: "50px 0"}}>
							<div className="text-center">
								<img src={SortImg} width={250}></img>
								<h3 className="m-b-2">
									Revoke Token Approvals<br />
									<small className="gray">Review and revoke your token approvals for any dApp.</small>
								</h3>
								<button className="btn btn-primary" onClick={walletConnect}>Connect to Web3</button>
							</div>
						</div>
					) : (
						<TabBar headers={headers} tabKey={status.tabKey} onChange={tabKey=>onTabData(tabKey)}>
							{status.tabKey==='erc20' && (
								<div>
									<div className="text-right">
										<div className="d-middle" style={{justifyContent: "right"}}>
											<label htmlFor="erc20_filter">Filter by :&nbsp; </label>
											<button className="btn gray text-left d-middle">Filter<Icon icon="ChevronDown" /></button>
										</div>
									</div>
									<Table
										data={status.erc20.data}
										fields={[...ercFields, lastField]}
										page={status.erc20.page}
										total={status.erc20.total}
									/>
								</div>
							)}
							{status.tabKey==='erc721' && (
								<div>
									<div className="d-middle" style={{justifyContent: "right"}}>
										<div className="d-middle m-r-1">
											<label htmlFor="erc721_bytokenid">{status.erc721Mode?"By Contract":"By Token ID"}</label>
											<div className={`checkbox ${status.erc721Mode && " checked"}`} onClick={() => setStatus({...status, erc721Mode: !status.erc721Mode})}>
												<span></span>
											</div>
										</div>
										<div className="d-middle">
											<label htmlFor="erc721_filter">Filter by :&nbsp; </label>
											<button className="btn gray text-left d-middle">Filter<Icon icon="ChevronDown" /></button>
										</div>
									</div>
									<Table
										data={status.erc721.data}
										fields={status.erc721Mode?ercFields:[...ercFields, tokenField]}
										page={status.erc721.page}
										total={status.erc721.total}
									/>
								</div>
							)}
							{status.tabKey==='erc1155' && (
								<div>
									<div className="text-right">
										<div className="d-middle" style={{justifyContent: "right"}}>
											<label htmlFor="erc1155_filter">Filter by :&nbsp; </label>
											<button className="btn gray text-left d-middle">Filter<Icon icon="ChevronDown" /></button>
										</div>
									</div>
									<Table
										data={status.erc1155.data}
										fields={ercFields}
										page={status.erc1155.page}
										total={status.erc1155.total}
									/>
								</div>
							)}
						</TabBar>
					)
				}
				<p className="gray flex">
					<p>The token Approvals page lists contracts that have been approved to spend an address's tokens. The at risk amount shows what is vulnerable if the contracts were hacked. Learn more about this page in our <a href="https://info.deam.com/tokenapprovals">Knowledge Base</a></p>
				</p>
			</section>
		</div>
	)
}

export default TokenApprovals