import React from 'react'
import { Link } from 'react-router-dom'

import useStore, { ellipsis, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface Erc721TransfersStatus {
	data:			ServerTxListItem[]
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Erc721Transfers = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const [status, setStatus] = React.useState<Erc721TransfersStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-erc721txList", "", [], page, limit).then(res=>{
			console.log(res);
			if (res.result) {
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
		{key: 'tokenId', 	label: 'TokenID',		render: (v:number, i)=><Link className='mono' to={`/token/${BigInt(v).toString()}`}>{BigInt(v).toString()}</Link>},
		{key: 'name', 		label: 'Token',			render: (v:string, i)=>(<div><Link className='mono' to={`/token/${i.address}/${BigInt(i.tokenId).toString()}`}>{ellipsis(i.name, 30)} ({i.symbol})</Link></div>)}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Non Fungible Tokens Transfers<small className='badge badge-info badge-pill m-l-1'>ERC-721</small></h3>
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

export default Erc721Transfers;