import React from 'react'
import Icon from './Icon'
import './tabbar.scss'

export interface TabHeader {
	key:			string
	label:			string|JSX.Element
	badge?:			string
	badgeType?:		'none'|'success'|'warning'
}
interface TabBarProps {
	children:   	any
	tabKey?:		string
	headers:		Array<TabHeader|string>
	onChange?:   	(tabKey: string) => void
}



const TabBar = ({tabKey, headers, children, onChange}: TabBarProps) => {
	const [tab, setTab] = React.useState(tabKey || (typeof headers[0]==='string' ? headers[0] : headers[0].key ))

	const onChangeTab = (tabKey: string) => {
		setTab(tabKey)
		if (onChange!==undefined) onChange(tabKey)
	}

	const reanderHeader = (i: TabHeader) => {
		return (
			<div className='d-center'>
				{i.label}
				{i.badgeType==="success" && (
					<div style={{marginLeft: 3, transform: 'translateY(-2px)'}}>
						<Icon icon="FilledCheck" size={12} fill='var(--success)' />
					</div>
					
				)}
			</div>
		)
	}

	React.useEffect(()=>{
		if (tabKey && tabKey!==tab) {
			setTab(tabKey)
			// if (onChange) onChangeTab(tabKey)
			// } else {
			// 	if (onChange) onChangeTab(tab)

		}
		
	}, [tab, tabKey])
	return (
		<div className='panel tab'>
			<div className='panel-header tab-links'>
				{headers.map(i=>{
					const key = (typeof i==='string' ? i : i.key)
					return (
						<button key={key} className={(tab===key ? "active select" : "")} onClick={() => onChangeTab(key)}>
							{typeof i==='string' ? i : reanderHeader(i)}
						</button>
					)
				})}
			</div>
			<div className='panel-content'>
				{children}
			</div>
		</div>
	)
}

export default TabBar