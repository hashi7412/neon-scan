import React from "react"
import Table, { TableHeader } from "../../components/Table"
import Jazzicon from 'react-jazzicon'
import "./txassets.scss"
import useStore, { ellipsis } from "../../useStore"
import ImgBlank from "../../assets/nft-assets/1.png"
import { Link } from "react-router-dom"
import TabBar, { TabHeader } from "../../components/TabBar"

interface NftTokenType {
	icon?:				string
	token:			string
	tokenId?:		string
	name:			string
	symbol:			string
	decimal?:		number
}

interface NftTxType {
	txId:				string
	asset:				NftTokenType
	from:				string
	to:					string
	quantity:			number
	created:			number
}

const mockData = [
	{
		txId:		"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		asset:		{token: "0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3", name: "BTCC x MATH", symbol: "BTCC"},
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1,
		created:	123123123,
	},
	{
		txId:		"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		asset:		{token: "0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3", name: "BTCC x MATH", symbol: "BTCC"},
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1,
		created:	123123123,
	},
	{
		txId:		"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		asset:		{token: "0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3", name: "BTCC x MATH", symbol: "BTCC"},
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1,
		created:	123123123,
	},
	{
		txId:		"0x9187fe86f9ae353994a18928be5098ca801e7fc39d248526340f2e7892b3ab53",
		asset:		{token: "0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3", name: "BTCC x MATH", symbol: "BTCC"},
		time:		123123123,
		from:		"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		to:			"0xd94E5A3a11336506f7Aa7148DDEda6CbB0C6AfB3",
		quantity:	1,
		created:	123123123,
	}
] as Array<NftTxType>

interface StatusObject {
	tabKey: string
}

const NftAssets = () => {
	const {timeAgo} = useStore();
	const [status, setStatus] = React.useState<StatusObject>({
		tabKey: "asset"
	})
	const [data, setData] = React.useState<any[]>([])

	React.useEffect(() => {
		setData(mockData)
	}, [])

	const headers = [
		{key: 'asset',			label: 'Asset'},
		{key: 'mints',			label: 'Mints'},
		{key: 'melts',			label: 'Melts'},
		{key: 'token',			label: 'Token'},
		{key: 'eth',			label: 'ETH'},
		{key: 'pending',		label: 'Pending'},
		{key: 'internal',		label: 'Internal'}
	] as TabHeader[]

	const fields = [
		{ key: "txId", 		label: "Transaction", 		render: (i: string) => (<Link to={`/tx/${i}`}>{ellipsis(i,20)}</Link>) },
		{ key: "asset", 	label: "Asset", 			render: (i: NftTokenType) => (
			<div className="flex d-middle gap">
				<div className="tooltip">
					<div className='icon mr d-middle' style={{minWidth: "30px", height: "30px"}}>
						<img src={i.icon ?? ImgBlank} alt="Img" style={{width: "100%",height: "100%"}} />
					</div>
					<div className="top">
						<div className="flex d-middle justify-content-between gap">
							<div className="img-wrap">
								<img src={i.icon ?? ImgBlank} alt="Img" />
							</div>
							<div className="fill">
								<h4>Harvester of sorrow</h4>
								<span>Lost relics</span>
								<p>Language of the mad, Takes away all mental stress and anxiety.</p>
							</div>
							<div className="money">
								<h4>0.6</h4>
								<span>ENJ</span>
							</div>
						</div>
						<i></i>
					</div>
				</div>
				<Link to={``}>{i.name}</Link>
			</div>
		) },
		{ key: "created", 	label: "Time", 			render: (i: number) => (<span>{timeAgo(i)}</span>) },
		{ key: "from", 		label: "From", 				render: (i: string) => (
			<Link to={`/address/${i}`} className="flex d-middle gap">
				<Jazzicon key={i} />
				<span className="mono">{ellipsis(i)}</span>
			</Link>
		) },
		{ key: "to", 		label: "To", 				render: (i: string) => (
			<Link to={`/address/${i}`} className="flex d-middle gap">
				<Jazzicon key={i} />
				<span className="mono">{ellipsis(i)}</span>
			</Link>
		) },
		{ key: "quantity", 	label: "Transaction", 		render: (i: number) => (<span>{i}</span>) }
	] as TableHeader[]

	return (
		<div className='nft-txassets'>
			<section className='container'>
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

export default NftAssets