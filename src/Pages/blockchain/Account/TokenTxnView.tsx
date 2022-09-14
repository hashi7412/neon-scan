import { Link } from "react-router-dom"
import Table, { TableHeader } from "../../../components/Table"
import useStore, { ellipsis, NF } from "../../../useStore"

interface TokenTxnViewProps {
	address: string
	data: AccountTxListType
}

const TokenTxnView = ({address, data}: TokenTxnViewProps) => {
	const {timeAgo} = useStore()

	const fields = [
		{key: 'txId', 		label: 'Txn Hash',	render: (v: string)=>(<Link className='mono' to={`/tx/${v}`}>{ellipsis(v, 16)}</Link>)},
		{key: 'timestamp', 	label: 'Age',		render: (v: number)=>(timeAgo(v))},
		{key: 'from', 		label: 'From',		render: (v: string)=>(address===v ? <code>{ellipsis(v)}</code> : <Link className='mono' to={`/address/${v}`}>{ellipsis(v)}</Link>)},
		{key: 'to', 		label: 'To',		render: (v: string)=>(address===v ? <code>{ellipsis(v)}</code> : <Link className='mono' to={`/address/${v}`}>{ellipsis(v)}</Link>)},
		{key: 'value', 		label: 'Value', 	align: 'right',	render: (v, i)=>(<code>{<><code>{v}</code> <small className='mono gray'>{i.symbol}</small></>}</code>)},
		{key: 'token', 		label: 'Token', 	render: (v, i)=>(<code>{i.name} ${i.symbol}</code>)},
	] as TableHeader[]
	
	return (
		<Table 
			header={(
				<div>Latest {NF(data.data.length || 0)} ERC-20 Token Transfer Events</div>
			)} 
			page={data.page}
			total={data.total}
			data={data.data}
			fields={fields} 
			options={{hidePager: true}}
		/>
	)
}

export default TokenTxnView