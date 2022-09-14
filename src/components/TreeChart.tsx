import React from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

export interface FieldObject {
    name:               (i:any)=>string
    value:              (i:any)=>number
    color?:             string
}

interface TreeChartStatus {
    data: 				Array<any>
}

const TreeFormChart = ({
    fields,
    data,
    isTooltip=true,
    colors
}) => {
    const [status, setStatus] = React.useState<TreeChartStatus>({
        data: []
    });

	
	const CustomizedContent = (props) => {
		const { root, depth, x, y, width, height, index, colors, name } = props;
	
		return (
			<g>
				<rect
					x={x}
					y={y}
					width={width}
					height={height}
					style={{
						fill: '#FFFFFF',
						stroke: "#DDDDDD",
						strokeWidth: 2 / (depth + 1e-10),
						strokeOpacity: 1 / (depth + 1e-10),
					}}
				/>
				{depth === 1 ? (
				<text 
					x={x + width / 2} 
					y={y + height / 2 + 7} 
					textAnchor="middle" 
					fill={colors[Math.floor((index / root.children.length) * 6)]} 
					fontSize={(Math.sqrt(width*height)/5)}>
					{name}
				</text>
				) : null}
				{depth === 1 ? (
				<text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
					{index + 1}
				</text>
				) : null}
			</g>
		);
	}

	const RenderTooltip = (props) => {
		console.log("tooltip", props);
		const { active, payload } = props;
		if (active && payload && payload.length) {
			return (
				<div className="chart-tooltip">
					<div className="card">
						<div className="card-header">
							<div>
								<span></span>
								<span>Token: {payload[0].payload.name}</span>
							</div>
						</div>
						<div className="card-content">
							<div>
								<span>Total Transaction: {payload[0].value}</span>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return null;
	}

    React.useEffect(()=>{
        let jsonData = data.map((i, k) => ({
			name:           fields.name(i),
			value:          fields.value(i),
			color:          colors[k]
		})) as FieldObject[]
        
        setStatus({data: [...jsonData]})
    }, [])

    return (
        <ResponsiveContainer width="100%" height={400}>
            <Treemap width={400} height={400}
                dataKey="value"
                isAnimationActive={false}
                data={status.data}
                fill="#8884d8"
				content={<CustomizedContent colors={colors} />}
            >
                {isTooltip && (<Tooltip content={<RenderTooltip payload={status.data} />} />)}
            </Treemap>
        </ResponsiveContainer>
    )
}

export default TreeFormChart