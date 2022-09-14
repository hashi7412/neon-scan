import React from 'react'
import { copyToClipboard } from '../useStore'
import Icon from './Icon'

const Actions = {
	Copy: ({text, title, round, big}: {text: string, title?: string, round?: boolean, big?: boolean})=>{
		const [active, setActive] = React.useState(false)

		const onCopy = () => {
			copyToClipboard(text)
			setActive(true)
			setTimeout(()=>setActive(false), 1000)
		}

		return (active ? (
			<span className='d-middle gray'>
				<Icon icon="Check" size = {big ? 20 : 16} />
				<span className='ml'>Copied</span>
			</span>
		) : (
			<span className={`${!!round ? 'btn btn-icon' : 'd-middle'}  cmd`} onClick={onCopy} title={title}>
				<Icon icon="Copy" />
			</span>
		))
	}
}

export default Actions