import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import useStore, { ellipsis, NF } from '../../../useStore'
import TabBar, { TabHeader } from '../../../components/TabBar'
import Icon from '../../../components/Icon'
import Actions from '../../../components/Actions'
import AddressQRCode from '../../../components/AddressQRCode'
import '../../../pretty.scss'
import ContractView from './ContractView'
import ValidatorView from './ValidatorView'
import TokenBalanceView from './TokenBalanceView'
import TxnView from './TxnView'
import InternalTxnView from './InternalTxnView'
import TokenTxnView from './TokenTxnView'
import TokentxnsErc721View from './TokentxnsErc721View'
import TokentxnsErc1155View from './TokentxnsErc1155View'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

// interface TxListType {
// 	data: 				ServerTxListItem[]
// 	count: 				number
// 	total: 				number
// 	page: 				number
// 	limit: 				number
// }

interface ItemType {
	label: 				string
	content:			JSX.Element|string
	right?:				boolean
}


interface AccountStatus {
	showQRCode:			boolean
	tabKey?: 			string
	tokenDropdown: 		boolean
	data?: 				ServerAddressObject
	txs?:         		AccountTxListType
	internaltx?: 		AccountTxListType
	tokentxns?: 		AccountTxListType
	tokentxnsErc721?: 	AccountTxListType
	tokentxnsErc1155?: 	AccountTxListType
	contract?:			ContractDetailType
	logs?: 				ServerTxLogObject[]
}


interface AccountProps {
	type: "address"|"token"|"nft"
	address: string
	extra?: string
}

const Account = ({type, address, extra}: AccountProps) => {
	const {sendJson, showLoading} = useStore()
	const history = useHistory()
	const [data, setData] = React.useState<ServerAddressObject>()
	const [items, setItems] = React.useState<ItemType[]>([])
	const [headers, setHeaders] = React.useState<TabHeader[]>([{key: 'txs', 		label: 'Transactions'}])

	const [status, setStatus] = React.useState<AccountStatus>({
		tokenDropdown: 		false,
		showQRCode:			false
	})

	const getData = () => {
		showLoading(true)
		sendJson("get-address", type, address).then(res=>{
			if (res.error) {

			} else if (res.result) {
				const i = res.result as ServerAddressObject
				setData(i)
				const headers = [{key: 'txs', 		label: 'Transactions'}] as TabHeader[]
	
				if (i.txnIn) 			headers.push({key: 'internaltx', 		label: 'Internal Txns'})
				if (i.txn20) 			headers.push({key: 'tokentxns', 		label: 'ERC-20 Token Txns'})
				if (i.txn721) 			headers.push({key: 'tokentxnsErc721', 	label: 'ERC-721 Token Txns'})
				if (i.txn1155) 			headers.push({key: 'tokentxnsErc1155', 	label: 'ERC-1155 Token Txns'})
				if (i.type!=='none')	headers.push({key: 'code', 				label: 'Contract', badgeType: i.verified ? 'success' : 'none'})
				if (i.validator) 		headers.push({key: 'validator', 		label: 'Validator'})
				setHeaders(headers)

				const items = [] as ItemType[]
				if (type==="address") {
					items.push({
						label: 'Balance',
						content: NF(i.value)
					})
					items.push({
						label: 'My Name Tag',
						content: i.tag || <span className='gray'>Not Available</span>
					})
					items.push({
						label: 'Transaction Count',
						content: NF(i.txn)
					})
					if (i.txnIn) {
						items.push({
							label: 'Internal Txns',
							content: NF(i.txnIn)
						})
					}
					if (i.txn20) {
						items.push({
							label: 'ERC20 Txns',
							content: NF(i.txn20)
						})
					}
					if (i.txn721) {
						items.push({
							label: 'ERC721 Txns',
							content: NF(i.txn721)
						})
					}
					if (i.txn1155) {
						items.push({
							label: 'ERC1155 Txns',
							content: NF(i.txn1155)
						})
					}
					if (i.txId!==undefined && i.creator!==undefined) {
						items.push({
							label: 'Creator',
							content: (
								<div className='d-middle gap'>
									<Link className='mono' to={`/address/${i.creator}`}>{ellipsis(i.creator)}</Link>
									at txn
									<Link className='mono' to={`/tx/${i.txId}`}>{ellipsis(i.txId, 16)}</Link>
								</div>
							)
						})	
					}
					if (i.name!==undefined && i.symbol!==undefined) {
						items.push({
							label: 'Tracker',
							content: (
								<div className='d-middle gap'>
									<Link to={`/token/${address}`}>{`${i.name.length>20 ? `${i.name.slice(0,10)}...${i.name.slice(-7)}` : i.name} (${i.symbol})`}</Link>
								</div>
							)
						})	
					}
				} else if (type==="token") {
					items.push({
						label: 'Address',
						content: <Link className='mono' to={`/address/${i.address}`}>{i.address}</Link>
					})
					items.push({
						label: 'Type',
						content: i.type
					})
					if (i.name) {
						items.push({
							label: 'Name',
							content: i.name
						})
					}
					if (i.symbol) {
						items.push({
							label: 'Symbol',
							content: i.symbol
						})
					}
					if (i.decimals) {
						items.push({
							label: 'Decimals',
							content: String(i.decimals)
						})
					}
					if (i.creator) {
						items.push({
							label: 'Creator',
							content: <Link className='mono' to={`/address/${i.creator}`}>{i.creator}</Link>,
							right: true
						})
					}
					if (i.txId) {
						items.push({
							label: 'Created at Tx',
							content: <Link className='mono' to={`/tx/${i.txId}`}>{ellipsis(i.txId, 16)}</Link>,
							right: true
						})
					}
					items.push({
						label: 'Transaction Count',
						content: NF(i.txn),
						right: true
					})
					if (i.txnIn) {
						items.push({
							label: 'Internal Txns',
							content: NF(i.txnIn),
							right: true
						})
					}
					if (i.txn20) {
						items.push({
							label: 'ERC20 Txns',
							content: NF(i.txn20),
							right: true
						})
					}
					if (i.txn721) {
						items.push({
							label: 'ERC721 Txns',
							content: NF(i.txn721),
							right: true
						})
					}
					if (i.txn1155) {
						items.push({
							label: 'ERC1155 Txns',
							content: NF(i.txn1155),
							right: true
						})
					}
				}
				setItems(items)
				const locHash = window.location.hash
				if (locHash==="#code" || locHash==="#internaltx" || locHash==="#tokentxns" || locHash==="#tokentxnsErc721" || locHash==="#tokentxnsErc1155" || locHash==='#validator') {
					onTabData(locHash.slice(1), true)
				} else {
					onTabData('txs', true)
				}
				// if (status.tabKey) onTabData(status.tabKey, true)
			}
			showLoading(false)
		})
	}
	
	const onTabData = (tabKey: string, force?: true) => {
		console.log(tabKey)
		setStatus({...status, tabKey})
		let method = ''
		let params = [address, [], 0, 25]
		// address, query, page, limit
		switch (tabKey) {
		case 'txs':
			method = 'get-txListByAddress'
			if (!force) history.replace(`/address/${address}`)
			break
		case 'internaltx':
			method = 'get-internalTxList'
			params = [0, ...params]
			if (!force) history.replace(`/address/${address}#internaltx`)
			break
		case 'tokentxns':
			method = 'get-erc20txList'
			if (!force) history.push(`/address/${address}#tokentxns`)
			break
		case 'tokentxnsErc721':
			method = 'get-erc721txList'
			if (!force) history.push(`/address/${address}#tokentxnsErc721`)
			break
		case 'tokentxnsErc1155':
			method = 'get-erc1155txList'
			if (!force) history.push(`/address/${address}#tokentxnsErc1155`)
			break
		case 'code':
			method = 'get-contract'
			params = [address]
			if (!force) history.replace(`/address/${address}#code`)
			break
		case 'validator':
			break
		}
		if (method!=='') {
			if (force || status[tabKey]===undefined) {
				sendJson(method, ...params).then(res=>{
					if (res.error) {
	
					} else if (res.result) {
						if (tabKey==="code") {
							const data = res.result as ContractDetailType
							setStatus({...status, tabKey, contract: data})
						} else {
							const data = res.result as AccountTxListType
							setStatus({...status, tabKey, [tabKey]:data})
						}
					}
				})
			}
		}
	}

	React.useEffect(getData, [address])
	
	
	// {key: 'analytics', 		label: 'Analytics'},
	// {key: 'comments', 		label: 'Comments'},
	
	return (
		<div className='address'>
			<section className='container'>
				{data!==undefined && (
					<div className='h4 d-middle gap' style={{marginBottom: 20}}>
						
						{type==="address" && (
							<>
								{data.type==="none" ? (
									<Jazzicon diameter={24} seed={jsNumberForAddress(data.address)} />
								) : (
									<Icon icon="Question" size={24} />	
								)}
								<span>{data.type==="none" ? 'Address' : 'Contract'}</span>
								<span className='gray text-break'>{data.address}</span>
								<Actions.Copy text={data.address} round big/>
								<span onClick={()=>setStatus({...status, showQRCode: true})} className='btn btn-icon cmd'><Icon icon="QRCode"/></span>
							</>
						)}
						{type==="token" && (
							<>
								<Icon icon="Question" size={24} />
								<span>{data.type}</span>
								<span className='gray'>{data.name} ({data.symbol})</span>
							</>
						)}
						{type==="nft" && (
							<>
								<b>NFT</b>
								<span>{data.name} ({data.symbol})</span>
							</>
						)}
					</div>
				)}
					
				<div className='section-split'>
					<div className='col6'>
						<div className='panel h-100'>
							<div className='panel-header'><h4>Overview</h4></div>
							<div className='panel-content grid-col'>
								{items.map((i, k)=>!i.right && (
									<div key={k}>
										<div className='col3'>
											<span>{i.label} :</span>
										</div>
										<div className='col9'>
											{i.content}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='col6'>
						<div className='panel h-100'>
							<div className='panel-header'>
								<h4>
									{type==="address" && <><span>Token Balance </span><small className='norm'>(Ignore zero balance tokens)</small></>}
									{type==="token" && 'More Info'}
									{type==="nft" && 'NFT'}
								</h4>
							</div>
							<div className='panel-content grid-col scroll' style={{ maxHeight: "300px" }}>
								{type==="address" && (
									<TokenBalanceView data={data ? {erc20: data?.erc20, erc721: data?.erc721, erc1155: data?.erc1155} : null} />
								)}
								{type==="token" && (
									items.map((i, k)=>!!i.right && (
										<div key={k}>
											<div className='col3'>
												<span>{i.label} :</span>
											</div>
											<div className='col9'>
												{i.content}
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
				<TabBar headers={headers} tabKey={status.tabKey} onChange={tabKey=>onTabData(tabKey)}>
					<div style={{minHeight: 400}}>
						{status.tabKey==='txs' && !!status.txs && (
							<TxnView address={address} data={status.txs} />
						)}
						{status.tabKey==='internaltx' && !!status.internaltx && (
							<InternalTxnView address={address} data={status.internaltx} />
						)}
						{status.tabKey==='tokentxns' && !!status.tokentxns && (
							<TokenTxnView address={address} data={status.tokentxns} />
						)}
						{status.tabKey==='tokentxnsErc721' && !!status.tokentxnsErc721 && (
							<TokentxnsErc721View address={address} data={status.tokentxnsErc721} />
						)}
						{status.tabKey==='tokentxnsErc1155' && !!status.tokentxnsErc1155 && (
							<TokentxnsErc1155View address={address} data={status.tokentxnsErc1155} />
						)}
						{status.tabKey==='code' && data?.type!=='none' && (
							status.contract!==undefined ? (
								<ContractView data={status.contract} />
							) : (
								<div className='lh-3'>
									<p>Sorry, we were unable to locate a matching Contract ABI or SourceCode for this contract.</p>
									<p>If you are the contract owner, please <a href={`/verifyContract?a=${address}`}>Verify Your Contract Source Code</a> here.</p>
								</div>
							))
						}
						{status.tabKey==='validator' && data?.validator && (
							<ValidatorView data={data.validator} />
						)}
					</div>
				</TabBar>
				{status.showQRCode && <AddressQRCode address={address} onClose={()=>setStatus({...status, showQRCode: false})} />}
			</section>
		</div>
	)
};

export default Account;

