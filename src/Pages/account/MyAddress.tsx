import React from "react"
import { Link } from "react-router-dom"

import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'
import { config } from "../../useStore"
import AccountLayout, { BreadcrumbObject } from "."

interface MyaccountStatus {
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
}

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "Watch List",
        url:            "/myaddress",
        active:         true
    }
] as BreadcrumbObject[]

const MyAddress = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        modalData:          {
            address:    "",
            desc:       "",
            notifyType: "",
            options:    ""
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:    "",
            desc:       ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:    '', // myAddress[k].address,
            desc:       '', // myAddress[k].description
        }})
    }
    
    const onEditClose = () => setStatus({...status, showEditDialog: false});

    const onDelClose = () => setStatus({...status, showDelDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.value}})
    }

	const fields = [
		{key: 'address',        label: 'Address',            render: (v:string, i)=>(
			<>
				<Link to={`address/${v}`}>{v}</Link>
				<p>{i.description}</p>
			</>
		)},
		{key: 'balance',        label: 'Balance'		,   render: (v:number)=>(v)},
		{key: 'notification',   label: 'Notification',      render: (v:string)=>(v)},
		{key: 'address',        label: '',		            render: (v:string, i, k)=>(
			<div className="flex">
                <button className="btn m-r-1 d-middle"onClick={() => showEdit(k)}>Edit<Icon icon="Delete" size={13} /></button>
				<button className="btn" onClick={()=>setStatus({...status, showDelDialog: true})}><Icon icon="Delete" size={13} /></button>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="container">
            <AccountLayout 
                menuKey="myaddress"
                title="Watch List"
                desc="Watch List"
                breadcrumb={breadcrumbData}
            >
                <div className="panel">
                    <div className="panel-header d-middle justify-content-between">
                        <h4>Watch List</h4>
                        <button className="btn" onClick={showAdd}>Add</button>
                    </div>
                    <p>An Email notification can be sent to you when an address on your watch list sends or receives any transactions.</p>
                    <div className="panel-content">
                        <Table
                            header={(
                                <div>{0} address selected (out of 50 max limit)</div>
                            )} 
                            data={[]}
                            fields={fields}
                            page={status.page}
                            total={status.count}
                        ></Table>
                    </div>
                </div>
            </AccountLayout>
            {status.showEditDialog && (
                <Dialog onClose={onEditClose}>
                    <div className="m-b-2">
                        <div>
                            <span className="flex ">{config.chain} Address</span>
                            <input type="text" name="address" className="input input-block" placeholder="0x.." value={status.modalData.address} onChange={inputChangeHandle} />
                        </div>
                        <div>
                            <span className="flex ">Description <small className="gray">(Optional)</small></span>
                            <textarea name="desc" className="input input-block" placeholder="Short description" onChange={inputChangeHandle}>{status.modalData.desc}</textarea>
                            <small className="gray">Max 300 character limit</small>
                        </div>
                    </div>
                    <h4>Notification Methods</h4>
                    <p>You can monitor and receive an alert to your email when an address on your watchlist sends or receives any transactions.</p>
                    <div className="p-y-3">
                        <div>
                            <input type="radio" name="notifyType" id="notify_type1" />
                            <label>No Notification</label>
                        </div>
                        <div>
                            <input type="radio" name="notifyType" id="notify_type2" />
                            <label>Notify on Incoming & Outgoing Txns</label>
                        </div>
                        <div>
                            <input type="radio" name="notifyType" id="notify_type3" />
                            <label>Notify on Incoming (Receive) Txns Only</label>
                        </div>
                        <div>
                            <input type="radio" name="notifyType" id="notify_type4" />
                            <label>Notify on Outgoing (Sent) Txns Only</label>
                        </div>
                    </div>
                    <div>
                        <span className="flex gray ">Other Options</span>
                        <div>
                            <input type="checkbox" name="option" id="option1" />
                            <label htmlFor="option1">Also Track ERC20 Token Transfers</label>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onEditClose}>Cancel</button>
                        <button className="btn btn-primary">Continue</button>
                    </div>
                </Dialog>
            )}
            {status.showDelDialog && (
                <Dialog onClose={onDelClose}>
                    <p>
                        Are you sure you wish to unlink the address?
                    </p>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onDelClose}>Cancel</button>
                        <button className="btn btn-primary">Continue</button>
                    </div>
                </Dialog>
            )}	
		</div>
	)
};

export default MyAddress;