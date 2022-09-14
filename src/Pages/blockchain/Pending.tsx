import React from 'react';
import { Link } from 'react-router-dom';

// import { pendingList } from '../mockup/Pending.json'
import useStore, { ellipsis, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table';

interface PendingStatus {
	data:				SimpleTxObject[],
	count:				number,
	limit:				number,
	page:				number
	total:				number
}

const Pending = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const [status, setStatus] = React.useState<PendingStatus>({
		data: 			[],
		count: 			0,
		limit: 			10,
		page: 			0,
		total: 			0,
	});

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-pending", page, limit).then(res=>{
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
	// React.useEffect(() => {
	// 	getData(status.page, status.limit)
	// }, [])

	const fields = [
		{key: 'txId', 		label: 'Txn Hash',	render: (v: string)=>(<Link to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>)},
		{key: 'nonce',		label: 'Nonce',		render: (v)=>(<code>{v}</code>)},
		{key: 'created',	label: 'Last Seen',	render: (v: number)=>(<code>{timeAgo(v)}</code>)},
		{key: 'gasLimit',	label: 'Gas Limit', render: (v: number)=>(<code>{NF(v)}</code>), align: 'right', },
		{key: 'gasPrice',	label: 'Gas Price', render: (v: number)=>(<code>{NF(v)}</code>), align: 'right', },
		{key: 'from',		label: 'From', 		render: (v: string)=>(<Link to={`/tx/${v}`}>{ellipsis(v)}</Link>), align: 'right', },
		{key: 'to',			label: 'To', 		render: (v: string)=>(<Link to={`/tx/${v}`}>{ellipsis(v)}</Link>), align: 'right', },
		{key: 'value',		label: 'Value', 	render: (v: number)=>(<code>{NF(v)}</code>), align: 'right', },
	] as TableHeader[]

	return (
		<div className='Pending'>
			<section className='container'>
				<h3>
					Pending Transactions
				</h3>
				<div className='panel'>
					<Table 
						header={(
							<>
								<div>A total of &gt; {NF(status.count)} transaction(s) found</div>
							</>
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

export default Pending;