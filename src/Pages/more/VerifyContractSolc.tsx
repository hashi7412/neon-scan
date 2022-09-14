import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Collapse from '../../components/Collapse'
import Icon from '../../components/Icon'
import TabBar from '../../components/TabBar'
import useStore, { EvmVersions, isSolcVersionText, LicenseTypes, prettyPrint } from '../../useStore'


interface VerifyContractStatus {
	submited:               boolean
	success:                boolean
	address:				string
	solc:					string
	optimized:				boolean
	runs:					number
	txId:					string
	contractName:			string
	chainByteCode:			string
	compiledCode:			string
	opcodes:				string
	sourceCode:				string
	sourceMap:				string
	abi:					string
	error:					number|string
}

// interface OutputObject {
// 	txHash:                 string
// 	address:                string
// 	bytecode:               string
// 	abi:                    string
// }

interface ErrorObject {
	solc?:					boolean
	license?:				boolean
	sourceCode?: 			boolean
	abi?: 					boolean
	libs?: 					{[index: number]: boolean}
	runs?: 					boolean
}

const libs = {
	0: {name: "", address: ""},
	1: {name: "", address: ""},
	2: {name: "", address: ""},
	3: {name: "", address: ""},
	4: {name: "", address: ""},
	5: {name: "", address: ""},
	6: {name: "", address: ""},
	7: {name: "", address: ""},
	8: {name: "", address: ""},
	9: {name: "", address: ""},
}

const VerifySolc = () => {
	const history = useHistory()
	const {verify, update, sendJson, getError, showLoading} = useStore()

	// const location = useLocation<stateObject>()
	// const { txAddress, compilerType, compilerVersion, licenseType} = location.state

	const [status, setStatus] = React.useState<VerifyContractStatus>({
		submited:			false,
		success:			true,
		address:			'',
		solc:				'',
		optimized:			false,
		runs:				200,
		txId:				'',
		contractName:		'',
		sourceCode:			'',
		chainByteCode:		'',
		compiledCode:		'',
		opcodes:			'',
		sourceMap:			'',
		abi:				'',
		error:				0
	})

	// const [output, setOutput] = React.useState<OutputObject>({
	// 	txHash:             "0x4a46cf8c0cb148a3e2b066559bf51434735b81341785950f4dff2d70fa79165d",
	// 	address:            "0x757A84FD6f9Df58466946350cD8dAfB92E8d3dB0",
	// 	bytecode:           "6080604052348015600f57600080fd5b5060ac8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d14604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea2646970667358221220aa14af0fb1bae287269139d260c357070a20fe9b235de483d3a589d4114bd22164736f6c63430008070033",
	// 	abi:                '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
	// });

	const onChange = (attr: Partial<VerifyContractObject>) => {
		// setErrors({...errors, [attr.]: undefined})
		update({verify: {...verify, ...attr}})
	}

	const submit = (e) => {
		if (verify===null) return
		let errs:ErrorObject = {};
		let {address, 
			codeformat, 
			solc, 
			license, 
			args, 
			libs,
			optimized,
			runs,
			evmVersion,
			sourceCode
		} = verify
		if (solc===undefined || !isSolcVersionText(solc)) errs.solc = true
		if (sourceCode==='') errs.sourceCode = true
		if (evmVersion===undefined) evmVersion = EvmVersions[0].key
		if (license===undefined) license = 0
		if (args===undefined) args = ''
		if (optimized===undefined) optimized = false
		if (runs===undefined || runs===0) runs = 200
		if (libs===undefined) libs = []
		if (evmVersion===undefined) evmVersion = ''
		

		const licenses = ["none", "Unlicense", "MIT", "GPLv2", "GPLv3", "LGPLv2.1", "LGPLv3", "BSC2Clause", "MPL2", "OSL3", "Apache2", "AGPLv3", "BSL11"]
		if (licenses[license]===undefined) errs.license= true

		let format = 'solidity-single-file'
		if (codeformat==='multi') {
			format = "solidity-standard-json-input"
		} else if (codeformat==='json') {
			format = "solidity-standard-json-input"
		}
		const params = [
			address, 
			format, 
			solc, 
			licenses[license], 
			args, 
			libs,
			optimized,
			runs,
			evmVersion,
			sourceCode
		]
		showLoading(true)
		sendJson('verify-contract', ...params).then(res=>{
			if (res.error) {
				setStatus({...status, error: res.error})
				showLoading(false)
			} else if (res.result) {
				const {success, contractName, txId, chainByteCode, compiledCode, abi, opcodes, sourceMap} = res.result as {success: boolean, contractName: string, chainByteCode: string, compiledCode: string, txId: string, abi: any[], opcodes: string, sourceMap: string}
				setStatus({submited: true, success, contractName, sourceCode: verify.sourceCode || '', chainByteCode, compiledCode, abi: JSON.stringify(abi, null, '    '), txId, address: verify.address || '', solc: verify.solc || '', optimized: !!verify.optimized, runs: verify.runs || 200, opcodes, sourceMap, error: 0})
				update({verify: null, loading: false})
				const elem = document.querySelector<HTMLPreElement>('.prettyprint')
				if (elem) {
					elem.innerHTML = verify.sourceCode || ''
					prettyPrint(elem)
				}
			}
		})
	}

	const reset = (e) => {

		update({verify: null})
		history.push("/verifyContract")
	}
	
	// const tabHeader = ['Contract Source Code'] // , 'Comments'
	// if (status.isVerified) tabHeader.push('Compiler Output')

	return (
		
		<div className='verify'>
			<section className='container'>
				<h3 className='text-center'>VerifySolc &amp; Publish Contract Source Code</h3>
				<div className="text-center m-b-2">
					<p className='badge badge-pill badge-info badge-bg m-b-2'>Compiler Type: SINGLE FILE / CONCATENANTED METHOD</p>
				</div>
				<TabBar headers={!status.submited ? ['Contract Source Code'] : ['Compiler Output']}>
					{!status.submited ? (
						<div>
							{status.error!==0 && (
								<div className="error mb-2" dangerouslySetInnerHTML={{__html: typeof status.error==="string" ? status.error : getError(status.error, `<a href="${`/address/${verify?.address}`}">${verify?.address}</a>`).replace('\n', '<br/>')}}/>
							)}
							<div className='p-3' style={{backgroundColor: "var(--border)", borderRadius: 10}}>
								<p className='m-b-2'>1. If the contract compiles correctly at <a href='https://remix.ethereum.org'>REMIX</a>, it should also compile correctly here.</p>
								<p className='m-b-2'>2. We have limited support for verifying ocntracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled</p>
								<p>3. For programatic contract verification, check out the <Link to="/api-endpoints/contracts">Contract API Endpoint</Link></p>
							</div>
							<div className='flex flex-wrap gap'>
								<div className='input-field'>
									<label>Contract Address</label>
									<input type="text" className="input input-block" defaultValue={verify?.address} disabled />
								</div>
								<div className='input-field'>
									<label>Compiler</label>
									<input type="text" className="input input-block" defaultValue={verify?.solc} disabled />
								</div>
								<div className='input-field'>
									<label htmlFor="optimized">Optimization</label>
									<select id="optimized" className='input input-block' value={verify?.optimized ? "1" : '0'} onChange={e => onChange({optimized: e.target.value==="1"})}>
										<option value="0">No</option>
										<option value="1">Yes</option>
									</select>
								</div>
							</div>
							<div className='input-field'>
								<label htmlFor="sourceCode">Enter the Solidity Contract Code below <span className="gray">*</span></label>
								<textarea id="sourceCode" rows={15} className="input input-block" onChange={e => onChange({sourceCode: e.target.value})} value={verify?.sourceCode} />
							</div>
							<div>
								<Collapse header={<p>Constructor Arguments ABI-encoded <span className="gray">(for contracts that were created with constructor parameters)</span></p>}>
									<div className="panbel-content">
										<textarea rows={5} className="input input-block" value={verify?.args} onChange={e => onChange({args: e.target.value})} />
									</div>
								</Collapse>
								<Collapse header={<p>Contract Library Address <span className="gray">(for contracts that use libraries, supports up to 10 libraries)</span></p>}>
									<div className="panbel-content">
										{Object.keys(libs).map(k => (
											<div className='flex flex-wrap gap' key={k}>
												<div className="input-field">
													<label>Library_{Number(k) + 1} Name:</label>
													<input type="text" className='input input-block' value={libs[k].name} onChange={e => onChange({libs: {...verify?.libs, [k]: {...verify?.libs?.[k], name: e.target.value}}})} />
												</div>
												<div className="input-field">
													<label>Library_{Number(k) + 1} Contract Address:</label>
													<input type="text" className='input input-block' value={libs[k].address} onChange={e => onChange({libs: {...verify?.libs, [k]: {...verify?.libs?.[k], address: e.target.value}}})} />
												</div>
											</div>
										))}
									</div>
								</Collapse>
								<Collapse header={<p>Misc Settings <span className="gray">(Runs, EvmVersions &amp; License Type setting)</span></p>}>
									<div className="panbel-content flex flex-wrap gap">
										<div className="input-field">
											<label>Runs</label>
											<input type="text" className="input input-block" value={verify?.runs || 200} onChange = {e => onChange({runs: Number(e.target.value)})} />
										</div>
										<div className="input-field">
											<label htmlFor="evmVersion">EVM Version to target</label>
											<select id='evmVersion' className="input input-block" value={verify?.evmVersion} onChange = {e => onChange({evmVersion: e.target.value})}>
												{EvmVersions.map(i => (<option value={i.key} key={i.key}>{i.label}</option>))}
											</select>
										</div>
										<div className="input-field">
											<label htmlFor="license">License Type</label>
											<select id='license' className="input input-block" value={verify?.license} onChange = {e => onChange({license: Number(e.target.value)})}>
												{LicenseTypes.map((i, k) => (<option value={k} key={k}>{`${k + 1}) ${i}`}</option>))}
											</select>
										</div>
									</div>
								</Collapse>
							</div>
							<div className='d-center gap mt-2 mb-2'>
								<button className='btn btn-primary' style={{ minWidth:'10em' }} onClick={submit}>Verify and Publish</button>
								<button className='btn btn-info' 	style={{ minWidth:'10em' }} onClick={reset}>Return to Main</button>
								{/* <button type='submit' className='btn'>Return to Main</button> */}
							</div>
						</div>
					) : (
						status.success ? (
							<>
								<div className='m-b-2' style={{lineHeight: '150%'}}>
									<p className='m-b-1'><strong>Compiler debug log:</strong></p>
									<p className='gray d-middle flex-wrap gap'><Icon icon="FilledCheck" />Note: Contract was created during TxHash# <Link to={`/tx/${status.txId}`}>{status.txId}</Link></p>
									<p className='gray d-middle flex-wrap gap success'><Icon icon="FilledThumbsUp" />Successfully generated ByteCode and ABI for Contract Address <Link to={`/address/${status.address}`}>[{status.address}]</Link></p>
								</div>
								<div className='card'>
									<div className='m-b-2' style={{lineHeight: '150%'}}>
										Compiler Version: <b>{status.solc}</b><br />
										Optimization Enabled: <b>{status.optimized ? 'Yes' : 'No'}</b><br />
										Runs: <b>{status.runs}</b>
									</div>
									<div className="input-field">
										<label htmlFor="">ContractName:</label>
										<input type="text" className="input input-block" defaultValue={status.contractName} readOnly />
									</div>
									<div className='input-field'>
										<label htmlFor="sourceCode">Contract Source Code (Solidity)</label>
										<div className='input input-block' style={{maxHeight: 300, overflowY: 'auto'}}>
											<pre id="code" className="prettyprint" style={{border: 'none'}}/>
										</div>
									</div>
									<div className="input-field">
										<label htmlFor="">ContractBytecode:</label>
										<textarea className='input input-block' rows={20} defaultValue={status.compiledCode} readOnly />
									</div>
									<div className="input-field">
										<label htmlFor="">ContractABI:</label>
										<textarea className='input input-block' rows={6} defaultValue={status.abi} readOnly />
									</div>
									<div className="input-field">
										<label htmlFor="">Opcode:</label>
										<textarea className='input input-block' rows={6} defaultValue={status.opcodes} readOnly />
									</div>
									<div className="input-field">
										<label htmlFor="">Source map:</label>
										<textarea className='input input-block' rows={6} defaultValue={status.sourceMap} readOnly />
									</div>
								</div>
							</>
						) : (
							<>
								<div className='m-b-2' style={{lineHeight: '150%'}}>
									<p className='m-b-1'><strong>Compiler debug log:</strong></p>
									<p className='danger d-middle flex-wrap gap'><Icon icon="Ban" /> Error! Unable to generate Contract ByteCode and ABI</p>
									{status.contractName!=='' && (<p className='gray d-middle flex-wrap gap'><Icon icon="AngleDobleRight" /> Found the following Contrat name in source code: <b>{status.contractName}</b></p>)}
									{/* <p className='gray d-middle flex-wrap'><Icon icon="AngleDobleRight" /> But we were unable to locate a matching bytecode (err_code_2)</p> */}
									<p className='gray d-middle flex-wrap gap'><Icon icon="FilledExclamationCircle" /> For troubleshooting, you can try compiling your source code with the &nbsp;<Link to='https://remix.ethereum.org'>Remix - Solidity IDE</Link>&nbsp; and check for exceptions</p>
								</div>
								<div className="card">
									<div className='m-b-2' style={{lineHeight: '150%'}}>
										Compiler Version: <b>{status.solc}</b><br />
										Optimization Enabled: <b>{status.optimized ? 'Yes' : 'No'}</b><br />
										Runs: <b>{status.runs}</b>
									</div>
									<div className="input-field">
										<label>ByteCode (What we are looking for):</label>
										<textarea className="input input-block" rows={5} value={status.chainByteCode} readOnly />
									</div>
									<br />
									<p>- vs what we got -</p>
									<br />
									<div className="input-field">
										<span>We tried looking for a match from the list of compiled contract bytecode output (as listed below), but was unable to find an exact match.</span>
										<label>Compiled code:</label>
										<textarea className="input input-block" rows={5} value={status.compiledCode} readOnly />
									</div>
								</div>
								<button className='btn btn-info' style={{ minWidth:'10em' }} onClick={reset}>Start Over</button>
							</>
						)
					)}
				</TabBar>
			</section>
		</div >

	)
}

export default VerifySolc