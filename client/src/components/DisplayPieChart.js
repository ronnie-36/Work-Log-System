import React from "react";
// import { BarChart, Bar, Cell, XAxis, YAxis, Pie, PieChart, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from 'react-google-charts';


export const data = [
	["Task", "Hours per Day"],
	["Work", 11],
	["Eat", 2],
	["Commute", 2],
	["Watch TV", 2],
	["Sleep", 7],
  ];
  
  export const options = {
	title: "My Daily Activities",
  };

function DisplayPieChart(){
	return (
		<div class="flex">
			<div>
				<Chart
					chartType="PieChart"
					data={data}
					options={options}
					width={"500px"}
					height={"500px"}
				/>
			</div>
			<div>
				<Chart
					chartType="PieChart"
					data={data}
					options={options}
					width={"500px"}
					height={"500px"}
				/>
			</div>
		</div>
	)
}


// const data01 = [
// 	{ name: 'Group A', value: 400 },
// 	{ name: 'Group B', value: 300 },
// 	{ name: 'Group C', value: 300 },
// 	{ name: 'Group D', value: 200 },
// 	{ name: 'Group E', value: 278 },
// 	{ name: 'Group F', value: 189 },
//   ];
  
//   const data02 = [
// 	{ name: 'Group A', value: 2400 },
// 	{ name: 'Group B', value: 4567 },
// 	{ name: 'Group C', value: 1398 },
// 	{ name: 'Group D', value: 9800 },
// 	{ name: 'Group E', value: 3908 },
// 	{ name: 'Group F', value: 4800 },
//   ];

// function DisplayPieChart(){
// 	return (
// 		<div class="grid grid-rows-1">
// 		  	<div>
// 			  	<PieChart width={500} height={400}>
// 					<Pie
// 						dataKey="value"
// 						isAnimationActive={false}
// 						data={data01}
// 						cx="50%"
// 						cy="50%"
// 						outerRadius={80}
// 						fill="#8884d8"
// 						label
// 					/>
// 					<Tooltip />
// 				</PieChart>
// 			</div>


// 			<div>
// 			  	<PieChart width={500} height={400}>
// 				  	<Pie 
// 						dataKey="value" 
// 						data={data02} 
// 						cx="50%" 
// 						cy="50%"
// 						// innerRadius={40} 
// 						outerRadius={80} 
// 						fill="#82ca9d" 
// 						label
// 					/>
// 					<Tooltip />
// 				</PieChart>
// 			</div>
// 		</div>
// 	);
// }

export default DisplayPieChart;