import React from "react"
import { Link } from "react-router-dom"
import Dialog from "../../components/Dialog"
import Icon from "../../components/Icon"
import Table, { TableHeader } from "../../components/Table"
import useStore, { NF } from "../../useStore"

interface VerifiedSignStatus {
	data:					any[]
	count:					number
	limit:					number
	page:					number
	total:					number
	showVerifyModal:		boolean
}

const mockData = [
	{
		id:					123123,
		age:				123123,
		address:			"0x123123123123123123123123123",
		msg:				"this is msg"
	},
	{
		id:					123123,
		age:				123123,
		address:			"0x123123123123123123123123123",
		msg:				"this is msg"
	},
	{
		id:					123123,
		age:				123123,
		address:			"0x123123123123123123123123123",
		msg:				"this is msg"
	}
]

const VerifiedSignatures = () => {
	const {sendJson, timeAgo, showLoading} = useStore()
	const [status, setStatus] = React.useState<VerifiedSignStatus>({
		data:				[],
		count:				0,
		limit:				10,
		page:				0,
		total:				0,
		showVerifyModal:	false
	})

	const onData = (page: number, limit: number) => {
		if (limit!==status.limit) setStatus({...status, limit})
		showLoading(true)
		setStatus({
			...status,
			data: mockData,
			count: mockData.length,
			limit,
			page,
			total: mockData.length,
		})
		// sendJson("get-txlist", "", page, limit).then(res=>{
		// 	if (res.result) {
		// 		const {data, count, total, page, limit} = res.result as {data: SimpleTxObject[], count: number, total: number, page: number, limit: number}
		// 		setStatus({
		// 			data,
		// 			count,
		// 			limit,
		// 			page,
		// 			total,
		// 		})
		// 	}
			showLoading(false)
		// })
	}

	const fields = [
		{key: "id",			label: "ID",			render: (v:number)=>(<code>#{v}</code>)},
		{key: "age",		label: "Age",			render: (v:number)=>(timeAgo(v))},
		{key: "address",	label: "Adress",		render: (v:string)=>(<Link className="mono" to={`/address/${v}`}>{v.slice(0, 20)}...</Link>)},
		{key: "msg",		label: "Message",		render: (v:string)=>(v)},
		{key: "id",			label: "Details",		render: (v:string)=>(<Link className="btn" to={`/verifySig/${v}`}><span className="d-middle">View Signature<Icon icon="ChevronRight" /></span></Link>)},
	] as TableHeader[]

	return (
		<div className="verified-signatures">
			<section className="container">
				<div className="d-middle justify-content-between flex-wrap m-b-2">
					<div className="m-b-2">
						<h3>Verified Signatures</h3>
						<p>View, sign and verify message signatures using an Ethereum address.</p>
					</div>
					<div className="m-b-2">
						<button className="btn btn-primary m-r-1">Sign Message</button>
						<button className="btn btn-primary">Verify Signature</button>
					</div>
				</div>
				<div className="panel">
					<div className="panel-header d-middle justify-content-between">
						<h4>Published Verufued Signatures</h4>
						<div className="d-middle">
							<input type="text" className="input m-r-1" />
							<button className="btn btn-primary"><Icon icon="Search" size={14} /></button>
						</div>
					</div>
					<Table 
						header={(
							<div>A total of {NF(status.count)} Verified Signatures found</div>
						)} 
						page={status.page}
						total={status.total}
						fields={fields} 
						data={status.data}
						onData={onData}
					/>
				</div>
			</section>
			{
				status.showVerifyModal && (<Dialog onClose={()=>setStatus({...status, showVerifyModal: false})}>
					<div>
						<label htmlFor="address">Address</label>
						<input type="text" className="input input-block" name="address" id="address" placeholder="0x.." />
					</div>
					<div>
						<label htmlFor="msg">Message</label>
						<textarea className="input input-block" name="msg" id="msg" rows={5} />
					</div>
					<div>
						<label htmlFor="signHash">Signature Hash</label>
						<input type="text" className="input input-block" name="signHash" id="signHash" placeholder="" />
					</div>
					<div>
						<span>Options</span>
						<div className="d-middle">
							<input type="radio" name="option" id="option1" />
							<label htmlFor="option1">Client-side only (not shared publicly)</label>
						</div>
						<div className="d-middle">
							<input type="radio" name="option" id="option2" />
							<label htmlFor="option1">Verify & publish (will then be accessible via a public URL)</label>
						</div>
						<div className="text-right">
							<button className="btn m-r-1">Cancel</button>
							<button className="btn btn-primary">Continue</button>
						</div>
					</div>
				</Dialog>)
			}
		</div>
	)
}

export default VerifiedSignatures