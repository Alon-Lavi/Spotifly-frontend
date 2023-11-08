import { useEffect } from 'react'

import { setSearchValue, setSongsToSearch } from '../store/actions/station.actions'

import { utilService } from '../services/util.service'
import { Svg } from './Svg'
import { trackService } from '../services/track.service'

export function Search() {
	useEffect(() => {
		return () => {
			setSongsToSearch(null)
		}
	}, [])

	async function handleChange({ target }) {
		const songs = await trackService.getSongInfo(target.value)
		console.log(songs, 'ssss')
		setSearchValue(target.value)

		setSongsToSearch(songs)
	}

	return (
		<div className="search-bar">
			<form>
				<div className="search-input-container">
					<span className="search-icon"> {Svg.searchIcon}</span>
					<input
						onChange={utilService.debounce(handleChange, 1000)}
						name="txt"
						type="text"
						placeholder="What do you want to listen to?"
						className="input-header"
						autoComplete="off"
					/>
				</div>
			</form>
		</div>
	)
}
