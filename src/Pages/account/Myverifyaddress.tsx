import React from "react"
import { Link } from "react-router-dom"

import AccountLayout, { BreadcrumbObject } from "."
import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'

interface MyaccountStatus {
	myApiKeyList:         any
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
    apiPlan:            string
    call:               number
}

const myApiKeyList = [
    {
        address:        "0x13123123123",
        quickLinks:     "Deam",
        verifiedDate:   123123123
    },
    {
        address:        "0x13123123123",
        quickLinks:     "Deam",
        verifiedDate:   123123123
    },
    {
        address:        "0x13123123123",
        quickLinks:     "Deam",
        verifiedDate:   123123123
    }
]

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "My Verified Addresses",
        url:            "/myverify_address",
        active:         true
    }
] as BreadcrumbObject[]

const MyAddress = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		myApiKeyList:       myApiKeyList,
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        apiPlan:            "FREE API PLAN",
        call:               5,
        modalData:          {
            address:        "",
            quickLinks:     "",
            verifiedDate:   new Date()
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = () => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:        ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            address:        myApiKeyList[k].address
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
		{key: 'quickLinks',     label: 'Quick Links',           render: (v:number)=>(v)},
		{key: 'verifiedDate',   label: 'Verified Date',         render: (v:number)=>(v)},
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
                menuKey="myverify_address"
                title="My Verified Addresses"
                desc="my verified addresses"
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
                                <div>{myApiKeyList.length} address verified (out of 1000 max limit)</div>
                            )}
                            data={myApiKeyList}
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
                            <span className="flex ">Address</span>
                            <input type="text" name="address" className="input input-block" placeholder="0x.." value={status.modalData.address} onChange={inputChangeHandle} />
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
                        Are you sure you wish to unlink the Address?
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