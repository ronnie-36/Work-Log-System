import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Login(){
	const navigate=useNavigate();
	useEffect(()=>{
	
			//console.log(localStorage.getItem("token"))
			if(localStorage.getItem("token"))
			{
			if(localStorage.getItem("role")==="admin")
		{
			navigate("/admin")
		}
		else if(localStorage.getItem("role")==="employee")
		navigate("/employee")
	}
	
	},)
	const login=async(data)=>{
		const config={
			headers: {
					  "Access-Control-Allow-Origin": "*",
					  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					 	}
		}
		try{
			//console.log(`${process.env.SERVER_URL_DEV}`);
			const url=process.env.REACT_APP_SERVER_URL+ "auth/login";
			const res=await axios.post(url,{...data},config).catch((err) => {
				window.alert(err.response.data.message);
			});
			if(res.data)
			{
				let token = res.data.token;
				let role=res.data.me.role;
            localStorage.setItem("token", token);
			localStorage.setItem("role",role);
			if(localStorage.getItem("role")==="admin")
		{
			navigate("/admin")
		}
		else if(localStorage.getItem("role")==="employee")
		navigate("/employee")
			// if(localStorage.getItem("role")==="admin")
			// {
			// 	navigate("/admin")
			// }
			// else if(localStorage.getItem("role")==="employee")
			// navigate("/employee")

			}
			// else
			// console.log(res);
		}
		catch(e){
			console.log(e);
		}
	}
	const handleSubmit=(event)=>{
		event.preventDefault();
		const data={email:event.target.elements[0].value, password:event.target.elements[1].value}
		// console.log(event.target.elements[0].value);
		// console.log(event.target.elements[1].value);
		// console.log(data);
		// props.UserInfo([event.target.elements[0].value,event.target.elements[1].value])		
		login(data);
	}

	return (
		// Container 
		<div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
			{/* Login component */}
			<div className="flex shadow-md">
				{/* Login Form  */}
				<div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width: "24rem", height: "32rem"}}>
					{/* Heading */}
					<div className="w-72">
						<h1 className="text-xl font-semibold">Welcome!</h1>
						<small className="text-gray-400">Please enter your details</small>
					</div>
					{/* Form  */}
					<form onSubmit={handleSubmit} className="mt-4 py-6">
						{/* Email */}
						<div className="mb-3">
							<label id="username" className="mb-2 block text-s font-semibold">Username</label>
							<input id="username" type="email" placeholder="Enter your username" className="block w-72 rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
						</div>
						{/* Password */}
						<div className="mb-3">
							<label id="password" className="mb-2 block text-s font-semibold">Password</label>
							<input id="password" type="password" placeholder="********" className="block w-72 rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
						</div>
						{/* Signin button */}
						<div className="mb-3">
							<button type="submit" className="mt-12 mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Sign in</button>
						</div>
					</form>
				</div>				
			</div>
			{/* Login banner */}
			<div className="flex flex-wrap content-center justify-center rounded-r-md" style={{width: "24rem", height: "32rem"}}>
				<img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg?w=740&t=st=1665207216~exp=1665207816~hmac=bda1f042e7d4b4a62187ed8df67909a9eaf467a2bd25542e09d9bc929a9fab0c" alt="login banner"/>
			</div>
		</div>
	);
}

export default Login;