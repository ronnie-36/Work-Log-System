import React from "react";
import { Chart } from 'react-google-charts'; 


function DisplayPieChart({data,width,height}){
	const {weekTasks, prevDayTasks, currDayTasks} = data;
	console.log(weekTasks);
	console.log(prevDayTasks);
	console.log(currDayTasks);
	
	var currDay={
		breakTime : 0,
		workTime : 0,
		meetingTime : 0
	}

	var prevDay={
		breakTime : 0,
		workTime : 0,
		meetingTime : 0
	}	
	
	currDayTasks.forEach(task => {
		// console.log(element);
		if(task.taskType==="break") currDay.breakTime+=task.duration;
		else if(task.taskType==="work") currDay.workTime+=task.duration;
		else if(task.taskType==="meeting") currDay.meetingTime+=task.duration;
	});

	prevDayTasks.forEach(task => {
		// console.log(element);
		if(task.taskType==="break") prevDay.breakTime+=task.duration;
		else if(task.taskType==="work") prevDay.workTime+=task.duration;
		else if(task.taskType==="meeting") prevDay.meetingTime+=task.duration;
	});

	const currDayData = [
		["Task", "Minutes taken"],
		["Break", currDay.breakTime],
		["Work", currDay.workTime],
		["Meeting", currDay.meetingTime]
	];
	
	const prevDayData = [
		["Task", "Minutes taken"],
		["Break", prevDay.breakTime],
		["Work", prevDay.workTime],
		["Meeting", prevDay.meetingTime]
	];

	const date = new Date();
	const currDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
	// console.log(currDate);
	date.setDate(date.getDate()-1);
	const prevDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

	const currDateTitle = {
		title: currDate,
	};

	const prevDateTitle = {
		title: prevDate,
	};

	return (
		<div class="flex">
			<div>
				<Chart
					chartType="PieChart"
					data={prevDayData}
					options={prevDateTitle}
					width={`${width}px`}
					height={`${height}px`}
				/>
			</div>
			<div>
				<Chart
					chartType="PieChart"
					data={currDayData}
					options={currDateTitle}
					width={`${width}px`}
					height={`${height}px`}
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