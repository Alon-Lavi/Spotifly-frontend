import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { stationService } from '../services/station.service.local'
import { removeStation, updateStation } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'
import { LoaderService } from '../cmps/Loader'
import { Search } from '../cmps/Search'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { ImgUploader } from '../cmps/ImgUploader'
import { trackService } from '../services/track.service'

export function StationDetails() {
	const [station, setStation] = useState(null)
	const navigate = useNavigate()
	const { stationId } = useParams()
	const songs = useSelector((storeState) => storeState.stationModule.songsToSearch);
	const [isOpen, setIsOpen] = useState(false);
	const [textareaValue, setTextareaValue] = useState('');
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

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	// Event handler to update the textarea value
	const handleTextareaChange = (event) => {
		setTextareaValue(event.target.value);
	};
	async function AddToPlaylist(song,ev) {
		ev.stopPropagation()
		const songToSave = {
			id: utilService.makeId(),
			videoId: song.id.videoId,
			title: song.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, ''),
			imgUrl: song.snippet.thumbnails.high.url
		}

		// setStation(prevStation=>({...prevStation,songs:[ ...prevStation.songs,  songToSave]}))
		const stationToSave = { ...station, songs: [...station.songs, songToSave] }
		// setStation(stationToSave)
		await updateStation(stationToSave)
		console.log(stationToSave);
	}


	function playSong(song) {
		console.log(song);
		if(song.kind){
			const songToPlay = {	
				videoId: song.id.videoId,
				title: song.snippet.title,
				imgUrl: song.snippet.thumbnails.high.url
			}
			setSongPlaying(songToPlay)
		}
	else setSongPlaying(song)
	}


	async function AddToPlaylist(song) {
		const songToSave = {
			id: utilService.makeId(),
			videoId: song.id.videoId,
			title: song.snippet.title,
			imgUrl: song.snippet.thumbnails.high.url
		}
		// setStation(prevStation=>({...prevStation,songs:[ ...prevStation.songs,  songToSave]}))
		const  stationToSave = { ...station, songs:[ ...station.songs,  songToSave] }
		// setStation(stationToSave)
		await updateStation(stationToSave)
		console.log(stationToSave);
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

	async function saveChanges(ev) {
		ev.preventDefault()
		const desc = (ev.target[1].value);
		const name = (ev.target[0].value)
		const stationToSave = { ...station, name, desc }
		try {
			const savedStation = await updateStation(stationToSave)
			showSuccessMsg(`Station updated, new name: ${savedStation.name}`)
		} catch (err) {
			showErrorMsg('Cannot update station')
		}
		finally {
			closeModal()
		}
	}

	function changePhoto(){
		<ImgUploader/>
	}

	if (!station) return LoaderService.threeDots
	return (
		<section className="station-details">
			<header>
				<img src={station.createdBy.imgUrl} alt="" />
				<div>
					<h1 onClick={openModal}>{station.name}</h1>
					{station.songs.map((song,idx) => (
						<span key={idx}>{song.artist} </span>
					))}
				</div>
			</header>
			<div>
				<button onClick={() => onRemoveStation(station._id)}>delete</button>
				
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
			<div>Let's find something for your playlist</div>
			<div className='song-search'>
				<Search />
			</div>
			<ul className="song-list">
				{songs && songs.map((song, idx) => (
					<li onClick={() => playSong(song)} key={idx}>
						<img src={song.snippet.thumbnails.high.url} alt="" />
						<div className="options">
							<span>{song.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, '')}</span>
							<button onClick={(event) => AddToPlaylist(song,event)}> Add  </button>
							{/* Ваши три точки и модальное окно */}
						</div>
					</li>
				))}
			</ul>

			<div>
				{isOpen && (
					<div className="modal-overlay">
						<div className="modal">
							<div>
								<h2>Edit details</h2>
								<span className="close" onClick={closeModal}>&times;</span>
							</div>

							{/* <img src={station.createdBy.imgUrl} alt="" /> */}
							<form id='myForm' onSubmit={saveChanges}>
								<input  className='image' type="image" src={station.createdBy.imgUrl} alt="" />
								<input className='title' defaultValue={station.name} type="text" />
								<textarea
									value={textareaValue}          // Bind the value to the state variable
									onChange={handleTextareaChange} // Handle changes to the textarea
									rows={5}                       // Number of visible rows
									cols={40}
									placeholder='Add an optional description'                    // Number of visible columns
								></textarea>
								<button type='submit' form="myForm">save</button>
							</form>
								<p>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>

						</div>
					</div>
				)}
			</div>

		</section>
	)
}
