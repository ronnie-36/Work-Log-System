import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns'


function DisplayBarChart({givenDate,data,width,height}){
	const weekTasks = data;
	// console.log(weekTasks);

  	const date = new Date(givenDate);
	// console.log(date);
	const weekStart = startOfWeek(date, { weekStartsOn: 1 });
	const currDate = weekStart;

	function convertDate(temp){
		const val=`${temp.getDate()}/${temp.getMonth()+1}/${temp.getFullYear()}`
		return val;
	}

	const weekDates={

	}


	for(let step=0; step<7; step++){
		weekDates[convertDate(currDate)]={
			breakTime : 0,
			workTime : 0,
			meetingTime : 0
		};
		currDate.setDate(currDate.getDate()+1);		
	}
	// console.log(weekDates);
	
	weekTasks.forEach(task => {		
		const key = convertDate(new Date(task.startTime));
		// console.log(key);
		if(task.taskType==="break") weekDates[key].breakTime+=task.duration;
		else if(task.taskType==="work") weekDates[key].workTime+=task.duration;
		else if(task.taskType==="meeting") weekDates[key].meetingTime+=task.duration;
	});

	// console.log(weekDates);

	const weekData = [];

	for(const [key, value] of Object.entries(weekDates)){
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
			<Bar dataKey="break" stackId="a" fill="red" />
			<Bar dataKey="work" stackId="a" fill="green" />
			<Bar dataKey="meeting" stackId="a" fill="blue" />
		  </BarChart>
		</div>
	);
}

export default DisplayBarChart;