import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { stationService } from '../services/station.service.local'
import { getBgc, removeStation, setCurrStation, updateStation } from '../store/actions/station.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'
import { LoaderService } from '../cmps/Loader'
import { Search } from '../cmps/Search'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
import { updateUser } from '../store/actions/user.actions'
import { SongList } from '../cmps/SongList'
import { Svg } from '../cmps/Svg'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export function StationDetails() {
	const location = useLocation()
	const isLikedPage = location.pathname === '/likedsongs'
	const [station, setStation] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const [textareaValue, setTextareaValue] = useState('')
	const { stationId } = useParams()
	const user = useSelector((storeState) => storeState.userModule.user)
	const songs = useSelector((storeState) => storeState.stationModule.songsToSearch)
	const bgc = useSelector((storeState) => storeState.stationModule.bgc)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const player = useSelector((storeState) => storeState.playerModule.player)

	const navigate = useNavigate()
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)


	useEffect(() => {
		loadStations()
	}, [stationId, isLikedPage, user])

	async function onRemoveStation(stationId) {
		try {
			await removeStation(stationId)
			navigate('/')
			showSuccessMsg('Station removed')
		} catch (err) {
			showErrorMsg('Cannot remove station')
		}
	}
	function onPlayStation(station, ev) {
		if (currStation?._id == station._id) {
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		}
		else {
			setSongPlaying(station.songs[0])
			setCurrStation(station)
		}


	}
	// function onPlayStation(station, ev) {
	// 	ev.stopPropagation()
	// 	if (station._id === currStation?._id) {

	// 	} else {
	// 		setCurrStation(station)
	// 		setSongPlaying(station.songs[0])
	// 	}
	// }
	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const handleTextareaChange = (event) => {
		setTextareaValue(event.target.value)
	}

	function playSong(song) {
		if (song.kind) {
			const songToPlay = {
				videoId: song.id.videoId,
				title: song.snippet.title,
				imgUrl: song.snippet.thumbnails.high.url,
			}
			setSongPlaying(songToPlay)
		} else setSongPlaying(song)
	}

	async function AddToPlaylist(song, ev) {
		ev.stopPropagation()
		const songToSave = {
			id: utilService.makeId(),
			videoId: song.id.videoId,
			title: song.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, ''),
			imgUrl: song.snippet.thumbnails.high.url,
			addedAt: Date.now(),
			likedBy: [],
		}

		const stationToSave = { ...station, songs: [...station.songs, songToSave] }
		setStation(stationToSave)
		await updateStation(stationToSave)
	}

	async function onDeleteSong(ev, songId) {
		ev.stopPropagation()
		const idx = station.songs.findIndex((song) => song.id === songId)
		station.songs.splice(idx, 1)
		await updateStation(station)
	}

	async function loadStations() {
		try {
			if (isLikedPage) {
				setStation(user.likedSongs)
				setCurrStation(user.likedSongs)
			} else {
				const station = await stationService.getById(stationId)
				setStation(station)
				getBgc(station.imgUrl)

				// setCurrStation(station)
			}
		} catch (err) {
			console.log('Had issues in station details', err)
			showErrorMsg('Cannot load station')
			navigate('/')
		}
	}

	async function saveChanges(ev) {
		ev.preventDefault()
		const desc = ev.target[1].value
		const name = ev.target[0].value
		const stationToSave = { ...station, name, desc }
		try {
			const savedStation = await updateStation(stationToSave)
			showSuccessMsg(`Station updated, new name: ${savedStation.name}`)
		} catch (err) {
			showErrorMsg('Cannot update station')
		} finally {
			closeModal()
		}
	}

	function checkLikedSongs(ev, newSong) {
		ev.stopPropagation()
		const idx = user.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === newSong.videoId)

		if (idx === -1) addToLikedSongs(newSong)
		else removeFromLikedSongs(newSong)
	}

	async function addToLikedSongs(newSong) {
		const updatedUser = await userService.addSong(user._id, newSong)
		updateUser(updatedUser)
		const updatedSongs = station.songs.map((song) => (song.videoId === newSong.videoId ? newSong : song))
		const stationToSave = { ...station, songs: updatedSongs }
		setStation(stationToSave)
		setCurrStation(stationToSave)
	}

	async function removeFromLikedSongs(newSong) {
		const updatedUser = await userService.removeSong(user._id, newSong.videoId)
		updateUser(updatedUser)
		const updatedSongs = station.songs.map((song) => (song.videoId === newSong.videoId ? newSong : song))
		const stationToSave = { ...station, songs: updatedSongs }
		setStation(stationToSave)
		setCurrStation(stationToSave)
	}

	function checkIfLiked(song) {
		const idx = user.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === song.videoId)
		if (idx === -1) return false

		return true
	}

	async function handleDragend(res) {
		console.log(isLikedPage);
		const newSongs = [...station.songs]
		const [recordeedItems] = newSongs.splice(res.source.index, 1)
		newSongs.splice(res.destination.index, 0, recordeedItems)
		const stationToSave = { ...station, songs: newSongs }

		if (isLikedPage) {
			const userToSave = { ...user, likedSongs: stationToSave }
			userService.updateUser(userToSave)
			return
		}

		setStation(stationToSave)
		console.log(stationToSave)
		await updateStation(stationToSave)
	}

	if (!station) return LoaderService.threeDots
	return (
		<section className="station-details">
			<header style={{ backgroundColor: bgc }} className="station-header">
				<img src={station.imgUrl} alt="" />

				<div className="title">
					<h1 onClick={openModal}>{station.name}</h1>

					<span>
						{station.createdBy?.fullname} {station.songs?.length} songs
					</span>
				</div>
			</header>

			{!isLikedPage && (
				<div className="station-options" style={{ backgroundImage: `linear-gradient(180deg, ${bgc}, transparent)` }}>
					<button className="remove-btn" onClick={() => onRemoveStation(station._id)}>
						delete
					</button>
					<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
						{currStation?._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
					</button>
				</div>
			)}

			<section className="song-list-container">
				<div className="song-list-header">
					<span>#</span>
					<span>Title</span>
					<span></span>
					<span>Added at</span>
				</div>

				<DragDropContext onDragEnd={handleDragend}>
					<Droppable droppableId={station._id}>
						{(provided) => {
							return (
								<ul className="song-list" {...provided.droppableProps} ref={provided.innerRef}>
									{station.songs && (
										<SongList
											key={station._id}
											songs={station.songs}
											playSong={playSong}
											checkLikedSongs={checkLikedSongs}
											checkIfLiked={checkIfLiked}
											onDeleteSong={onDeleteSong}
										/>
									)}
									{provided.placeholder}
								</ul>
							)
						}}
					</Droppable>
				</DragDropContext>
			</section>

			{!isLikedPage && <div className="search-song-txt">Let's find something for your playlist</div>}
			{!isLikedPage && (
				<div className="song-search">
					<Search />
				</div>
			)}

			<ul className="song-list-search">
				{songs &&
					songs.map((song, idx) => (
						<li onClick={() => playSong(song)} key={idx}>
							<img src={song.snippet.thumbnails.high.url} alt="" />
							<div className="options">
								<span>{song.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]/g, '')}</span>

								<button onClick={(event) => AddToPlaylist(song, event)}> Add </button>
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
								<span className="close" onClick={closeModal}>
									&times;
								</span>
							</div>

							<form id="myForm" onSubmit={saveChanges}>
								<input className="image" type="image" src={station.imgUrl} alt="" />
								<input className="title" defaultValue={station.name} type="text" />
								<textarea
									value={textareaValue}
									onChange={handleTextareaChange}
									rows={5}
									cols={40}
									placeholder="Add an optional description"
								></textarea>

								<button type="submit" form="myForm">
									save
								</button>
							</form>

							<p>
								By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the
								right to upload the image.
							</p>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
