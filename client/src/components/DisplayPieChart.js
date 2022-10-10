import React from "react";
import { Chart } from 'react-google-charts'; 


function DisplayPieChart({givenDate,data,width,height}){
	const {weekTasks, prevDayTasks, currDayTasks} = data;
	// console.log(weekTasks);
	// console.log(prevDayTasks);
	// console.log(currDayTasks);
	
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

	const date = new Date(givenDate);
	const currDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
	// console.log(currDate);
	date.setDate(date.getDate()-1);
	const prevDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

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

export default DisplayPieChart;