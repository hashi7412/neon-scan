import React from "react"
import { Link } from "react-router-dom"

import AccountLayout, { BreadcrumbObject } from "."
import Table, {TableHeader} from "../../components/Table"
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'
import { config } from "../../useStore"

interface MyaccountStatus {
	tokenIgnoreList:         any
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
}

const tokenIgnoreList = [
    {
        tokenAddress:       "0x123128381927398123",
        token:              "Deam",
        desc:               "Panda is ..."
    },
    {
        tokenAddress:       "0x12341923y891212312",
        token:              "Deam",
        desc:               "Panda is ..."
    },
    {
        tokenAddress:       "0x12341923y891212312",
        token:              "Deam",
        desc:               "Panda is ..."
    }
]

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "Custom Ignore List",
        url:            "/mytokenignore",
        active:         true
    }
] as BreadcrumbObject[]

const MyTokenIgnore = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		tokenIgnoreList:          tokenIgnoreList,
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        modalData:          {
            tokenAddress:   "",
            token:          "",
            desc:           "",
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = () => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            tokenAddress:   "",
            desc:           ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            tokenAddress:   tokenIgnoreList[k].tokenAddress,
            desc:           tokenIgnoreList[k].desc
        }})
    }
    
    const onEditClose = () => setStatus({...status, showEditDialog: false});

    const onDelClose = () => setStatus({...status, showDelDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.vale}})
    }

	const fields = [
		{key: 'tokenAddress',        label: 'Token Contract Address',   render: (v:string, i)=>(
			<>
				<Link to={`txs/${v}`}>{v}</Link>
				<p>{i.desc}</p>
			</>
		)},
        {key:'token',               label: 'Token',                     render: (v: string) => (v)},
		{key: 'desc',               label: '',		                    render: (v:string, i, k)=>(
			<div className="flex">
                <button className="btn m-r-1 d-middle"onClick={() => showEdit(k)}>Edit<Icon icon="Delete" size={13} /></button>
				<button className="btn" onClick={()=>setStatus({...status, showDelDialog: true})}><Icon icon="Delete" size={13} /></button>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="container">
            <AccountLayout 
                menuKey="mytokenignore"
                title="Custom Ignore List"
                desc="custom ignore list"
                breadcrumb={breadcrumbData}
            >
                <div className="panel">
                    <div className="panel-header d-middle justify-content-between">
                        <h4>Custom Ignore List</h4>
                        <button className="btn" onClick={showAdd}>Add</button>
                    </div>
                    <p>Hide selected tokens from being desplayed in the Address Token Summary, Token Holdings and Watch List pages. This is a private setting only applicable to you when logged-in with an {config.title} account</p>
                    <div className="panel-content">
                        <Table
                            header={(
                                <div>{tokenIgnoreList.length} token added (out of 30 max limit)</div>
                            )} 
                            data={tokenIgnoreList}
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
                            <span className="flex ">Token Contract Address</span>
                            <input type="text" name="tokenAddress" className="input input-block" placeholder="0x.." value={status.modalData.tokenAddress} onChange={inputChangeHandle} />
                        </div>
                        <div>
                            <span className="flex">Note <small className="gray">Optional</small></span>
                            <textarea name="desc" className="input input-block" placeholder="Short desc" onChange={inputChangeHandle}>{status.modalData.desc}</textarea>
                            <small className="gray">A note of up to 155 characters can be attached to this entry and be used to expain why this token was entered into the ignore list.</small>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onEditClose}>Cancel</button>
                        <button className="btn btn-primary">Add Token to Ignore List</button>
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

export default MyTokenIgnore;