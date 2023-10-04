import { NavLink } from "react-router-dom";
import homeIcon from '../assets/img/home.png'
import { SearchPage } from "./SearchPage";

export function NavBar() {
    return (
        <nav className="side-bar">
            <ul className="side-bar-list">
                <div className="header-side-bar">
                <li className="side-bar-item ">
                    <NavLink to="/station" className="nav-link">
                      {/* <img src={homeIcon} alt="Home Icon" className="nav-icon" /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.4em" viewBox="2 -3 35 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 12l2-2m0 0l7-7l7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"></path></svg>
                    
                      Home
                    </NavLink>
               </li>

                <li className="side-bar-item">
                    <NavLink to="/search" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.4em" viewBox="2 -3 35 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
                        Search
                    </NavLink>
                </li>
                </div>
                <div className="main-side-bar">
                <li className="side-bar-item">
                    <NavLink to="/library" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.4em" viewBox="2 -3 35 24"><path fill="#ffffff" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path></svg>
                        Library
                    </NavLink>
                </li>
                <li className="side-bar-item">
                    <NavLink to="/liked" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.4em" viewBox="1 6 75 24"><mask id="ipSLike0"><path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"></path></mask><path fill="#ffffff" d="M0 0h48v48H0z" mask="url(#ipSLike0)"></path></svg>
                        Liked Songs
                    </NavLink>
                </li>
                <li className="side-bar-item">
                    <NavLink to="/add" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.4em" viewBox="1 6 75 24"><mask id="ipSAdd0"><g fill="none" strokeLinejoin="round" strokeWidth="4"><rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3"></rect><path stroke="#000" strokeLinecap="round" d="M24 16v16m-8-8h16"></path></g></mask><path fill="#ffffff" d="M0 0h48v48H0z" mask="url(#ipSAdd0)"></path></svg>
                        Create PlayList
                    </NavLink>
                </li>
                </div>
            </ul>
        </nav>
    );
}