import React from 'react';
import { Link } from 'react-router-dom';

import useStore, { ellipsis, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table';

interface InternalStatus {
	data:				Array<ServerTxListItem>,
	count:				number,
	limit:				number,
	page:				number
	total:				number
}



const TxInternal = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const blockNumber = Number(new URLSearchParams(window.location.search).get("block") || 0)
	const [status, setStatus] = React.useState<InternalStatus>({
		data: 			[],
		count: 			0,
		limit: 			10,
		page: 			0,
		total: 			0,
	});

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-internalTxList", blockNumber, '', [], page, limit).then(res=>{
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
		{key: 'blockNumber',label: 'Block',				render: (v)=>(<Link className='mono' to={`/block/${v}`}>{v}</Link>)},
		{key: 'timestamp',	label: 'Age',				render: (v: number)=>(<code>{timeAgo(v)}</code>)},
		{key: 'txId',		label: 'Parent Txn Hash',	render: (v: string)=>(<Link className='mono' to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>)},
		{key: 'type',		label: 'Type',				render: (v, i)=>(<code>{v || ''}</code>)},
		{key: 'from', 		label: 'From', 				render: (v: string)=>(<Link className='mono' to={`/address/${v}`} title={v}>{ellipsis(v)}</Link>)},
		{key: 'to', 		label: 'to', 				render: (v: string)=>(<Link className='mono' to={`/address/${v}`} title={v}>{ellipsis(v)}</Link>)},
		{key: 'value',		label: 'Value', 			align: 'right', render: (v: number)=>(<code>{NF(v || 0)}</code>)},
	] as TableHeader[]

	return (
		<div className='txsInternal'>
			<section className='container'>
				<h3>
					Contract Internal Transactions
				</h3>
				<div className='panel'>
					<Table 
						header={(
							<div>
								<div>A total of {NF(status.count)} internal transactions found</div>
								<small>(Showing the last 10k records only)</small>
							</div>
						)} 
						page={status.page}
						total={status.total}
						fields={fields} 
						data={status.data}
						onData={onData}
					/>
				</div>
			</section>
		</div >
	)
};

export default TxInternal;