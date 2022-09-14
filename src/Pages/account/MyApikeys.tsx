import React from "react"

import AccountLayout, { BreadcrumbObject } from "."
import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'
import useStore, { now } from "../../useStore"
import Actions from "../../components/Actions"

interface MyaccountStatus {
	data:               ServerUserApiKey[]
	limit:              number
	showEditDialog:     boolean
	showDelDialog:      boolean
	apiPlan:            string
	call:               number

	id:					number
	value:				string

}

const breadcrumbData = [
	{
		title:          "Home",
		url:            "/"
	},
	{
		title:          "API Keys",
		url:            "/myapikey",
		active:         true
	}
] as BreadcrumbObject[]


interface EditKeyDialogProps {
	id:	number
	value:	string
	onClose: Function
	onSubmit: Function
}


const EditKeyDialog = ({id, value, onClose, onSubmit}: EditKeyDialogProps) => {
	const {sendJson, getError, showLoading} = useStore()
	const [appName, setAppName] = React.useState(value);
	const [error, setError] = React.useState(false);
	const [submitError, setSubmitError] = React.useState(0);

	const onChange = (value: string) => {
		setAppName(value)
		setError(false)
	}

	const submit = async () => {
		const name = appName.trim()
		if (name==='') {
			setError(true)
		} else {
			showLoading(true)
			try {
				const res = await sendJson('add-apikey', name, id)
				if (res.error) {
					setSubmitError(res.error)
				} else {
					if (id===0) {
						onSubmit(name, res.result.id, res.result.apiKey, true)
					} else {
						onSubmit(name, id)
					}
				}
			} catch (error) {}
			showLoading(false)
		}
	}

	return (
		<Dialog onClose={onClose}>
			<div className="m-b-2">
				<div>
					<label>
						<span style={{lineHeight: '200%'}}>App Name</span>
						<input type="text" className={`input input-block ${error ? 'danger' : ''}`} placeholder="e.g. Web3 Project" value={appName} onChange={e=>onChange(e.target.value)} />
					</label>
				</div>
			</div>
			<div className="text-right">
				<button className="btn m-r-1" onClick={()=>onClose()}>Cancel</button>
				<button className="btn btn-primary" onClick={submit}>{id===0 ? 'Create New API Key' : 'Update AppName'}</button>
			</div>
			{submitError!==0 && <div className='error'>{getError(submitError)}</div>}
		</Dialog>
	)
}

const RemoveKeyDialog = ({id, value, onClose, onSubmit}: EditKeyDialogProps) => {
	const {sendJson, getError, showLoading} = useStore()
	const [submitError, setSubmitError] = React.useState(0);

	const submit = async () => {
		showLoading(true)
		try {
			const res = await sendJson('del-apikey', id)
			if (res.error) {
				setSubmitError(res.error)
			} else {
				onSubmit(id)
			}
		} catch (error) {}
		showLoading(false)
	}

	return (
		<Dialog onClose={onClose}>
			<p>Are you sure you wish to unlink the App Name [{value}]?</p>
			<div className="text-right">
				<button className="btn m-r-1" onClick={()=>onClose()}>Cancel</button>
				<button className="btn btn-primary" onClick={submit}>Continue</button>
			</div>
			{submitError!==0 && <div className='error'>{getError(submitError)}</div>}
		</Dialog>
	)
}

const MyApikey = () => {
	const {sendJson, logout, showLoading} = useStore()
	const [status, setStatus] = React.useState<MyaccountStatus>({
		data:               [],
		limit:              0,
		showEditDialog:     false,
		showDelDialog:      false,
		apiPlan:            "FREE API PLAN",
		call:               5,

		id:					0,
		value:				''
	});

	const getData = async () => {
		showLoading(true)
		const res = await sendJson("get-apikeyList")
		if (res.result) {
			setStatus({...status, ...res.result})
		} else if (res.error===20100) {
			logout()
		}
		showLoading(false)
	}

	React.useEffect(() => {
		getData()
	}, []);

	const onEdit = async (value: string, id: number, apiKey?: string, isNew?: boolean) => {
		if (isNew) {
			setStatus({...status, showEditDialog: false, data: [...status.data, {id, appName: value, apiKey, usage: 0, created: now()} as ServerUserApiKey]})
		} else {
			const data = [] as ServerUserApiKey[]
			for (let i of status.data) {
				if (i.id===id) {
					data.push({...i, appName: value})
				} else {
					data.push(i)
				}
			}
			setStatus({...status, showEditDialog: false, data})
		}
	}
	const onRemove = async (id: number) => {
		const data = [] as ServerUserApiKey[]
		for (let i of status.data) {
			if (i.id!==id) {
				data.push(i)
			}
		}
		setStatus({...status, showDelDialog: false, data})
	}

	const fields = [
		{key: 'appName',	label: 'App Name'},
		{key: 'apiKey',		label: 'API Key Token', render: (v: string, i)=>(<>
			<div className="d-middle mt mb">{v} <Actions.Copy text={v} /></div>
			<small className="gray">Added on {new Date(i.created * 1e3).toLocaleString()}</small>
		</>)},
		{key: 'usage',		label: 'Today Usage'},
		{label: '',			render: (v:string, i, k)=>(
			<div className="flex">
				<button className="btn m-r-1 d-middle" onClick={() => setStatus({...status, showEditDialog: true, id: i.id, value: i.appName})}><Icon icon="Edit" margin={5} /> Edit</button>
				<button className="btn" onClick={()=>setStatus({...status, showDelDialog: true, id: i.id, value: i.appName})}><Icon icon="Delete" /></button>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="container">
			<AccountLayout 
				menuKey="myapikey"
				title="API Keys"
				desc="api keys"
				breadcrumb={breadcrumbData}
			>
				<>
					<div className="panel m-b-2">
						<div className="panel-header d-middle justify-content-between">
							<h4>My API Keys</h4>
							{status.data.length<status.limit && <button className="btn" onClick={() => setStatus({...status, showEditDialog: true, id: 0, value: ''})}>Add a new API key</button>}
						</div>
						<p>For developers interested in building applications using our API Service, please create an API-Key Token which you can then use with all your API requests.</p>
						<div className="panel-content">
							<Table
								header={(
									<div>{status.data.length} key added (out of {status.limit} max limit)</div>
								)}
								data={status.data}
								fields={fields}
								page={0}
								total={1}
								options={{hidePager: true}}
							></Table>
						</div>
					</div>
					{/* <div className="panel">
						<div className="panel-header">
							<h4>Current API Plans</h4>
						</div>
						<div className="panel-content list">
							<div>
								<span>My API Plan:</span>
								<span>
									<b>{status.apiPlan}</b>
									<Link className="btn btn-primary" to="/">Upgrade Plan</Link>
								</span>
							</div>
							<div>
								<span>API calls per second:</span>
								<b>{status.call} calls</b>
							</div>
						</div>
					</div> */}
				</>
			</AccountLayout>
			{status.showEditDialog && <EditKeyDialog onClose={() => setStatus({ ...status, showEditDialog: false })} onSubmit={onEdit} id={status.id} value={status.value} />}
			
			{status.showDelDialog && <RemoveKeyDialog onClose={() => setStatus({ ...status, showDelDialog: false })} onSubmit={onRemove} id={status.id} value={status.value}/>}
		</div>
	)
};

export default MyApikey;