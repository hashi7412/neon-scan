import React from 'react';
import Chart from "../ChartView";

interface AddressChartObject {}

interface AddressChartStatusObject {
	title: string
	desc: string
	info: any[]
	data: any
}

const AddressChart = () => {
	return (
		<div className='addresschart'>
			<section className='container'>
				<Chart
					method='get-chart-address'
					type='area'
					title="{chain} Unique Addresses Chart"
					desc="The chart shows the total distinct numbers of address on the {chain} and the increase in the number of address daily."
					// info={<>
					// 	<p>Highest increase of 40,478 new addresses was recorded on Saturday, June 26, 2021</p>
					// 	<p>Lowest increase of 7 new addresses was recorded on Wednesday, November 4, 2020</p>
					// </>}
					yTipLabel="Total Distinct Addresses"
				/>
			</section>
		</div>
	)
};

export default AddressChart;