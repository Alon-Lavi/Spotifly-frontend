import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'

import { utilService } from '../services/util.service'
import { setCurrTime, setCurrentTime, setIsPlaying, setPlayer, setSongDuration, setSongPlaying } from '../store/actions/player.actions'
import { Svg } from './Svg'
import { trackService } from '../services/track.service'

// import { stationService } from '../services/station.service.local'
// import { stationService } from '../services/station.service'
// import { loadStations, updateStation } from '../store/actions/station.actions'

export function Player() {
	const [progressValue, setProgressValue] = useState(0)
	const [volumeValue, setVolumeValue] = useState(100)
	const [isMuted, setIsMuted] = useState(false)
	const [isRepeat, setIsRepeat] = useState(false)
	const [isShuffle, setIsShuffle] = useState(false)
	const [isProgressBarHovered, setIsProgressBarHovered] = useState(false)
	const [isVolumeBarHovered, setIsVolumeBarHovered] = useState(false)
	// const [isDesktop, setIsDesktop] = useState(true)
	// const [isLiked, setIsLiked] = useState(false)

	const currTime = useSelector((state) => state.playerModule.currTime)
	const songDuration = useSelector((storeState) => storeState.playerModule.songDuration)
	const currentTime = useSelector((storeState) => storeState.playerModule.currentTime)
	const player = useSelector((storeState) => storeState.playerModule.player)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const stations = useSelector((storeState) => storeState.stationModule.stations)

	useEffect(() => {
		if (!isPlaying || !player) return

		const updatePlayerInfo = () => {
			setCurrentTime(player.getCurrentTime())
			setSongDuration(player.getDuration())
		}

		const intervalId = setInterval(updatePlayerInfo, 50)
		return () => {
			clearInterval(intervalId)
		}
	}, [isPlaying, player])

	useEffect(() => {
		setProgressValue((currentTime / songDuration) * 100)
	}, [currentTime, songDuration])

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		setIsDesktop(window.innerWidth >= 768)
	// 	}
	// 	handleResize()
	// 	window.addEventListener('resize', handleResize)

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize)
	// 	}
	// }, [])

	function handlePlay() {
		if (player) {
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		}
	}

	//PLAYER CONTROLS
	function handleForward() {
		if (player) {
			const newTime = currTime + 15
			player.seekTo(newTime, true)
			setCurrTime(newTime)
		}
	}

	function handleBackward() {
		if (player) {
			const newTime = currTime - 15
			player.seekTo(newTime, true)
			setCurrTime(newTime)
		}
	}

	function handleMute() {
		if (player.isMuted()) {
			player.unMute()
		} else {
			player.mute()
		}

		setIsMuted(!isMuted)
	}

	function handlePlayerReady(ev) {
		setPlayer(ev.target)
	}

	const opts = {
		height: '0',
		width: '0',
		playerVars: {
			autoplay: 1,
			controls: 0,
		},
	}

	//VOLUME BAR
	function handleVolumeChange(ev) {
		player.setVolume(ev.target.value)
		setVolumeValue(ev.target.value)
	}

	function handleVolumeBarMouseEnter() {
		setIsVolumeBarHovered(true)
	}

	function handleVolumeBarMouseLeave() {
		setIsVolumeBarHovered(false)
	}

	let volumeBarStyle = {
		background: isVolumeBarHovered
			? `linear-gradient(to right, #1db954 0%, #1db954 ${volumeValue}%, hsla(0,0%,100%,.3) ${volumeValue}%, hsla(0,0%,100%,.3) 100%)`
			: `linear-gradient(to right, #fff 0%, #fff ${volumeValue}%, hsla(0,0%,100%,.3) ${volumeValue}%, hsla(0,0%,100%,.3) 100%)`,
	}

	function getVolumeIcon() {
		if (volumeValue < 0.01) {
			return Svg.volumeIcon0
		} else if (volumeValue <= 33) {
			return Svg.volumeIcon33
		} else if (volumeValue <= 66) {
			return Svg.volumeIcon66
		} else {
			return Svg.volumeIcon100
		}
	}

	//PROGRESS BAR
	async function handleProgressChange(ev) {
		try {
			const targetTime = (ev.target.value / 100) * songDuration
			await player.seekTo(targetTime, true)
			setCurrentTime(targetTime)
			setProgressValue(ev.target.value)
		} catch (err) {
			console.log('Could not load progress', err)
		}
	}

	function handleProgressBarMouseEnter() {
		setIsProgressBarHovered(true)
	}

	function handleProgressBarMouseLeave() {
		setIsProgressBarHovered(false)
	}

	let progressBarStyle = {
		background: isProgressBarHovered
			? `linear-gradient(to right, #1db954 0%, #1db954 ${progressValue}%, hsla(0,0%,100%,.3) ${progressValue}%, hsla(0,0%,100%,.3) 100%)`
			: `linear-gradient(to right, #fff 0%, #fff ${progressValue}%, hsla(0,0%,100%,.3) ${progressValue}%, hsla(0,0%,100%,.3) 100%)`,
	}

	function onRepeatClick() {
		if (isShuffle) setIsShuffle(false)
		setIsRepeat(!isRepeat)
	}

	function onChangePlayerStatus({ data }) {
		if (!player) return
		if (!isPlaying) return
		if (data === 5) {
			player.playVideo()
		}

		if (data === 0) {
			if (isRepeat) {
				player.playVideo()
				return
			}

			if (isShuffle) {
				const randSongIdx = utilService.getRandomSongIndex(currStation.songs)
				const shuffledSongId = currStation.songs[randSongIdx]._id
				const songName = currStation.songs[randSongIdx].title
				setSongPlaying({ songId: shuffledSongId, songIdx: randSongIdx })
				player.playVideo()
				return
			}

			const nextSong =
				songPlaying.songIdx + 1 <= currStation.songs.length
					? {
							songId: currStation.songs[songPlaying.songIdx + 1]?._id,
							songIdx: songPlaying.songIdx + 1,
					  }
					: null
			setSongPlaying(nextSong)
			player.playVideo()
		}
	}

	function onShuffle() {
		setIsShuffle(!isShuffle)
	}

	// function onChangeSong(isNext) {
	// 	if (isNext) {
	// 		const nextSong =
	// 			songPlaying.songIdx + 1 < currStation.songs.length
	// 				? {
	// 						songId: currStation.songs[songPlaying.songIdx + 1]?._id,
	// 						songIdx: songPlaying.songIdx + 1,
	// 				  }
	// 				: {
	// 						songId: currStation.songs[0]?._id,
	// 						songIdx: 0,
	// 				  }
	// 		setSongPlaying(nextSong)
	// 		player.playVideo()
	// 	} else {
	// 		if (songPlaying.songIdx - 1 < 0) return
	// 		const prevSong = {
	// 			songId: currStation.songs[songPlaying.songIdx - 1]?._id,
	// 			songIdx: songPlaying.songIdx - 1,
	// 		}

	// 		setSongPlaying(prevSong)
	// 		console.log('songPlaying from else', songPlaying)
	// 		player.playVideo()
	// 	}
	// }

	// async function onLikeSong(likedSongId) {
	// 	const [likedSong] = currStation.songs.filter((song) => song._id === likedSongId)
	// 	const updatedSongs = currStation.songs.map((song) => (song._id === likedSong._id ? { ...song, isLiked: !song.isLiked } : song))
	// 	const updatedStation = { ...currStation, songs: updatedSongs }
	// 	await updateStation(updatedStation)
	// 	const likedSongsStation = stations.find((station) => station.name === 'Liked Songs')
	// 	if (!likedSong.isLiked) {
	// 		await stationService.addToLikedSongsStation(likedSong, likedSongsStation)
	// 	} else {
	// 		await stationService.removeFromLikedSongsStation(likedSong, likedSongsStation)
	// 	}
	// 	loadStations()
	// }

	return (
		<div className="main-player-section-full">
			{/* LEFT */}
			<div className="left-controls">
				<div className="station-img">
					{songPlaying && (
						<div className="player-container">
							<img className="station-img" src={songPlaying.imgUrl} alt="station-img" />
							<YouTube videoId={songPlaying.videoId} opts={opts} onReady={handlePlayerReady} onStateChange={onChangePlayerStatus} />
						</div>
					)}
					<span className="song-name">{songPlaying && trackService.getCleanTitle(songPlaying.title)}</span>
				</div>
				{/* {currStation && (
					<button onClick={() => onLikeSong(songPlaying.songId)} className="btn-like-song">
						{currStation.songs[songPlaying?.songIdx]?.isLiked ? Svg.likedSongIcon : Svg.heartIcon}
					</button>
				)} */}
			</div>

			{/* CENTER */}
			<div className="center-controls">
				<div className="top-center-controls">
					<button onClick={onShuffle} className="shuffle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							role="img"
							height="16"
							width="16"
							aria-hidden="true"
							viewBox="0 0 16 16"
							className={`shuffle-song ${isShuffle ? 'active' : 'inactive'}`}
						>
							<path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z" />
							<path d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z" />
						</svg>
					</button>
					<button className="backBtn" onClick={() => handleBackward()}>
						{Svg.goBackIcon}
					</button>
					<button className="playBtn" onClick={handlePlay}>
						{isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
					</button>
					<button className="fwdBtn" onClick={() => handleForward()}>
						{Svg.playerFwdTrackIcon}
					</button>
					<button onClick={onRepeatClick}>
						{isRepeat ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								height="16"
								width="16"
								aria-hidden="true"
								viewBox="0 0 16 16"
								className={`repeat-on-icon ${isRepeat ? 'active' : 'inactive'} uPxdw loop-song`}
							>
								<path d="M0 4.75A3.75 3.75 0 013.75 1h.75v1.5h-.75A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25z" />
								<path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								height="16"
								width="16"
								aria-hidden="true"
								viewBox="0 0 16 16"
								className="repeat-off-icon uPxdw loop-song"
							>
								<path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z" />
							</svg>
						)}
					</button>

					<button className="btn-mute" onClick={handleMute}>
						{!isMuted ? getVolumeIcon() : Svg.volumeIcon0}
					</button>
					<input
						className="volume-bar-element"
						type="range"
						name="volumeControl"
						min="0"
						max="100"
						value={volumeValue}
						onMouseEnter={handleVolumeBarMouseEnter}
						onMouseLeave={handleVolumeBarMouseLeave}
						onChange={handleVolumeChange}
						style={volumeBarStyle}
					/>
				</div>

				<div className="bottom-center-controls">
					<div className="progress-bar flex">
						<div className="time-stamp start">{utilService.convertTime(currentTime) || '-:--'}</div>
						<input
							className="progress-bar-element"
							name="progressControl"
							type="range"
							min="0"
							max="100"
							value={progressValue || 0}
							onMouseEnter={handleProgressBarMouseEnter}
							onMouseLeave={handleProgressBarMouseLeave}
							onChange={handleProgressChange}
							style={progressBarStyle}
						/>

						<div className="time-stamp end">{utilService.convertTime(songDuration) || '--:--'}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
