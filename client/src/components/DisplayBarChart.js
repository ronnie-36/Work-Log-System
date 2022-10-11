import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function DisplayBarChart({data,width,height}){
	// const weekTasks = data.weekData;
	

	// const {barChartData} = data;
	
	// console.log(data);
	// console.log(barChartData);

	const weekData = [];

	for(const [key, value] of Object.entries(data)){
		weekData.push({
			name: key,
			break: value.breakTime,
			work: value.workTime,
			meeting: value.meetingTime
		})
	}	

	// console.log(weekData);

	return (
		<div>
		  <BarChart
			width={width}
			height={height}
			data={weekData}
			margin={{
			  top: 20,
			  right: 30,
			  left: 20,
			  bottom: 5,
			}}
		  >
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="break" stackId="a" fill="#3366CC" />
			<Bar dataKey="work" stackId="a" fill="#DC3912" />
			<Bar dataKey="meeting" stackId="a" fill="#FF9900" />
		  </BarChart>
		</div>
	);
}

export default DisplayBarChart;