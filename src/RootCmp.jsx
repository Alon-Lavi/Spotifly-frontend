import React from 'react'
import routes from './routes'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { NavBar } from './cmps/NavBar'
import { NavLink } from 'react-router-dom'
import { StationDetails } from './pages/StationDetails'
import { StationIndex } from './pages/StationIndex'
import { AddStation } from './cmps/AddStation'

export function RootCmp() {
	const [scrollTop, setScrollTop] = useState(0)

	// return (
	// 	<div>
	// 		<main
	// 			onScroll={(ev) => {
	// 				setScrollTop(ev.currentTarget.scrollTop)
	// 			}}
	// 			className="home-app-container"
	// 		>
	// 			<AppHeader scrollTop={scrollTop} />
	// 			<Routes>
	// 				{routes.map((route) => (
	// 					<Route key={route.path} exact={true} element={route.component} path={route.path} />
	// 				))}
	// 				{/* <Route path="user/:id" element={<UserDetails />} /> */}
	// 			</Routes>
	// 		</main>
	// 		<AppFooter />
	// 	</div>
	// )
	return (
		<div>
			<AppHeader scrollTop={scrollTop} />
			<main
				onScroll={(ev) => {
					setScrollTop(ev.currentTarget.scrollTop)
				}}
				className="home-app-container"
			>
				<NavBar />
				<Routes>
					{routes.map((route) => (
						<Route key={route.path} exact={true} element={route.component} path={route.path} />
					))}
					<Route path="user/:id" element={<UserDetails />} />
					<Route path="station/station/:stationId" element={<StationDetails />} />
					<Route path="station/add" element={<AddStation/>} />
					<Route path="search/station/:genre" element={<StationIndex/>} />




				</Routes>
			</main>
			<AppFooter />
		</div>
	)
}
