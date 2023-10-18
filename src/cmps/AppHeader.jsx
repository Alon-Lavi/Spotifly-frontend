import { Search } from '../cmps/Search.jsx'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserMsg } from './UserMsg.jsx';
import { useSelector } from 'react-redux';
import { logout } from '../store/actions/user.actions.js';


export function AppHeader() {
	const location = useLocation();
	const [showSearchInput, setShowSearchInput] = useState(false);
	const user =useSelector((storeState) => storeState.userModule.user)


	useEffect(() => {
		console.log(user);
		if (location.pathname === '/search') {
			setShowSearchInput(true);
		} else {
			setShowSearchInput(false);
		}
	}, [location.pathname]);

	return (
		<>
		<section className="app-header">
			<div className='search-header'>
				{showSearchInput ? <Search /> : null}
			</div>
			{/* <User /> */}
			{!user&&<Link className='login-header' to={'/loginsignup'}>Log In</Link>}
			{user&& 	<>
			<span className='logout-header' onClick={logout}> Logout</span>
			<img src={user.imgUrl} alt="" />
			</>}
		
		<UserMsg/>
		</section>
		</>
	);
}
