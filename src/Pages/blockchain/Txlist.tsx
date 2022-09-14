import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import useStore, { ellipsis, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface TxlistStatus {
	data:			SimpleTxObject[]
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Txlist = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const location = useLocation()
	const blockNumber = location && location?.search?.includes("block") ? Number(new URLSearchParams(location.search).get("block")) : 0
	const [status, setStatus] = React.useState<TxlistStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-txlist", blockNumber, page, limit).then(res=>{
			if (res.result) {
				const {data, count, total, page, limit} = res.result as {data: SimpleTxObject[], count: number, total: number, page: number, limit: number}
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
		{key: 'txId', 		label: 'Txn Hash', 	render: (v:string, i)=>(
			<div className='d-middle gap'>
				{!i.status && <Icon icon="FilledExclamationCircle" className='danger' />}
				<Link className='mono' to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>
			</div>
			
		)},
		{key: 'method', 	label: 'Method', 	render: (v, i)=>(v || (i.value ? 'transfer' : ''))},
		{key: 'blockNumber',label: 'Block', 	render: (v:number)=>(<Link className='mono' to={`/block/${v}`}>{v}</Link>)},
		{key: 'timestamp',	label: 'Age', 		render: (v:number)=>(timeAgo(v))},
		{key: 'from', 		label: 'From', 		render: (v: string)=>(<Link className='mono' to={`/address/${v}`} title={v}>{ellipsis(v)}</Link>)},
		{key: 'to', 		label: 'To', 		render: (v:string, i: SimpleTxObject)=>(
			i.creation ? (
				<div className='d-middle'>
					<Icon icon="New" className='mr' />
					<Link to={`/address/${v}`} title={v}>Contract Creation</Link>
				</div>
				
			) : (
				<Link className='mono' to={`/address/${v}`} title={v}>{ellipsis(v)}</Link>
			))
		},
		{key: 'value', 		label: 'Value', 	align: 'right', render: (v: number)=><code>{NF(v)}</code>},
		{key: 'fee', 		label: '[Txn Fee]', align: 'right',	render: (v)=>(<small className='gray'>{v}</small>)}
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

export default Txlist;