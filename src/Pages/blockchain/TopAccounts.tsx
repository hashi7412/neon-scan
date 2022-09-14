import React from 'react';
import {Link} from 'react-router-dom';

import useStore, { config, NF, prettyFormat } from '../../useStore'
import Table, { TableHeader } from '../../components/Table';
import Icon from '../../components/Icon';

interface TopAccountsStatus {
	data:			Array<ServerTopAccountObject>,
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const TopAccounts = () => {
	const {sendJson, showLoading} = useStore()
	const [status, setStatus] = React.useState<TopAccountsStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-topAccounts", page, limit).then(res=>{
			if (res.result) {
				const {data, count, total, page, limit} = res.result as {data: ServerTopAccountObject[], count: number, total: number, page: number, limit: number}
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
		{key: 'rank', 	label: 'Rank',		render: (v)=>(<code>{v}</code>)},
		{key: 'address',label: 'Address',	render: (v, i)=>(<div className='d-middle'>{i.isContract && <Icon icon="CodeSquare" size={14} margin={5} fill='gray' />}<Link className='mono' to={`/address/${v}`}>{v}</Link></div>)},
		{key: 'tag',	label: 'Name Tag',	render: (v)=>('')},
		{key: 'value',	label: 'Balance',  	align:'right', render: (v: number)=>(<code>{prettyFormat(v)} <small className='gray'>{config.symbol}</small></code>)},
		{key: 'txn',	label: 'Txn Count', align:'right', render: (v: number)=>(<code>{NF(v)}</code>)}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>
					Top Accounts by {config.symbol} Balance
				</h3>
				<div className='panel'>
					<Table 
						header={(
							<>
								<div>A total of &gt; {NF(status.count)} accounts found</div>
								<small>(Showing the last {status.count > 1e4 ? '10,000' : NF(status.count)} top accounts only)</small>
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
		</div>
	)
};

export default TopAccounts;