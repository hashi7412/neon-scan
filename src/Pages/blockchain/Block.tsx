import React from 'react'
import { Link, useParams } from 'react-router-dom'

// import { blocks } from '../mockup/home.json'
import useStore, { config, NF } from '../../useStore'
import TabBar from '../../components/TabBar'
import Icon from '../../components/Icon'

interface BlockStatus {
	tabKey: string
	more: boolean
	loading: boolean
}

interface RowInfo {
	title: string
	content: any
	desc: string
}

const Block = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const params = useParams()
	const blockHeight = parseInt(params["height"])
	const [data, setData] = React.useState<BlockObject>({
		latestBlock:			0,
		blockNumber: 			0,
		hash: 					'',
		parentHash:				'',
		miner: 					'',
		txn: 					0,
		txnIn: 					0,
		rewards: 				0,
		difficulty: 			0,
		totalDifficulty: 		0,
		size: 					0,
		gasUsed: 				0,
		sha3Uncles: 			'',
		nonce: 					0,
		timestamp: 				0,
	})
	const [status, setStatus] = React.useState<BlockStatus>({
		tabKey: 'Overview',
		more: false,
		loading: false
	});
	
	const getData = (blockHeight: number) => {
		showLoading(true)
		sendJson("get-block", blockHeight).then(res=>{
			if (res.result) {
				setData(res.result)
			}
			showLoading(false)
		})
	}
	React.useEffect(() => {
		if (blockHeight) getData(blockHeight)
	}, [blockHeight]);

	const rowInfos: Array<RowInfo|false> = [
		{
			title: "Block Height",
			content: (
				<div className='d-middle gap'>
					{data.blockNumber > 0 && <Link to={`/block/${data.blockNumber - 1}`} className={`btn btn-primary btn-sm d-middle`}><Icon icon="CaretLeft"/></Link>}
					<b className='bold'>{data.blockNumber}</b>
					{data.blockNumber < (data.latestBlock || 0) && <Link to={`/block/${data.blockNumber + 1}`} className='btn btn-primary btn-sm d-middle'><Icon icon="CaretRight"/></Link>}
				</div>
			),
			desc: "Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
		}, {
			title: "Timestamp",
			content: <div className='d-middle gap'><Icon icon="CircleClock"/>{timeAgo(data.timestamp)} ({new Date(data.timestamp * 1e3).toString()})</div>,
			desc: "The date and time at which a block is validated."
		}, {
			title: "Transactions",
			content:
				<div className='d-middle gap'>
					{data.txn === 0 ? '0 transaction' : <Link to={`/txs?block=${data.blockNumber}`} className='btn btn-primary txs'>{data.txn} transactions</Link>}
					and
					{data.txnIn === 0 ? " 0 contract internal transaction " : <Link to={`/txsInternal?block=${data.blockNumber}`} className='btn btn-primary txs'>{data.txnIn} contract internal transactions</Link>}
					in this block
				</div>,
			desc: `The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves ${config.symbol} value.`
		}, {
			title: "Block Reward",
			content: <code>{data.rewards} {config.symbol}</code>,
			desc: `For each block, the miner is rewarded with a finite amount of ${config.symbol} on top of the fees paid for all transactions in the block.`
		}, {
			title: "Difficulty",
			content: <code>{data.difficulty}</code>,
			desc: `The amount of effort required to mine a new block. The difficulty algorithm may adjust according to time.`
		}, {
			title: "Total Difficulty",
			content: <code>{data.totalDifficulty}</code>,
			desc: "Total difficulty of the chain until this block."
		}, {
			title: "Size",
			content: <code>{NF(data.size)} bytes</code>,
			desc: "The block size is actually determined by the block's gas limit."
		}, {
			title: "Gas Used",
			content: <code>{NF(data.gasUsed)} ({(data.gasUsed / config.blockGasLimit).toFixed(2)}%)</code>,
			desc: "The total gas used in the block and its percentage of gas filled in the block."
		}, {
			title: "Hash",
			content: data.hash,
			desc: "The hash of the block header of the current block."
		}, data.blockNumber>0 && {
			title: "Parent Hash",
			content: data.blockNumber>0 && <Link className='mono' to={`/block/${data.blockNumber - 1}`}>{data.parentHash}</Link>,
			desc: "The hash of the block from which this block was generated, also known as its parent block."
		}, {
			title: "Sha3Uncles",
			content: data.sha3Uncles,
			desc: `The mechanism which ${config.chain} Javascript RLP encodes an empty string.`
		}, {
			title: "Nonce",
			content: <code>{data.nonce}</code>,
			desc: "Block nonce is a value used during mining to demonstrate proof of work for a block."
		}
	]
	const headers = [
		'Overview' // , 'Comments'
	]
	return (
		<section className='container'>
			<h3>Block <small>#{data.blockNumber}</small></h3>
			<TabBar headers={headers} onChange={tabKey=>setStatus({...status, tabKey})}>
				{status.tabKey==='Overview' ? (
					<div className='grid-col'>
						{config.testnet && <div><span className='tag danger'>[ This is a {config.chain} Testnet block only ]</span></div>}
						{rowInfos.map((i, k) => i && (
							!(status.more === false && k >= 9) && (
								<div key={k} style={{minHeight: '2em'}}>
									<div className='col3 d-middle'>
										<div className='d-middle'>
											<div className="tooltip">
												<div className='icon mr'>
													<Icon icon="Question"/>
												</div>
												<div className="top">
													{i.desc}
													<i></i>
												</div>
											</div>
											{i.title} :
										</div>
									</div>
									<div className='col9 d-middle' style={{whiteSpace: 'nowrap',  overflow: 'hidden', textOverflow: 'ellipsis'}}>
										{i.content}
									</div>
								</div>
							)
						))}
						<div style={{minHeight: '2em'}}>
							<span className='cmd primary d-middle' onClick={() => setStatus({ ...status, more: !status.more })}>
								<span className='mr'>Click to see {status.more ? "less" : "more"}</span>
								<span style={{marginTop: 5}}>{status.more ? <Icon icon="ChevronUp" /> : <Icon icon="ChevronDown" />}</span>
							</span>
						</div>
					</div>
				) : (
					<p>Make sure to use the "Vote Down" button for any spammy posts, and the "Vote Up" for interesting conversations.</p>
				)}
			</TabBar>
		</section>
	)
};

export default Block;