import React from 'react'
import { Link, useParams } from 'react-router-dom'
import TabBar from '../../components/TabBar'
import useStore, { config, ellipsis, NF, prettyFormat } from '../../useStore'
import Icon from '../../components/Icon'
import Actions from '../../components/Actions'

import "./tx.scss"

interface TxStatus {
	tabKey:	string
	more:		boolean
}

interface ItemProps {
	title:		string
	tooltip:	string
	children:	any
	mono?:		boolean
	align?:		boolean
}

const RenderItem = ({title, tooltip, mono, align, children}: ItemProps) => {
	return (
		<div style={{lineHeight: '1.5em'}}>
			<div className="col3 d-middle">
				<div className="tooltip">
					<div className='icon mr'>
						<Icon icon="Question" />
					</div>
					<div className="top">
						{tooltip}
						<i></i>
					</div>
				</div>
				{title} :
			</div>
			<div className={`col9 d-middle ${!!mono ? 'mono' : ''} ${!!align ? 'd-middle' : ''}`} style={{whiteSpace: 'nowrap',  overflow: 'hidden', textOverflow: 'ellipsis'}}>
				{children}
			</div>
		</div>
	)
}

const Tx = () => {
	const {T, sendJson, timeAgo, showLoading} = useStore()
	const params = useParams();
	const txId = params["txId"]

	const [status, setStatus] = React.useState<TxStatus>({
		tabKey: 'Overview',
		more: false
	})
	const [data, setData] = React.useState<ServerTxObject>()

	const getData = () => {
		showLoading(true)
		sendJson("get-tx", txId).then(res=>{
			if (res.error) {

			} else if (res.result) {
				setData(res.result as ServerTxObject)
			}
			showLoading(false)
		})
	}
	React.useEffect(() => {
		getData()
	}, [txId])

	const headers = ['Overview'] // , 'Comments'
	if (data && data.logs.length) headers.push('Logs')

	return (
		<div className='tx'>
			<section className='container'>
				<h3>Transaction Details</h3>
				<TabBar tabKey='Overview' headers={headers} onChange={tabKey=>setStatus({...status, tabKey})}>
					{status.tabKey==='Overview' && (
						<div className='grid-col'>
							{config.testnet && <div><span className='tag danger'>[ This is a {config.chain} Testnet block only ]</span></div>}
							<RenderItem title='Transaction Hash' tooltip={T('tx.tip.hash')} mono align>
								{data && (
									<>
										<span className='mr-1'>{data.txId}</span>
										<Actions.Copy text={data.txId} title={T('action.copy.tip', 'Transaction hash')}/>
									</>
								)}
							</RenderItem>
							<RenderItem title='Status' tooltip={T('tx.tip.status')}>
								<span className='d-middle'>
									{data && (
										data.status ? (
											<span className='tag success d-middle'>
												<Icon icon="FilledCheck" />
												<span className='ml'>Success</span>
											</span>
										) : (
											<span className='tag danger d-middle'>
												<Icon icon="FilledExclamationCircle"/>
												<span className='ml'>Fail</span>
											</span>
										))
									}
								</span>
							</RenderItem>
							<RenderItem title='Block' tooltip={T('tx.tip.block')} mono>
								{data && (
									data.blockNumber > 0 ? (
										<span className='d-middle'>
											<Link to={`/block/${data.blockNumber}`}>{data.blockNumber}</Link>
											{data.latestBlockNumber>=data.blockNumber && (<small className='u-label badge-in ml'>{data.latestBlockNumber - data.blockNumber + 1} Block Confirmations</small>)}
										</span>
									) : (
										data.blockNumber===0 && <span>Confirming...</span>
									)
								)}
							</RenderItem>
							<RenderItem title='Timestamp' tooltip={T('tx.tip.timestamp')}>
								{data && (`${timeAgo(data.timestamp)} - ${new Date(data.timestamp * 1000).toString()}`)}
							</RenderItem>
							
							<RenderItem title='From' tooltip={T('tx.tip.from')} mono>
								{data && (
									<>
										<Link className='mr-1 mono' to={`/address/${data.from}`}>{data.from}</Link>
										<Actions.Copy text={data.from} title={T('action.copy.tip', 'From Address')}/>
									</>
								)}
							</RenderItem>
							{/* data?.contract ? (
								<RenderItem title='Contract Creation' tooltip={T('tx.tip.from')} mono>
									<span className='d-middle'>
										<Icon.File fill="var(--color-secondary)" />
										<Link className='mr-1' to={`/address/${data.contract}`}>{data.contract}</Link>
										<Actions.Copy text={data.contract} title={T('action.copy.tip', 'Contract Address')}/>
									</span>
								</RenderItem>
							) : ( */
							data?.to && (
								<RenderItem title={data?.toIsContract ? 'Interacted With' : 'To'} tooltip={T('tx.tip.to')} mono>
									{data?.toIsContract ? (
										<span className='d-middle'>
											<Icon icon="File" className='mr' fill="var(--color-secondary)" />
											<Link className='mr-1 mono' to={`/address/${data.to}`}>{data.to}</Link>
											{data.status ? (
												<Icon icon="Check" className='mr-1 success'/>
											) : (
												<Icon icon="Warning" className='mr-1 danger'/>
											)}
											
											
											<Actions.Copy text={data.to || ''} title={T('action.copy.tip', 'To Address')}/>
										</span>
									) : (
										data?.to
									)}
								</RenderItem>
							)}
							{data && data.method!=='' && <RenderItem title='Method' tooltip=''>{data.method}</RenderItem>}
							{(data && data.creates.length > 0) && (
								<RenderItem title='Contract Creation' tooltip={T('tx.tip.create')}>
									{data.creates.map((i, k)=>(
										<div key={k} className='d-middle gap'>
											<span className='gray'>From</span>
											<Link className='mono' to={`/address/${i.from}`} title={i.from}>{ellipsis(i.from)}</Link>
											<span className='gray'>Contract</span>
											<Icon icon="Newspaper" fill='gray' />
											<Link to={`/address/${i.to}`}>{i.to}</Link>
											<span className='gray'>Created</span>
											<Icon icon="Check" className='mr-1 success'/>
											<Actions.Copy text={i.to} title={T('action.copy.tip', 'Contract Address')}/>
										</div>
									))}
								</RenderItem>
							)}
							{!!(data && data.transfers.length > 0) && (
								<RenderItem title={`${config.symbol} Transfers`} tooltip={T('tx.tip.transfer')}>
									<div style={{maxHeight: 200, overflowY: 'auto'}}>
										{data.transfers.map((i, k)=>(
											<div key={k} className='d-middle gap'>
												<span className='gray'>From</span>
												<Link className='mono' to={`/address/${i.from}`} title={i.from}>{`${i.from.slice(0,6)}...${i.from.slice(-4)}`}</Link>
												<span className='gray'>To</span>
												<Link className='mono' to={`/address/${i.to}`} title={i.to}>{`${i.to.slice(0,6)}...${i.to.slice(-4)}`}</Link>
												<span className='gray'>For</span>
												<div className='fill ml-1' style={{textAlign: 'right'}}>
													<code className='mr'>{prettyFormat(i.value)}</code>
													<code className='small gray'>{config.symbol}</code>
												</div>
												
											</div>
										))}
									</div>
								</RenderItem>
							)}
							{!!(data && data.tokens.length > 0) && (
								<RenderItem title={`Token Transfers`} tooltip={T('tx.tip.transfer')}>
									<div style={{maxHeight: 200, overflowY: 'auto'}}>
										{data.tokens.map((i, k)=>(
											<div key={k} className='d-middle gap'>
												
												<span className='gray'>From</span>
												<Link className='mono' to={`/address/${i.from}`} title={i.from}>{`${i.from.slice(0,6)}...${i.from.slice(-4)}`}</Link>
												<span className='gray'>To</span>
												<Link className='mono' to={`/address/${i.to}`} title={i.to}>{`${i.to.slice(0,6)}...${i.to.slice(-4)}`}</Link>
												<span className='gray'>For</span>
												{!!i.tokenId && <code className='mr'>#{BigInt(i.tokenId).toString()}</code>}
												{i.value!==undefined && <code className='mr'>{i.value}</code>}
												<div className='fill ml-1' style={{textAlign: 'right'}}>
													<Link to={`/address/${i.token}`} title={i.token}>
														{i.name} 
														<small style={{paddingLeft: 10, paddingRight: 10}}>({i.symbol}) </small>
														
													</Link>
													<small>({i.type})</small>
												</div>
											</div>
										))}
									</div>
								</RenderItem>
							)}
							<RenderItem title='Value' tooltip={T('tx.tip.value', config.symbol)} mono>
								{data && (
									<>
										{NF(data.value)}
										<code className='ml gray'>{config.symbol}</code>
									</>
								)}
							</RenderItem>
							<RenderItem title='Transaction Fee' tooltip={T('tx.tip.fee')} mono>
								{data && (
									<>
										{Number(((data.gasPrice * data.gasUsed) / 1e9).toFixed(18))} 
										<code className='ml gray'>{config.symbol}</code>
									</>
								)}
							</RenderItem>
							<RenderItem title='Gas Price' tooltip={T('tx.tip.gasprice', config.symbol)} mono>
								{data && (
									<>{NF(data.gasPrice)}<code className='ml gray'>GWEI</code></>
								)} 
							</RenderItem>
							{!!data?.maxFeePerGas && (
								<RenderItem title='Max Fee' tooltip={T('tx.tip.maxfee')} mono>
									{data.maxFeePerGas / 1e9}<code className='ml gray'>GWEI</code>
								</RenderItem>
							)}
							{!!data?.maxPriorityFeePerGas && (
								<RenderItem title='Max Priority' tooltip={T('tx.tip.maxPriority')} mono>
									{data.maxPriorityFeePerGas / 1e9}
									<code className='ml gray'>GWEI</code>
								</RenderItem>
							)}
							<RenderItem title='Gas Limit &amp; Usage by Txn' tooltip={T('tx.tip.gaslimit', config.symbol)} mono>
								{data && (
									<>
										<code>{NF(data.gasLimit)}</code>
										<code className='gray mr-1 ml-1'> | </code>
										<code className='mr'>{NF(data.gasUsed)}</code>
										<code className='gray'>({NF((data.gasUsed * 100 / data.gasLimit).toFixed(2))}%)</code>
									</>
								)}
							</RenderItem>
							
							{status.more && (
								<RenderItem title='Cumulative Gas Used' tooltip={T('tx.tip.cumulative')} mono>
									{data && NF(data.cumulativeGasUsed)}
								</RenderItem>
							)}
							{status.more && (
								<RenderItem title='Nonce' tooltip={T('tx.tip.nonce')} mono>
									{data?.nonce}
								</RenderItem>
							)}
							{status.more && (
								<RenderItem title='Input Data' tooltip={T('tx.tip.input')} mono>
									{data?.input && <div className='btn-block' style={{ minWidth: "100%" }}>{data.input}</div>}
								</RenderItem>
							)}
							<div>
								<span className='cmd primary d-middle' onClick={() => setStatus({ ...status, more: !status.more })}>
									<span className='mr'>Click to see {status.more ? "less" : "more"}</span>
									<span style={{marginTop: 5}}>{status.more ? <Icon icon="ChevronUp" /> : <Icon icon="ChevronDown" />}</span>
								</span>
							</div>
						</div>
					)}
					{status.tabKey==='Logs' && data && data.logs.length && (
						<>
							<p>Transaction Receipt Event Logs</p>
							{data.logs.map((i, k)=>(
								<div className='media flex' key={k}>
									<div className='round'>
										<span>0</span>
									</div>
									<div>
										<div className='section-split'>
											<div className="col1">
												<b>Address</b>
											</div>
											<div className={`col11`}>
												<Link to={`/address/${'0x123123123'}`}>0x123123123</Link>
											</div>
										</div>
										<div className='section-split'>
											<div className="col1">
												Name
											</div>
											<div className={`col11 gray`}>
												<code>Approval (index_topic_1 address src, index_topic_2 address guy, uint256 wad)</code>
												<Link className='ml' to={`/address/${'0x123123123'}`}>View Source</Link>
											</div>
										</div>
										<div className='section-split'>
											<div className="col1">
												Topics
											</div>
											<div className={`col11 mono topic`}>
												{i.topics.map((t, k1)=>(
													<div key={k1}>
														<span>{k1}</span>
														<select name="mode" id={`mode_${k}_${k1}`} className="input input-sm mr">
															<option value="dec">Dec</option>
															<option value="hex">Hex</option>
														</select>
														<Icon icon="ArrowAltRight" />
														<code>{t}</code>
													</div>
												))}
											</div>
										</div>
										<div className='section-split'>
											<div className="col1">
												Data
											</div>
											<div className={`col11 gray data`}>
												<div className='mb'>
													was : <code>{i.data.slice(2)}</code>
												</div>
												<div>
													<button className={`btn btn-md mr active`}>Dec</button>
													<button className={`btn btn-md`}>Hex</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</>
					)}
				</TabBar>
			</section>
		</div >
	)
};

export default Tx;