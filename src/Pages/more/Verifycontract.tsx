import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import useStore, { CodeFormats, isSolcVersionText, LicenseTypes, loadExternal, validateAddress } from '../../useStore'

interface CompilerType {
	key: 					string
	label: 					string
}

// interface VerifyStatus {
// 	address:              	string
// 	solc:           		number
// 	version:        string
// 	license:            number
// }

interface ErrorStatus {
	address?:				string
	codeformat?:			string
	solc?:					string
	license?:				string
}

const VerifyContract = () => {
	const {verify, update, showLoading} = useStore()
	const [acceptTerms, setAcceptTerms] = React.useState(false)
	const [compilers, setCompilers] = React.useState<CompilerType[]>([])
	const [errors, setErrors] = React.useState<ErrorStatus>({})
	const history = useHistory()

	const submit = () => {
		if (verify===null) return
		let errs = {} as ErrorStatus
		const {address, codeformat, solc, license} = verify
		if (address===undefined) {
			errs.address = "Input contract address"
		} else if (!validateAddress(address)) {
			errs.address = "Input correct contract address"
		}
		if (codeformat===undefined) errs.codeformat = "Select compiler type"
		if (solc===undefined || !isSolcVersionText(solc)) errs.solc = "Select compiler version"
		if (license===undefined) 	errs.license = "Select license type"
		if(Object.keys(errs).length !== 0) return setErrors({...errs})
		switch(codeformat) {
		case "single":
			history.push("/verifyContract-solc")
			break
		case "multi":
			history.push("/verifyContract-solc-multiple")
			break
		case "json":
			history.push("/verifyContract-solc-json")
			break
		// case 4:
		// 	pathname = "/verifyContract-vyper"
		// 	break
		}
	}

	const onChange = (key: 'address'|'codeformat'|'solc'|'license', value: string|number) => {
		setErrors({...errors, [key]: undefined})
		update({verify: {...verify, [key]: value}})
	}

	const onReset = () => {
		setErrors({address: undefined, codeformat: undefined, solc: undefined, license: undefined})
		update({verify: null})
	}

	const loadSolcVersions = async () => {
		showLoading(true)
		const loaded = await loadExternal('soljsonReleases', 'https://binaries.soliditylang.org/bin/list.js')
		if (loaded) {
			const {soljsonReleases} = window
			if (soljsonReleases) {
				const list = [] as CompilerType[]
				for (let key in soljsonReleases) {
					list.push({key: soljsonReleases[key].slice(8, -3), label: soljsonReleases[key].slice(0, -3)})
				}
				setCompilers(list)
			}
		}
		showLoading(false)
	}

	React.useEffect(()=>{
		loadSolcVersions()
		const address = new URLSearchParams(window.location.search).get("a") || ''
		if (address && validateAddress(address)) onChange('address', address)
	}, [])
	
	return (

		<div className='verify'>
			<section className='container'>
				<div className='sub-container'>
					<h3 className='text-center'>Verify &amp; Publish Contract Source Code</h3>
					<p className='text-center uppercase'><b className='gray'>compiler type and version selection</b></p>
					<hr />
					<p>Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, NeonScan will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.</p>
					<div className='form'>
						<div className='input-field'>
							<label>Please enter the Contract Address you would like to verify</label>
							<input className='input input-block' placeholder='0x...' onChange={e => onChange('address',e.target.value)} value={verify?.address} />
							<span className="warning">{errors.address}</span>
						</div>
						<div className='input-field'>
							<label>Please select Compiler Type</label>
							<select className='input input-block' value={verify?.codeformat} onChange={e => onChange('codeformat',e.target.value)}>
								<option value={0}>[Please Select]</option>
								{CodeFormats.map(i => (<option value={i.key} key={i.key} title={i.title}>{i.label}</option>))}
							</select>
							<span className="warning">{errors.codeformat}</span>
						</div>
						<div className="input-field">
							<label>Please select Compiler Version</label>
							<select className="input input-block" value={verify?.solc} onChange={e => onChange('solc',e.target.value)}>
								<option value="">[Please Select]</option>
								{verify?.solc && compilers.length===0 && (<option value={verify.solc}>{`soljson-${verify.solc}`}</option>)}
								{verify?.codeformat && compilers.map(i => (<option value={i.key} key={i.key}>{i.label}</option>))}
							</select>
							<span className="warning">{errors.solc}</span>
						</div>
						<div className="input-field">
							<label>Please select Open Source License Type</label>
							<select className="input input-block" value={verify?.license} onChange={e => onChange('license', Number(e.target.value))}>
								<option value={0}>[Please Select]</option>
								{LicenseTypes.map((i, k) => (<option value={k} key={k}>{`${k + 1}) ${i}`}</option>))}
							</select>
							<span className="warning">{errors.license}</span>
						</div>
						<div className='text-center mt-2 mb-2'>
							<label className='d-center gap'>
								<input type="checkbox" onChange={e => setAcceptTerms(e.target.checked)}/> I agree to the <Link to="/terms">terms of service</Link>
							</label>
						</div>
						<div className='text-center mt-2 mb-2 d-center gap'>
							<button className='btn btn-primary' style={{ minWidth:'8em' }} onClick={submit} disabled={!acceptTerms}>Continue</button>
							<button className='btn btn-info' 	style={{ minWidth:'8em' }} onClick={onReset}>Reset</button>
						</div>
					</div>
				</div>
			</section>
		</div >

	)
}

export default VerifyContract