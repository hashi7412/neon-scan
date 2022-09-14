import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import useStore, { ellipsis, NF, prettyFormat } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface Erc20TransfersStatus {
	data:			ServerTxListItem[]
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Erc20Transfers = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const location = useLocation();
	const blockNumber = location && location?.search?.includes("block") ? Number(new URLSearchParams(location.search).get("block")) : 0
	const [status, setStatus] = React.useState<Erc20TransfersStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-erc20txList", "", [], page, limit).then(res=>{
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
		{key: 'value', 		label: 'Value', 	align: 'right', render: (v: number)=><code>{v}</code>},
		{key: 'name', 		label: 'Token',		render: (v:string, i)=>(<div><Link className='mono' to={`/token/${i.address}`}>{ellipsis(i.name, 30)} ({i.symbol})</Link></div>)}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Token Transfers<small className='badge badge-info badge-pill m-l-1'>ERC-20</small></h3>
				<div className='panel'>
					<Table 
						header={(
							<div>A total of {NF(status.count)} txns found</div>
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

export default Erc20Transfers;