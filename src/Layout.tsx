import React from 'react';
import { Link } from "react-router-dom";
import useStore, { config }  from './useStore';

import Icon from './components/Icon';
import Loading from './components/Loading';

import MetaMaskImg from "./metamask.svg";
import { addNetwork } from './libs/metamask';

interface LayoutStatus {
	isOpen: boolean
	dropdownActive: number
	innerHeight: number
	// isLogin: boolean
}

const onCloseHandle = (onHandle, isOpen, ref) => {
	if(!ref.current) return
	if(!isOpen) return
	const onEscapeHandle = (e) => {
		if(e.key === "Escape") onHandle()
	}

	const onOutsideClickHandle = (e) => {
		if(!ref.current.contains(e.target)) onHandle()
	}

	document.addEventListener("keydown", onEscapeHandle)
	document.addEventListener("mousedown", onOutsideClickHandle)
	ref.current.querySelectorAll("a").forEach(item => {
		item.addEventListener("click", onHandle)
	})

	return () => {
		document.removeEventListener("keydown", onEscapeHandle)
		document.removeEventListener("mousedown", onOutsideClickHandle)
		ref.current.querySelectorAll("a").forEach(item => {
			item.removeEventListener("click", onHandle)
		})
	}
}

const Layout = (props: any) => {
	const {lang, loading, T, theme, update, account, logout, showLoading} = useStore()

	const [status, setStatus] = React.useState<LayoutStatus>({
		isOpen: false,
		dropdownActive: -1,
		innerHeight: document.body.clientHeight
	});
	
	const headerContainer = React.useRef(null)

	React.useEffect(() => {
		onCloseHandle(() => setStatus({...status, isOpen: false}), status.isOpen, headerContainer)
	}, [status.isOpen])

	const onAddNetwork = async () => {
		showLoading(true)
		await addNetwork(config.chain, config.symbol, config.chainId, config.rpc, "https://scan.neonlink.io")
		showLoading(false)
	}

	return (
		<>
			<div className='bg'>
				<div></div>
				<div></div>
				<div></div>
				<div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div></div>
			</div>

			<div className={`root ${theme} ${status.isOpen ? "open-menu" : ""}`}>
				<div>
					<header ref={headerContainer}>
						<section className="header container">
							<Link className="logo" to="/">
								{'imageTitle' in config ? (
									<img src={config['imageTitle']} alt="logo" width={90} />
								) : (
									<>
										<img src="/logo.svg" alt="logo" width={32} height={32} />
										<b style={{fontSize:'2em'}}>{T('title')}</b>
									</>
								) }
								
								{config.beta && <sup className='badge badge-danger badge-pill'>beta</sup>}
								{config.testnet && <sup className='badge badge-danger badge-pill'>Testnet</sup>}
							</Link>
							<menu>
								<button className="hamburger" onClick={() => setStatus({ ...status, isOpen: !status.isOpen })}><span></span></button>
								<ul className="menu">
									<li><Link to="/">Home</Link></li>
									<li>
										<button className={status.dropdownActive === 1 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 1 ? -1 : 1) })}>
											{T('menu.blockchain')}
											<Icon icon='ChevronDown' />
										</button>
										<div className='sub-menu'>
											<div className='common'>
												<div className='flex column'>
													<Link to="/accounts">{T('menu.blockchain.top')}</Link>
												</div>
												<div className='flex column'>
													<Link to="/txs">{T('menu.blockchain.txn')}</Link>
													<Link to="/Pending">{T('menu.blockchain.pending')}</Link>
													<Link to="/txsInternal">{T('menu.blockchain.internal')}</Link>
													{/* <Link to="/tokens">{T('menu.tokens.erc20')}</Link> */}
													{/* <Link to="/tokens-nft">{T('menu.tokens.erc721')}</Link> */}
													{/* <Link to="/tokens-nft1155">{T('menu.tokens.erc1155')}</Link> */}
													<Link to="/tokentxns">{T('menu.tokens.erc20transfer')}</Link>
													<Link to="/tokentxns-nft">{T('menu.tokens.erc721transfer')}</Link>
													<Link to="/tokentxns-nft1155">{T('menu.tokens.erc1155transfer')}</Link>
												</div>
												<div className='flex column'>
													<Link to="/blocks">{T('menu.blockchain.blocks')}</Link>
													<Link to="/contractsVerified">{T('menu.blockchain.contracts')}</Link>
												</div>
											</div>
										</div>
									</li>
									<li>
										<button className={status.dropdownActive === 2 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 2 ? -1 : 2) })}>
											{T('menu.staking')}<Icon icon="ChevronDown" />
										</button>
										<div className="sub-menu">
											<div className='common'>
												<div className='flex column'>
													<Link to="/validators">{T('menu.staking.validators')}</Link>
													<Link to="/epochs">{T('menu.staking.epochs')}</Link>
												</div>
											</div>
										</div>
									</li>
									<li className='sub-right'>
										<button className={status.dropdownActive === 5 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 5 ? -1 : 5) })}>
											More<Icon icon="ChevronDown" />
										</button>
										<div className='sub-menu menu-details'>
											<div>
												<span><b>Developers</b></span>
												<ul>
													<li><a href={`/docs/${lang}`}>{T('menu.more.api')}</a></li>
													<li><Link to="/opcode-tool">{T('menu.more.opcode')}</Link></li>
													<li><Link to="/pushTx">{T('menu.more.broadcast')}</Link></li>
													{/* <li><Link to="/searchcontract">{T('menu.more.contract_searh')}</Link></li> */}
													{/* <li><Link to="/contractdiffchecker">{T('menu.more.contract_diff_checker')}</Link></li> */}
												</ul>
											</div>
											<div>
												<span><b>Tools</b></span>
												<ul>
													{/* <li><Link to="/gastracker">{T('menu.more.gas_tracker')}</Link></li> */}
													<li><Link to="/verifyContract">{T('menu.more.verify')}</Link></li>
													{/* <li><Link to="/verifiedSignatures">{T('menu.more.verified_sign')}</Link></li> */}
													{/* <li><Link to="/tokenapprovalchecker">{T('menu.more.token_approvals')}</Link></li> */}
													{/* <li><Link to="/labelcloud">{T('menu.more.label_word_cloud')}</Link></li> */}
													<li><Link to="/unitconverter">{T('menu.more.unit_converter')}</Link></li>
													<Link to="/charts">{T('menu.resources.charts')}</Link>
													{/* <Link to="/topstat">{T('menu.resources.topstat')}</Link> */}
												</ul>
											</div>
										</div>
									</li>
									<li className="sub-right">
										{account===null ? (
											<Link to="/login"><Icon icon="UserCircle" margin={5} /> {T('menu.login')}</Link>
										) : (
											<>
												<button className={status.dropdownActive === 6 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 6 ? -1 : 6) })}>
													<Icon icon="UserCircle" className='mr' /> 
													{account.username}
													<Icon icon="ChevronDown" />
												</button>
												<div className="sub-menu">
													<div className='common'>
														<div className='flex column'>
															<Link to="/myaccount">{T('menu.my')}</Link>
														</div>
														{/* <div className="flex column">
															<Link to="/myaddress">{T('menu.my.watch_list')}</Link>
															<Link to="/mynotes-address">{T('menu.my.txn_private_notes')}</Link>
															<Link to="/mytokenignore">{T('menu.my.token_ignore_list')}</Link>
														</div> */}
														<div className="flex column">
															<Link to="/myapikey">{T('menu.my.api_keys')}</Link>
															{/* <Link to="/myverify-address">{T('menu.my.verified_address')}</Link>
															<Link to="/mycustomabi">{T('menu.my.custom_abi')}</Link> */}
														</div>
														<div className="logout-field">
															<button onClick={()=>logout()} className='btn btn-primary btn-block'>{T('menu.logout')}</button>
														</div>
													</div>
												</div>
											</>
										)}
									</li>
									<li className='sub-right'>
										<button className={status.dropdownActive === 6 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 6 ? -1 : 6) })}><img src='/logo.svg' width={20} height={20} alt='Logo' /></button>
										<div className="sub-menu">
											<div className='common'>
												<div className='flex column'>
													<a href={config.mainscan}>{config.symbol} {T('menu.network.main')}</a>
													<a href={config.testscan}>{config.symbol} {T('menu.network.test')}</a>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</menu>
						</section>
					</header>
					<main>
						{props.children}
					</main>
				</div>
				{loading && <Loading />}
				<footer>
					<section className='container'>
						<div className="footer-content">
							<div style={{display: 'flex'}}>
								<img src="/logo.svg" alt="logo" />
								<span className='gray'>Powered by {config.title}</span>
							</div>
							<div>
								<div>
									<button className='btn btn-info d-middle' onClick={()=>onAddNetwork()}><img src="/logo.svg" alt="metamask" width={18} height={18} />Add {config.chain} {config.testnet ? 'Testnet' : 'Mainnet'}</button>
									{/* <button className='btn btn-info d-middle'>Preferences</button> */}
									<button className="btn btn-info d-middle" onClick={() => { update({ theme: (theme === "dark-theme" ? "" : "dark-theme") }) }}>
										{theme === "dark-theme" ? <Icon icon="Moon" /> : <Icon icon="Sun"/>}
									</button>
								</div>
							</div>
						</div>
					</section>
				</footer>
			</div >
		</>
	)
}

export default Layout;