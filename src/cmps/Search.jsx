import axios from 'axios'
import { useEffect } from 'react'

import { utilService } from '../services/util.service'
import { setSearchValue, setSongsToSearch } from '../store/actions/station.actions'
import { Svg } from './Svg'
import { stationService } from '../services/station.service.local'

export function Search() {

	useEffect(() => {
		return () => {
			setSongsToSearch(null)
		}
	}, [])

	async function handleChange({ target }) {

		const songs = await stationService.getSongInfo(target.value)
		console.log(songs,'ssss');
		setSearchValue(target.value)

		setSongsToSearch(songs)
	}

	return (
		<div className="search-bar">
			<form>
				<div className="search-input-container">
					<span className='search-icon'> {Svg.searchIcon}</span>
					<input
						onChange={utilService.debounce(handleChange, 3000)}
						name="txt"
						type="text"
						placeholder="What do you want to listen to?"
						className='input-header'
					/>
				</div>
			</form>
		</div>
	)
}
