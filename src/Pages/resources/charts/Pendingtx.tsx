import React from 'react';
import Chart from "../ChartView";

const PendingtxChart = () => {
	return (
		<div className='pendingtxchart'>
			<section className='container'>
				<Chart
					method='get-chart-txs'
					type='area'
					title="{chain} Network Pending Transactions Chart"
					desc="The {chain} Pending Transactions Chart shows the daily pending transaction count per minute for the network."
					yTipLabel="Txn Count"
				/>
			</section>
		</div>
	)
};

export default PendingtxChart;