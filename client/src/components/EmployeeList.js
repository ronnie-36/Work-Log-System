import React, { Fragment, useEffect,useState } from 'react';
import ViewTaskModal from './ViewTaskModel';
function EmployeeList({employee,setId, listOfEmployees,deactivateEmployee}){
	const [showModal, setShowModal] = useState(false);
	
	return (
		<div >
			<ViewTaskModal 
				show={showModal} 
				onClose={() => setShowModal(false)} 
				employee={employee}
			/>
			<div className="flex flex-col mt-8">
				<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
						<table className="min-w-full">
							<thead>
								<tr>
									<th	className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
										Name</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
										Email</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
										Department</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
										Status</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
										View</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
										Deactivate</th>
								</tr>
							</thead>

							<tbody className="bg-white">							
								{listOfEmployees.map((item) => {
									if(item!=null)
									return(
										<tr>
											
											<td    className=" px-6 py-4 whitespace-no-wrap border-b border-gray-200">
												<div className="text-sm font-medium leading-5 text-gray-900 ">{item.name}</div>
											</td>

											<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
												<div className="text-sm leading-5 text-gray-500">{item.email}</div>
											</td>

											<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
												<div className="text-sm leading-5 text-gray-500">{item.department}</div>
											</td>

											{item.activationStatus===true ? 
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													<span class="bg-purple-200 text-blue-600 py-1 px-3 rounded-full text-xs">Active</span>
												</td> :
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													<div class="bg-purple-200 text-red-600 py-1 px-3 rounded-full text-xs">Deactivated</div>
												</td>												
											}
											
											<td onClick={()=>{
														setId({employeeId:item.id,
														name:item.name})
														setShowModal(true)}}
												className="cursor-pointer px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
												<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
											</td>
											<td  onClick={()=>{(item.activationStatus===false)?window.alert("Already deactivated"):deactivateEmployee(item.id)}}
												className="cursor-pointer px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
												<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeList;