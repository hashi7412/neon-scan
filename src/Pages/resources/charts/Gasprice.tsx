import React from 'react';
import Chart from "../ChartView";

const GaspriceChart = () => {
	return (
		<div className='gaspricechart'>
			<section className='container'>
				<Chart
					method='get-chart-gasprice'
					type='area'
					title="{chain} Average Gas Price Chart"
					desc="The {chain} Average Gas Price Chart shows the daily average gas price used of the network."
					yTipLabel="AVG Gas Price"
				/>
			</section>
		</div>
	)
};

export default GaspriceChart;