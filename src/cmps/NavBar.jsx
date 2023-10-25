import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { StationPreview } from "./StationPreview";
import { SearchPage } from "./SearchPage";
import { stationService } from "../services/station.service.local";

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'
// import { stationService } from "../services/station.service.local";

export function NavBar() {
    const user = useSelector((storeState) => storeState.userModule.user)

    const location = useLocation();
    const isLoginPage = location.pathname === '/loginsignup';

    const [searchText, setSearchText] = useState('');
    const [stations, setStations] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };
    useEffect(() => {
        loadMyStations()
    }, [])

    async function loadMyStations() {
        const MyStations = await stationService.query(user)
        setStations(MyStations)
    }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    async function createStation() {
        const station = await stationService.getEmptyStation(user)
        station.createdBy = {
            _id: user._id,
            imgUrl: user.imgUrl,
            fullname: user.fullname
        }

        const stationSaved = await stationService.save(station)
        navigate(`/station/${stationSaved._id}`)
    }
    if (isLoginPage) return <div></div>


    return (
        <nav className="side-bar">
            <ul className="side-bar-list">
                <div className="header-side-bar">
                    <li className={`side-bar-item-home ${isHovered ? 'hovered' : ''}`}>
                        <NavLink
                            to="/"
                            className="nav-link flex"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <svg
                                role="img"
                                height="23"
                                width="26"
                                className="icon"
                                viewBox="-1 0 25 22"
                                data-encore-id="icon"
                                style={{ fill: isHovered ? 'white' : '#b3b3b3', marginRight: '15px', marginBottom: '-15px' }}
                            >
                                <path d="M 12.5 3.247 a 1 1 0 0 0 -1 0 L 4 7.577 V 20 h 4.5 v -6 a 1 1 0 0 1 1 -1 h 5 a 1 1 0 0 1 1 1 v 6 H 20 V 7.577 l -7.5 -4.33 Z m -2 -1.732 a 3 3 0 0 1 3 0 l 7.5 4.33 a 2 2 0 0 1 1 1.732 V 21 a 1 1 0 0 1 -1 1 h -6.5 a 1 1 0 0 1 -1 -1 v -6 h -3 v 6 a 1 1 0 0 1 -1 1 H 3 a 1 1 0 0 1 -1 -1 V 7.577 a 2 2 0 0 1 1 -1.732 l 7.5 -4.33 Z"></path>
                            </svg>
                            <div className="txt-home">
                                Home
                            </div>


                        </NavLink>
                    </li>
                    <li className={`side-bar-item ${isHovered ? 'hovered' : ''}`}>
                        <NavLink to="/search" className="nav-link flex" >
                            <svg
                                role="img"
                                height="24"
                                width="26"
                                aria-hidden="true"
                                className="icon"
                                viewBox="0 0 23 24"
                                data-encore-id="icon"
                                style={{ fill: "#b3b3b3", marginRight: '15px', marginBottom: '1px' }}
                            >
                                <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path><path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path></svg>
                            <div className="txt-search">

                                Search
                            </div>

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
                                        style={{ fill: "#b3b3b3", marginRight: '9px', marginBottom: '3px' }}
                                    >
                                        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 2 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                                    </svg>
                                    <span className="library-span">Your Library</span>
                                </span>

                            </a>
                        </li>
                        <li
                            className="add-library">
                            <a onClick={createStation} className="nav-link">
                                <span className="icon">


                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="13"
                                        viewBox="0 0 14 14"
                                        style={{ marginTop: '19px', marginLeft: '82px' }}
                                    >
                                        <path fill="#b3b3b3" stroke="#a3a3a3" strokeLinecap="round" strokeLinejoin="round" d="M7 .54v13M.5 7h13" /></svg>


                                </span>
                            </a >
                        </li>
                    </div>
                    <div className="user-station-list ">
                        <div className="side-search-bar">
                            <form>
                                <div className="side-search-input-container">
                                    <span></span>
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
                                    .filter((station) =>
                                        station.name.toLowerCase().includes(searchText.toLowerCase())
                                    )
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
    );
} 