import { Link } from "react-router-dom"
import Icon from "../../../components/Icon"
import Table, { TableHeader } from "../../../components/Table"
import useStore, { config, ellipsis, NF } from "../../../useStore"

interface InternalTxnViewProps {
	address: string
	data: AccountTxListType
}

const InternalTxnView = ({address, data}: InternalTxnViewProps) => {
	const {timeAgo} = useStore()

	const fields = [
		{key: 'txId', 		label: 'Parent Txn Hash',	render: (v: string)=>(<Link className='mono' to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>)},
		{key: 'blockNumber',label: 'Block',		render: (v)=>(<Link className='mono' to={`/block/${v}`}>{v}</Link>)},
		{key: 'timestamp', 	label: 'Age',		render: (v: number)=>(timeAgo(v))},
		{key: 'from', 		label: 'From',		render: (v: string)=>(address===v ? <code>{ellipsis(v)}</code> : <Link className='mono' to={`/address/${v}`}>{ellipsis(v)}</Link>)},
		{key: 'to', 		label: 'To',		render: (v: string, i)=>(i.type==='create' ? <div className='d-middle gap'><Icon icon="Newspaper" fill='gray' />Contract Creation</div> : (address===v ? <code>{ellipsis(v)}</code> : <Link className='mono' to={`/address/${v}`}>{ellipsis(v)}</Link>))},
		{key: 'value', 		label: 'Value', 	align: 'right',	render: (v)=>(<><code>{v}</code> <small className='mono gray'>{config.symbol}</small></>)},
	] as TableHeader[]
	
	return (
		<Table 
			header={(
				<div>Latest {NF(data.data.length || 0)} internal transaction</div>
			)} 
			page={data.page}
			total={data.total}
			data={data.data}
			fields={fields} 
			options={{hidePager: true}}
		/>
	)
}

export default InternalTxnView