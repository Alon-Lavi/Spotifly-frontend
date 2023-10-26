import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { stationService } from '../services/station.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { Svg } from './Svg'

export function NavBar() {
	const user = useSelector((storeState) => storeState.userModule.user)
	const location = useLocation()
	const isLoginPage = location.pathname === '/loginsignup'
	const [isHomeActive, setIsHomeActive] = useState(true)
	const [isSearchActive, setIsSearchActive] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [stations, setStations] = useState()
	const navigate = useNavigate()

	const handleSearchInputChange = (ev) => {
		setSearchText(ev.target.value)
	}

	useEffect(() => {
		loadMyStations()
	}, [])

	async function loadMyStations() {
		const MyStations = await stationService.query(user)
		setStations(MyStations)
	}

	const handleHomeClick = () => {
		setIsHomeActive(true)
		setIsSearchActive(false)
	}

	const handleSearchClick = () => {
		setIsHomeActive(false)
		setIsSearchActive(true)
	}

	async function createStation() {
		const station = await stationService.getEmptyStation(user)
		station.createdBy = {
			_id: user._id,
			imgUrl: user.imgUrl,
			fullname: user.fullname,
		}

		try {
			const stationSaved = await stationService.save(station)
			showSuccessMsg(`Added to Your Library.`)
			navigate(`/station/${stationSaved._id}`)
		} catch (err) {
			showErrorMsg(`Couldn't add station`)
		}
	}

	if (isLoginPage) return <div></div>
	return (
		<nav className="side-bar">
			<ul className="side-bar-list">
				<div className="header-side-bar">
					<li className={`side-bar-item-home ${isHomeActive ? 'active' : ''}`}>
						<NavLink to="/" className="nav-link flex" onClick={handleHomeClick}>
							{isHomeActive ? Svg.activeHome : Svg.homeIcon}
							<div className={`txt-home${isHomeActive ? '-active' : ''}`}>Home</div>
						</NavLink>
					</li>

					<li className={`side-bar-item-search ${isSearchActive ? 'active' : ''}`}>
						<NavLink to="/search" className="nav-link flex" onClick={handleSearchClick}>
							{isSearchActive ? Svg.activeSearch : Svg.searchHomePageIcon}
							<div className={`txt-search${isSearchActive ? '-active' : ''}`}>Search</div>
						</NavLink>
					</li>
				</div>
				<ul />

				<div className="main-side-bar">
					<div className="flex">
						<li className="side-bar-item">
							<a className="nav-link">
								<span className="library">
									<svg
										role="img"
										height="24"
										width="26"
										viewBox="0 0 22 24"
										data-encore-id="icon"
										className="Svg-sc-ytk21e-0 ldgdZj"
										style={{ fill: '#b3b3b3', marginRight: '9px', marginBottom: '3px' }}
									>
										<path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 2 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
									</svg>

									<span className="library-span">Your Library</span>
								</span>
							</a>
						</li>

						<li className="add-library">
							<a onClick={createStation} className="nav-link">
								<span className="icon">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="13"
										height="13"
										viewBox="0 0 14 14"
										style={{ marginTop: '19px', marginLeft: '82px' }}
									>
										<path fill="#b3b3b3" stroke="#a3a3a3" strokeLinecap="round" strokeLinejoin="round" d="M7 .54v13M.5 7h13" />
									</svg>
								</span>
							</a>
						</li>
					</div>

					<div className="user-station-list ">
						<div className="side-search-bar">
							<form>
								<div className="side-search-input-container">
									<input
										name="txt"
										type="text"
										placeholder="     Search in your library..."
										value={searchText}
										onChange={handleSearchInputChange}
									/>
								</div>
							</form>
						</div>

						<div className="stations-container">
							{stations &&
								stations
									.filter((station) => station.name.toLowerCase().includes(searchText.toLowerCase()))
									.map((station, idx) => (
										<li className="station-preview" key={idx}>
											<img src={station.imgUrl} alt={station.name} />
											<Link to={`/station/${station._id}`}>
												<div className="station-info">
													<p className="playlist-name">{station.name}</p>
													<p className="song-name">
														{station.songs.map((song, idx) => (
															<span key={idx * 2}>{song.artist} </span>
														))}
													</p>
												</div>
											</Link>
										</li>
									))}
						</div>
					</div>
				</div>
			</ul>
		</nav>
	)
}
