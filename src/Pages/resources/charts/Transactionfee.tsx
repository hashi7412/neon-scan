import React from 'react';
import { config } from '../../../useStore';
import Chart from "../ChartView";

const TxFeeChart = () => {
	return (
		<div className='txfeechart'>
			<section className='container'>
				<Chart
					method='get-chart-txfee'
					type='area'
					title="{chain} Network Transaction Fee Chart"
					desc="The {chain} Transaction Fee Chart shows historical total number of NEON paid as transaction fee for the network."
					yTipLabel={`Txn Fee (${config.symbol}))`}
				/>
			</section>
		</div>
	)
};

export default TxFeeChart;