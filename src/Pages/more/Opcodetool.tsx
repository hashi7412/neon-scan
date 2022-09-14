// by: Leo Pawel 	<https://github.com/galaxy126>
// 07/09/2022

import React from 'react';
import { disassemble } from './opcodes';
import useStore from '../../useStore';
import './opcodetool.scss'

const Opcodetool = () => {
	const {showLoading, getError} = useStore()
	const [code, setCode] = React.useState('');
	const [opcode, setOpcode] = React.useState('');
	const [error, setError] = React.useState('');

	const submit = async () => {
		showLoading(true)
		await new Promise(resolve=>setTimeout(()=>{
			try {
				setError('')
				const bytecode = code.trim()
				const ops = disassemble(bytecode[1]!=='x' ? bytecode : bytecode.slice(2))
				setOpcode(`<table>
					<tbody>
						${ops.map((i, k) => (
							`<tr>
								<td style='text-align:center'>[${i.offset}]</td>
								<td>${i.opcode.mnemonic}</td>
								<td>${i.pushValue}</td>
								<td><i>${i.opcode.doc || ''}</i></td>
							</tr>`
						)).join('')}
					</tbody>
				</table>`)
			} catch (error: any) {
				if (error.code==='INVALID_ARGUMENT') {
					setError(getError(10201))
				} else {
					setError(error.message)
				}
			}
			resolve(true)
		}, 100))
		showLoading(false)
	}

	return (
		<section className='container opcode'>
			<h3>Bytecode to Opcode Disassembler</h3>
			<hr />
			<p>Attempts to decode the low level Contract ByteCodes to Opcodes</p><br />
			<div className='form'>
				<textarea className='input input-block' rows={15} placeholder="Enter Contract Bytecode (hex)" onChange={(e) => setCode(e.target.value)}>{code}</textarea><br />
				{error!=='' && <div className='error'>{error}</div>}
				<div className='text-right'>
					<button className='btn btn-primary' onClick={submit}>Decode</button>
				</div>
				{opcode!=='' && (
					<div className='panel mt-2'>
						<div className="panel-header">
							<h4>Decode Bytecode:</h4>
						</div>
						<div className="panel-content" dangerouslySetInnerHTML={{__html: opcode}} />
					</div>
				)}
				
			</div>
		</section>
	)
}

export default Opcodetool