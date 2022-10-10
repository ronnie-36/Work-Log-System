import React, {useState} from "react";

function AddTaskModal(props){
	const [taskInfo, setTaskInfo]=useState({
		description: "",
		taskType: "break",
		startTime: "",
		duration: ""
	});

	function handleChange(event){
        switch(event.target.id){
            case "description":
                setTaskInfo(             
                    {...taskInfo ,
                    description: event.target.value}
                );
                break;
            case "task-type":
                setTaskInfo(             
                    {...taskInfo ,
                    taskType: event.target.value}
                );
                break;
            case "start-time":
                setTaskInfo(             
                    {...taskInfo ,
                    startTime: event.target.value}
                )
                break;
            case "total-time":
                setTaskInfo(             
                    {...taskInfo ,
                    duration: event.target.value}
                )
                break;
            default:
                setTaskInfo(taskInfo);
                break;
        }
    }

	function handleClose(){
		props.onClose();
	}

	function handleSubmit(){
		console.log(taskInfo); 
        props.onSubmit(taskInfo); 
        setTaskInfo({
            description: "",
			taskType: "",
			startTime: "",
			totalTime:  ""
        });
		props.onClose();
	}


	if(!props.show) return null;
	else return (
		<div>            
            <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 font-2xl font-bold tracking-normal leading-tight mb-4">Enter Task Details</h1>
                        <label for="description" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
                        <input id="description" onChange={handleChange} type="text" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter task's description" />
						<label for="task-type" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Type</label>
                        <select id="task-type" onChange={handleChange} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">							
							<option value="break" selected>Break</option>
							<option value="meeting">Meeting</option>	
							<option value="work">Work</option>						
						</select>
						<label for="start-time" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Start time</label>
                        <input id="start-time"  onChange={handleChange} type="datetime-local" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter start time" />
						<label for="total-time" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Time taken</label>
                        <input id="total-time" onChange={handleChange} type="number" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter time taken (in minutes)" />
                        <div className="flex items-center justify-start w-full">
                            <button onClick={handleSubmit}  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
								Submit
							</button>
                            <button onClick={handleClose} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
								Close
							</button>
                        </div>
                        <button onClick={handleClose} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>            
        </div>
	);
}

export default AddTaskModal;