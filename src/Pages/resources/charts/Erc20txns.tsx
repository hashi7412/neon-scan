import React from 'react';
import Chart from "../ChartView";

const Erc20txnsChart = () => {
	return (
		<div className='erc20txnschart'>
            <section className='container'>
                <Chart
                    method='get-chart-erc20'
                    type='line'
                    title="ERC-20 Daily Token Transfer Chart"
                    desc="The chart shows the number of ERC-20 tokens transferred daily."
					yTipLabel="Total Token Transfer"
                />
            </section>
		</div>
	)
};

export default Erc20txnsChart;