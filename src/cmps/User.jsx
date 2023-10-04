import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

import PrevPage from './svg/PrevPage'
import NextPage from './svg/NextPage'

export function User() {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const user = useSelector((storeState) => storeState.userModule.user)

	function onBack() {
		navigate(-1)
	}

	const onForward = () => {
		navigate(+1)
	}
	function onToggleModal() {
		setIsOpen(!isOpen)
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
		<section className="user-profile" onClick={onToggleModal}>
			<div className="user flex">
				<div className="svg-down-container">
					{isOpen ? (
						<svg role="img" height="16" width="16" className="Svg-sc-1bi12j5-0 hDgDGI eAXFT6yvz37fvS1lmt6k" viewBox="0 0 16 16">
							<path d="M13 10L8 4.206 3 10z"></path>
						</svg>
					) : (
						<svg //arrow down
							role="img"
							height="16"
							width="16"
							className="svg-down"
							viewBox="0 0 16 16"
						>
							<path d="M3 6l5 5.794L13 6z"></path>
						</svg>
					)}
				</div>
			</div>
			{isOpen && (
				<ul className="user-options-container">
					<LoginSignup onLogin={login} onSignup={signup} />
				</ul>
			)}
			{/* <div className="dir-btns">
				<button onClick={onBack} className="go-back-btn">
					<PrevPage />
				</button>
				<button onClick={onForward} className="forward-btn">
					<NextPage />
				</button>
			</div> */}
		</section>
	)
}

// 	return (
// 		<header className="app-header" style={{ backgroundColor: `rgb(40,40,40,${scrollTop / 100})` }}>
// 			<nav>
// 				<div className="app-header-top-bar">

// 					<div className="user-bar">
// 						{user && (
// 							<span className="login">
// 								<Link to={`user/${user._id}`}>
// 									{user.imgUrl && <img className="user-icon" src={user.imgUrl} />}
// 									{/* {user.fullname} */}
// 								</Link>
// 								<button className="logout-btn" onClick={onLogout}>
// 									Logout
// 								</button>
// 							</span>
// 						)}
// 						{!user && (
// 							<section className="login">
// 								<LoginSignup onLogin={onLogin} onSignup={onSignup} />
// 							</section>
// 						)}
// 					</div>
// 				</div>
// 			</nav>
// 		</header>
// 	)
// }

// import routes from '../routes'
// import { useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../store/actions/user.actions.js'
// import { LoginSignup } from './LoginSignup.jsx'

// export function AppHeader({ scrollTop }) {
// 	const dispatch = useDispatch()
// 	const user = useSelector((storeState) => storeState.userModule.user)
