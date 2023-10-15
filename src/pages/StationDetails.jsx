import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { stationService } from '../services/station.service.local'
import { addSongToStation, removeStation, setCurrStation, updateStation } from '../store/actions/station.actions'
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
		setCurrStation(station)
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
	async function AddToPlaylist(song, ev) {
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
		if (song.kind) {
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
			title: song.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, ''),
			imgUrl: song.snippet.thumbnails.high.url
		}
		// setStation(prevStation=>({...prevStation,songs:[ ...prevStation.songs,  songToSave]}))
		const stationToSave = { ...station, songs: [...station.songs, songToSave] }
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
	async function addToLikedSongs(ev, song) {
		ev.stopPropagation()

		const likedStation = await stationService.getLikedSongs()
		console.log(likedStation);
		addSongToStation(song, likedStation._id)
	}

	// function changePhoto(){
	// 	<ImgUploader/>
	// }

	if (!station) return LoaderService.threeDots
	return (
		<section className="station-details">
			<header>
				<img src={station.createdBy.imgUrl} alt="" />
				<div>
					<h1 onClick={openModal}>{station.name}</h1>
					{station.songs.map((song, idx) => (
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
							<td>
								<svg onClick={(event) => addToLikedSongs(event, song)} xmlns="http://www.w3.org/2000/svg"
									width="23"
									height="23"
									fill="currentColor"
									class="bi bi-heart"
									viewBox="0 0 23 19"
									id="IconChangeColor"
								>
									<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
										id="mainIconPathAttribute"
										fill="#ffffff">
									</path> </svg>
								{song.addedAt}</td>
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

							<button onClick={(event) => AddToPlaylist(song, event)}> Add  </button>
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
								<input className='image' type="image" src={station.createdBy.imgUrl} alt="" />
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
