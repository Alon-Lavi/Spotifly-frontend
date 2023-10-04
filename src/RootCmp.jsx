import React from 'react'
import routes from './routes'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
// import { UserDetails } from './pages/UserDetails'

export function RootCmp() {
	const [scrollTop, setScrollTop] = useState(0)

	return (
		<div>
			<main
				onScroll={(ev) => {
					setScrollTop(ev.currentTarget.scrollTop)
				}}
				className="home-app-container"
			>
				<AppHeader scrollTop={scrollTop} />
				<Routes>
					{routes.map((route) => (
						<Route key={route.path} exact={true} element={route.component} path={route.path} />
					))}
					{/* <Route path="user/:id" element={<UserDetails />} /> */}
				</Routes>
			</main>
			<AppFooter />
		</div>
	)
}
