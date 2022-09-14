import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

import "./Home.scss";
import useStore, { config, ellipsis, NF, now, prettyFormat, toKillo, zeroAddress } from '../useStore'
import Icon from '../components/Icon';
import ImgTxs from '../assets/home-txs.svg'
import ImgLatest from '../assets/home-latest.svg'
import ImgMarketcap from '../assets/home-marketcap.svg'


interface LatestBlockObject {
	number: 				number
	miner?: 				string
	txn: 					number,
	rewards: 				number
	created: 				number
}

interface LatestTxObject {
	txId: 					string
	from: 					string
	to: 					string
	value: 					number
	created: 				number
}
interface HomeDataObject {
	timeOffset: 			number
	price: 					number
	circulating:			number
	countTx:				number
	blockNumber:			number
	blocks:					LatestBlockObject[]
	txs:					LatestTxObject[]
}
const CustomizedDot = () => null

const Home = () => {
	const history = useHistory();

	const {T, timeAgo, sendJson} = useStore()
	const [data, setData] = React.useState<HomeDataObject>({
		timeOffset: 		0,
		price: 				0,
		circulating:		0,
		countTx:			0,
		blockNumber:		0,
		blocks:				[],
		txs:				[]
	})
	const [chart, setChart] = React.useState<Array<{x: number, y: number, xLabel: string}>>([])
	const [time, setTime] = React.useState(+new Date())
	const [query, setQuery] = React.useState("")

	const onSearch = () => {
		const len = query.length
		if (len > 0) {
			if (/^[0-9]*$/i.test(query)) {
				history.push(`/block/${query}`)
			} else if (/^(0x)?[0-9a-fA-F]*$/i.test(query)) {
				if (len===42) {
					history.push(`/address/${query}`)
				} else if (len===66) {
					history.push(`/tx/${query}`)
				}
			}
		}
	}

	const grabData = () => {
		sendJson("get-home").then(res=>{
			if (res.result) {
				const timeOffset = now() - res.result.timestamp
				setData({
					timeOffset,
					price: 				res.result.price,
					circulating:		res.result.circulating,
					countTx:			res.result.countTx,
					blockNumber:		res.result.blockNumber,
					blocks:				res.result.blocks.reverse(),
					txs:				res.result.txs.reverse()
				})
			}
		})
	}

	React.useEffect(()=>{
		grabData()
		const timer = setTimeout(()=>setTime(+new Date()), 3000)
		return ()=>clearTimeout(timer)
	}, [time])

	React.useEffect(()=>{
		sendJson("get-home-chart").then(res=>{
			if (res.result) {
				
				setChart(res.result.map(i=>{
					const date = new Date(i[0] * 1e3)
					const x = [date.getMonth() + 1, date.getDate()].join('/')
					return {x, transactions: i[1]}
				}))
			}
		})
	}, [])

	return (
		<div className='home'>
			<section className='search'>
				<div>
					<h1>{T('home.title', config.chain)}</h1>
					<div>
						<input type="search" placeholder='Search by Address / Txn Hash / Block / Token' value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={(e)=>(e.key==="Enter" && onSearch())} />
						<button className='d-middle' onClick={()=>onSearch()}><Icon icon="Search" size={20} /></button>
					</div>
				</div>
			</section>
			<section className='container'>
				<div className='row card'>
					<div className='card-body panel'>
						<div className='card-col'>
							<div className='card-row'>
								<img className='card-icon' src='/logo.svg' alt='chain'></img>
								<div className='card-content'>
									<span>{T('home.price', config.symbol)}</span>
									<Link className='mono' to="./">${data.price}</Link>
								</div>
							</div>
							<hr className='card-hr'></hr>
							<div className='card-row'>
								<img className='card-icon' src={ImgMarketcap} alt='marketcap'></img>
								<div className='card-content'>
									<span>{T('home.marketcap')}</span>
									<Link className='mono' to="./">${NF(data.price * data.circulating)}</Link>
								</div>
							</div>
						</div>
						<div className='card-col'>
							<div className='card-row'>
								<img className='card-icon' src={ImgTxs} alt='txs'></img>
								<div className='card-content'>
									<span>{T('home.transactions')}</span>
									<Link className='mono' to="/txs">{NF(data.countTx)}</Link>
								</div>
							</div>
							<hr className='card-hr'></hr>
							<div className='card-row'>
								<img className='card-icon' src={ImgLatest} alt='latest blocks'></img>
								<div className='card-content'>
									<span>{T('home.blocknumber')}</span>
									<Link className='mono' to="/blocks">{NF(data.blockNumber)}</Link>
								</div>
							</div>
						</div>
						<div className='card-col chart'>
							<div style={{marginBottom: '0.5em'}}>
								{config.chain} TRANSACTION HISTORY IN 14 DAYS
							</div>
							<ResponsiveContainer width="100%" height={100}>
								<LineChart data={chart} margin={{top: 0, right: 0, left: -20, bottom: -10}}>
									<XAxis dataKey="x" fontSize="80%"/>
									<Tooltip />
									<YAxis tickLine={false} axisLine={false} yAxisId="1" fontSize="80%" tickFormatter={toKillo}/>
									<Line yAxisId="1" type="natural" dataKey="transactions" stroke="#8884d8" animationDuration={0} 
									dot={<CustomizedDot />}/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
				<div className='section-split'>
					<div className='col6'>
						<div className='panel'>
							<div className='panel-header'>
								<h4>Lastest Blocks</h4>
							</div>
							<div className='panel-content grid-col scroll' style={{ height: "400px" }}>
								{data.blocks.map((i, k) => (
									<div key={k}>
										<div className='flex'>
											<div className='ls-icon ls-bk sm-hide'>Bk</div>
											<div className='flex'>
												<b className='sm-show'>Block </b>
												<div className='flex dir-col'>
													<Link className='mono' to={`/block/${i.number}`}>{i.number}</Link>
													<small>{timeAgo(i.created)}</small>
												</div>
											</div>
										</div>
										<div className='flex dir-col'>
											<span className='ln-br'>Validated By <Link to={`/address/${zeroAddress}`}>{ellipsis(zeroAddress)}</Link></span>
											<div>
												<Link className='mono' to={`/txs?block=${i.number}`}>{i.txn} txns </Link>
												<small> in 1 sec</small>
											</div>
										</div>
										<div>
											<small className='mono ln-br'>{prettyFormat(i.rewards)} {config.symbol}</small>
										</div>
									</div>
								))}
							</div>
							<div className='panel-footer'>
								<Link to="/blocks" className='btn btn-primary btn-block'>View all blocks</Link>
							</div>
						</div>
					</div>
					<div className='col6'>
						<div className='panel'>
							<div className='panel-header'>
								<h4>Lastest Transaction</h4>
							</div>
							<div className='panel-content grid-col scroll' style={{ height: "400px" }}>
								{data.txs.map((i, k) => (
									<div key={k}>
										<div className='flex'>
											<div className='ls-icon ls-tx sm-hide'>Tx</div>
											<div className='flex'>
												<b className='sm-show'>Transaction </b>
												<div className='flex dir-col'>
													<Link to={`/tx/${i.txId}`}>{ellipsis(i.txId)}</Link>
													<small>{timeAgo(i.created)}</small>
												</div>
											</div>
										</div>
										<div className='flex dir-col'>
											<span className='ln-br'>From <Link to={`/address/${i.from}`}>{ellipsis(i.from)}</Link></span>
											{i.to && <span className='ln-br'>To <Link to={`/address/${i.to}`}>{ellipsis(i.to)}</Link></span>}
											
										</div>
										<div>
											<small className='mono'>{prettyFormat(i.value)} {config.symbol}</small>
										</div>
									</div>
								))}
							</div>
							<div className='panel-footer'>
								<Link to="/txs" className='btn btn-primary btn-block'>View all transaction</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div >
	)
};

export default Home;