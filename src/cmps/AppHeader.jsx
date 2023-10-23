import { Search } from '../cmps/Search.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { UserMsg } from './UserMsg.jsx'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions.js'
import { Svg } from './Svg.jsx'

export function AppHeader() {
	const location = useLocation()
	const [showSearchInput, setShowSearchInput] = useState(false)
	const user = useSelector((storeState) => storeState.userModule.user)
	const navigate = useNavigate()

	const isLoginPage = location.pathname === '/loginsignup'

	useEffect(() => {
		console.log(user)
		if (location.pathname === '/search') {
			setShowSearchInput(true)
		} else {
			setShowSearchInput(false)
		}
	}, [location.pathname])

	function goToPreviousPage() {
		navigate(-1)
	}

	function goToNextPage() {
		navigate(1)
	}

	if (isLoginPage) return <div></div>
	return (
		<>
			<section className="app-header">
				<span className="prev-next-btns flex">
					<button onClick={goToPreviousPage} className="btn-go-back">
						{Svg.btnGoBackHeader}
					</button>

					<button onClick={goToNextPage} className="btn-go-next">
						{Svg.btnGoNextHeader}
					</button>

					{showSearchInput ? <Search /> : null}
				</span>
				{/* <div className="search-header">{showSearchInput ? <Search /> : null}</div> */}

				{/* <User /> */}
				<div className="login-logout">
					{!user && (
						<Link className="login-header" to={'/loginsignup'}>
							Log-in
						</Link>
					)}

					{user && (
						<span className="logout-header">
							<img id="logout" onClick={logout} src={user.imgUrl} alt="" aria-label="logout" />
							{/* <span className="user-name flex">{user.fullname}</span> */}
						</span>
					)}
				</div>

				<UserMsg />
			</section>
		</>
	)
}
