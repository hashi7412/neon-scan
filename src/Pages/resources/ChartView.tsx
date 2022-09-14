import React, { useState } from "react";
import {LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer, BarChart} from "recharts";
import useStore, { config, NF, toDate, toKillo } from "../../useStore";

type ChartDataType = Array<{name: number, x: number, y: number}>

interface ChartOption {
	hideTitle: boolean
}

interface ChartProps {
	method: string
	type: "line" | "area" | "bar"
	title: string
	desc?: string
	info?: JSX.Element
	yTipLabel?: string
	options?: Partial<ChartOption>
}

interface ChartStatusObject {
	data:				ChartDataType
	left:               string|number
	right:              string|number
	refAreaLeft:        string|number
	refAreaRight:       string|number
	top:                string|number
	bottom:             string|number
	animation:          boolean
};

interface CustomTooltipProps {
	active?: boolean
	label?: string
	payload?: any
	title?: string
};

const CustomTooltip = ({ title, active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		const {x, y} = payload[0].payload
		const tip = new Date(x * 1e3).toDateString()
		return (
			<div className="chart-tootip">
				<div>
					<span>{tip}</span>
				</div>
				<div>
					<span style={{color: "#7cb5ec"}}>[{title}: {NF(y)}]</span>
				</div>
			</div>
		);
	}
	return null;
};

const Chart = ({method, type, title, desc, info, yTipLabel, options}: ChartProps) => {
	const {sendJson, showLoading} = useStore()
	const [status, setStatus] = useState<ChartStatusObject>({
		data:			[],
		left:			"dataMin",
		right:			"dataMax",
		refAreaLeft:	0,
		refAreaRight:	0,
		top:			"dataMax+1",
		bottom:			"dataMin-1",
		animation:		 true
	});

	

	const getAxisDomain = (from, to, ref, offset) => {
		let a = status.data.findIndex(i=>i.x===from)
		let b = status.data.findIndex(i=>i.x===to)
		let start = a, end = b
		if (start > end) {
			end = a
			start = b
		}
		const refData = status.data.slice(start, end);
		let [bottom, top] = [refData[0][ref], refData[0][ref]];
		refData.forEach(d => {
			if (d[ref] > top) top = d[ref];
			if (d[ref] < bottom) bottom = d[ref];
		});
	  
		return [(bottom | 0) - offset, (top | 0) + offset];
	};

	React.useEffect(()=>{
		showLoading(true)
		sendJson(method).then(res=>{
			if (res.error) {

			} else if (res.result) {
				let k = 0
				const data = res.result.map(i=>({/* name: k++,  */x: i[0], y: i[1]}))
				setStatus({...status, data})
			}
			showLoading(false)
		})
	}, [])
	const zoom = () => {
		let { refAreaLeft, refAreaRight } = status;

		if (refAreaLeft === refAreaRight || refAreaRight === 0) {
			setStatus({
				...status,
				refAreaLeft: 	0,
				refAreaRight: 	0
			});
			return;
		}

		if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

		const [bottom, top] = getAxisDomain(refAreaLeft, refAreaRight, "y", 50);
		// const [bottom2, top2] = getAxisDomain(refAreaLeft, refAreaRight, "y", 50);

		setStatus({
			...status,
			refAreaLeft:		0,
			refAreaRight:		0,
			left:				refAreaLeft,
			right:				refAreaRight,
			bottom,
			top,
		});
	}

	const zoomOut = () => {
		setStatus({
			...status,
			refAreaLeft:		0,
			refAreaRight:		0,
			left:				"dataMin",
			right:				"dataMax",
			top:				"dataMax+1",
			bottom:				"dataMin"
		});
	}

	const CustomizedDot = () => null

	return (
		<>
			{options && !options.hideTitle && (
				<h4 className="mb">{title.replace('{chain}', config.chain)}</h4>
			)}
			{desc && (
				<div className="panel m-b-2">
					<p>{desc?.replace('{chain}', config.chain)}</p>
				</div>
			)}
			{info && (<div className="panel m-b-2">{info}</div>)}
			<div className="panel">
				<div className="panel-header text-center">
					<h4 className="m-b-2">{title?.replace('{chain}', config.chain)}</h4>
					<small>Source: {config.title}.com</small><br />
					<small>Click and drag in the plot area to zoom in</small>
				</div>
				<div className='panel-content'>
					{status.left!=='dataMin' && <button className="btn" onClick={zoomOut}>Zoom Out</button>}
					<ResponsiveContainer width="100%" height={400}>
						{type === "line" ? (
							<LineChart
								data={status.data}
								onMouseDown={e => setStatus({...status, refAreaLeft: e.activeLabel || 0 })}
								onMouseMove={e =>
									status.refAreaLeft &&
									setStatus({ ...status, refAreaRight: e.activeLabel || 0 })
								}
								onMouseUp={zoom}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									allowDataOverflow={true}
									dataKey="x"
									domain={[status.left, status.right]}
									type="number"
									tickFormatter={toDate}
									/>
								<Tooltip content={<CustomTooltip title={yTipLabel} />}  />
								<YAxis
									allowDataOverflow={true}
									domain={[status.bottom, status.top]}
									type="number"
									yAxisId="1"
									tickFormatter={toKillo}
								/>
								<Line
									yAxisId="1"
									type="natural"
									dataKey="y"
									stroke="#8884d8"
									animationDuration={0}
									dot={<CustomizedDot />}
								/>
								{status.refAreaLeft && status.refAreaRight ? (
									<ReferenceArea
										yAxisId="1"
										x1={status.refAreaLeft}
										x2={status.refAreaRight}
										strokeOpacity={0.3}
									/>
								) : null}
							</LineChart>
						) : ( type === "area" ? (
							<AreaChart
								data={status.data}
								onMouseDown={e => setStatus({...status, refAreaLeft: e.activeLabel || 0 })}
								onMouseMove={e =>
									status.refAreaLeft &&
									setStatus({ ...status, refAreaRight: e.activeLabel || 0 })
								}
								onMouseUp={zoom}
							>
								{/* <CartesianGrid strokeDasharray="3 3" /> */}
								<XAxis
									allowDataOverflow={true}
									dataKey="x"
									domain={[status.left, status.right]}
									type="number"
									tickFormatter={toDate}
								/>
								<Tooltip content={<CustomTooltip title={yTipLabel} />} />
								<YAxis
									allowDataOverflow={true}
									domain={[status.bottom, status.top]}
									type="number"
									yAxisId="1"
									tickFormatter={toKillo}
								/>
								
								<defs>
									<linearGradient id="uv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
										<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
									</linearGradient>
								</defs>
								<Area 
									yAxisId="1"
									type="number"
									dataKey="y"
									stroke="#8884d8"
									fillOpacity={1}
									fill="url(#uv)"
								/>
								{status.refAreaLeft && status.refAreaRight ? (
									<ReferenceArea
										yAxisId="1"
										x1={status.refAreaLeft}
										x2={status.refAreaRight}
										strokeOpacity={0.3}
									/>
								) : null}
							</AreaChart>
						) : (
							<BarChart
								data={status.data}
								onMouseDown={e => setStatus({...status, refAreaLeft: e.activeLabel || 0 })}
								onMouseMove={e =>
									status.refAreaLeft &&
									setStatus({ ...status, refAreaRight: e.activeLabel || 0 })
								}
								onMouseUp={zoom}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									allowDataOverflow={true}
									dataKey="x"
									domain={[status.left, status.right]}
									type="number"
									tickFormatter={toDate}
									/>
								<Tooltip content={<CustomTooltip title={yTipLabel} />}  />
								<YAxis
									allowDataOverflow={true}
									domain={[status.bottom, status.top]}
									type="number"
									yAxisId="1"
									tickFormatter={toKillo}
								/>
								<Line
									yAxisId="1"
									type="natural"
									dataKey="y"
									stroke="#8884d8"
									animationDuration={0}
									dot={<CustomizedDot />}
								/>
								{status.refAreaLeft && status.refAreaRight ? (
									<ReferenceArea
										yAxisId="1"
										x1={status.refAreaLeft}
										x2={status.refAreaRight}
										strokeOpacity={0.3}
									/>
								) : null}
							</BarChart>
						))}
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
}

export default Chart;