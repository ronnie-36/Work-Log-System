import React, {useState} from 'react';
import Login from "./Login";
import AdminPage from './AdminPage';
import EmployeePage from './EmployeePage';

const  App=()=>{
	const [isAdmin, setIsAdmin]=useState(false);
	const [showLoginPage, setShowLoginPage]=useState(true);

	function handleUserInfo(userInfo){		
		console.log(userInfo);
		setShowLoginPage(false);
		if(userInfo[1]==="") setIsAdmin(true);		
	}

	return (
		<div>
			{showLoginPage && <Login UserInfo={handleUserInfo} />}
			{isAdmin ? <AdminPage /> : <EmployeePage />}
		</div>
	)
}
export default App;
