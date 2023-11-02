import { useState } from 'react'
import { useNavigate } from 'react-router'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'

function getEmptyCredentials() {
	return {
		fullname: '',
		username: '',
		password: '',
	}
}

export function LoginSignup() {
	const navigate = useNavigate()
	const [credentials, setCredentials] = useState(getEmptyCredentials())
	const [isSignupState, setIsSignupState] = useState(false)

	function handleCredentialsChange(ev) {
		const field = ev.target.name
		const value = ev.target.value
		setCredentials((credentials) => ({ ...credentials, [field]: value }))
	}

	function onSubmit(ev) {
		ev.preventDefault()

		if (isSignupState) {
			signup(credentials)
				.then((user) => {
					showSuccessMsg(`Welcome ${user.fullname}`)
					navigate('/')
				})
				.catch((err) => {
					showErrorMsg('Cannot signup')
				})
		} else {
			login(credentials)
				.then((user) => {
					showSuccessMsg(`Hi again ${user.fullname}`)
					navigate('/')
				})
				.catch((err) => {
					showErrorMsg('Cannot login')
				})
		}
	}

	function onToggleSignupState() {
		setIsSignupState((isSignupState) => !isSignupState)
	}

	const { username, password, fullname } = credentials
	return (
		<div className="login-page">
			<h2 className='title'>Log in to Spotifly</h2>
		
			<form className="login-form" onSubmit={onSubmit}>
				<label>
					Email or username
				<input
					type="text"
					name="username"
					value={username}
					placeholder="Email or username"
					onChange={handleCredentialsChange}
					required
					autoFocus
					/>
					</label>
				<label>
					Password
				<input type="password" name="password" value={password} placeholder="Password" onChange={handleCredentialsChange} required />
				</label>

				{isSignupState && (
					<label> Fullname

					<input type="text" name="fullname" value={fullname} placeholder="Full name" onChange={handleCredentialsChange} required />
					</label>
				)}

				<button>{isSignupState ? 'Sign up' : 'Log in'}</button>
			</form>

			<div className="btns">
				<span onClick={onToggleSignupState}>{isSignupState ? 'Already a member? Login' : 'New user? Signup here'}</span>
			</div>
		</div>
	)
}
