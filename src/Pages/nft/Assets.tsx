import React from "react"

import "./assets.scss"
import Img1 from "../../assets/nft-assets/1.png"
import Img2 from "../../assets/nft-assets/2.png"
import Img3 from "../../assets/nft-assets/3.png"
import Img4 from "../../assets/nft-assets/4.png"
import Img5 from "../../assets/nft-assets/5.png"
import TabBar, { TabHeader } from "../../components/TabBar"
import Pager from "../../components/Pager"
import IconImg from '../../assets/neon/icon.svg'

const mockData = [
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    
    { img: Img1, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img3, link: "Last Task coin", label: "Lost Relics" },
    { img: Img4, link: "Last Task coin", label: "Lost Relics" },
    { img: Img5, link: "Last Task coin", label: "Lost Relics" },
    { img: Img1, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img3, link: "Last Task coin", label: "Lost Relics" },
    { img: Img4, link: "Last Task coin", label: "Lost Relics" },
    { img: Img5, link: "Last Task coin", label: "Lost Relics" },
    { img: Img1, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img3, link: "Last Task coin", label: "Lost Relics" },
    { img: Img4, link: "Last Task coin", label: "Lost Relics" }, 
    { img: Img5, link: "Last Task coin", label: "Lost Relics" },
    { img: Img1, link: "Last Task coin", label: "Lost Relics" },
    { img: Img2, link: "Last Task coin", label: "Lost Relics" },
    { img: Img3, link: "Last Task coin", label: "Lost Relics" },
    { img: Img4, link: "Last Task coin", label: "Lost Relics" }, 
    { img: Img5, link: "Last Task coin", label: "Lost Relics" },
]

interface StatusType {
    tabKey:     string
    data:       any[]
    count:      number
    page:       number
    limit:      number
    total:      number
}

const NftAssets = () => {
    const [status, setStatus] = React.useState<StatusType>({
        tabKey:     "tsx",
        data:       mockData,
        count:      0,
        page:       0,
        limit:      20,
        total:      0
    })

    React.useEffect(() => {
        setStatus({...status, count: (mockData.length - 1) / status.limit + 1, total: ~~((mockData.length - 1) / status.limit) + 1})
    }, [])

	const headers = [
		{key: 'details',		label: 'Details'},
		{key: 'holders',		label: 'Holders'},
		{key: 'tsx',			label: 'Transactions'},
		{key: 'marketactivity',	label: 'Market activity'}
	] as TabHeader[]

    const onData = (page: number, limit: number) => {
        // if (limit!==status.limit) setStatus({...status, limit})
		// showLoading(true)
		// sendJson("get-nftassets", page, limit).then(res=>{
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
		// 	showLoading(false)
		// })
    }

    return (
		<div className='nft-assets'>
            <section className='container'>
				<div style={{textAlign: "center"}}>
					<img src={IconImg} alt="icon" />
				</div>
                <h3>Harvester of sorrow (MOCKUP)</h3>
                <TabBar headers={headers} onChange={tabKey=>setStatus({...status, tabKey})}>
                    <div className="flex flex-wrap justify-content-center gap2 pb-5">
                        {mockData.slice(status.page * status.limit, (status.page + 1) * status.limit).map((i:any, k:number) => (
                            <div key={k} className="card">
                                <img src={i.img} alt="img" />
                                <a href="#home">{i.link}</a>
                                <span>{i.label}</span>
                            </div>
                        ))}
                        <Pager 
                            onChange={(page) => {setStatus({...status, page: page})}}
                            page={status.page}
                            total={status.total}
                        />
                    </div>
                </TabBar>
            </section>
        </div>
    )
}

export default NftAssets