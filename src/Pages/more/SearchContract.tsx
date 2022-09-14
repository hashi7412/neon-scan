import React from "react"
import { useHistory } from "react-router-dom"

import SearchImg from "../../assets/empty-search-state-alt.svg"
import Icon from "../../components/Icon"

const SearchContract = () => {  
    const history = useHistory()  
	const onSearch = () => {
		history.push("/searchcontractlist")
	}

    const [query, setQuery] = React.useState("")

    return (
        <div className="search-contract">
            <section className="container">
                <div className="d-middle justify-content-between">
                    <h3>Smart Contract Search</h3>
                    <small>Smart Contract Search</small>
                </div>
                <div className="sub-container text-center" style={{paddingTop: "50px"}}>
                    <img src={SearchImg} width={250} alt="search"></img>
                    <p className="gray" style={{padding: "0 10%"}}>Search Smart Contract source codes on Etherscan with keywords, addresses, txhash date, blocknumber, and more</p>
                </div>
                <section className='search search-center'>
                    <div>
                        <div>
                            <input type="text" placeholder='Search smart contracts source codes' value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={(e)=>(e.key==="Enter" && onSearch())} />
                            <button className='d-middle' onClick={()=>onSearch()}><Icon icon="Search" size={20} /></button>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default SearchContract