import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { stationService } from '../services/station.service.local'
import { addSongToStation, removeStation, setCurrStation, updateStation } from '../store/actions/station.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'
import { LoaderService } from '../cmps/Loader'
import { Search } from '../cmps/Search'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
import { updateUser } from '../store/actions/user.actions'

export function StationDetails() {
	const location = useLocation();
	const isLikedPage = location.pathname === '/likedsongs';

	const [station, setStation] = useState(null)
	const [isLiked, setIsLiked] = useState(false)
	const [likedSongs, setLikedSongs] = useState({});
	const [isOpen, setIsOpen] = useState(false);
	const [textareaValue, setTextareaValue] = useState('');
	const { stationId } = useParams()
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const user = useSelector((storeState) => storeState.userModule.user);
	const songs = useSelector((storeState) => storeState.stationModule.songsToSearch);
	const navigate = useNavigate()



	useEffect(() => {
		loadStations()

	}, [stationId, isLikedPage])

	async function onRemoveStation(stationId) {
		try {
			await removeStation(stationId)
			navigate('/')
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


	async function AddToPlaylist(song, ev) {
		ev.stopPropagation()
		const songToSave = {
			id: utilService.makeId(),
			videoId: song.id.videoId,
			title: song.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, ''),
			imgUrl: song.snippet.thumbnails.high.url,
			addedAt: Date.now(),
			likedBy: []
		}
		// setStation(prevStation=>({...prevStation,songs:[ ...prevStation.songs,  songToSave]}))
		const stationToSave = { ...station, songs: [...station.songs, songToSave] }
		// setStation(stationToSave)
		setStation(stationToSave)
		await updateStation(stationToSave)
		console.log(stationToSave);
	}


	async function onDeleteSong(ev, songId) {
		ev.stopPropagation()
		const idx = station.songs.findIndex((song) => song.id === songId)
		console.log(idx);
		station.songs.splice(idx, 1)
		await updateStation(station)
	}

	async function loadStations() {
		try {
			if (isLikedPage) {
				setStation(user.likedSongs)
				setCurrStation(station)

			}
			else {

				const station = await stationService.getById(stationId)
				setStation(station)
				setCurrStation(station)

			}
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
	function checkLikedSongs(ev, newSong) {
		ev.stopPropagation()
		console.log(newSong);
		const idx = user.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === newSong.videoId)

		console.log(idx);
		if (idx === -1) addToLikedSongs(newSong)
		else removeFromLikedSongs(newSong)

	}

	async function addToLikedSongs(newSong) {


		console.log(newSong);
		newSong.likedBy.push({ _id: user._id, fullname: user.fullname })

		const updatedUser = await userService.addSong(user._id, newSong)
		updateUser(updatedUser)
		console.log(user, 'like');
		const updatedSongs = station.songs.map(song => song.videoId === newSong.videoId ? newSong : song)
		const stationToSave = { ...station, songs: updatedSongs }
		setStation(stationToSave)
		setCurrStation(stationToSave)
	}

	async function removeFromLikedSongs(newSong) {
		const idx = newSong.likedBy.findIndex((likedUser) => likedUser._id === user._id)

		newSong.likedBy.splice(idx, 1)
		const updatedUser = await userService.removeSong(user._id, newSong.videoId)
		updateUser(updatedUser)

		console.log(user, 'like');
		const updatedSongs = station.songs.map(song => song.videoId === newSong.videoId ? newSong : song)
		const stationToSave = { ...station, songs: updatedSongs }
		setStation(stationToSave)
		setCurrStation(stationToSave)

		console.log(station);


	}
	function checkIfLiked(song) {

		const idx = user.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === song.videoId)
		if (idx === -1) return false

		return true
	}

	// function changePhoto(){
	// 	<ImgUploader/>
	// }

	if (!station) return LoaderService.threeDots
	return (
		<section className="station-details">
			<header>
				<img src={station.imgUrl} alt="" />
				<div>
					<h1 onClick={openModal}>{station.name}</h1>

					{/* <span>{station.createdBy.fullname} {station.songs.length}  songs</span> */}

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

						<th>  </th>
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

							<td>
								<svg
									onClick={(event) => {
										checkLikedSongs(event, song)

									}}
									xmlns="http://www.w3.org/2000/svg"
									fill={checkIfLiked(song) ? '' : 'white'}
									height="17"
									width="17"
									aria-hidden="true"
									data-encore-id="icon"
									className={`liked-song-icon ? 'liked' : ''}`}
									viewBox="0 0 16 16">

									<path
										fill={checkIfLiked(song) ? '#1ed760' : 'none'}
										d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z">
									</path>
									<path
										fill={checkIfLiked(song) ? '#1ed760' : 'white'}
										d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
									</path>


								</svg></td>
							<td>
								<button onClick={(event) => onDeleteSong(event, song.id)}>X</button>
							</td>
							<td>{utilService.getDate(song.addedAt)}</td>
						</tr>
					))}
				</tbody>
			</table>
			{!isLikedPage && <div>Let's find something for your playlist</div>}
			{!isLikedPage && <div className='song-search'>
				<Search />
			</div>}
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
								<input className='image' type="image" src={station.imgUrl} alt="" />
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
