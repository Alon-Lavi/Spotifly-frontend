import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from './ToolTip'

import { stationService } from '../services/station.service'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { Svg } from './Svg'
import { trackService } from '../services/track.service'

export function NavBar() {
	const [searchInputVisible, setSearchInputVisible] = useState(false)
	const user = useSelector((storeState) => storeState.userModule.user)
	const location = useLocation()
	const isLoginPage = location.pathname === '/loginsignup'
	const [isHomeActive, setIsHomeActive] = useState(true)
	const [isSearchActive, setIsSearchActive] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [stations, setStations] = useState()
	const navigate = useNavigate()
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const [isTooltipVisible, setIsTooltipVisible] = useState(false)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)

	const toggleSearchInput = () => {
		console.log('Work')
		setSearchInputVisible(!searchInputVisible)
	}

	const handleSearchInputChange = (ev) => {
		setSearchText(ev.target.value)
	}

	useEffect(() => {
		loadMyStations()
	}, [currStation])

	async function loadMyStations() {
		const MyStations = await stationService.query({ user, liked: true })
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

	const handleFilterClick = () => {
		setIsFilterModalOpen(true)
	}

	const handleCloseFilterModal = () => {
		setIsFilterModalOpen(false)
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
			<ul className="mobail-side-bar">
				<div className="main-mobile-side-bar">
					<li className={`side-bar-item-home-mobile ${isHomeActive ? 'active' : ''}`}>
						<NavLink to="/" className="nav-link " onClick={handleHomeClick}>
							{isHomeActive ? Svg.activeHomeMobile : Svg.homeIconMobile}
							<div className={`txt-home-mobile`}>Home</div>
						</NavLink>
					</li>
					<li className={`side-bar-item-search-mobile ${isSearchActive ? 'active' : ''}`}>
						<NavLink to="/search" className="nav-link " onClick={handleSearchClick}>
							{isSearchActive ? Svg.activeSearchMobile : Svg.searchHomePageIconMobile}
							<div className={`txt-search-mobile${isSearchActive ? '-active' : ''}`}>Search</div>
						</NavLink>
					</li>

					<li className="side-bar-item-library">
						<NavLink
							to="/library"
							className="nav-link"
						// onMouseEnter={() => setIsTooltipVisible(true)}
						// onMouseLeave={() => setIsTooltipVisible(false)}
						>
							{Svg.LibraryMobile}

							<div className="library-span">Your Library</div>
						</NavLink>
					</li>
				</div>
			</ul>

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
											<svg
												role="img"
												height="24"
												width="26"
												viewBox="0 0 22 24"
												data-encore-id="icon"
												className="Svg-sc-ytk21e-0 ldgdZj"
												style={{ marginRight: '9px', marginBottom: '3px' }}
											>
												<path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 2 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
											</svg>

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
									{/* <Tooltip text={'Search in Your library'}>

                                    </Tooltip> */}

									<span className="search-icon-navbar" onClick={toggleSearchInput}>
										{Svg.searchIcon}
									</span>
									<input
										id="search-navbar"
										name="txt"
										type="text"
										placeholder="Search in your library..."
										value={searchText}
										onChange={handleSearchInputChange}
										className={searchInputVisible ? 'visible' : ''}
										autoComplete="off"
									/>
								</div>
							</form>
							<div className="filter-navBar" onClick={handleFilterClick}>
								Recents
								{Svg.filterBy}
							</div>
							{isFilterModalOpen && (
								<div className="filter-modal">
									<ul className="filter-options">
										<h4>Sort by</h4>
										<li>Recents</li>
										<li>Recently Added</li>
										<li>Alphabetical</li>
										<li>Creator</li>
									</ul>
									<button onClick={handleCloseFilterModal}>Close</button>
								</div>
							)}
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
												<span>	{trackService.getArtists(station)}</span>	
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
