import axios from 'axios'
import { useEffect } from 'react'

import { utilService } from '../services/util.service'
import { setSearchValue, setSongsToSearch } from '../store/actions/station.actions'
import { Svg } from './Svg'
import { stationService } from '../services/station.service.local'

export function Search() {
	const API_KEY = 'AIzaSyCIHRUBlXc7OJQY31NlL6jlfigPqh9_PHE'

	useEffect(() => {
		return () => {
			setSongsToSearch(null)
		}
	}, [])

	async function handleChange({ target }) {
		const res = await axios.get(
			`https://www.googleapis.com/youtube/v3/search?part=snippet%20&videoEmbeddable=true&type=video&key=${API_KEY}&q=${target.value}`
		)
		setSearchValue(target.value)
		const songs = res.data.items
		songs.forEach((song) => {
			song.duration = stationService.getSongDurations(song)
		})
		console.log(songs)
		setSongsToSearch(songs)
	}

	return (
		<div className="search-bar">
			<form>
				<div className="search-input-container">
					<span className="search-icon"> {Svg.searchIcon}</span>
					<input
						onChange={utilService.debounce(handleChange, 3000)}
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
