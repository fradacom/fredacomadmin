import React from 'react'
import { Routes, Route, } from "react-router-dom";
import DashboardViews from 'views/dashboard-views';
import HeaderNav from 'components/layout-components/Dashboard/HeaderNav';
import utils from 'utils';
import {
	Grid
  } from "antd";
const { useBreakpoint } = Grid;

export const DashboardLayout = () => {
	const screens = utils.getBreakPoint(useBreakpoint());
  	const isMobile = !screens.includes('lg')
	return (
		<div className="app-container">
			<HeaderNav isMobile={isMobile}/>
			<div className='py-5 app-wrapper container'>
				<Routes>
					<Route path="/*" element={<DashboardViews />} />
				</Routes>
			</div>
		</div>
	)
}


export default DashboardLayout
