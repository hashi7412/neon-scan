import React from 'react';
import { Link } from 'react-router-dom';
import useStore, { config, NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table';


interface BlockStatus {
	data:             LatestBlockObject[],
	count:              number,
	limit:              number,
	page:               number
	total:              number
	start:              number
	end:                number
}

const Blocks = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	
	const [status, setStatus] = React.useState<BlockStatus>({
		data: 		[],
		count: 			0,
		limit: 			10,
		page: 			0,
		total: 			0,
		start: 			0,
		end: 			0
	})

	const onData = (page: number, limit: number) => {
		// window.history.pushState({additionalInformation: `Blocks that are included in the ${config.chain}.`}, `${config.chain} blocks | ${config.title}`, `/blocks${page===0 ? '' : `?ps=${limit}&p=${page + 1}`}`);
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		sendJson("get-blockList", page, limit).then(res=>{
			if (res.result) {
				const {data, count, total, page, limit} = res.result as {data: LatestBlockObject[], count: number, total: number, page: number, limit: number}
				setStatus({
					data,
					count,
					limit,
					page,
					total,
					start: data[data.length - 1]?.number || 0,
					end: data[0]?.number || 0,
				})
			}
			showLoading(false)
		})
	}
	// React.useEffect(() => {
	// 	getData(status.page, status.limit)
	// }, [])

	const fields = [
		{key: 'number',		label: 'Block', 	render: (v:number)=>(<Link className='mono' to={`/block/${v}`}>{v}</Link>)},
		{key: 'created',	label: 'Age', 		render: (v:number)=>(timeAgo(v))},
		{key: 'txn',		label: 'Txn', 		align: 'center', render: (v: number, i)=>(<Link to={`/txs?block=${i.number}`}>{NF(v)}</Link>)},
		{key: 'gasUsed', 	label: 'Gas Used', 	align: 'right', render: (v: number)=>(<code>{NF(v)} <small className='gray'>({(v / config.blockGasLimit).toFixed(2)}%)</small></code>)},
		{key: 'rewards', 	label: 'Reward', 	align: 'right',	render: (v: number, i)=>(<code>{v.toFixed(6)} <small className='gray'>{config.symbol}</small></code>)}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Blocks</h3>
				<div className='panel'>
					<Table 
						header={(
							<div>Block #{NF(status.start)} to #{NF(status.end + 1)} (Total of {NF(status.count)} blocks)</div>
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

export default Blocks;