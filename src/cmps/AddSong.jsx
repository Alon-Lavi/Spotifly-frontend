import { useEffect, useState } from 'react'
import { trackService } from '../services/track.service'
import { Svg } from '../pages/Svg'

export function AddSong({ station, onAddSong }) {
	const [searchTerm, setSearchTerm] = useState('')
	const [tracks, setTracks] = useState([])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchData()
		}, 500)
		return () => {
			clearTimeout(delayDebounceFn)
		}
	}, [searchTerm])

	async function fetchData() {
		if (!searchTerm) return
		try {
			console.log('searchTerm:', searchTerm)
			const response = await trackService.getVideos(searchTerm, 10)
			setTracks(response)
		} catch (err) {
			console.error('Error fetching tracks:', err)
		}
	}

	function addToStation() {
		onAddSong()
	}

	function handleInputChange(ev) {
		const newSearchTerm = ev.target.value
		setSearchTerm(newSearchTerm)
	}

	return (
		<React.Fragment>
			<section className={`station-song-search flex ${station.songs?.length === 0 ? 'no-border' : ''}`}>
				<div className="search-input">
					<h1>Let's find something for your playlist</h1>
					<div className="search-container">
						<input
							className="add-song-input"
							type="search"
							id="songName"
							placeholder="Search for songs"
							onChange={handleInputChange}
							value={searchTerm}
						/>
						{svgService.searchHomePageIcon}
					</div>
				</div>
				<div className="flex align-center">
					<button className="close-songs-list"></button>
				</div>
			</section>
			<div className="station-search-list">
				<ul className="clean-list">
					{tracks.map((track, index) => (
						<li key={track._id} className="station-search-preview">
							<div className="song-img-container">
								<div className="song-img">
									<img src={track.imgUrl} alt={track.title} />
								</div>
								<div className="btn-play-pause"></div>
							</div>
							<div className="song-title">{trackService.getCleanTitle(track.title)}</div>
							<button className="btn-add-song" onClick={() => addToStation(track)}>
								<span>Add</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</React.Fragment>
	)
}
