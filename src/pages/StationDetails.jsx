import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { stationService } from '../services/station.service.local'
import { removeStation, updateStation } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'
import { LoaderService } from '../services/loader.service'
import { Search } from '../cmps/Search'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'

export function StationDetails() {
	const [station, setStation] = useState(null)
	const navigate = useNavigate()
	const { stationId } = useParams()
	const songs = useSelector((storeState) => storeState.stationModule.songsToSearch);
	useEffect(() => {
		loadStations()
	}, [station])
	async function onRemoveStation(stationId) {
		try {
			await removeStation(stationId)
			navigate('/station')
			showSuccessMsg('Station removed')
		} catch (err) {
			showErrorMsg('Cannot remove station')
		}
	}
	async function AddToPlaylist(song) {
		const songToSave = {
			id: utilService.makeId(),
			videoId: song.id.videoId,
			title: song.snippet.title,
			imgUrl: song.snippet.thumbnails.high.url
		}
		// setStation(prevStation=>({...prevStation,songs:[ ...prevStation.songs,  songToSave]}))
		const stationToSave = { ...station, songs: [...station.songs, songToSave] }
		// setStation(stationToSave)
		await updateStation(stationToSave)
		console.log(stationToSave);
	}

	async function onUpdateStation(station) {
		const name = prompt('New name?')
		if (name !== null) {
			const stationToSave = { ...station, name }
			try {
				const savedStation = await updateStation(stationToSave)
				showSuccessMsg(`Station updated, new name: ${savedStation.name}`)
			} catch (err) {
				showErrorMsg('Cannot update station')
			}
		}
	}
	function playSong(song) {
		setSongPlaying(song)
	}

	async function loadStations() {
		try {
			const station = await stationService.getById(stationId)
			setStation(station)
		} catch (err) {
			console.log('Had issues in station details', err)
			showErrorMsg('Cannot load station')
			navigate('/station')
		}
	}
	if (!station) return LoaderService.threeDots
	return (
		<section className="station-details">
			<header>
				<img src={station.createdBy.imgUrl} alt="" />
				<div>
					<h1>{station.name}</h1>
					{station.songs.map((song) => (
						<span key={song.artist}>{song.artist} </span>
					))}
				</div>
			</header>
			<div>
				<button onClick={() => onRemoveStation(station._id)}>delete</button>
				<button onClick={() => onUpdateStation(station)}>update</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>title</th>
						<th>album</th>
						<th>time</th>
					</tr>
				</thead>
				<tbody>
					{station.songs && station.songs.map((song, idx) => (
						<tr onClick={() => playSong(song)} key={idx}>
							<td>{idx + 1}</td>
							<td>
								<img src={song.imgUrl} alt="" /> {song.title}{' '}
							</td>
							<td>{song.album}</td>
							<td>{song.addedAt}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='song-search'>
				<Search />
			</div>
			<ul className="song-list">
				{songs && songs.map((song, idx) => (
					<li key={idx}>
						<img src={song.snippet.thumbnails.high.url} alt="" />
						<div className="options">
							<span>{song.snippet.title}</span>
							<button onClick={() => playSong(song)}>Play</button>
							<button onClick={() => AddToPlaylist(song)}> Add to Playlist </button>

							{<svg className='option' fill="#ffffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">#ffffff&lt;#ffffffg#ffffff #ffffffi#ffffffd#ffffff=#ffffff"#ffffffS#ffffffV#ffffffG#ffffffR#ffffffe#ffffffp#ffffffo#ffffff_#ffffffb#ffffffg#ffffffC#ffffffa#ffffffr#ffffffr#ffffffi#ffffffe#ffffffr#ffffff"#ffffff #ffffffs#fffffft#ffffffr#ffffffo#ffffffk#ffffffe#ffffff-#ffffffi#ffffffd#fffffft#ffffffh#ffffff=#ffffff"#ffffff0#ffffff"#ffffff&gt;#ffffff&lt;#ffffff/#ffffffg#ffffff&gt;#ffffff&lt;#ffffffg#ffffff #ffffffi#ffffffd#ffffff=#ffffff"#ffffffS#ffffffV#ffffffG#ffffffR#ffffffe#ffffffp#ffffffo#ffffff_#fffffft#ffffffr#ffffffa#ffffffc#ffffffe#ffffffr#ffffffC#ffffffa#ffffffr#ffffffr#ffffffi#ffffffe#ffffffr#ffffff"#ffffff #ffffffs#fffffft#ffffffr#ffffffo#ffffffk#ffffffe#ffffff-#ffffffl#ffffffi#ffffffn#ffffffe#ffffffc#ffffffa#ffffffp#ffffff=#ffffff"#ffffffr#ffffffo#ffffffu#ffffffn#ffffffd#ffffff"#ffffff #ffffffs#fffffft#ffffffr#ffffffo#ffffffk#ffffffe#ffffff-#ffffffl#ffffffi#ffffffn#ffffffe#ffffffj#ffffffo#ffffffi#ffffffn#ffffff=#ffffff"#ffffffr#ffffffo#ffffffu#ffffffn#ffffffd#ffffff"#ffffff&gt;#ffffff&lt;#ffffff/#ffffffg#ffffff&gt;#ffffff&lt;#ffffffg#ffffff #ffffffi#ffffffd#ffffff=#ffffff"#ffffffS#ffffffV#ffffffG#ffffffR#ffffffe#ffffffp#ffffffo#ffffff_#ffffffi#ffffffc#ffffffo#ffffffn#ffffffC#ffffffa#ffffffr#ffffffr#ffffffi#ffffffe#ffffffr#ffffff"#ffffff&gt;#ffffff&lt;#ffffffp#ffffffa#fffffft#ffffffh#ffffff #ffffffd#ffffff=#ffffff"#ffffffM#ffffff1#ffffff2#ffffff,#ffffff1#ffffff0#ffffffa#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff1#ffffff-#ffffff2#ffffff,#ffffff2#ffffffA#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff1#ffffff2#ffffff,#ffffff1#ffffff0#ffffffZ#ffffffM#ffffff4#ffffff,#ffffff1#ffffff4#ffffffa#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff0#ffffff-#ffffff2#ffffff-#ffffff2#ffffffA#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff4#ffffff,#ffffff1#ffffff4#ffffffZ#ffffffm#ffffff1#ffffff6#ffffff-#ffffff4#ffffffa#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff0#ffffff,#ffffff2#ffffff,#ffffff2#ffffffA#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff2#ffffff0#ffffff,#ffffff1#ffffff0#ffffffZ#ffffff"#ffffff&gt;#ffffff&lt;#ffffff/#ffffffp#ffffffa#fffffft#ffffffh#ffffff&gt;#ffffff&lt;#ffffff/#ffffffg#ffffff&gt;#ffffff</svg>}
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
