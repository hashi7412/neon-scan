import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import useStore, { ellipsis, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface Erc1155TransfersStatus {
	data:			ServerTxListItem[]
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Erc1155Transfers = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const location = useLocation();
	const blockNumber = location && location?.search?.includes("block") ? Number(new URLSearchParams(location.search).get("block")) : 0
	const [status, setStatus] = React.useState<Erc1155TransfersStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		// "get-erc1155txList": async (cookie, session, ip, params)=>{
		// let [address, query, page, limit] = params as [address: string, query: Array<{field: 'from'|'to', value: string}>, page: number, limit: number]
			
		sendJson("get-erc1155txList", "", [], page, limit).then(res=>{
			if (res.result) {
				console.log(res.result);
				const {data, count, total, page, limit} = res.result as {data: ServerTxListItem[], count: number, total: number, page: number, limit: number}
				setStatus({
					data,
					count,
					limit,
					page,
					total,
				})
			}
			showLoading(false)
		})
	}

	const fields = [
		{key: 'txId', 		label: 'Txn Hash', 		render: (v:string)=>(<Link className='mono' to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>)},
		{key: 'timestamp',	label: 'Age', 			render: (v:number)=>(timeAgo(v))},
		{key: 'from', 		label: 'From', 			render: (v:string, i)=>(
			<div className='d-middle'>
				{i.fromIsContract && <Icon icon="File" className='mr' />}
				<Link className='mono' to={`/address/${v}`} title={v}>{ellipsis(v)}</Link>
			</div>
		)},
		{key: 'to', 		label: 'To', 			render: (v:string, i)=>(
			<div className='d-middle'>
				{i.toIsContract && <Icon icon="File" className='mr' />}
				<Link className='mono' to={`/address/${v}`} title={v}>{ellipsis(v)}</Link>
			</div>
		)},
		{key: 'tokenId', 	label: 'TokenID',		render: (v:number, i)=><Link className='mono' to={`/token/${i.token}`}>{BigInt(v).toString()}</Link>},
		{key: 'value', 		label: 'Value', 	align: 'right', render: (v:number)=><code>{NF(v)}</code>},
		{key: 'name', 		label: 'Token',			render: (v:string, i)=>(<div><Link className='mono' to={`/token/${i.token}/${BigInt(i.tokenId).toString()}`}>{ellipsis(v, 30)} ({i.symbol})</Link></div>)},
		/* {key: 'token', 		label: 'Details',		render: (v:string, i)=>(<div><Link className='btn btn-primary mono' to={`/nft/${v}/${i.txId}`}>View NFT{'>'}</Link></div>)} */
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Transactions {blockNumber!==0 && <small className='gray mr-1'>For Block <Link to={`/block/${blockNumber}`}>#{blockNumber}</Link></small>}</h3>
				<div className='panel'>
					<Table 
						header={(
							<div>{NF(status.count)} transactions found</div>
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

export default Erc1155Transfers;