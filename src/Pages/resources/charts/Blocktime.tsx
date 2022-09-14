import React from 'react';
import Chart from "../ChartView";

const BlocktimeChart = () => {
	return (
		<div className='blocktimechart'>
			<section className='container'>
				<Chart
					method='get-chart-blocktime'
					type='area'
					title="{chain} Average Block Time Chart"
					desc="The {chain} Average Block Time Chart shows the historical average time taken in seconds for a block to be included in the blockchain."
					yTipLabel="Block Time (Secs)"
				/>
			</section>
		</div>
	)
};

export default BlocktimeChart;