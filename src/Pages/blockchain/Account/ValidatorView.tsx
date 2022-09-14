import useStore from "../../../useStore"

interface ValidatorViewProps {
	data: ValidatorObject
}


const ValidatorView = ({data}: ValidatorViewProps) => {
	const {timeAgo} = useStore()
	
	return (
		<div className='grid-col'>
			<div>
				<div className='col3'>
					Validator ID
				</div>
				<div className='col9'>
					<code>{data.id}</code>
				</div>
			</div>
			<div>
				<div className='col3'>
					stakedAmount
				</div>
				<div className='col9'>
					<code>{data.stakedAmount}</code>
				</div>
			</div>
			<div>
				<div className='col3'>
					delegatedAmount
				</div>
				<div className='col9'>
					<code>{data.delegatedAmount}</code>
				</div>
			</div>
			<div>
				<div className='col3'>
					stakingStartEpoch
				</div>
				<div className='col9'>
					<code>{data.stakingStartEpoch}</code>
				</div>
			</div>
			<div>
				<div className='col3'>
					active
				</div>
				<div className='col9'>
					<code>{data.active}</code>
				</div>
			</div>
			<div>
				<div className='col3'>
					created
				</div>
				<div className='col9'>
					<code>{new Date(data.created * 1e3).toString()} ({timeAgo(data.created)})</code>
				</div>
			</div>
		</div>
	)
}

export default ValidatorView