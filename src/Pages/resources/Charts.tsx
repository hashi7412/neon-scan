import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../useStore'
import "./index.scss";
// import ChartImages from '../../components/ChartImages';
import ImgTxChart                   from "../../assets/chart-txchart.webp";
import ImgErc20txnsChart            from "../../assets/chart-erc20txns.webp";
import ImgAddressChart              from "../../assets/chart-address.webp";
import ImgBlockSizeChart            from "../../assets/chart-blocksize.webp";
import ImgBlockTimeChart            from "../../assets/chart-blocktime.webp";
import ImgGasPriceChart             from "../../assets/chart-gasprice.webp";
import ImgGasUsedChart              from "../../assets/chart-gasused.webp";
import ImgBlocksChart               from "../../assets/chart-blockcount.webp";
import ImgPendingChart              from "../../assets/chart-pending.webp";
import ImgTxFeeChart                from "../../assets/chart-transactionfee.webp";
import ImgVerifiedContratChart      from "../../assets/chart-verified-contracts.webp";

const Charts = () => {
	return (
		<div className='address'>
			<section className='container'>
				<h4 className='mb'>{config.chain} Charts & Statstics</h4>
				<div className="panel m-b-2">
					<div className="panel-header">
						<h4>Blockchain data</h4>
					</div>
					<div className='panel-content charts'>
						<Link to="/chart/tx">
							<div className='chart-panel'>
								<b>Dialy Transactions Chart</b>
								<div>
									<img src={ImgTxChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
						<Link to="/chart/erc20txns">
							<div className='chart-panel'>
								<b>ERC-20 Daily Token Transfer Chart</b>
								<div>
									<img src={ImgErc20txnsChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
						<Link to="/chart/address">
							<div className='chart-panel'>
								<b>Unique Addresses Chart</b>
								<div>
									<img src={ImgAddressChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
						<Link to="/chart/blocksize">
							<div className='chart-panel'>
								<b>Average Block Size Chart</b>
								<div>
								<img src={ImgBlockSizeChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
						<Link to="/chart/blocktime">
							<div className='chart-panel'>
								<b>Average Block Time Chart</b>
								<div>
								<img src={ImgBlockTimeChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
						<Link to="/chart/gasprice">
							<div className='chart-panel'>
								<b>Average Gas Price Chart</b>
								<div>
								<img src={ImgGasPriceChart} width="100%" height="100%" alt='BlockTimeChartImage'></img>
								</div>
							</div>
						</Link>
						<Link to="/chart/gasused">
							<div className='chart-panel'>
								<b>Daily Gas Used Chart</b>
								<div>
								<img src={ImgGasUsedChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
						<Link to="/chart/blocks">
							<div className='chart-panel'>
								<b>Block Count and Rewards Chart</b>
								<div>
								<img src={ImgBlocksChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="panel m-b-2">
					<div className="panel-header">
						<h4>Network data</h4>
					</div>
					<div className='panel-content charts'>
						<Link to="/chart/transactionfee">
							<div className='chart-panel'>
								<b>Network Transaction Fee Chart</b>
								<div>
									<img src={ImgTxFeeChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className="panel m-b-2">
					<div className="panel-header">
						<h4>Contracts data</h4>
					</div>
					<div className='panel-content charts'>
						<Link to="/chart/verifiedcontracts">
							<div className='chart-panel'>
								<b>Dialy Transactions Chart</b>
								<div>
									<img src={ImgVerifiedContratChart} width="100%" height="100%" alt='Erc20TxnsChart' />
								</div>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
};

export default Charts;