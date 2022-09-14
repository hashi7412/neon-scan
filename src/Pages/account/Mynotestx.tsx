import React from "react"
import { Link } from "react-router-dom"

import AccountLayout, { BreadcrumbObject } from "."
import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'
import { config } from "../../useStore"

interface MyaccountStatus {
	myTxnNotes:       any
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
}

const myTxnNotes = [
    {
        txsHash:            "0x123128381927398123",
        desc:               "Panda is ..."
    },
    {
        txsHash:            "0x12341923y891212312",
        desc:               "Panda is ..."
    },
    {
        txsHash:            "0x12341923y891212312",
        desc:               "Panda is ..."
    }
]

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "Transaction Private Notes",
        url:            "/mynotes_tx",
        active:         true
    }
] as BreadcrumbObject[]

const MyAddress = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		myTxnNotes:          myTxnNotes,
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        modalData:          {
            txsHash:    "",
            desc:       "",
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = () => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            txsHash:    "",
            desc:       ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            txsHash:    myTxnNotes[k].txsHash,
            desc:       myTxnNotes[k].desc
        }})
    }
    
    const onEditClose = () => setStatus({...status, showEditDialog: false});

    const onDelClose = () => setStatus({...status, showDelDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.vale}})
    }

	const fields = [
		{key: 'txsHash',        label: 'Transaction',            render: (v:string, i)=>(
			<>
				<Link to={`txs/${v}`}>{v}</Link>
				<p>{i.desc}</p>
			</>
		)},
		{key: 'desc',        label: '',		            render: (v:string, i, k)=>(
			<div className="flex">
                <button className="btn m-r-1 d-middle"onClick={() => showEdit(k)}>Edit<Icon icon="Delete" size={13} /></button>
				<button className="btn" onClick={()=>setStatus({...status, showDelDialog: true})}><Icon icon="Delete" size={13} /></button>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="container">
            <AccountLayout
                menuKey="mynotes_tx"
                title="Transaction Private Notes"
                desc="transaction private notes"
                breadcrumb={breadcrumbData}
            >
                <div className="panel">
                    <div className="panel-header d-middle justify-content-between">
                        <h4>Transaction Private Notes</h4>
                        <button className="btn" onClick={showAdd}>Add</button>
                    </div>
                    <p>A private transaction note (up to 100 characters) can be saved and us useful for transaction tracking.</p>
                    <div className="panel-content">
                        <Table
                            header={(
                                <div>{myTxnNotes.length} notes added (out of 50 max limit)</div>
                            )} 
                            data={myTxnNotes}
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
                            <span className="flex ">{config.chain} Transaction</span>
                            <input type="text" name="txnHash" className="input input-block" placeholder="Enter a Txn hash" value={status.modalData.txsHash} onChange={inputChangeHandle} />
                        </div>
                        <div>
                            <span className="flex">Private Note</span>
                            <textarea name="desc" className="input input-block" placeholder="Short desc" onChange={inputChangeHandle}>{status.modalData.desc}</textarea>
                            <small className="gray">A private note (up to 100 characters) can be attached to this address. Please DO NOT store any passwords or private keys here.</small>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onEditClose}>Cancel</button>
                        <button className="btn btn-primary">Create Private Notes</button>
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