import React from "react"
import { Link } from "react-router-dom"

import AccountLayout, { BreadcrumbObject } from "."
import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'
import { config } from "../../useStore"

interface MyaccountStatus {
	myNameTagList:       any
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
}

const myNameTagList = [
    {
        address:            "0x123123",
        nameTag:            "Panda",
        desc:               "Panda is ..."
    },
    {
        address:            "0x123123",
        nameTag:            "Panda",
        desc:               "Panda is ..."
    },
    {
        address:            "0x123123",
        nameTag:            "Panda",
        desc:               "Panda is ..."
    }
]

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "Address Private Name Tags",
        url:            "/mynotes_address",
        active:         true
    }
] as BreadcrumbObject[]

const MyAddress = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		myNameTagList:          myNameTagList,
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        modalData:          {
            address:    "",
            nameTag:    "",
            desc:       "",
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = () => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:    "",
            nameTag:    "",
            desc:       ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:    myNameTagList[k].address,
            nameTag:    myNameTagList[k].nameTag,
            desc:       myNameTagList[k].desc
        }})
    }
    
    const onEditClose = () => setStatus({...status, showEditDialog: false});

    const onDelClose = () => setStatus({...status, showDelDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.vale}})
    }

	const fields = [
		{key: 'address',        label: 'Address',            render: (v:string, i)=>(
			<>
				<Link to={`address/${v}`}>{v}</Link>
				<p>{i.desc}</p>
			</>
		)},
		{key: 'nameTag',        label: 'Private Name Tag',  render: (v:number)=>(v)},
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
                menuKey="mynotes_address"
                title="Address Private Name Tags"
                desc="address private name tags"
                breadcrumb={breadcrumbData}
            >
                <div className="panel">
                    <div className="panel-header d-middle justify-content-between">
                        <h4>Address Private Name Tags</h4>
                        <button className="btn" onClick={showAdd}>Add</button>
                    </div>
                    <p>A private name tag (up to 35 chars) and memo (up to 500 chars) for individual addresses can be saved and is useful for labelling addresses of interest.</p>
                    <div className="panel-content">
                        <Table
                            header={(
                                <div>{myNameTagList.length} address tagged (out of 50 max limit)</div>
                            )} 
                            data={myNameTagList}
                            fields={fields}
                            page={status.page}
                            total={status.count}
                        />
                    </div>
                </div>
            </AccountLayout>
            {status.showEditDialog && (
                <Dialog onClose={onEditClose}>
                    <div className="m-b-2">
                        <div>
                            <span className="flex ">{config.chain} Address</span>
                            <input type="text" name="address" className="input input-block" placeholder="Enter a address" value={status.modalData.address} onChange={inputChangeHandle} />
                        </div>
                        <div>
                            <span className="flex ">Private Name Tag</span>
                            <input type="text" name="nameTag" className="input input-block" placeholder="Enter a address" value={status.modalData.address} onChange={inputChangeHandle} />
                            <small className="gray">Private Name Tags (up to 35 characters) can be used for easy identification of addresses.</small>
                        </div>
                        <div>
                            <span className="flex">Private Note</span>
                            <textarea name="desc" className="input input-block" placeholder="Short desc" onChange={inputChangeHandle}>{status.modalData.desc}</textarea>
                            <small className="gray">A private note (up to 500 characters) can be attached to this address. Please DO NOT shore any passwords or private keys here</small>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onEditClose}>Cancel</button>
                        <button className="btn btn-primary">Save Changes</button>
                        <button className="btn btn-primary">Create Private Tags</button>
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