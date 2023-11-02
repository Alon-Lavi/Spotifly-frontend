import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

import { getBgc, removeStation, setBgc, setCurrStation, updateStation } from '../store/actions/station.actions'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'
import { updateUser } from '../store/actions/user.actions'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stationService } from '../services/station.service.local'
import { LoaderService } from '../cmps/Loader'
import { Search } from '../cmps/Search'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
import { SongList } from '../cmps/SongList'
import { Svg } from '../cmps/Svg'
import { uploadService } from '../services/upload.service'

export function StationDetails() {
	const location = useLocation()
	const navigate = useNavigate()
	const { stationId } = useParams()

	const isLikedPage = location.pathname === '/likedsongs'
	const [station, setStation] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const [textareaValue, setTextareaValue] = useState('')
	const user = useSelector((storeState) => storeState.userModule.user)
	const songs = useSelector((storeState) => storeState.stationModule.songsToSearch)
	const bgc = useSelector((storeState) => storeState.stationModule.bgc)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const player = useSelector((storeState) => storeState.playerModule.player)
	const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)


	const currStation = useSelector((storeState) => storeState.stationModule.currStation)

	const [imgData, setImgData] = useState({
		imgUrl: null,
		height: 180,
		width: 180,
	})


	async function uploadImg(ev) {

		const { secure_url, height, width } = await uploadService.uploadImg(ev)
		console.log(secure_url);
		setImgData({ imgUrl: secure_url, width: '180', height: '180' })


	}


	useEffect(() => {
		loadStations()
		return () => {
			if (!currStation) setBgc(null)
		}
	}, [stationId, isLikedPage, user])

	async function onRemoveStation(stationId) {
		try {
			await removeStation(stationId)
			showSuccessMsg('Removed from Your Library.')
			navigate('/')
		} catch (err) {
			showErrorMsg('Cannot remove from Your Library')
		}
	}

	function onPlayStation(station, ev) {
		if (currStation?._id == station._id) {
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		} else {
			setSongPlaying(station.songs[0])
			setCurrStation(station)
		}
	}


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
		if (song?.videoId === songPlaying?.videoId) {
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		}

		else if (song.kind) {
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

		}

		try {
			const stationToSave = { ...station, songs: [...station.songs, songToSave] }
			setStation(stationToSave)
			showSuccessMsg(`Added to ${stationToSave.name}.`)
			await updateStation(stationToSave)
		} catch (err) {
			showErrorMsg(`Could not add song to playlist`)
			throw err
		}
	}

	async function onDeleteSong(ev, songId) {
		try {
			ev.stopPropagation()
			const idx = station.songs.findIndex((song) => song.id === songId)
			station.songs.splice(idx, 1)
			await updateStation(station)
		} catch (err) {
			showErrorMsg(`Could not delete song`)
			throw err
		}
	}

	async function loadStations() {
		try {
			if (isLikedPage) {
				setStation(user.likedSongs)
				setCurrStation(user.likedSongs)
				getBgc(user.likedSongs.imgUrl)

				setImgData({ imgUrl: user.likedSongs.imgUrl, width: '180', height: '180' })

			} else {
				const stationToSet = await stationService.getById(stationId)
				setStation(stationToSet)
				getBgc(stationToSet.imgUrl)
				setImgData({ imgUrl: stationToSet.imgUrl, width: '180', height: '180' })

				// setCurrStation(station)
			}



		} catch (err) {
			console.log('Had issues in station details', err)
			showErrorMsg('Could not load station')
			navigate('/')
		}
	}

	async function saveChanges(ev) {
		ev.preventDefault()
		console.log(ev);
		const name = ev.target[0].value
		const desc = ev.target[2].value
		const stationToSave = { ...station, name, desc, imgUrl: imgData.imgUrl }
		try {
			const savedStation = await updateStation(stationToSave)
			setStation(savedStation)
			getBgc(savedStation.imgUrl)
			showSuccessMsg(`Station updated, new name: ${savedStation.name}`)
		} catch (err) {
			showErrorMsg('Could not update station')
		} finally {
			closeModal()
		}
	}
	function checkLikedStation(newStation) {
		console.log(newStation);
		const idx = newStation.likedByUsers.findIndex((likedUser) => likedUser?._id === user?._id)
		console.log(idx);
		if (idx === -1) addToLibrary(newStation)
		else removeFromLibrary(newStation)
	}

	function addToLibrary(newStation) {
		const userToSave = {
			_id: user._id,
			fullname: user.fullname,
		}
		const stationToSave = { ...newStation, likedByUsers: [...newStation.likedByUsers, userToSave] }
		setStation(stationToSave)
		updateStation(stationToSave)
		showSuccessMsg(`Added to your library.`)

	}
	function removeFromLibrary(newStation) {
		const updatedUsers = newStation.likedByUsers.filter((likedUser) => {
			if (likedUser?._id !== user?._id) return likedUser
		})
		const stationToSave = { ...newStation, likedByUsers: updatedUsers }
		setStation(stationToSave)
		updateStation(stationToSave)
		showSuccessMsg(`Removed from your library.`)

	}

	function checkLikedSongs(ev, newSong) {
		ev.stopPropagation()
		const idx = user?.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === newSong.videoId)

		if (idx === -1) addToLikedSongs(newSong)
		else removeFromLikedSongs(newSong)
	}


	async function addToLikedSongs(newSong) {
		try {
			const updatedUser = await userService.addSong(user?._id, newSong)
			updateUser(updatedUser)
			const updatedSongs = station.songs.map((song) => (song.videoId === newSong.videoId ? newSong : song))
			const stationToSave = { ...station, songs: updatedSongs }
			setStation(stationToSave)
			setCurrStation(stationToSave)
			showSuccessMsg(`Added to Liked Songs.`)
		} catch (err) {
			showErrorMsg('Cannot add song to liked songs')
			throw err
		}
	}

	async function removeFromLikedSongs(newSong) {
		try {
			const updatedUser = await userService.removeSong(user?._id, newSong.videoId)
			updateUser(updatedUser)
			const updatedSongs = station.songs.map((song) => (song.videoId === newSong.videoId ? newSong : song))
			const stationToSave = { ...station, songs: updatedSongs }
			setStation(stationToSave)
			setCurrStation(stationToSave)
			showSuccessMsg(`Removed from Liked Songs.`)
		} catch (err) {
			showErrorMsg(`Could not remove from Liked Songs`)
			throw err
		}
	}
	function checkIfStationLiked(newStation) {
		const idx = newStation.likedByUsers.findIndex((likedUser) => likedUser?._id === user?._id)
		if (idx === -1) return false

		return true
	}
	function checkIfLiked(song) {
		const idx = user?.likedSongs.songs.findIndex((likedSong) => likedSong.videoId === song.videoId)
		if (idx === -1) return false

		return true
	}

	async function handleDragend(res) {
		const newSongs = [...station.songs]
		const [recordedItems] = newSongs.splice(res.source.index, 1)
		newSongs.splice(res.destination.index, 0, recordedItems)
		const stationToSave = { ...station, songs: newSongs }

		if (isLikedPage) {
			const userToSave = { ...user, likedSongs: stationToSave }
			userService.updateUser(userToSave)
			updateUser(userToSave)

			return
		}

		setStation(stationToSave)
		console.log(stationToSave)
		await updateStation(stationToSave)
	}

	if (!station) return LoaderService.threeDots
	return (
		<>
			<section className="station-details">
				<header style={{ backgroundColor: bgc }} className="station-header">
					<img src={station.imgUrl} alt="" />

					<div className="title">
						{station.createdBy._id === user?._id ? <h1 className="with-modal" onClick={openModal}>{station.name}</h1> :
							<h1 >{station.name}</h1>}
						<div className='info'>

							<span>{station.desc}</span>
							<span>
								{station.createdBy?.fullname} {station.songs?.length} songs
							</span>
						</div>
					</div>

					<div style={{ backgroundImage: `linear-gradient(180deg, ${bgc}, transparent)`, opacity: '0.5' }} className='fade'></div>
				</header>

				<div className="station-options" >

					<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
						{currStation?._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
					</button>
					{user && !isLikedPage && (
						<>
							<span className="like-btn">
								<svg
									onClick={() => {
										checkLikedStation(station)
									}}
									xmlns="http://www.w3.org/2000/svg"
									fill={checkIfStationLiked(station) ? '' : 'white'}
									height="17"
									width="17"
									aria-hidden="true"
									data-encore-id="icon"
									className={`liked-song-icon ? 'liked' : ''}`}
									viewBox="0 0 16 16"
								>
									<path
										fill={checkIfStationLiked(station) ? '#1ed760' : 'none'}
										d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"
									></path>

									<path
										fill={checkIfStationLiked(station) ? '#1ed760' : 'white'}
										d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
									></path>
								</svg>
							</span>
							<button className="remove-btn" onClick={() => onRemoveStation(station._id)}>
								delete
							</button>
						</>

					)}
				</div>

				<section className="song-list-container">
					<div className="song-list-header">
						<span>#</span>
						<span>Title </span>
						<span></span>
						<span>Date added</span>
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


			</section>
			{isOpen && (
				<div className="modal-overlay">
					<div className="details-modal">
						<div className='modal-header'>
							<h2>Edit details</h2>
							<span className="close" onClick={closeModal}>
								&times;
							</span>
						</div>

						<form onSubmit={saveChanges}>
							<div className='choose-photo'>
								<span>
									{Svg.penIcon}
								</span>
								<span>
									Choose photo
								</span>
							</div>
							<img className='image' src={imgData.imgUrl} alt="" />
							<input className="title" defaultValue={station.name} type="text" />
							<input className='file' type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
							<textarea
								value={textareaValue}
								onChange={handleTextareaChange}
								rows={5}
								cols={40}
								placeholder="Add an optional description"
							></textarea>

							<button type="submit" >
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
		</>

	)
}
