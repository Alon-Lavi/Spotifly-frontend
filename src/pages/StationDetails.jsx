import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { stationService } from '../services/station.service.local'
import { removeStation, updateStation } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'

export function StationDetails() {
	const [station, setStation] = useState(null)
	const navigate = useNavigate()
	const { stationId } = useParams()

	useEffect(() => {
		loadStations()
	}, [stationId])
	async function onRemoveStation(stationId) {
		try {
			await removeStation(stationId)
			navigate('/station')
			showSuccessMsg('Station removed')
		} catch (err) {
			showErrorMsg('Cannot remove station')
		}
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
	function playSong(song){
		setSongPlaying(song)
		setIsPlaying(true)
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
	if (!station) return <dir>loading...</dir>
	return (
		<section className="station-details">
			<header>
				<img src={station.createdBy.imgUrl} alt="" />
				<p>
					<h1>{station.name}</h1>
					{station.songs.map((song) => (
						<span key={song.artist}>{song.artist} </span>
					))}
				</p>
			</header>
			<div>
				<button onClick={() => onRemoveStation(station._id)}>delete</button>
				<button onClick={() => onUpdateStation(station)}>update</button>
			</div>
			<table>
				<thead>
					<th>#</th> <th>title</th> <th>album</th> <th>time</th>
				</thead>
				<tbody>
					{station.songs.map((song, idx) => (
						<tr onClick={()=>playSong(song)} key={idx}>
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
		</section>
	)
}
