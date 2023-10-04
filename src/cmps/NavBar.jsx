import { NavLink } from "react-router-dom";
import homeIcon from '../assets/img/home.png'



export function NavBar() {
    return (
        <nav className="side-bar">
            <ul className="side-bar-list">
                <div className="header-side-bar">
                <li className="side-bar-item ">
                    <NavLink to="/" className="nav-link hover">
                      {/* <img src={homeIcon} alt="Home Icon" className="nav-icon" /> */}
                         Home 
                    </NavLink>
               </li>

                <li className="side-bar-item">
                    <NavLink to="/search" className="nav-link">
                        Search
                    </NavLink>
                </li>
                </div>
                <div className="main-side-bar">
                <li className="side-bar-item">
                    <NavLink to="/library" className="nav-link">
                        Liberary
                    </NavLink>
                </li>
                <li className="side-bar-item">
                    <NavLink to="/liked" className="nav-link">
                        Liked Songs
                    </NavLink>
                </li>
                <li className="side-bar-item">
                    <NavLink to="/add" className="nav-link">
                        Create PlayList
                    </NavLink>
                </li>
                </div>
            </ul>
        </nav>
    );
}