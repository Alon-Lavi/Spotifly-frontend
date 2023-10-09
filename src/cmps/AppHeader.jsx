import { Search } from '../cmps/Search.jsx'
import { User } from './User'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


export function AppHeader() {
	const location = useLocation();
	const [showSearchInput, setShowSearchInput] = useState(false);


	useEffect(() => {
		if (location.pathname === '/search') {
			setShowSearchInput(true);
		} else {
			setShowSearchInput(false);
		}
	}, [location.pathname]);

	return (
		<section className="app-header">
			<div className='search-header'>
				{showSearchInput ? <Search /> : null}
			</div>
			<User />
		</section>
	);
}
