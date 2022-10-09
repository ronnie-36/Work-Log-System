import React, {useEffect, useState  } from "react";
import {useNavigate} from 'react-router-dom'; 
import AddTaskModal from "./AddTaskModal";
import { BarChart, Bar, Cell, XAxis, YAxis, Pie, PieChart, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';		

const EmployeePage=()=>{
	const navigate=useNavigate();
	const [tasks,setTasks]=useState([]);
	const [showModal, setShowModal]=useState(false);
	const [listOfTasks, setListOfTasks]=useState([]);
	
	const getTasks=async(date)=>{
		try{
			const config = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"X-AUTH-TOKEN":localStorage.getItem("token")
				  },
				  
		  };
			const res=await axios.post('http://localhost:5000/api/tasks',{date:date},config);
			if(res.data)
			{
				console.log(res.data);
				const data=res.data;
				setListOfTasks(data);
			}
			else
		console.log(res);}
		catch(e){
			console.log(e);
		}
	}
	const updateTaskList=async(currTask)=>{
		console.log(currTask);
		try{
			const config = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"X-AUTH-TOKEN":localStorage.getItem("token")
				  }
				
		  };
			const res=await axios.post('http://localhost:5000/api/tasks/add',{...currTask},config);
			if(res.data)
			{
				console.log(res.data);
				getTasks(new Date());
				
			}
			else
		console.log(res);}
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
		if(!localStorage.getItem("token"))
		{
		navigate("/");
	  	}
	 },[]);

	 useEffect(()=>{getTasks(new Date())},[]);

	return (
		<div>
			{/* Navbar - https://v1.tailwindcss.com/components/navigation */}
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
					<div>
					
						<PieChart width={600} height={400}>
						<Pie
							dataKey="duration"
							nameKey={"taskType"}
							isAnimationActive={true}
							data={listOfTasks}
							cx="40%"
							cy="50%"
							outerRadius={80}
							fill="#8884d8"
							label
						/>
						<Pie
							dataKey="duration"
							nameKey={"taskType"}
							isAnimationActive={true}
							data={listOfTasks}
							cx={500} cy={200}
							outerRadius={80}
							fill="#8884d8"
							label
						/>
						<Tooltip/>
						</PieChart>
						<ResponsiveContainer width="100%" height={400}>

						<BarChart width={600} height={40} data={listOfTasks}>
						<XAxis dataKey="taskType" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="">
							{listOfTasks.map((entry, index) => (
								<Cell cursor="pointer" fill={ '#8884d8'} key={`cell-${index}`} />
							))}
							</Bar>
						</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
            </div>
		</div>
	);
}

export default EmployeePage;