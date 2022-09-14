import React from "react"
import { Link } from "react-router-dom"
import Icon from "../../components/Icon"
import Table, { TableHeader } from "../../components/Table"
import { config } from "../../useStore"
import lowImg from "../../assets/low.webp"
import avgImg from "../../assets/avg.webp"
import highImg from "../../assets/high.webp"

import "./gastracker.scss"
import TabBar, { TabHeader } from "../../components/TabBar"
import Chart from "../resources/ChartView"

interface TableObject {
	data:				Array<any>
	count: 				number
	total: 				number
	page: 				number
	limit: 				number
}

interface GasTrackerStatus {
	timer:			number
	nowTime:		number
	lowPrice:		number
	lowBase:		number
	lowPriority:	number
	lowDiff:		number
	lowMins:		number
	lowSecs:		number,
	avgPrice:		number
	avgBase:		number
	avgPriority:	number
	avgDiff:		number
	avgMins:		number
	avgSecs:		number
	highPrice:		number
	highBase:		number
	highPriority:	number
	highDiff:		number
	highMins:		number
	highSecs:		number
	txCostData:		any[]
	lastBlock:		number
	tabKey:			string
	guzzlers:		TableObject
	spenders:		TableObject
	prices:			TableObject
}

const mockTxCostData = [
	{
		action:			"OpenSea: Sale",
		low:			4.66,
		avg:			4.66,
		high:			4.90,
		gasLimit:		123123
	},
	{
		action:			"Uniswap V3: Swap",
		low:			4.66,
		avg:			4.66,
		high:			4.90,
		gasLimit:		123123
	},
	{
		action:			"USDT: Transfer",
		low:			4.66,
		avg:			4.66,
		high:			4.90,
		gasLimit:		123123
	},
	{
		action:			"USDT: Transfer",
		low:			4.66,
		avg:			4.66,
		high:			4.90,
		gasLimit:		123123
	},
	{
		action:			"OpenSea: Sale",
		low:			4.66,
		avg:			4.66,
		high:			4.90,
		gasLimit:		123123
	}
]

const mockGuzzlers = [
	{
		rank:		1,
		name:		"OpenSea: Seaport 1.1",
		address:	"0x132123123",
		fee:		123123123,
		usedHrs:	6.06,
		fee24Hrs:	427642.84,
		used24Hrs:	8.7,
	}
]

const mockSpenders = [
	{
		rank:		1,
		name:		"OpenSea: Seaport 1.1",
		address:	"0x132123123",
		fee:		123123123,
		spentHrs:	6.06,
		fee24Hrs:	427642.84,
		spent24Hrs:	8.7,
	}
]

const mockPrices = [
	{
		block:		"123123",
		age:		123123,
		lowPrice:	123,
		avgPrice:	123,
		highPrice:	123123
	},
	{
		block:		"123123",
		age:		123123,
		lowPrice:	123,
		avgPrice:	123,
		highPrice:	123123
	}
]

const GasTracker = () => {
	const [status, setStatus] = React.useState<GasTrackerStatus>({
		timer:			0,
		nowTime:		Number(new Date()),
		lowPrice:		0,
		lowBase:		0,
		lowPriority:	0,
		lowDiff:		0,
		lowMins:		0,
		lowSecs:		0,
		avgPrice:		0,
		avgBase:		0,
		avgPriority:	0,
		avgDiff:		0,
		avgMins:		0,
		avgSecs:		0,
		highPrice:		0,
		highBase:		0,
		highPriority:	0,
		highDiff:		0,
		highMins:		0,
		highSecs:		0,
		txCostData:		[],
		lastBlock:		123,
		tabKey:			"guzzlers",
		guzzlers:		{
			data:				mockGuzzlers,
			count: 				0,
			total: 				0,
			page: 				0,
			limit: 				10
		},
		spenders:		{
			data:				mockSpenders,
			count: 				0,
			total: 				0,
			page: 				0,
			limit: 				10
		},
		prices:		{
			data:				mockPrices,
			count: 				0,
			total: 				0,
			page: 				0,
			limit: 				10
		}
	})

	// React.useEffect(() => {
	// 	setTimeout(() => {
	// 		setStatus({...status, timer: (status.timer+1)%16, nowTime: Number(new Date())})
	// 	}, 1000)
	// })

	const txCostFields = [
		{key: "action",		label: "Action",		render: (v) => (<span>{v}</span>)},
		{key: "low",		label: "Low",			render: (v) => (<span>${v}</span>)},
		{key: "avg",		label: "Avereage",		render: (v) => (<span>${v}</span>)},
		{key: "high",		label: "High",			render: (v) => (<span>${v}</span>)}
	] as TableHeader[]
	
	const onTabData = (k) => {
		setStatus({
			...status,
			tabKey: k
		})
	}

	const headers = [
		{key: 'guzzlers',	label: <><Icon icon="Pump" className="mr"/> {'Gas Guzzlers'}</>},
		{key: 'spenders',	label: <><Icon icon="PumpFill" className="mr"/> {'Gas Spenders'}</>},
		{key: 'prices',		label: <><Icon icon="Bar" className="mr"/> {'Historical Gas Oracle Prices'}</>},
	] as TabHeader[]

	const guzzlersFields = [
		{key: "rank",		label: "Rank",				render: (v: string) => (<span>{v}</span>)},
		{key: "name", 		label: "Address",			render: (v: string, i: any) => (<Link to={`/address/{i.address}`}>{v}</Link>)},
		{key: "fee", 		label: "Fees Last 3hrs",	render: (v: number) => (<span>${v}<span className="gray">({v} Eth)</span></span>)},
		{key: "usedHrs", 	label: "% Used 3hrs",		render: (v: number) => (
			<div>
				<span>{v}%</span>
				<div className="progressbar">
					<div className="bar" style={{width: `${30}%`}}></div>
				</div>
			</div>
		)},
		{key: "fee24Hrs", 	label: "Fees Last 24hrs",	render: (v: number) => (<span>${v}<span className="gray">({v} Eth)</span></span>)},
		{key: "used24Hrs", 	label: "Used 24hrs",		render: (v: number) => (<span>{v}%</span>)},
		{key: "address", 	label: "Analytics",			render: (v: string) => (<Link to={`/address/${v}`} className="d-middle"><Icon icon="ChartLine" /></Link>)}
	] as TableHeader[]

	const spendersFields = [
		{key: "rank",		label: "Rank",				render: (v: string) => (<span>{v}</span>)},
		{key: "name", 		label: "Address",			render: (v: string, i: any) => (<Link to={`/address/{i.address}`}>{v}</Link>)},
		{key: "fee", 		label: "Fees Last 3hrs",	render: (v: number) => (<span>${v}<span className="gray">({v} Eth)</span></span>)},
		{key: "spentHrs", 	label: "% Spent 3hrs",		render: (v: number) => (
			<div>
				<span>{v}%</span>
				<div className="progressbar">
					<div className="bar" style={{width: `${30}%`}}></div>
				</div>
			</div>
		)},
		{key: "fee24Hrs", 	label: "Fees Last 24hrs",	render: (v: number) => (<span>${v}<span className="gray">({v} Eth)</span></span>)},
		{key: "spent24Hrs", 	label: "Spent 24hrs",	render: (v: number) => (<span>{v}%</span>)},
		{key: "address", 	label: "Analytics",			render: (v: string) => (<Link to={`/address/${v}`} className="d-middle"><Icon icon="ChartLine" /></Link>)}
	] as TableHeader[]

	const pricesFields = [
		{key: "block",		label: "Block",				render: (v: string) => (<span>{v}</span>)},
		{key: "age", 		label: "Address",			render: (v: string, i: any) => (<Link to={`/address/{i.address}`}>{v}</Link>)},
		{key: "lowPrice", 	label: "Low Gas Price",		render: (v: number) => (<span>{v} gwei</span>)},
		{key: "avgPrice", 	label: "Average Gas Price",	render: (v: number) => (<span>{v} gwei</span>)},
		{key: "highPrice", 	label: "High Gas Price",	render: (v: number) => (<span>{v} gwei</span>)},
	] as TableHeader[]

	return (
		<div className="gas-tracker">
			<section className="container">
				<h3>{config.chain} Gas Tracker</h3>
				<div className="section-split">
					<div className="col6">
						<div className="panel">
							<div className="d-middle justify-content-between gap">
								<span>Next update in {15-status.timer}s</span>
								<span className="d-middle">
									<span>{new Date(status.nowTime).toString()}</span>
									<a href={'https://'}><Icon icon="Twitter" className="ml" size={30} /></a>
								</span>
							</div>
							<div className="section-split">
								<div className="col4">
									<div className="card d-middle flex column">
										<strong className="d-middle"><img className="m-r-1" src={lowImg} height={20} alt="low" />Low</strong>
										<div className="text-center">
											<h4 className="gray">{status.lowPrice} gwei</h4>
											<span className="gray">Base: {status.lowBase} | priority: {status.lowPriority}</span><br />
											<span className="gray">${status.lowDiff} | ${status.lowMins}: {status.lowSecs} secs</span>
										</div>
									</div>
								</div>
								<div className="col4">
									<div className="card d-middle flex column">
										<strong className="d-middle"><img className="m-r-1" src={avgImg} height={20} alt="avg" />Low</strong>
										<div className="text-center">
											<h4 className="gray">{status.avgPrice} gwei</h4>
											<span className="gray">Base: {status.avgBase} | priority: {status.avgPriority}</span><br />
											<span className="gray">${status.avgDiff} | ${status.avgMins}: {status.avgSecs} secs</span>
										</div>
									</div>
								</div>
								<div className="col4">
									<div className="card d-middle flex column">
										<strong className="d-middle"><img className="m-r-1" src={highImg} height={20} alt="high" />Low</strong>
										<div className="text-center">
											<h4 className="gray">{status.highPrice} gwei</h4>
											<span className="gray">Base: {status.highBase} | priority: {status.highPriority}</span><br />
											<span className="gray">${status.highDiff} | ${status.highMins}: {status.highSecs} secs</span>
										</div>
									</div>
								</div>
							</div>
							<div className="d-middle justify-content-between" style={{padding: "0 15px"}}>
								<span>Estimated Cost of Transaction Actions:</span>
								<a className="btn btn-primary btn-sm" href="https://docs.deamscan.io/api-endpoints/gas-tracker">View API</a>
							</div>
							<div>
								<div className="scroll" style={{height: "170px"}}>
									<Table
										data={mockTxCostData}
										fields={txCostFields} 
										page={status.txCostData.length}
										total={status.txCostData.length}
										options={{hidePager: true}}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col6">
						<Chart
							method='get-chart-address'
							type='bar'
							title="{chain} Unique Addresses Chart"
							yTipLabel="Total Distinct Addresses"
							options={{hideTitle: true}}
						/>
					</div>
					<div className="full">
						<TabBar headers={headers} tabKey={status.tabKey} onChange={tabKey=>onTabData(tabKey)}>
							{status.tabKey === "guzzlers" && (
								<div>
									<div className="text-right">
										<span>Last updated at Block <Link to={`/block/${status.lastBlock}`}>{status.lastBlock}</Link></span>
									</div>
									<Table 
										header={<span>Top 50 Gas Guzzlers (Contracts / Accounts that consume a lot of Gas)</span>}
										data={status.guzzlers.data}
										fields={guzzlersFields}
										page={status.guzzlers.page}
										total={status.guzzlers.total}
									/>
								</div>
							)}
							{status.tabKey === "spenders" && (
								<div>
									<div className="text-right">
										<span>Last updated at Block <Link to={`/block/${status.lastBlock}`}>{status.lastBlock}</Link></span>
									</div>
									<Table 
										header={<span>Top 50 Gas Spenders  (Sending Accounts that pay a lot of Gas)</span>}
										data={status.spenders.data}
										fields={spendersFields}
										page={status.spenders.page}
										total={status.spenders.total}
									/>
								</div>
							)}
							{status.tabKey === "prices" && (
								<div className="text-center">
									<Chart
										method='get-chart-address'
										type='line'
										title="7 Day Historical Oracle Gas Prices"
										yTipLabel="Gas Price(gwei)"
										options={{hideTitle: true}}
									/>
									<Table 
										header={<span>Historical Data For Gas Oracle Prices</span>}
										data={status.prices.data}
										fields={pricesFields}
										page={status.prices.page}
										total={status.prices.total}
									/>
								</div>
							)}
						</TabBar>
					</div>
				</div>
				<div>
					<p className="gray">Gas fee refers to the fee required to successfully conduct a transaction on the Ethereum blockchain. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in gwei. Learn more about Gas in our <a href="https://info.ethereum.com/what-is-gas-fee">Knowledge Base</a>.</p>
				</div>
			</section>
		</div>
	)
}

export default GasTracker