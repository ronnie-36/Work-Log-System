import React from 'react';
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './AdminPage';
import EmployeePage from './EmployeePage';

const  App=()=>{	
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
