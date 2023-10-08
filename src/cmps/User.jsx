import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

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

	function onOpenModal() {
		setIsOpen(true)
	}

	function closeModal() {
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
		<section className="user-profile">
			<div onClick={onToggleModal} className="user flex">
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
					<LoginSignup onLogin={onLogin} onSignup={signup} />
				</ul>
			)}
		</section>
	)
}
