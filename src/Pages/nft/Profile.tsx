import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Icon from "../../components/Icon"
import TabBar, { TabHeader } from "../../components/TabBar"
import useStore, { NF } from "../../useStore"

import "./profile.scss"

interface PropertyType {
	label: string
	content: string
}

interface ProfileType {
    desc:				string
    properties:			PropertyType[]
    creator:			string
    reserve:			number
    project:			string
    created:			number
    standard:			string
    supplyType:			string
    totalSupply:		number
    circulatingSupply:	number
    transferFee:		number
    meltFee:			number
    views:				number
    holders:			number
    transfers:			number
    melts:				number
    ethereumID:			string
}

const mockData = {
    desc: "Language of the mad. Takes away all mental stress and anxiety.",
    properties: [
        { label: "Rarity", content: "Legendary" },
        { label: "Item-type", content: "Bottle" },
        { label: "item-sub-type" },
        { label: "Effects", content: "+900 Health And +900 Energy" }
    ],
    creator: "0x7d510f661F490482fbFF45275b00A82F5F69f784",
    reserve: 0.32,
    project: "LOST RELICS",
    created: 202323,
    standard: "ERC-1155 (Enjin)",
    supplyType: "Collapsing",
    totalSupply: 388,
    circulatingSupply: 388,
    transferFee: 3,
    meltFee: 10,
    views: 22670,
    holders: 236,
    transfers: 1164,
    melts: 0,
    ethereumID: "0x1000000000000714000000000000000000000000000000000000000000000000"
} as ProfileType

interface ItemProps {
	title:		string
	tooltip?:	string
	children:	any
	mono?:		boolean
	align?:		boolean
}

const RenderItem = ({title, tooltip, mono, align, children}: ItemProps) => {
	return (
		<div className="" style={{lineHeight: '1.5em'}}>
			<div className="col3 d-middle">
                {tooltip && (
                    <div className="tooltip">
                        <div className='icon mr'>
                            <Icon icon="Question" />
                        </div>
                        <div className="top">
                            {tooltip}
                            <i></i>
                        </div>
                    </div>
                )}
				{title} :
			</div>
			<div className={`col9 d-middle flex-wrap ${!!mono ? 'mono' : ''} ${!!align ? 'd-middle' : ''}`} style={{whiteSpace: 'nowrap',  overflow: 'hidden', textOverflow: 'ellipsis', alignItems: "stretch"}}>
				{children}
			</div>
		</div>
	)
}

interface StatusType {
    tabKey:     string
}

const NftProfile = () => {
	const {timeAgo} = useStore()
    const [status, setStatus] = React.useState<StatusType>({
        tabKey:     "tsx"
    })
    const [data, setData] = React.useState<ProfileType>();

    useEffect(() => {
        setData(mockData)
    }, [])

	const headers = [
		{key: 'details',		label: 'Details'},
		{key: 'holders',		label: 'Holders'},
		{key: 'tsx',			label: 'Transactions'},
		{key: 'marketactivity',	label: 'Market activity'}
	] as TabHeader[]

    return (
        <div className='nft-profile'>
			<section className='container'>
				<h3>Profile (MOCKUP)</h3>
                <TabBar headers={headers} onChange={tabKey=>setStatus({...status, tabKey})}>
                    <p className="text-center mb-1">
                        <button className="btn btn-primary mr" style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Buy</button>
                        <button className="btn btn-info">7 on sale selling at 500 enj($266.76)</button>
                    </p>
                    <div className='panel mb-1'>
                        <div className='grid-col'>
                            <RenderItem title='Desciption' align>
                            {data && (
                                <>
                                    <span>{mockData.desc}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Properties' align>
                                {data && mockData.properties.map((i:any, k:number) => (
                                    <div className="col4">
                                        <div className="card text-center">
                                            <div className="card-content">
                                                {i.label && (<span>{i.label}</span>)}
                                                {i.content && (<h4>{i.content}</h4>)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </RenderItem>
                        </div>
                    </div>
                    <div className='panel mb-1'>
                        <div className='grid-col'>
                            <RenderItem title='Creator' align>
                            {data && (
                                <>
                                    <span>{mockData.creator}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Reserve' align>
                            {data && (
                                <>
                                    <span>{mockData.reserve}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Project' align>
                            {data && (
                                <>
                                    <Link to={`/`}>{mockData.project}</Link>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Created' align>
                            {data && (
                                <>
                                    <span>{timeAgo(mockData.created)}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Standard' align>
                            {data && (
                                <>
                                    <span>{mockData.standard}</span>
                                </>
                            )}
                            </RenderItem>
                        </div>
                    </div>
                    <div className='panel mb-1'>
                        <div className='grid-col'>
                            <RenderItem title='Supply Type' align>
                            {data && (
                                <>
                                    <span>{NF(mockData.supplyType)}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Total Supply' align>
                            {data && (
                                <>
                                    <span>{NF(mockData.totalSupply)}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Circulating Supply' align>
                            {data && (
                                <>
                                    <span>{NF(mockData.circulatingSupply)} ({mockData.circulatingSupply / mockData.totalSupply}%)</span>
                                </>
                            )}
                            </RenderItem>
                        </div>
                    </div>
                    <div className='panel mb-1'>
                        <div className='grid-col'>
                            <RenderItem title='Transfer Fee' align>
                            {data && (
                                <>
                                    <span>{NF(mockData.transferFee)} ENJ Per asset transferred (i)</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Melt Fee' align>
                            {data && (
                                <>
                                    <span>{mockData.meltFee}%</span>
                                </>
                            )}
                            </RenderItem>
                        </div>
                    </div>
                    <div className='panel mb-1'>
                        <div className='grid-col'>
                            <RenderItem title='Views' align>
                            {data && (
                                <>
                                    <span>{NF(mockData.views)}</span>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Holders' align>
                            {data && (
                                <>
                                    <Link to={`/nft/tx-holders`}>{NF(mockData.holders)}</Link>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Transfers' align>
                            {data && (
                                <>
                                    <Link to={`/nft/txs`}>{NF(mockData.transfers)}</Link>
                                </>
                            )}
                            </RenderItem>
                            <RenderItem title='Melts' align>
                            {data && (
                                <>
                                    <span>{NF(mockData.melts)}</span>
                                </>
                            )}
                            </RenderItem>
                        </div>
                    </div>
                    <div className='panel mb-1'>
                        <div className='grid-col'>
                            <RenderItem title='Ethereum ID' mono align>
                            {data && (
                                <>
                                    <span>{mockData.ethereumID}</span>
                                </>
                            )}
                            </RenderItem>
                        </div>
                    </div>
                </TabBar>
            </section>
        </div>
    )
}

export default NftProfile