import React from 'react'

import Pager from './Pager'
import './table.scss'

export interface TableHeader {
	key: string
	align?: 'center'|'left'|'right'
	label: string|any
	tips?: string
	render?:(v:string|number|boolean, i?:any, k?:number)=>JSX.Element
}
interface TableOptions {
	hidePager: boolean
}

interface TableProps {
	header?:		JSX.Element
	page:			number
	limit?:			number
	total:			number
	fields:			Array<string|TableHeader>
	hiddenField?:	boolean
	filters?: 		string[]
	sortFields?: 	string[]
	options?:		Partial<TableOptions>,
	data:			Array<any>
	onData?:		(page: number, limit: number, filters?: {[field:string]:string}, sortFields?: {[field:string]:number}) => void
}
interface TableStatus {
	page:			number
	limit:			number
	filters?: 		{[field:string]:string}
	sortFields?: 	{[field:string]:number}
}

const defaultOptions = {
	hidePager: false
} as TableOptions

const limitList = [10, 25, 50, 100]

const Table = ({header, page, limit, total, fields, hiddenField, options, filters, sortFields, data, onData}: TableProps) => {
	
	const [status, setStatus] = React.useState<TableStatus>({
		limit: limit || 10,
		page,
		filters: {},
		sortFields: {}
	})
	const currentOptions = {...defaultOptions, ...options}

	React.useEffect(() => {
		if (onData) onData(0, status.limit)
	}, [])

	const onPage = (page: number, limit: number) => {
		setStatus({...status, page, limit})
		if (onData) onData(page, limit, status.filters, status.sortFields)
	}
	
	return (
		<div className='table'>
			{(header || !currentOptions.hidePager) && (
				<div className='tbl-header'>
					<div style={{color: 'var(--color-secondary)'}}>{header}</div>
					{!currentOptions.hidePager && (
						<div>
							<Pager page={status.page} total={total} onChange={page=>onPage(page, status.limit)} />
						</div>
					)}
				</div>
			)}
			<div className='tbl-body scroll'>
				<table>
					{!hiddenField && (
						<thead>
							<tr>
								{fields.map((f, k)=>(typeof f==='string' ? <th key={k}>{f}</th> : <th key={k} style={{textAlign: f.align || 'left'}}>{f.label}</th>))}
							</tr>
						</thead>
					)}
					<tbody>
						{data.length===0 ? (
							<tr>
								<td colSpan={fields.length}>
									<p className='nodata'>You have no data</p>
								</td>
							</tr>
						)
						: data.map((i, k) => (
							<tr key={k}>
								{fields.map((f, m) => {
									if (typeof f==='string') return (<td key={m}>{i[f] || ''}</td>)
									return (<td key={m} style={{textAlign: f.align || 'left'}}>{f.render ? f.render(i[f.key], i, k) : i[f.key]}</td>)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{!currentOptions.hidePager && (
				<div className='tbl-footer'>
					<div className='d-middle gap'>
						<span className='gray'>Show</span>
						<select className='btn' value={status.limit} onChange={(e) => onPage(status.page, Number(e.target.value))}>
							{limitList.map(i=><option key={i} value={i}>{i}</option>)}
						</select>
						<span className='gray'>Records</span>
					</div>
					<div>
						<Pager page={status.page} total={total} onChange={page=>onPage(page, status.limit)} />
					</div>
				</div>
			)}
		</div>
	)
};

export default Table