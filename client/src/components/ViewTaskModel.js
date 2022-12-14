import React, {Fragment, useEffect, useState} from "react";
import DisplayBarChart from "./DisplayBarChart";
import DisplayPieChart from "./DisplayPieChart";
import axios from'axios';
import { startOfWeek } from 'date-fns'

const ViewTaskModal=({employee,onClose,show})=>{
	const [barChartData, setBarChartData]=useState({});
	const [listOfTasks, setListOfTasks]=useState({
		currDayTasks:[],
		prevDayTasks:[],
		weekTasks:[]});
    const{employeeId,name}=employee;
    const [date,setDate]=useState();

	const weekDates={}

	function convertDate(temp){
		const val=`${temp.getDate()}/${temp.getMonth()+1}/${temp.getFullYear()}`
		return val;
	}



	function handleChange(event){
		const weekStart = startOfWeek(new Date(event.target.value), { weekStartsOn: 1 });
		const currDate = weekStart;
		for(let step=0; step<7; step++){
			weekDates[convertDate(currDate)]={
				breakTime : 0,
				workTime : 0,
				meetingTime : 0
			};
			currDate.setDate(currDate.getDate()+1);		
		}     
		setDate(event.target.value);
        getTasks(event.target.value);
    }
    const getTasks=async(givenDate)=>{
		try{
            //console.log(employeeId);
			const config = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"X-AUTH-TOKEN":localStorage.getItem("token")
				  },
				  
		  };
		  const url=process.env.REACT_APP_SERVER_URL+ "api/tasks";
			const res=await axios.post(url,{date:givenDate,employeeId:employeeId},config).catch((err) => {
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
				setListOfTasks(data);
			}
		}
		catch(e){
			console.log(e);
		}
	}
	function handleClose(){
		onClose();
        setDate();
	}

useEffect(()=>{
	if(date) getTasks(date)
},[employeeId,date])

	if(!show) return null;
	else return (
		<div>            
            <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 ">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 font-2xl font-bold tracking-normal leading-tight mb-4">{name} Details</h1>
						<label htmlFor="start-time" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
                        <input id="start-time"  onChange={handleChange} type="date" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter start time"  />
					
                        <button onClick={handleClose} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        {date && <Fragment>
                        {listOfTasks.weekTasks.length>0 ? <div className=''>
							<DisplayPieChart data={listOfTasks} givenDate={date} width={350} height={350}/>
						<div className='mx-auto'>
						<DisplayBarChart data={barChartData} width={900} height={200}/>
						</div>
                        </div> : <div classanme='text-center font-semibold'>
                            <h1>No Tasks this week</h1>
                            </div>}
                        </Fragment>}
                    </div>                    
                </div>               
            </div>          
        </div>
	);
}

export default ViewTaskModal;