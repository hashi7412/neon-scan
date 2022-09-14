import React from "react"
import {ellipsis, NF} from "../../useStore"
import { Link } from "react-router-dom"
import Table, { TableHeader } from "../../components/Table"
import TabBar, { TabHeader } from "../../components/TabBar"
import IconImg from '../../assets/neon/icon.svg'

const mockData = [
	{
		address:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		balance:   		95,
		valueEnj:   	57,
		valueUsd: 		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		ownership:	    24.23423
	},
	{
		address:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		balance:   		95,
		valueEnj:   	57,
		valueUsd: 		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		ownership:	    24.23423
	},
	{
		address:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		balance:   		12395,
		valueEnj:   	57,
		valueUsd: 		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		ownership:	    24.23423
	}
] as Array<any>

const NftHolders = () => {
	const [status, setStatus] = React.useState({
		tabKey: ""
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
        { key: "address",    label: "Address",				render: (i: string)=>(<Link to={`/address/${i}`} className="mono">{ellipsis(i)}</Link>) },
        { key: "balance",    label: "Balance",				render: (i: number)=>(<span className="mono">{NF(i)}</span>) },
        { key: "valueEnj",   label: "Value ENJ",			render: (i: number)=>(<span>{i} ENJ</span>) },
        { key: "valueUsd",   label: "Value USD",			render: (i: string)=>(<span className="mono">{ellipsis(i)}</span>) },
        { key: "ownership",  label: "% Ownership",			render: (i: number)=>(<span>{i} %</span>) },
	] as TableHeader[]

	return (
		<div className='holders'>
			<section className='container'>
				<div style={{textAlign: "center"}}>
					<img src={IconImg} alt="icon" />
				</div>
				<h3>Transactions details (MOCKUP)</h3>
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

export default NftHolders