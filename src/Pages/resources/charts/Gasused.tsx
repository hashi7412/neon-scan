import React from 'react';
import Chart from "../ChartView";

const GasusedChart = () => {
	return (
		<div className='gasusedchart'>
			<section className='container'>
				<Chart
					method='get-chart-gasused'
					type='area'
					title="{chain} Daily Gas Used Chart"
					desc="The {chain} Daily Gas Used Chart shows the historical total daily gas used of the network."
					yTipLabel="Total Gas Used"
				/>
			</section>
		</div>
	)
};

export default GasusedChart;