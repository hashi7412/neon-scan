import React from 'react'
import { Link } from 'react-router-dom'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import useStore, { config, NF, prettyFormat } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface ValidatorsStatus {
	data:			ValidatorObject[]
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Validators = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const [status, setStatus] = React.useState<ValidatorsStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	const onData = (page: number, limit: number) => {
		showLoading(true)
		if (limit!==status.limit) setStatus({...status, limit})
		sendJson("get-validators", page, limit).then(res=>{
			if (res.result) {
				const {data, count, total, page, limit} = res.result as {data: ValidatorObject[], count: number, total: number, page: number, limit: number}
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
		{key: 'address', 		label: 'Address', 		render: (v:string, i)=>(
			<div className='d-middle'>
				<div className='mr'>
					{i.id > config.validator.count ? (
						<Jazzicon diameter={24} seed={jsNumberForAddress(i.address)} />
					) : (
						<img src="/logo.svg" width={24} height={24} title={config.validator.title} />
					) }
				</div>
				
				<Link className='mono' to={`/address/${v}`}>{v}</Link>
			</div>
		)},
		{key: 'id', 		    label: 'Id', 			render: (v:number)=>(<code>{NF(v)}</code>)},
		{key: 'downtime', 		label: 'Downtime', 		render: (v:number)=>(<code>{v!==0 && timeAgo(v)}</code>)},
		{key: 'stakedAmount', 	label: 'Self-Staked', 	align:"right",	render: (v:number)=>(<code>{prettyFormat(v)}</code>)},
		{key: 'delegatedAmount',label: 'Delegated', 	align:"right",	render: (v:number)=>(<code>{prettyFormat(v)}</code>)},
		{key: 'totalStaked', 	label: 'Total Staked', 	align:"right",	render: (v:number)=>(<code>{prettyFormat(v)}</code>)},
		{key: 'status', 		label: 'Active', 		align:"right",	render: (v:number)=>(v)}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Validators Top Leaderboard</h3>
				<div className='panel'>
					<Table 
						header={(
							<div>Showing {NF(status.page*status.limit+1)} to {NF((status.page+1)*status.limit)} total of {NF(status.count)} validators found</div>
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

export default Validators;