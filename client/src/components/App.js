import React, {useState} from 'react';
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route exact path="/admin" element={<AdminPage />} />
			<Route exact path="/employee" element={<EmployeePage />} />
		</Routes>
		</BrowserRouter>
		
	)
}
export default App;
