import React, {useEffect, useState  } from "react";
import {useNavigate} from 'react-router-dom'; 
import AddTaskModal from "./AddTaskModal";
import axios from 'axios';		
import DisplayPieChart from "./DisplayPieChart";
import DisplayBarChart from "./DisplayBarChart";
import { startOfWeek } from 'date-fns'

const EmployeePage=()=>{
	const navigate=useNavigate();
	const [showModal, setShowModal]=useState(false);
	const [barChartData, setBarChartData]=useState({});
	const [date,setDate]=useState(new Date());
	const [taskData, setTaskData]=useState({
		weekTasks : [],
		prevDayTasks : [],
		currDayTasks : []
	});

	const weekDates={}

	function convertDate(temp){
		const val=`${temp.getDate()}/${temp.getMonth()+1}/${temp.getFullYear()}`
		return val;
	}
	
	function handleChange(event){
		// console.log(event.target.value);
		
		setDate(event.target.value);
        getTasks(event.target.value);
	}

	const getTasks=async(givenDate)=>{
		try{
			const config = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"X-AUTH-TOKEN":localStorage.getItem("token")
				  },
				  
		  };
		  const url=process.env.REACT_APP_SERVER_URL+ "api/tasks";
			const res=await axios.post(url,{date:givenDate},config).catch((err) => {
				window.alert(err.response.data.message);
			});
			if(res.data)
			{
				const data=res.data;
				if(Object.keys(weekDates).length > 0){
					data.weekTasks.forEach(task => {		
						const key = convertDate(new Date(task.startTime));
	
						if(task.taskType==="break") weekDates[key].breakTime+=task.duration;
						else if(task.taskType==="work") weekDates[key].workTime+=task.duration;
						else if(task.taskType==="meeting") weekDates[key].meetingTime+=task.duration;
					});
					setBarChartData(weekDates);
				}
				setTaskData(data);
			}
			}
			catch(e){
				console.log(e);
			}
	}
	const updateTaskList=async(currTask)=>{
		// console.log(currTask);
		try{
			const config = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"X-AUTH-TOKEN":localStorage.getItem("token")
				  }
				
		  };
		  const url=process.env.REACT_APP_SERVER_URL+ "api/tasks/add";
			const res=await axios.post(url,{...currTask},config).catch((err) => {
				window.alert(err.response.data.message);
			});
			if(res.data)
			{
				// console.log(res.data);
				getTasks(new Date());				
			}
			}
		catch(e){
			console.log(e);
		}
		
	}
	const logOut=()=>{
		localStorage.removeItem("role");
		localStorage.removeItem("token");
		navigate("/");
	}
	useEffect(()=>{
		if(!localStorage.getItem("token")){navigate("/");	}
		if(date){
			const weekStart = startOfWeek(new Date(date), { weekStartsOn: 1 });
			const currDate = weekStart;
			for(let step=0; step<7; step++){
			weekDates[convertDate(currDate)]={
					breakTime : 0,
					workTime : 0,
					meetingTime : 0
				};
				currDate.setDate(currDate.getDate()+1);	
			}
			getTasks(date);
		}
	},[date]);


	return (
		<div>
			<nav className="flex items-center justify-between flex-wrap bg-sky-500 p-6">
				<div className="flex items-center flex-shrink-0 text-white mr-6">
					<svg className="fill-current h-8 w-8 mr-2" version="1.0" width="54" height="54" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M2145 4610 c-436 -239 -522 -280 -659 -315 -146 -37 -251 -45 -588 -45 l-318 0 0 -969 c0 -1047 1 -1079 54 -1296 129 -528 480 -986 956 -1248 84 -46 955 -447 971 -447 15 0 756 339 909 415 571 286 966 838 1054 1474 14 95 16 257 16 1091 l0 980 -317 0 c-339 0 -445 8 -588 45 -140 37 -220 75 -657 313 -223 122 -412 222 -420 221 -7 0 -193 -99 -413 -219z m563 -726 c44 -8 116 -34 167 -59 164 -80 260 -176 340 -340 228 -467 -94 -1012 -615 -1042 -176 -10 -361 49 -502 162 -160 126 -268 355 -268 565 0 217 113 447 282 575 174 132 387 182 596 139z m337 -1707 c116 -33 203 -85 295 -177 65 -64 95 -103 122 -160 41 -82 68 -181 68 -247 l0 -43 -77 0 c-43 0 -114 -3 -159 -6 l-81 -7 -7 49 c-15 111 -100 221 -201 260 -46 18 -80 19 -450 19 l-400 0 -55 -26 c-98 -47 -170 -142 -186 -246 l-6 -43 -163 0 -163 0 5 43 c19 176 79 303 196 417 100 97 224 158 362 179 33 5 236 8 450 7 330 -2 399 -5 450 -19z"/> <path d="M2498 3569 c-167 -23 -299 -151 -334 -323 -19 -90 -10 -165 30 -252 73 -158 262 -257 433 -225 229 42 375 257 329 480 -45 217 -236 350 -458 320z"/></g></svg>
					<span className="font-semibold text-xl tracking-tight">Employee Dashboard</span>
				</div>			
				<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
					<div className="text-sm lg:flex-grow">
						{/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">temp</a> */}
					</div>
					<div>
						<button className="hover:cursor-pointer inline-block text-sm font-bold px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 " onClick={logOut}>Logout</button>
					</div>
				</div>
			</nav>

			<div className="w-full flex justify-center py-12" id="button">
				<div>
					<div>
						<button onClick={() => setShowModal(true)} className="flex justify-center w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" >
							Add Task
						</button>
						<AddTaskModal 
							show={showModal} 
							onClose={() => setShowModal(false)} 
							onSubmit={updateTaskList}
						/>
					</div>
					<br></br><br></br>
					<div>
						<label htmlFor="req-time" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Select Date</label>
                        <input id="req-time"  onChange={handleChange} type="date" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"  />
					</div>

					<div>
						<DisplayPieChart givenDate={new Date(date)} data={taskData} width={500} height={500}/>
						<DisplayBarChart data={barChartData} width={1000} height={300}/>
					</div>
				</div>
            </div>
		</div>
	);
}
export default EmployeePage;