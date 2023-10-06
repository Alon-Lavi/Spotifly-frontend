import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { StationPreview } from "./StationPreview";
import homeIcon from '../assets/img/home.png'
import { SearchPage } from "./SearchPage";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'

export function NavBar() {
    const [searchText, setSearchText] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };


    const stations = useSelector((storeState) => storeState.stationModule.stations.slice(7, 13));


    return (
        <nav className="side-bar">
            <ul className="side-bar-list">
                <div className="header-side-bar">
                    <li className="side-bar-item ">
                        <NavLink to="/station" className="nav-link">
                            <svg
                                role="img"
                                height="21"
                                width="21"
                                class="icon"
                                viewBox="0 0 22 24"
                                data-encore-id="icon"
                                style={{ fill: "#b3b3b3", marginRight: '16px', marginBottom: '-5px' }}
                            >
                                <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
                                </svg>
                            Home
                        </NavLink>
                    </li>
                    <li className="side-bar-item">
                        <NavLink to="/search" className="nav-link">
                            <svg
                                role="img"
                                height="21"
                                width="21"
                                aria-hidden="true"
                                class="icon"
                                viewBox="0 0 22 24"
                                data-encore-id="icon"
                                style={{ fill: "#b3b3b3", marginRight: '16px', marginBottom: '-5px' }}
                            >
                                <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path><path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path></svg>
                            Search
                        </NavLink>
                    </li>
                </div>
                <ul />
                <div className="main-side-bar">
                    <div className="flex">
                        <li className="side-bar-item">
                            <NavLink to="/library" className="nav-link">
                                <span className="library">
                                    <svg
                                        role="img"
                                        height="21"
                                        width="21"
                                        viewBox="0 0 22 24"
                                        data-encore-id="icon"
                                        className="Svg-sc-ytk21e-0 ldgdZj"
                                        style={{ fill: "#b3b3b3", marginRight: '9px', marginBottom: '3px' }}
                                    >
                                        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 2 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                                    </svg>
                                    <span className="library-span">Your Library</span>
                                </span>

                            </NavLink>
                        </li>
                        <li
                            className="add-library">
                            <NavLink to="station/add" className="nav-link">
                                <span className="icon">


                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 16 16"
                                        style={{ marginTop: '18px', marginLeft: '85px' }}
                                    >
                                        <path fill="#b3b3b3" stroke="#a3a3a3" stroke-linecap="round" stroke-linejoin="round" d="M7 .54v13M.5 7h13" /></svg>


                                </span>
                            </NavLink>
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

                        {stations
                            .filter((station) =>
                                station.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((station) => (
                                <li className="station-preview" key={station._id}>
                                    <img src={station.createdBy.imgUrl} alt={station.name} />
                                    <Link to={`station/station/${station._id}`}>
                                        <div className="station-info">
                                            <p className="playlist-name">{station.name}</p>
                                            <p className="song-name">
                                                {station.songs.map((song) => (
                                                    <span key={song.artist}>{song.artist} </span>
                                                ))}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                    </div>

                </div>
            </ul>
        </nav>
    );
} 