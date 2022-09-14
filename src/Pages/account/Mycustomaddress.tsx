import React from "react"
import { Link } from "react-router-dom"

import AccountLayout, { BreadcrumbObject } from "."
import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'

interface MyaccountStatus {
	customAbiList:      any
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
    apiPlan:            string
    call:               number
}

const customAbiList = [
    {
        address:        "0x13123123123",
        title:          "neon",
        abi:            "[][][][]"
    }
]

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "Contract Custom ABI",
        url:            "/mycustomabi",
        active:         true
    }
] as BreadcrumbObject[]

const MyAddress = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		customAbiList:       customAbiList,
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        apiPlan:            "FREE API PLAN",
        call:               5,
        modalData:          {
            address:        "",
            title:          "",
            abi:            ""
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = () => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:        "",
            title:          "",
            abi:            ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:        customAbiList[k].address,
            title:          customAbiList[k].title,
            abi:            customAbiList[k].abi
        }})
    }
    
    const onEditClose = () => setStatus({...status, showEditDialog: false});

    const onDelClose = () => setStatus({...status, showDelDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.vale}})
    }

	const fields = [
		{key: 'address',        label: 'Address',               render: (v:string, i)=>(
			<>
				<Link to={`txs/${v}`}>{v}</Link>
				<p>{i.desc}</p>
			</>
		)},
		{key: 'title',          label: 'Title',           render: (v:number)=>(v)},
		{key: 'desc',           label: '',		                render: (v:string, i, k)=>(
			<div className="flex">
                <button className="btn m-r-1 d-middle"onClick={() => showEdit(k)}>Edit<Icon icon="Delete" size={13} /></button>
				<button className="btn" onClick={()=>setStatus({...status, showDelDialog: true})}><Icon icon="Delete" size={13} /></button>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="container">
            <AccountLayout 
                menuKey="mycustomabi"
                title="Contract Custom ABI"
                desc="contract custom abi"
                breadcrumb={breadcrumbData}
            >
                <div className="panel m-b-2">
                    <div className="panel-header d-middle justify-content-between">
                        <h4>My Verified Addresses</h4>
                        <button className="btn" onClick={showAdd}>Add</button>
                    </div>
                    <p>The Verify Address Ownership process involves verifying the ownership of an Ethereum address used to create an Ethereum smart contract. This verification will be linked to an Etherscan account. Once a user has claimed ownership of an address, the user will be able to update token information and address name tags without needing to sign a new message each time.</p>
                    <div className="panel-content">
                        <Table
                            header={(
                                <div>{customAbiList.length} address verified (out of 1000 max limit)</div>
                            )}
                            data={customAbiList}
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
                            <span className="flex ">Title</span>
                            <input type="text" name="title" className="input input-block" placeholder="e.g. Project X" value={status.modalData.title} onChange={inputChangeHandle} />
                        </div>
                        <div>
                            <span className="flex ">Address</span>
                            <input type="text" name="address" className="input input-block" placeholder="0x.." value={status.modalData.address} onChange={inputChangeHandle} />
                        </div>
                        <div>
                            <span className="flex ">Custom ABI</span>
                            <textarea name="abi" rows={10} className="input input-block" placeholder="0x.." value={status.modalData.abi} onChange={inputChangeHandle}></textarea>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onEditClose}>Cancel</button>
                        <button className="btn btn-primary">Create New API Key</button>
                    </div>
                </Dialog>
            )}
            {status.showDelDialog && (
                <Dialog onClose={onDelClose}>
                    <p>
                        Are you sure you wish to unlink the ABI?
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