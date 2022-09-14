import { Link } from "react-router-dom"
import Icon from "../../../components/Icon"
import Table, { TableHeader } from "../../../components/Table"
import useStore, { config, ellipsis, NF, prettyFormat } from "../../../useStore"

interface TxnViewProps {
	address: string
	data: AccountTxListType
}

const TxnView = ({address, data}: TxnViewProps) => {
	const {timeAgo} = useStore()

	const fields = [
		{key: 'txId', 		label: 'Txn Hash',	render: (v: string)=>(<Link className='mono' to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>)},
		{key: 'method', 	label: 'Method',	render: (v)=>(v)},
		{key: 'blockNumber',label: 'Block',		render: (v)=>(<Link className='mono' to={`/block/${v}`}>{v}</Link>)},
		{key: 'timestamp', 	label: 'Age',		render: (v: number)=>(timeAgo(v))},
		{key: 'from', 		label: 'From',		render: (v: string)=>(v===address ? <code>{ellipsis(v)}</code> : <Link className='mono' to={`/address/${v}`}>{ellipsis(v)}</Link>)},
		{key: 'to', 		label: 'To',		render: (v: string, i)=>(v===address ? <code>{ellipsis(v)}</code> : (i.creation ? <Link to={`/address/${v}`} className='d-middle gap'><Icon icon="Newspaper" fill='gray' />Contract Creation</Link> : <Link className='mono' to={`/address/${v}`}>{ellipsis(v)}</Link>))},
		{key: 'value', 		label: 'Value', 	align: 'right',	render: (v: number)=>(<><code>{v}</code> <small className='mono gray'>{config.symbol}</small></>)},
		{key: 'fee', 		label: '[Txn Fee]', align: 'right',	render: (v: number)=>(<small>{prettyFormat(v)}</small>)},
	] as TableHeader[]
	
	return (
		<Table 
			header={(
				<div>Latest 25 from a total of {NF(data.data.length || 0)} transactions</div>
			)} 
			page={data.page}
			total={data.total}
			data={data.data}
			fields={fields} 
			options={{hidePager: true}}
		/>
	)
}

export default TxnView