import React from 'react'
import { Link } from "react-router-dom"
import Collapse from '../../../components/Collapse'
import Icon from "../../../components/Icon"
import useStore, { prettyPrint, config, encodeCall, fetchJson, decodeCallData } from '../../../useStore'
import {ethers} from 'ethers'
type ViewType = 'code'|'read'|'write'
interface ContractViewProps {
	data: ContractDetailType
}

interface AbiArgument {
	name:			string
	type:			string
	value?:			string
}

interface SimpleAbiEntry {
	name: 			string
	inputs: 		AbiArgument[]
	outputs:		AbiArgument[]
	value?:			number | string
}

interface ContractViewStatus {
	view:			ViewType
	reads:			SimpleAbiEntry[]
	writes:			SimpleAbiEntry[]
}

// const DataType = [
// 	'address', 'string', 'bool', 
// 	'bytes', 'byte1', 'byte2', 'byte3', 'byte4', 'byte5', 'byte6', 'byte7', 'byte8', 'byte9', 'byte10', 'byte11', 'byte12', 'byte13', 'byte14', 'byte15', 'byte16', 'byte17', 'byte18', 'byte19', 'byte20', 'byte21', 'byte22', 'byte23', 'byte24', 'byte25', 'byte26', 'byte27', 'byte28', 'byte29', 'byte30', 'byte31', 'byte32',
// 	'int8', 'int16', 'int24', 'int32', 'int40', 'int48', 'int56', 'int64', 'int72', 'int80', 'int88', 'int96', 'int104', 'int112', 'int120', 'int128', 'int136', 'int144', 'int152', 'int160', 'int168', 'int176', 'int184', 'int192', 'int200', 'int208', 'int216', 'int224', 'int232', 'int240', 'int248', 'int256',
// 	'uint8', 'uint16', 'uint24', 'uint32', 'uint40', 'uint48', 'uint56', 'uint64', 'uint72', 'uint80', 'uint88', 'uint96', 'uint104', 'uint112', 'uint120', 'uint128', 'uint136', 'uint144', 'uint152', 'uint160', 'uint168', 'uint176', 'uint184', 'uint192', 'uint200', 'uint208', 'uint216', 'uint224', 'uint232', 'uint240', 'uint248', 'uint256',

// ]
// const ModifierType = ['view', 'pure', 'payable']

const ContractView = ({data}: ContractViewProps) => {
	
	const {showLoading} = useStore()
	const [status, setStatus] = React.useState<ContractViewStatus>({
		view:		'code',
		reads:		[],
		writes:		[]
	})

	const onContractView = (view: ViewType) => {
		setStatus({...status, view})
	}

	const prettify = () => {
		const elemCode = document.querySelector<HTMLPreElement>('#code')
		if (elemCode) {
			elemCode.innerHTML = data.sourceCode || ''
			prettyPrint(elemCode)
		}
		const elemAbi = document.querySelector<HTMLPreElement>('#abi')
		if (elemAbi) {
			elemAbi.innerHTML = JSON.stringify(data.abi, null, '  ')
			prettyPrint(elemAbi)
		}
	}

	const detectFunctions = async () => {
		if (data.abi.length > 0 && (status.reads.length + status.writes.length===0)) {
			const reads = [] as SimpleAbiEntry[]
			const writes = [] as SimpleAbiEntry[]
			for (let abi of data.abi) {
				if (abi.type==="function") {
					const name = 	abi.name
					const inputs = 	abi.inputs.map(i=>({name: i.name, type: i.internalType}))
					const outputs =	abi.outputs.map(i=>({name: i.name, type: i.internalType}))
	
					if (abi.stateMutability==='view' || abi.stateMutability==='pure') {
						reads.push({name, inputs, outputs})
					} if (abi.stateMutability==='nonpayable') {
						writes.push({name, inputs, outputs})
					} else if (abi.stateMutability==='payable') {
						writes.push({name, inputs, outputs, value: 0})
					}
				}
			}
			reads.sort((a, b)=>a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
			writes.sort((a, b)=>a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
			await readContract(reads)
			setStatus({...status, reads, writes})
		}
	}

	const readContract = async (reads: SimpleAbiEntry[]) => {
		const params = [] as RpcRequestType[]
		const iface = new ethers.utils.Interface(data.abi)
		for (let k = 0; k < reads.length; k++) {
			const i = reads[k]
			if (i.inputs.length===0) params.push(encodeCall(iface, data.address, i.name, [], k))
		}
		if (params.length) {
			showLoading(true)
			try {
				
				const rows = await fetchJson(config.rpc, params)
				if (rows && Array.isArray(rows) && rows.length===params.length) {
					for (let i of rows) {
						const name = reads[i.id].name
						const value = String(decodeCallData(iface, name, i.result))
						reads[i.id].value = value
					}
				}
			} catch (error) {
				console.log(error)
			}
			showLoading(false)
		}
		
	}
	const onChangeView = (view: ViewType) => {
		if (status.view==='code') {
			prettify()
		} else {
			detectFunctions()
		}
	}

	const onChangeArgument = (func: string, name: string, type: string, value: string) => {
		
	}

	React.useEffect(()=>onChangeView(status.view), [status.view])

	return (
		<>
			<div className='mb-3 d-middle gap'>
				<button className={`btn btn-${status.view==='code'  ? 'primary' : 'info'}`} onClick={() => onContractView('code')}>Code</button>
				<button className={`btn btn-${status.view==='read'  ? 'primary' : 'info'}`} onClick={() => onContractView('read')}>Read Contract</button>
				<button className={`btn btn-${status.view==='write' ? 'primary' : 'info'}`} onClick={() => onContractView('write')}>Write Contract</button>
			</div>
			{status.view==='code' && (
				<>
					<div className='d-middle gap mb-3'>
						<Icon icon="FilledCheck" fill="var(--success)" />
						<b>Contract Source Code Verified</b>
						<span className='gray'>(Exact Match)</span>
					</div>
					<div className='grid-col lh-2 mb-3'>
						<div>
							<div className="col6">
								<div className="grid-col">
									<div>
										<div className='col4'>
											Contract Name :
										</div>
										<div className='col8'>
											<b>{data.name}</b>
										</div>
									</div>
									<div>
										<div className='col4'>
											Compiler Version :
										</div>
										<div className='col8'>
											<b>{data.solc}</b>
										</div>
									</div>
								</div>
							</div>
							<div className="col6">
								<div className="grid-col">
									<div>
										<div className='col4'>
											Optimization Enabled :
										</div>
										<div className='col8'>
											<b>{data.optimized ? 'Yes' : 'No'}</b> with <b>{data.runs}</b> runs
										</div>
									</div>
									<div>
										<div className='col4'>
											Other Settings :
										</div>
										<div className='col8'>
											<b>{data.evmVersion}</b> evmVersion, <b>{data.license}</b> <Link to="/contract-license-types">license</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='d-middle gap mb-1'>
						<Icon icon="File" />
						<b>Contract Source Code</b>
						<span className='gray'>(Solidity)</span>
					</div>
					<div className='input input-block mb-3 scroll' style={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
						<pre id="code" className="prettyprint mono" style={{ border: 'none' }} />
					</div>
					<div className='d-middle gap mb-1'>
						<Icon icon="File" />
						<b>Contract ABI</b>
					</div>
					<div className='input input-block mb-3 scroll' style={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
						<pre id="abi" className="prettyprint mono" style={{ border: 'none' }} />
					</div>
					<div className='d-middle gap mb-1'>
						<Icon icon="File" />
						<b>Contract deployed code</b>
					</div>
					<div className='input input-block mono mb-3 scroll' style={{ maxHeight: 200, overflowY: 'auto', wordBreak: 'break-all', backgroundColor: 'var(--bg-card)' }}>
						{data.object}
					</div>
					<div className='d-middle gap mb-1'>
						<Icon icon="File" />
						<b>Deployed ByteCode Sourcemap</b>
					</div>
					<div className='input input-block mono mb-3 scroll' style={{ maxHeight: 100, overflowY: 'auto', wordBreak: 'break-all', backgroundColor: 'var(--bg-card)' }}>
						{data.sourceMap}
					</div>
					<div className='d-middle gap mb-1'>
						<Icon icon="File" />
						<b>Swarm Source</b>
					</div>
					<div className='input input-block mono' style={{ wordBreak: 'break-all' }}>
						{data.swarm}
					</div>
				</>
			)}
			{status.view==='read' && (
				<>
					{status.reads.map((i, k)=>(
						<Collapse key={k} header={(
							<div className='d-middle gap'>
								{i.inputs.length===0 ? <Icon icon="Info" className='gray' /> : <Icon icon="Question" className='gray' />}
								<span>{`${++k}. ${i.name}`}</span>
								{i.value!==undefined && (
									<div className='d-middle gap'>
										<span>: </span>
										<b>{i.value}</b>
									</div>
								)}
							</div>
						)}>
							<div className="panbel-content">
								{i.inputs.map((m, n)=>(
									<div key={n} className="mb-1">
										<label className='lh-3'>{m.name} ({m.type})
											<input type="text" className='input input-block' value={m.value} onChange={e => onChangeArgument(i.name, m.name, m.type, e.target.value)} />
										</label>
									</div>
								))}
							</div>
							<div>
								<button className='btn btn-info'>Query</button>
							</div>
							<div className='mt-1'>
								{i.outputs.map((m, n)=>(
									<span key={n} className="mb-1">
										{m.name} <i>({m.type})</i>
									</span>
								))}
							</div>
						</Collapse>
					))}
				</>
			)}
			{status.view==='write' && (
				<>
				{status.writes.map((i, k)=>(
					<Collapse key={k} header={<div className='d-middle gap'>{<Icon icon="PlayCircle" className='gray' />}{++k}. {i.name} </div>}>
						<div className="panbel-content">
							{i.value!==undefined && (
								<label className='lh-3'>Transfer Value ({config.symbol})
									<input type="text" className='input input-block' value={i.value} onChange={e => onChangeArgument(i.name, '', '', e.target.value)} />
								</label>
							)}
							{i.inputs.map((m, n)=>(
								<div key={n} className="mb-1">
									<label className='lh-3'>{m.name} ({m.type})
										<input type="text" className='input input-block' value={m.value} onChange={e => onChangeArgument(i.name, m.name, m.type, e.target.value)} />
									</label>
								</div>
							))}
						</div>
						<div>
							<button className='btn btn-primary'>Send Transaction</button>
						</div>
						<div className='mt-1'>
							{i.outputs.map((m, n)=>(
								<span key={n} className="mb-1">
									{m.name} <i>({m.type})</i>
								</span>
							))}
						</div>
					</Collapse>
				))}
			</>
			)}
		</>
	)
}

export default ContractView
