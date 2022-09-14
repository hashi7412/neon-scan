import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore, { config, NF } from '../../useStore'
import NotPage from "../404";
import TabBar, { TabHeader } from '../../components/TabBar';
import Table, { TableHeader } from '../../components/Table';
import "./topstat.scss"

import MocTopStat from "./topstateMoc.json"
import TreeFormChart from '../../components/TreeChart';
import PieFormChart, { FieldObject } from '../../components/PieChart';

interface TotalObject {
	rank?:			number
	address:		string
	name?:			string
	symbol?:		string
	amount:			number
	isContract?:	boolean
	percentage?:	number
}

interface TotalTxsObject {
	topSender:			TotalObject
	topReceiver:		TotalObject
	topSendCount:		TotalObject
	topReceiveCount:	TotalObject
}

interface TotalTokensObject {
	topSender:			TotalObject
	topReceiver:		TotalObject
	topSendCount:		TotalObject
	topReceiveCount:	TotalObject
}

interface TotalNetworkObject {
	topGasUsed:			TotalObject
	topTxnCount:		TotalObject
}

interface TotalValidatorsObject {
	topBlockValidator:	TotalObject
}

interface OverviewObject {
	totalTxs:			TotalTxsObject
	totalTokens:		TotalTokensObject
	totalNetwork:		TotalNetworkObject
	totalValidator:		TotalValidatorsObject
}

interface TxRankingObject {
	topSenders:			TotalObject[]
	topReceivers:		TotalObject[]
	topSendCount:		TotalObject[]
	topReceiveCount:		TotalObject[]
}

interface TokenRankingObject {
	topBySenders:		TotalObject[]
	topByReceivers:		TotalObject[]
	topByTotal:			TotalObject[]
	topByTxnCount:		TotalObject[]
}

interface NetworkRankingObject {
	topGasUsed:			TotalObject[]
	topTxnCount:		TotalObject[]
}

interface TopStatStatus {
	tabKey: 			string

	overview?:			OverviewObject
	txs?:				TxRankingObject
	tokens?:			TokenRankingObject
	network?:			NetworkRankingObject

	overviewPeriod?:	number
	txsPeriod?:			number
	tokensPeriod?:		number
	networkPeriod?:		number
}

const TopStatistics = () => {
	const [status, setStatus] = React.useState<TopStatStatus>({
		tabKey:			"overview",

		overviewPeriod:		1,
		txsPeriod:			1,
		tokensPeriod:		1,
		networkPeriod:		1
	});

	const topTxFields = [
		{key: "rank",					label: "Rank",					render:(v:number)=>(v)},
		{key: "address",				label: "Address",				render:(v:string, i)=>(<Link to={`/address/${i.address}`}>{v}</Link>)},
		{key: "amount",					label: "Total Txn",				render:(v:number)=>(NF(v))},
		{key: "percentage",				label: "Percentage",			render:(v:number)=>(<code>{v}%</code>)}
	] as TableHeader[]

	const topTokenFields = [
		{key: "rank",					label: "Rank",					render:(v:number)=>(v)},
		{key: "name",					label: "Toke Name",				render:(v:string, i)=>(<Link to={`/address/${i.address}`}>{v} ({i.symbol})</Link>)},
		{key: "amount",					label: "Unique Senders",		render:(v:number)=>(NF(v))},
	] as TableHeader[]

	const topNetworkFields = [
		{key: "rank",					label: "Rank",					render:(v:number)=>(v)},
		{key: "address",				label: "Address",				render:(v:string, i)=>(<Link to={`/address/${v}`}>{v}</Link>)},
		{key: "amount",					label: "Gas Used",				render:(v:number, i)=>(<code>{NF(v)} ({i.percentage}%)</code>)},
	] as TableHeader[]

	const networkChartField = {
		name:			(i:any)=>(i.address),
		value:			(i:any)=>(Number(i.amount))
	} as FieldObject

	const tokenChartField = {
		name:			(i:any)=>(i.symbol),
		value:			(i:any)=>(Number(i.amount))
	}

	const onTabData = (tabKey: string, force?:boolean) => {
		setStatus({...status, tabKey})
		let method:{key: string, method: string}[] = [];
		let params = ["address", [], 0, 25]
		// address, query, page, limit
		switch (tabKey) {
		case 'overview':
			// method.push({key: "totalTxs", method: ""});
			setStatus({...status, tabKey, overview: MocTopStat.mocOverview})
			break
		case 'txs':
			setStatus({...status, tabKey, txs: MocTopStat.mocTxs})
			break
		case 'tokens':
			setStatus({...status, tabKey, tokens: MocTopStat.mocTokens})
			break
		case 'network':
			setStatus({...status, tabKey, network: MocTopStat.mocNetwork})
			break
		// if (method!=='') {
		// 	if (force || status[tabKey]===undefined) {
		// 		sendJson(method, ...params).then(res=>{
		// 			if (res.error) {
	
		// 			} else if (res.result) {
		// 				const data = res.result as any[]
		// 				setStatus({...status, tabKey, [tabKey]:data})
		// 			}
		// 		})
		// 	}
		}
	}
	
	const headers = [
		{key: 'overview', 		label: 'Overview'},
		{key: 'txs', 			label: 'Transaction'},
		{key: 'tokens', 		label: 'Tokens'},
		{key: 'network', 		label: 'Network'},
	] as TabHeader[]

	return (
		<div className='topstat'>
			<section className='container'>
				<h3>Top Statistics</h3>
				<TabBar headers={headers} onChange={tabKey=>onTabData(tabKey)}>
					{status.tabKey==='overview' && (
						<div>
							<div className='flex justify-content-between d-middle'>
								<div className='flex gap'>
									<button className={`btn${status.overviewPeriod===1?" active":""}`} onClick={()=>setStatus({...status, overviewPeriod:1})}>24 Hours</button>
									<button className={`btn${status.overviewPeriod===3?" active":""}`} onClick={()=>setStatus({...status, overviewPeriod:3})}>3 Days</button>
									<button className={`btn${status.overviewPeriod===7?" active":""}`} onClick={()=>setStatus({...status, overviewPeriod:7})}>7 Days</button>
								</div>
								<span className='gray'>{`14 Jun - 15 Jun`}</span>
							</div>
							<div className="section-split">
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Transactions</h4>
										</div>
										<div className="card-content">
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top {config.symbol} Sender</span>
													<span>Total {config.symbol}</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTxs.topSender.address}`}>
														{status.overview?.totalTxs.topSender.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTxs.topSender.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top {config.symbol} Receiver</span>
													<span>Total {config.symbol}</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTxs.topSender.address}`}>
														{status.overview?.totalTxs.topReceiveCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTxs.topReceiveCount.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Txn Count Sender</span>
													<span>Total Txn</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTxs.topSender.address}`}>
														{status.overview?.totalTxs.topReceiveCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTxs.topReceiveCount.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Txn Count Received</span>
													<span>Total Txn</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTxs.topSender.address}`}>
														{status.overview?.totalTxs.topReceiveCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTxs.topReceiveCount.amount))}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Tokens</h4>
										</div>
										<div className="card-content">
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Unique Sender</span>
													<span>Total</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTokens.topSender.address}`}>
														{status.overview?.totalTokens.topSender.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTokens.topSender.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Unique Receiver</span>
													<span>Total</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTokens.topSender.address}`}>
														{status.overview?.totalTokens.topReceiveCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTokens.topReceiveCount.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Total Uniques</span>
													<span>Total</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTokens.topSender.address}`}>
														{status.overview?.totalTokens.topReceiveCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTokens.topReceiveCount.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Txn Count</span>
													<span>Txn Count</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalTokens.topSender.address}`}>
														{status.overview?.totalTokens.topReceiveCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalTokens.topReceiveCount.amount))}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Network</h4>
										</div>
										<div className="card-content">
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Gas Used</span>
													<span>Gas Used</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalNetwork.topGasUsed.address}`}>
														{status.overview?.totalNetwork.topGasUsed.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalNetwork.topGasUsed.amount))}</span>
												</div>
											</div>
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Txn Count</span>
													<span>Txn Count</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalNetwork.topTxnCount.address}`}>
														{status.overview?.totalNetwork.topTxnCount.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalNetwork.topTxnCount.amount))}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col6">
									<div className="card h-100">
										<div className="card-header">
											<h4>Validators</h4>
										</div>
										<div className="card-content">
											<div style={{display: "block"}}>
												<div className="flex justify-content-between">
													<span>Top Blocks Validator</span>
													<span>Blocks Validated</span>
												</div>
												<div className="flex justify-content-between">
													<Link to={`/address/${status.overview?.totalValidator.topBlockValidator.address}`}>
														{status.overview?.totalValidator.topBlockValidator.address}
													</Link>
													<span className='gray'>{NF(Number(status.overview?.totalValidator.topBlockValidator.amount))}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{status.tabKey==='txs' && (
						<div>
							<div className='flex justify-content-between d-middle'>
								<div className='flex gap'>
									<button className={`btn${status.txsPeriod===1?" active":""}`} onClick={()=>setStatus({...status, txsPeriod:1})}>24 Hours</button>
									<button className={`btn${status.txsPeriod===3?" active":""}`} onClick={()=>setStatus({...status, txsPeriod:3})}>3 Days</button>
									<button className={`btn${status.txsPeriod===7?" active":""}`} onClick={()=>setStatus({...status, txsPeriod:7})}>7 Days</button>
								</div>
								<span className='gray'>{`14 Jun - 15 Jun`}</span>
							</div>
							<div className="section-split">
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Top {config.symbol} Senders</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={topTxFields}
												data={status.txs?.topSenders || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Top {config.symbol} Receivers</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={topTxFields}
												data={status.txs?.topReceivers || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Top Txn Count Sent</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={topTxFields}
												data={status.txs?.topSendCount || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
								<div className="col6">
									<div className="card">
										<div className="card-header">
											<h4>Top Txn Count Received</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={topTxFields}
												data={status.txs?.topReceiveCount || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{status.tabKey==='tokens' && (
						<div>
							<div className='flex justify-content-between d-middle'>
								<div className='flex gap'>
									<button className={`btn${status.tokensPeriod===1?" active":""}`} onClick={()=>setStatus({...status, tokensPeriod:1})}>24 Hours</button>
									<button className={`btn${status.tokensPeriod===3?" active":""}`} onClick={()=>setStatus({...status, tokensPeriod:3})}>3 Days</button>
									<button className={`btn${status.tokensPeriod===7?" active":""}`} onClick={()=>setStatus({...status, tokensPeriod:7})}>7 Days</button>
								</div>
								<span className='gray'>{`14 Jun - 15 Jun`}</span>
							</div>
							<div className="section-split">
								<div className="col4">
									<div className="card">
										<div className="card-header">
											<h4>Top Tokens by Unique Senders</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={[topTokenFields[0], topTokenFields[1], {...topTokenFields[2], label:"Unique Senders"}]}
												data={status.tokens?.topBySenders || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
								<div className="col4">
									<div className="card">
										<div className="card-header">
											<h4>Top Tokens by Unique Receivers</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={[topTokenFields[0], topTokenFields[1], {...topTokenFields[2], label:"Unique Receivers"}]}
												data={status.tokens?.topByReceivers || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
								<div className="col4">
									<div className="card">
										<div className="card-header">
											<h4>Top Tokens by Total Uniques</h4>
										</div>
										<div className="card-content">
											<Table 
												page={0}
												total={1}
												fields={[topTokenFields[0], topTokenFields[1], {...topTokenFields[2], label:"Total Uniques"}]}
												data={status.tokens?.topByTotal || []}
												options= {{hidePager: true}}
											/>
										</div>
									</div>
								</div>
								<div className='full'>
									<div className="card">
										<div className="card-header">
											<h4>Top Tokens by Txn Count</h4>
										</div>
										<div className="card-content section-split">
											<div className="col6">
												<div className='p-3'>
													<TreeFormChart 
														fields={tokenChartField}
														data={status.tokens?.topByTxnCount || []}
														isTooltip={true}
														colors={["red", "green", "blue"]}
													/>
												</div>
											</div>
											<div className="col6">
												<Table 
													page={0}
													total={1}
													fields={[topTokenFields[0], topTokenFields[1], {...topTokenFields[2], label:"Txn Count"}]}
													data={status.tokens?.topByTxnCount || []}
													options= {{hidePager: true}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{status.tabKey==='network' && (
						<div>
							<div className='flex justify-content-between d-middle m-b-1'>
								<div className='flex gap'>
									<button className={`btn${status.networkPeriod===1?" active":""}`} onClick={()=>setStatus({...status, networkPeriod:1})}>24 Hours</button>
									<button className={`btn${status.networkPeriod===3?" active":""}`} onClick={()=>setStatus({...status, networkPeriod:3})}>3 Days</button>
									<button className={`btn${status.networkPeriod===7?" active":""}`} onClick={()=>setStatus({...status, networkPeriod:7})}>7 Days</button>
								</div>
								<span className='gray'>{`14 Jun - 15 Jun`}</span>
							</div>
							<div className="section-split">
								<div className='full'>
									<div className="card">
										<div className="card-header">
											<h4>Top Accounts by Gas Used</h4>
										</div>
										<div className="card-content section-split">
											<div className="col6">
												<PieFormChart
													fields={networkChartField}
													data={status.network?.topGasUsed || []}
													isTooltip={true}
													colors={["red", "black", "yellow"]}
												/>
											</div>
											<div className="col6">
												<Table 
													page={0}
													total={1}
													fields={[topNetworkFields[0], topNetworkFields[1], {...topNetworkFields[2], label:"Gas Used"}]}
													data={status.network?.topGasUsed || []}
													options= {{hidePager: true}}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='full'>
									<div className="card">
										<div className="card-header">
											<h4>Top Accounts by Txn Count</h4>
										</div>
										<div className="card-content section-split">
											<div className="col6">
												<PieFormChart
													fields={networkChartField}
													data={status.network?.topTxnCount || []}
													isTooltip={true}
													colors={["red", "black", "gray"]}
												/>
											</div>
											<div className="col6">
												<Table 
													page={0}
													total={1}
													fields={[topNetworkFields[0], topNetworkFields[1], {...topNetworkFields[2], label:"Txn Count"}]}
													data={status.network?.topTxnCount || []}
													options= {{hidePager: true}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</TabBar>
			</section>
		</div>
	)
};

export default TopStatistics;