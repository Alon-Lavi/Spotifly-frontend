import axios from 'axios'
import { useEffect } from 'react'

import { utilService } from '../services/util.service'
import { setSongsToSearch } from '../store/actions/station.actions'
import { Svg } from './Svg'

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
		console.log(res.data.items)
		setSongsToSearch(res.data.items)
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
					/>
				</div>
			</form>
		</div>
	)
}
