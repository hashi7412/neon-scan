import React from "react"
import {ethers} from 'ethers'
import Icon from "../../components/Icon"
import { config } from "../../useStore"

interface UnitInputProps {
	unit:			string
	decimals:		number
	value:			string
	onValue:		(val: string) => void
}

const unitInputFieldStyle = {
	display:			"flex",
	justifyContent:		"space-between",
	alignItems:			"center",
	marginBottom:		"5px",
	overflow:			"hidden",
	border: 			"1px solid var(--border)",
	borderRadius: 		"10px",
}

const copyBtnStyle = {
	borderRight:		"1px solid var(--border)",
	padding:			"10px 20px"
}

const unitInputStyle = {
	"flex":				"1",
	padding:			"10px"
}

const labelStyle = {
	borderLeft:			"1px solid var(--border)",
	width:				"150px",
	padding:			"10px 0px 15px 15px"
}

const units = [
	{unit: "Wei",		decimals: 0}, 
	{unit: "KWei",		decimals: 3}, 
	{unit: "MWei",		decimals: 6}, 
	{unit: "GWei",		decimals: 9}, 
	{unit: "Szabo",		decimals: 12}, 
	{unit: "Finney",	decimals: 15}, 
	{unit: config.symbol,		decimals: 18}, 
	{unit: `K${config.symbol}`,	decimals: 21}, 
	{unit: `M${config.symbol}`,	decimals: 24}, 
	{unit: `G${config.symbol}`,	decimals: 27}, 
	{unit: `T${config.symbol}`,	decimals: 30}, 
]

function UnitInput({ value, unit, decimals, onValue }: UnitInputProps) {
	
	const [text, setText] = React.useState(value)
	const onChange = (val: string, decimals: number) => {
		try {
			if (val!=='' && val!=='0' && val[val.length - 1]!=='.') {
				onValue(ethers.utils.parseUnits(val, decimals).toString())
			} else {
				setText(val)
			}
		} catch (error) {
		}
	}

	React.useEffect(()=>setText(value), [value])

	return (
		<div style={unitInputFieldStyle}>
			<div style={copyBtnStyle}><a href="#"><Icon icon="Copy" /></a></div>
			<input type="text" style={unitInputStyle} value={text} onChange={e => onChange(e.target.value, decimals)} onFocus={e=>e.target.select()} />
			<label style={labelStyle} className="gray">{unit} (10<sup>{decimals - 18}</sup>)</label>
		</div>
	)
}

const UnitConverter = () => {
	
	const One = ethers.utils.parseEther('1')
	const [value, setValue] = React.useState(One)

	const reset = () => {
		setValue(One)
	}

	const onValue = (val: string) => {
		setValue(ethers.BigNumber.from(val))
	}
	
	return (
		<div className="unit-converter">
			<section className="container">
				<h3>Unit Converter</h3>
				<p className="gray m-b-2">{config.symbol} is often used in different denominations of its currency, such as Wei for interacting with smart contracts and Gwei for calculating gas prices. Use our Unit Converter to esaily convert between them! For more info on unit conversion.</p>
				<div className="panel">
					<div className="text-right"><button onClick={reset} className="btn btn-info">Reset</button></div>
					<div>
						{units.map((i, k) => <UnitInput key={k} unit={i.unit} decimals={i.decimals} value={ethers.utils.formatUnits(value.toString(), i.decimals).replace(/\.0$/, '')} onValue={onValue} />)}
					</div>
				</div>
			</section>
		</div>
	)
}

export default UnitConverter