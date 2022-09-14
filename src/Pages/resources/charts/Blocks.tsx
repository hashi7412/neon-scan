import React from 'react';
import Chart from "../ChartView";


const BlocksChart = () => {
	return (
		<div className='blockschart'>
			<section className='container'>
				<Chart
					method='get-chart-blocks'
					type='area'
					title="{chain} Block Count and Rewards Chart"
					desc="The {chain} Block Count and Rewards Chart shows the historical number of blocks procduced daily on the and the total block reward."
					yTipLabel="Total Daily Block Rewards"
				/>
			</section>
		</div>
	)
};

export default BlocksChart;