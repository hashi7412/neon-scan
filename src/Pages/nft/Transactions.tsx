import React from "react"
import Table, { TableHeader } from "../../components/Table"
import Jazzicon from 'react-jazzicon'
import { Link } from "react-router-dom"
import useStore, { ellipsis } from "../../useStore"
import TabBar, { TabHeader } from "../../components/TabBar"
import IconImg from '../../assets/neon/icon.svg'

const mockData = [
	{
		tx:			"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1
	},
	{
		tx:			"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1
	},
	{
		tx:			"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1
	},
	{
		tx:			"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1
	}
] as Array<any>

interface StatusType {
    tabKey:     string
}

const NftTxs = () => {
	const {timeAgo} = useStore()
    const [status, setStatus] = React.useState<StatusType>({
        tabKey:     "tsx"
    })
	const [data, setData] = React.useState<any[]>([])

	React.useEffect(() => {
		setData(mockData)
	}, [])

	const headers = [
		{key: 'details',		label: 'Details'},
		{key: 'holders',		label: 'Holders'},
		{key: 'tsx',			label: 'Transactions'},
		{key: 'marketactivity',	label: 'Market activity'}
	] as TabHeader[]

	const fields = [
		{ key: "tx", 		label: "Transaction", 		render: (i: string) => (<Link to={`/tx/${i}`}>{ellipsis(i, 20)}</Link>) },
		{ key: "time", 		label: "Time", 				render: (i: number) => (<span>{timeAgo(i)}</span>) },
		{ key: "from", 		label: "From", 				render: (i: string) => (
			<div className="flex d-middle gap">
				<Jazzicon key={i} />
				<Link to={`./address/${i}`}>{ellipsis(i)}</Link>
			</div>
		) },
		{ key: "to", 		label: "To", 				render: (i: string) => (
			<div className="flex d-middle gap">
				<Jazzicon key={i} />
				<Link to={`./address/${i}`}>{ellipsis(i)}</Link>
			</div>
		) },
		{ key: "quantity", 	label: "Quantity", 		render: (i: number) => (<span>{i}</span>) }
	] as TableHeader[]

	return (
		<div className='nft-assets'>
			<section className='container'>
				<div style={{textAlign: "center"}}>
					<img src={IconImg} alt="icon" />
				</div>
				<h3>Harvester of sorrow (MOCKUP)</h3>
				<TabBar headers={headers} onChange={tabKey=>setStatus({...status, tabKey})}>
					<Table
						data={data}
						fields={fields}
						page={0}
						total={0}
					/>
				</TabBar>
			</section>
		</div>
	)
}

export default NftTxs