import React from 'react';
import Chart from "../ChartView";

const VerifiedContractChart = () => {
	return (
		<div className='verifiedcontractchart'>
			<section className='container'>
				<Chart
					method='get-chart-txs'
					type='area'
					title="{chain} Daily Verified Contracts Chart"
					desc="The chart shows the total number of contracts verified daily. Check out the 500 most recent verified contracts!"
					yTipLabel="Total Verified Contracts"
				/>
			</section>
		</div>
	)
};

export default VerifiedContractChart;