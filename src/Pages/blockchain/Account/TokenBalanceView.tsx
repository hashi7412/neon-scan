import { Link } from "react-router-dom"

interface TokenBalanceViewProps {
	data: {
		erc20: 					Array<ServerTokenBalanceObject>
		erc721: 				Array<ServerTokenBalanceObject>
		erc1155: 				Array<ServerTokenBalanceObject>
	} | null
}

const TokenBalanceView = ({data}: TokenBalanceViewProps) => {
	return (
		data ? (
			<>
				{data.erc20.length>0 && (
					<>
						<div>ERC20 Tokens ({data.erc20.length})</div>
						{data.erc20.map((i, k)=>(
							<div key={k}>
								<div className='col6' style={{paddingLeft: 40}}>
									<Link to={`/token/${i.token}`}>{i.name}:</Link>
								</div>
								<div className='col3' style={{textAlign: 'right'}}>
									<code>{i.value}</code>
								</div>
								<div className='col3' style={{paddingLeft: 10}}>
									<small className='mono gray'>{i.symbol}</small>
								</div>
							</div>
						))}
					</>
				)}
				{data.erc721.length>0 && (
					<>
						<div>ERC721 Tokens ({data.erc721.length})</div>
						{data.erc721.map((i, k)=>(
							<div key={k}>
								<div className='col6' style={{paddingLeft: 40}}>
									<Link to={`/token/${i.token}`}>{i.name}:</Link>
								</div>
								<div className='col3' style={{textAlign: 'right'}}>
									<code>{i.value}</code>
								</div>
								<div className='col3' style={{paddingLeft: 10}}>
									<small className='mono gray'>{i.symbol}</small>
								</div>
							</div>
						))}
					</>
				)}
				{data.erc1155.length>0 && (
					<>
						<div>ERC1155 Tokens ({data.erc1155.length})</div>
						{data.erc1155.map((i, k)=>(
							<div key={k}>
								<div className='col6' style={{paddingLeft: 40}}>
									<Link to={`/token/${i.token}`}>{i.name}:</Link>
								</div>
								<div className='col3' style={{textAlign: 'right'}}>
									<code>{i.value}</code>
								</div>
								<div className='col3' style={{paddingLeft: 10}}>
									<small className='mono gray'>{i.symbol}</small>
								</div>
							</div>
						))}
					</>
				)}
			</>
		) : (
			<div>
				Not found
			</div>
		)
	)
}

export default TokenBalanceView