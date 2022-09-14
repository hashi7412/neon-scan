import React from "react"
import { Link, useHistory } from "react-router-dom"
import Icon from "../../components/Icon"
import Table, { TableHeader } from "../../components/Table"

import "./searchcontract.scss"

interface ResultObject {
	address:			string
	resText:			string
	tokenName?:			string
	tokenAddress?:		string
	contractName:		string
	publishDate:		number
	license?:			string
	txCount:			number
}

interface SearchContractStatus{
	resData:            Array<ResultObject>
	sortby:				string
	bysolversion:		string
	bylicense:			string
	bycontract:			string
	bydeployer:			string
	byblockfrom:		string
	byblockto:			string
	bydatefrom:			number
	bydateto:			number
	count:				number
	limit:				number
	page:				number
	total:				number
}

const mockData:Array<ResultObject> = [
	{
		address:			"0xd7027082b3f887a4a68112b7fef1ecd2897ca7e7",
		resText:			`nt _HEX_SYMBOLS = "0123456789abcdef"; /** * @dev C`,
		tokenName:			"USDT",
		tokenAddress:		"0x9dcc5d0d994a951226b37c88d088b5e309e71333",
		contractName:		"KRUExchangeForwarder",
		publishDate:		10123123,
		license:			"MIT",
		txCount:			10
	},
	{
		address:			"0xfc916f19c62c6587e0a838bc7210179cbc637333",
		resText:			"AKE_FOR_APR_STAKE = 123; uint256 constant CAN_FORWARD_FORWAR",
		tokenName:			"ETHEREUM",
		tokenAddress:		"0x9dcc5d0d994a951226b37c88d088b5e309e71333",
		contractName:		"KRUExchangeForwarder",
		publishDate:		10123123,
		license:			"MIT",
		txCount:			10
	},
	{
		address:			"0x9dcc5d0d994a951226b37c88d088b5e309e71333",
		resText:			"_BABL_CAP_REACHED = 123;\n // Not enough BABL\n uint256 i",
		tokenName:			"BITCOIN",
		tokenAddress:		"0x9dcc5d0d994a951226b37c88d088b5e309e71333",
		contractName:		"KRUExchangeForwarder",
		publishDate:		10123123,
		license:			"MIT",
		txCount:			10
	}
]

const SearchContractList = () => {
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

	const [status, setStatus] = React.useState<SearchContractStatus>({
		resData:            [],
		bysolversion:		"0.1.1",
		bylicense:			"mit",
		bycontract:			"",
		bydeployer:			"",
		byblockfrom:		"",
		byblockto:			"",
		bydatefrom:			123123,
		bydateto:			123123,
		sortby:             "",
		count:				0,
		limit:				10,
		page:				0,
		total:				0,
	});

	const [query, setQuery] = React.useState("")

	const onData = (page: number, limit: number) => {
		setStatus({
			...status,
			resData:		mockData,
			count:		mockData.length,
			limit,
			page,
			total:		mockData.length,
		})
	}

	const fields = [
		{key: "address",		label:"", 	render:(v:string, i:any)=>(
			<div className="card">
				<div>
					<Link to={`/address/${v}`}>{v}</Link>
				</div>
				<p>{i.resText}</p>
				<div className="d-middle">
					{i.tokenAddress && <Link to={`/token/${i.tokenAddress}`}>{i.tokenName}</Link>}
					{<p className="d-middle"><Icon icon="FileEarmarkPerson" />{i.contractName}</p>}
					{<span className="d-middle"><Icon icon="Calendar" />{(new Date(i.publishDate).toDateString())}</span>}
					<span className="d-middle"><Icon icon="File" />{i.license}</span>
					<span className="d-middle">
						<Icon icon="Exchange" />
						<Link to={`/txs?${v}`}>{i.txCount} txn</Link>
					</span>
				</div>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="search-contract-list">
			<section className="container">
				<h3>Smart Contract Search</h3>
				<section className='search'>
					<div>
						<div>
							<input type="text" placeholder='Search smart contracts source codes' value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={(e)=>(e.key==="Enter" && onSearch())} />
							<button className='d-middle' onClick={()=>onSearch()}><Icon icon="Search" size={20} /></button>
						</div>
					</div>
				</section>
				<div className="panel">
					<div className="section-split row-reverse">
						<div className="col3">
							<h4 className="m-t-1">Advanced Filter</h4>
							<div className="input-field">
								<label htmlFor="version">Solidity Version</label>
								<select className="input input-block" name="version" id="version" onChange={(e)=>setStatus({...status, bysolversion: e.target.value})} value={status.bysolversion}>
									<option value="0.1.0">0.1.0</option>
									<option value="0.2.0">0.2.0</option>
									<option value="0.6.0">0.6.0</option>
								</select>
							</div>
							<div className="input-field">
								<label htmlFor="license">Contract License</label>
								<select className="input input-block" name="license" id="license" onChange={(e)=>setStatus({...status, bylicense: e.target.value})} value={status.bylicense}>
									<option value="0.1.0">0.1.0</option>
									<option value="0.2.0">0.2.0</option>
									<option value="0.6.0">0.6.0</option>
								</select>
							</div>
							<div className="input-field">
								<label htmlFor="contract">Contract Address</label>
								<input type="text" className="input input-block" name="contract" id="contract" onChange={(e)=>setStatus({...status, bycontract: e.target.value})} value={status.bycontract} placeholder="Contract Address" />
							</div>
							<div className="input-field">
								<label htmlFor="deployer">Deployer Address</label>
								<input type="text" className="input input-block" name="deployer" id="deployer" onChange={(e)=>setStatus({...status, bydeployer: e.target.value})} value={status.bydeployer} placeholder="Deployer Address" />
							</div>
							<div className="input-field input-scape">
								<label htmlFor="">Block Numbers</label>
								<div>
									<input type="number" className="input" name="blockfrom" min={1} id="blockfrom" onChange={(e)=>setStatus({...status, byblockfrom: e.target.value})} value={status.byblockfrom} placeholder="From" />
									<input type="number" className="input" name="blockto" min={1} id="blockto" onChange={(e)=>setStatus({...status, byblockto: e.target.value})} value={status.byblockto} placeholder="To" />
								</div>
							</div>
							<div className="input-field">
								<label htmlFor="datefrom">Date From</label>
								<input type="date" className="input input-block" name="datefrom" id="datefrom" onChange={(e)=>setStatus({...status, bydatefrom: Number(e.target.value)})} value={status.bydatefrom} placeholder="" />
							</div>
							<div className="input-field">
								<label htmlFor="dateto">Date To</label>
								<input type="date" className="input input-block" name="dateto" id="dateto" onChange={(e)=>setStatus({...status, bydateto: Number(e.target.value)})} value={status.bydateto} placeholder="" />
							</div>
							<button className="btn btn-primary btn-block m-b-2">Apple</button>
							<button type="reset" className="btn btn-block">Reset all</button>
						</div>
						<div className="col9">
							<div>
								<div className="text-right">
									<select className="input" onChange={(e) => setStatus({...status, sortby: e.target.value})} value={status.sortby}>
										<option value="bydefault" selected={status.sortby === "bydefault"}>Sort by</option>
										<option value="bynew" selected={status.sortby === "bynew"}>Newest To Oldest</option>
										<option value="byold" selected={status.sortby === "byold"}>Oldest To Newest</option>
										<option value="bynametag" selected={status.sortby === "bynametag"}>With Name Tag</option>
										<option value="bynametagrev" selected={status.sortby === "bynametagrev"}>Without Name Tag</option>
										<option value="bytxnvolume" selected={status.sortby === "bytxnvolume"}>Txn Volume Asc</option>
										<option value="bytxnvolumerev" selected={status.sortby === "bytxnvolumbytxnvolumereve"}>Txn Volume Desc</option>
									</select>
								</div>
								<Table 
									header={<p>A total of <b>{status.resData.length}</b> records found</p>}
									data={status.resData} 
									fields={fields} 
									page={status.page} 
									total={status.total}
									onData={onData}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default SearchContractList