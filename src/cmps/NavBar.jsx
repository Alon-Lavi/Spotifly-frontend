import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from './ToolTip'

import { stationService } from '../services/station.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { Svg } from './Svg'

export function NavBar() {
	const [isSvgActive, setIsSvgActive] = useState(false)
	const user = useSelector((storeState) => storeState.userModule.user)
	const location = useLocation()
	const isLoginPage = location.pathname === '/loginsignup'
	const [isHomeActive, setIsHomeActive] = useState(true)
	const [isSearchActive, setIsSearchActive] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [stations, setStations] = useState()
	const navigate = useNavigate()
	const [isTooltipVisible, setIsTooltipVisible] = useState(false)

	const handleSearchInputChange = (ev) => {
		setSearchText(ev.target.value)
	}

	useEffect(() => {
		loadMyStations()
	}, [stations])

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
							<NavLink to="/library">
								<Tooltip text="Liked playlist">
									<a
										className="nav-link"
										onMouseEnter={() => setIsTooltipVisible(true)}
										onMouseLeave={() => setIsTooltipVisible(false)}
									>
										<span className="library">
											{Svg.library}
											<span className="library-span">Your Library</span>
										</span>
									</a>
								</Tooltip>
							</NavLink>
						</li>

						<li className="add-library">
							<Tooltip text="Create playlist">
								<a
									onClick={createStation}
									onMouseEnter={() => setIsTooltipVisible(true)}
									onMouseLeave={() => setIsTooltipVisible(false)}
									className="nav-link"
								>
									<span className="icon">{Svg.addStation}</span>
								</a>
							</Tooltip>

							{isTooltipVisible && <div className="tooltip">Create Library</div>}
						</li>
					</div>

					<div className="user-station-list ">
						<div className="side-search-bar">
							<form>
								<div className="side-search-input-container">
									<input
										id="search-navbar"
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
