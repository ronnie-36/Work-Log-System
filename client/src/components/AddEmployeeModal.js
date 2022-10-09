import React, {useState} from 'react';

function AddEmployeeModal(props){
    const [employeeInfo, setEmployeeInfo]=useState({
        name: "",
        email: "",
        contact: "",
        department: "",
        joiningDate: "",
        password: ""
    }); 

    function handleChange(event){
        console.log(event.target.elements);
        switch(event.target.id){
            case "name":
                setEmployeeInfo(             
                    {...employeeInfo ,
                    name: event.target.value}
                );
                break;
            case "email":
                setEmployeeInfo(             
                    {...employeeInfo ,
                    email: event.target.value}
                );
                break;
            case "contact":
                setEmployeeInfo(             
                    {...employeeInfo ,
                    contact: event.target.value}
                )
                break;
            case "department":
                setEmployeeInfo(             
                    {...employeeInfo ,
                    department: event.target.value}
                )
                break;
            case "joining-date":
                setEmployeeInfo(             
                    {...employeeInfo ,
                    joiningDate: event.target.value}
                );
                break;
            case "password":
                setEmployeeInfo(             
                    {...employeeInfo ,
                    password: event.target.value}
                )
                break;
            default:
                setEmployeeInfo(employeeInfo);
                break;
        }
    }

    function handleClose(){
        props.onClose();
    }

    function handleSubmit(){
        console.log(employeeInfo); 
        props.onSubmit(employeeInfo); 
        setEmployeeInfo({
            name: "",
            email: "",
            contact: "",
            department: "",
            joiningDate: "",
            password: ""
        });
        props.onClose();
    }

	if(!props.show) return null;
	else return (
		<div>            
            <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Employee Details</h1>
                        <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                        <input id="name" value={employeeInfo.name} onChange={handleChange} type="text" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter employee's name" />
						<label for="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email ID</label>
                        <input id="email" value={employeeInfo.email} onChange={handleChange} type="email" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter employee's email ID" />
                        <label for="contact" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Contact Number</label>
                        <input id="contact" value={employeeInfo.contact} onChange={handleChange} type="number" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter employee's contact no." />
                        <label for="department" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Department</label>
                        <input id="department" value={employeeInfo.department} onChange={handleChange} type="text" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter employee's department" />
                        <label for="joining-date" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Joining Date</label>
                        <input id="joining-date" value={employeeInfo.joiningDate} onChange={handleChange} type="date" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter employee's joining date" />
                        <label for="password" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Password</label>
                        <input id="password" value={employeeInfo.password} onChange={handleChange} type="password" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="*********" />
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

export default AddEmployeeModal;