import React from 'react';
import ChartView from "../ChartView";

const TxChart = () => {
	return (
		<div className='txchart'>
			<section className='container'>
				<ChartView
					method='get-chart-txs'
					type='line'
					title={`{chain} Daily Transactions Chart`}
					desc={`The chart highlights the total number of transactions on the {chain} blockchain with daily individual breakdown for average difficulty, estimated hash rate, average block time and size, total block and uncle block count and total new address seen.`}
					/* info={<div>
						Highest number of <b>1,800,288</b> transactions on Sunday, September 12, 2021<br/>
						Lowest number of <b>1,500</b> transactions on Wednesday, September 16, 2020
					</div>} */
					yTipLabel="Total Distinct Addresses"
				/>
			</section>
		</div>
	)
};

export default TxChart;