import React from 'react'
import { Link } from 'react-router-dom'

// import { pendingList } from '../mockup/Pending.json'
import useStore, { config, ellipsis, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'
import Icon from '../../components/Icon'

interface ContractVerifiedStatus {
	data:				ServerVerifiedContract[],
	count:				number,
	limit:				number,
	page:				number
	total:				number
}

const ContractsVerified = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const [status, setStatus] = React.useState<ContractVerifiedStatus>({
		data: 			[],
		count: 			0,
		limit: 			10,
		page: 			0,
		total: 			0,
	});

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-verifiedContracts", '', '', page, limit).then(res=>{
			if (res.result) {
				const {data, count, total, page, limit} = res.result as {data: ServerVerifiedContract[], count: number, total: number, page: number, limit: number}
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
		{key: 'address', 	label: 'Address',		render: (v: string)=>(<div className='d-middle gap'><Icon icon="FilledCheck" fill='var(--success)'/><Link className='mono' to={`/address/${v}#code`}>{ellipsis(v)}</Link></div>)},
		{key: 'name',		label: 'Contract Name',	render: (v: string)=>(v)},
		{key: 'compiler',	label: 'Compiler',		render: (v: string)=>(v)},
		{key: 'version',	label: 'Version',		render: (v: string)=>(v)},
		{key: 'balance',	label: 'Balance',		render: (v: number)=>(<><code>{NF(v)}</code> <small className='gray'>{config.symbol}</small></>), align: 'right'},
		{key: 'txn',		label: 'Txns',			render: (v: number)=>(v), align: 'center'},
		{key: 'optimized',	label: 'Setting',		render: (v: boolean, i)=>(<div className='d-middle gap'>{v && <Icon icon="Bolt" fill='gray'/>}{i.hasArgs && <Icon icon="Wrench" fill='gray'/>}</div>)},
		{key: 'created',	label: 'Verified',		render: (v: number)=>(timeAgo(v))},
		{key: 'audited',	label: 'Audited',		render: (v: number)=>(v ? timeAgo(v) : '' )},
		{key: 'license',	label: 'License',		render: (v: string)=>(<code>{v}</code>)},
	] as TableHeader[]

	return (
		<div className='Pending'>
			<section className='container'>
				<h3>
					Contract <small className='gray'>With verified source codes only</small>
				</h3>
				<div className='panel'>
					<Table 
						header={(
							<>
								<div>Showing the last {status.count} verified contracts source code</div>
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

export default ContractsVerified;