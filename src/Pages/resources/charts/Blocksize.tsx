import React from 'react';
import Chart from "../ChartView";

const BlocksizeChart = () => {
	return (
		<div className='blocksizechart'>
			<section className='container'>
				<Chart
					method='get-chart-blocksize'
					type='area'
					title="{chain} Average Block Time Chart"
					desc="The {chain} Average Block Time Chart shows the historical average time taken in seconds for a block to be included in the blockchain."
					yTipLabel="Block Size (Bytes)"
				/>
			</section>
		</div>
	)
};

export default BlocksizeChart;