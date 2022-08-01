import React from 'react'
import { Routes, Route, } from "react-router-dom";
import AuthViews from 'views/auth-views';

export const AuthLayout = () => {
	return (
		<div className="auth-container w-100">
			<div className='auth-wrapper'>
				<Routes>
					<Route path="/*" element={<AuthViews />} />
				</Routes>
			</div>
		</div>
	)
}


export default AuthLayout
