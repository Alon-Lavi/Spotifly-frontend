import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'
import { NavBar } from './cmps/NavBar'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { NavLink } from 'react-router-dom'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
              <NavBar />
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


