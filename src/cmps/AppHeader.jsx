import routes from '../routes'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PrevPage from './svg/PrevPage'
import NextPage from './svg/NextPage'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader({ scrollTop }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((storeState) => storeState.userModule.user)

	function onBack() {
		navigate(-1)
	}

	const onForward = () => {
		navigate(+1)
	}

	async function onLogin(credentials) {
		try {
			const user = await login(credentials)
			showSuccessMsg(`Welcome: ${user.fullname}`)
		} catch (err) {
			showErrorMsg('Cannot login')
		}
	}

	async function onSignup(credentials) {
		try {
			const user = await signup(credentials)
			showSuccessMsg(`Welcome new user: ${user.fullname}`)
		} catch (err) {
			showErrorMsg('Cannot signup')
		}
	}

	async function onLogout() {
		try {
			await logout()
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header" style={{ backgroundColor: `rgb(40,40,40,${scrollTop / 100})` }}>
			<nav >
				<div className="app-header-top-bar">
					<div className="dir-btns">
						<button onClick={onBack} className="go-back-btn">
							<PrevPage />
						</button>
						<button onClick={onForward} className="forward-btn">
							<NextPage />
						</button>
					</div>

<<<<<<< HEAD
					<div className="user-bar">
						{user && (
							<span className="login">
								<Link to={`user/${user._id}`}>
									{user.imgUrl && <img className="user-icon" src={user.imgUrl} />}
									{/* {user.fullname} */}
								</Link>
								<button className="logout-btn" onClick={onLogout}>
									Logout
								</button>
							</span>
						)}
						{!user && (
							<section className="login">
								<LoginSignup onLogin={onLogin} onSignup={onSignup} />
							</section>
						)}
					</div>
				</div>
=======
				{user && (
					<span className="user-info">
						<Link to={`user/${user._id}`}>
							{user.imgUrl && <img src={user.imgUrl} />}
							{user.fullname}
						</Link>
						<button onClick={onLogout}>Logout</button>
					</span>
				)}
				{!user && (
					<section className="user-info">
						<LoginSignup onLogin={onLogin} onSignup={onSignup} />
					</section>
				)}
>>>>>>> refs/remotes/origin/main
			</nav>
		</header>
	)
}

{
	/* {routes.map((route) => (
						<NavLink key={route.path} to={route.path}>
							{route.label}
						</NavLink>
					))} */
}
