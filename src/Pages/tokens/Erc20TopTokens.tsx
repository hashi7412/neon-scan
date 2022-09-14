import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import useStore, { NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface ERC20TokenListItem {
token:						string
	name: 					string
	symbol: 				string
	price: 					number
	btnPrice: 				number
	ftmPrice: 				number
	changePro: 				number
	volumn: 				number
	circulatingMarketCap: 	number
	onchainMarketCap: 		number
	holders: 				number
}

interface Erc20TopTokensStatus {
	data:			Array<ERC20TokenListItem>
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Erc20TopTokens = () => {
	const {sendJson, timeAgo} = useStore()
	const location = useLocation();
	const blockNumber = location && location?.search?.includes("block") ? Number(new URLSearchParams(location.search).get("block")) : 0
	const [status, setStatus] = React.useState<Erc20TopTokensStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	
	const onData = (page: number, limit: number) => {
		const mockdata:ERC20TokenListItem[] = [
			{
				token:					"0x111111111111111111",
				name: 					"fBTC",
				symbol: 				"FBTC",
				price: 					28509,
				btnPrice: 				28509,
				ftmPrice: 				28509,
				changePro: 				28509,
				volumn: 				28509,
				circulatingMarketCap: 	28509,
				onchainMarketCap: 		28509,
				holders: 				28509
			},
			{
				token:					"0x111111111111111111",
				name: 					"fETH",
				symbol: 				"FETH",
				price: 					28509,
				btnPrice: 				28509,
				ftmPrice: 				28509,
				changePro: 				28509,
				volumn: 				28509,
				circulatingMarketCap: 	28509,
				onchainMarketCap: 		28509,
				holders: 				28509
			}
		];
		if(limit!==status.limit) setStatus({...status, limit})
		setStatus({
			data:		mockdata,
			count:		mockdata.length,
			limit:		10,
			page:		0,
			total:		mockdata.length,
		});
	}

	// const onData = (page: number, limit: number) => {
	// 	if (limit!==status.limit) setStatus({...status, limit})
	// 	sendJson("get-txlist", blockNumber, page, limit).then(res=>{
	// 		if (res.result) {
	// 			const {data, count, total, page, limit} = res.result as {data: Erc20TopTokensStatus[], count: number, total: number, page: number, limit: number}
	// 			setStatus({
	// 				data,
	// 				count,
	// 				limit,
	// 				page,
	// 				total,
	// 			})
	// 		}
	// 	})
	// }

	const fields = [
		{key: 'name', 					label: 'Token', 				render: (v:any, i)=>(<Link className='mono' to={`/token/${i.token}`}>{`${v} (${i.symbol})`}</Link>)},
		{key: 'price', 					label: 'Price', 				render: (v:number, i)=>(
			<div>
				<code>${v}</code><br />
				<small className='nowrap'>
					<span>{i.btnPrice} BTC</span><br />
					<span>{i.ftmPrice} FTM</span>
				</small>
			</div>
		)},
		{key: 'changePro',label: 'Change (%)', 				render: (v:number)=>(
			v < 0 ? (
				<code style={{color: "red"}}>{v}%</code>
			) : (
				<code>{v}%</code>
			)
		)},
		{key: 'volumn',					label: 'Volume (24H)', 			align: "right",		render: (v:number)=><code>${NF(v)}</code>},
		{key: 'circulatingMarketCap', 	label: <div className='d-middle gap'>Circulating Market Cap<Icon icon="Question" /></div>,	align: "right",	render: (v:string)=><code>${NF(v)}</code>},
		{key: 'onchainMarketCap', 		label: 'On-Chain Market Cap', 	align: "right",		render: (v:number)=><code>${NF(v)}</code>},
		{key: 'holders', 				label: 'Holders', 				align: "right",		render: (v:number)=>(v)}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>ERC-20 Tokens<small className='badge badge-info badge-pill m-l-1'>ERC-20</small></h3>
				<div className='panel'>
					<Table 
						header={(
							<div>Showing {NF(status.count)} Token Contracts (From a total of {NF(status.total)} Token Contracts)</div>
						)}
						page={status.page}
						total={status.total}
						fields={fields} 
						data={status.data}
						onData={onData}
					/>
				</div>
			</section>
		</div>
	)
};

export default Erc20TopTokens;