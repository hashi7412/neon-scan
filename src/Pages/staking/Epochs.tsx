import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import useStore, { NF, prettyFormat } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface EpochsStatus {
	data:   			ServerEpochObject[]
	count:  			number,
	limit:  			number,
	page:   			number
	total:  			number
}

const Epochs = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const location = useLocation();
	const blockNumber = location && location?.search?.includes("block") ? Number(new URLSearchParams(location.search).get("block")) : 0
	const [status, setStatus] = React.useState<EpochsStatus>({
		data:	    	[],
		count:  		0,
		limit:  		10,
		page:	    	0,
		total:  		0,
	})

	const onData = (page: number, limit: number) => {
		showLoading(true)
		if (limit!==status.limit) setStatus({...status, limit})
		sendJson("get-epoch", page, limit).then(res=>{
			if (res.result) {
				const {data, count, total, page, limit} = res.result as {data: ServerEpochObject[], count: number, total: number, page: number, limit: number}
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
		{key: 'id', 				label: 'Epoch', 				render: (v: string) => (<Link className='mono' to={`/address/${v}`}>{v}</Link>)},
		{key: 'endTime', 		    label: 'End Time', 				render: (v: number) => (<code>{v!==0 ? timeAgo(v) : '-'}</code>)},
		{key: 'baseRewardWeight', 	label: 'Total Base Reward',		align:"right",	render: (v:number) => (<code>{prettyFormat(v, 6)}</code>)},
		{key: 'epochFee', 			label: 'Total Fee', 			align:"right",	render: (v:number) => (<code>{prettyFormat(v, 6)}</code>)},
		{key: 'txRewardWeight', 	label: 'Total Tx Reward', 		align:"right",	render: (v:number) => (<code>{prettyFormat(v, 6)}</code>)},
		{key: 'totalSupply', 		label: 'totalSupply', 			align:"right",	render: (v:number) => (<code>{prettyFormat(v, 6)}</code>)},
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Epochs</h3>
				<div className='panel'>
					<Table 
						header={(
							<div>Showing {NF(status.page * status.limit + 1)} to {NF((status.page + 1) * status.limit)} of {NF(status.count)} epochs found</div>
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

export default Epochs;