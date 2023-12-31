import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Search } from '../cmps/Search.jsx'
import { UserMsg } from './UserMsg.jsx'
import { logout } from '../store/actions/user.actions.js'
import { Svg } from './Svg.jsx'
import { Tooltip } from './ToolTip.jsx'

export function AppHeader() {
	const location = useLocation()
	const [showSearchInput, setShowSearchInput] = useState(false)
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const user = useSelector((storeState) => storeState.userModule.user)
	const bgc = useSelector((storeState) => storeState.stationModule.bgc)

	const navigate = useNavigate()

	const isLoginPage = location.pathname === '/loginsignup'

	useEffect(() => {
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

	function toggleModal() {
		setModalIsOpen(!modalIsOpen)
	}

	if (isLoginPage) return <div></div>
	return (
		<>
			<section style={{ backgroundColor: bgc }} className="app-header">
				<span className="prev-next-btns flex">
					<Tooltip text={'Go back'}>
						<button onClick={goToPreviousPage} className="btn-go-back">
							{Svg.btnGoBackHeader}
						</button>
					</Tooltip>

					<button onClick={goToNextPage} className="btn-go-next">
						{Svg.btnGoNextHeader}
					</button>

					{showSearchInput ? <Search /> : null}
				</span>

				<div className="login-logout">
					{!user && (
						<Link className="login-header" to={'/loginsignup'}>
							<button className="button-login">Log in</button>
						</Link>
					)}

					{user && (
						<span className="logout-header" onClick={toggleModal}>
							<img id="logout" src={user.imgUrl} alt="" aria-label="logout" />
							<div className="menu" style={{ display: modalIsOpen ? 'block' : 'none' }}>
								<div className="context-menu">
									<div className="user-widget-menu">
										<ul className="ul-menu">
											<li className>
												<button className="logout-btn" onClick={logout}>
													logout
												</button>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</span>
					)}
				</div>
			</section>
			<UserMsg />
		</>
	)
}
