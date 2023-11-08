import YouTube from 'react-youtube'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useMediaQuery } from 'react-responsive'

import { utilService } from '../services/util.service'
import { setCurrentTime, setIsPlaying, setPlayer, setSongDuration, setSongPlaying } from '../store/actions/player.actions'
import { Svg } from './Svg'
import { trackService } from '../services/track.service'

export function Player() {
	const [progressValue, setProgressValue] = useState(0)
	const [volumeValue, setVolumeValue] = useState(100)
	const [isMuted, setIsMuted] = useState(false)
	const [isRepeat, setIsRepeat] = useState(false)
	const [isShuffle, setIsShuffle] = useState(false)
	const [isProgressBarHovered, setIsProgressBarHovered] = useState(false)
	const [isVolumeBarHovered, setIsVolumeBarHovered] = useState(false)

	const bgc = useSelector((storeState) => storeState.stationModule.bgc)
	const songDuration = useSelector((storeState) => storeState.playerModule.songDuration)
	const currentTime = useSelector((storeState) => storeState.playerModule.currentTime)
	const player = useSelector((storeState) => storeState.playerModule.player)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const location = useLocation()

	const isMobile = useMediaQuery({ maxWidth: 375 })

	const isLoginPage = location.pathname === '/loginsignup'
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

	function handlePlay() {
		if (player) {
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		}
	}

	//PLAYER CONTROLS
	function handleMute() {
		if (player.isMuted()) {
			player.unMute()
			setVolumeValue(100)
		} else {
			player.mute()
			setVolumeValue(0)
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
			return Svg.muteIcon
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
				const shuffledSong = currStation.songs[randSongIdx]
				setSongPlaying(shuffledSong)
				player.playVideo()
				return
			} else {
				onChangeSong(true)
			}
		}
	}

	function onShuffle() {
		setIsShuffle(!isShuffle)
	}

	function onChangeSong(isNext) {
		if (isNext && isShuffle) {
			const randSongIdx = utilService.getRandomSongIndex(currStation.songs)
			const shuffledSong = currStation.songs[randSongIdx]
			setSongPlaying(shuffledSong)
			player.playVideo()
		} else if (isNext && !isShuffle) {
			const nextSong = getAdjacentSong(songPlaying, 'next')
			setSongPlaying(nextSong)
			player.playVideo()
		} else {
			const prevSong = getAdjacentSong(songPlaying, 'prev')
			setSongPlaying(prevSong)
			player.playVideo()
		}
	}

	function getAdjacentSong(songToFind, direction) {
		const songIdx = currStation.songs.findIndex((song) => song.id === songToFind.id)
		const totalSongs = currStation.songs.length

		if (direction === 'next') {
			const nextIdx = (songIdx + 1) % totalSongs
			return currStation.songs[nextIdx]
		} else if (direction === 'prev') {
			const prevIdx = (songIdx - 1 + totalSongs) % totalSongs
			return currStation.songs[prevIdx]
		}
	}

	if (isLoginPage) return <div></div>
	return (
		<div className="main-player-section-full" style={{ backgroundColor: isMobile ? bgc : 'black' }}>
			<div className="left-controls">
				<div className="station-img">
					{songPlaying && (
						<div className="img-song-name flex">
							<img className="station-img" src={songPlaying.imgUrl} alt="station-img" />
							<YouTube
								videoId={songPlaying.videoId}
								opts={opts}
								onReady={handlePlayerReady}
								onStateChange={onChangePlayerStatus}
								style={{ display: 'none' }}
							/>
							<span className="song-name-player">{songPlaying && trackService.getCleanTitle(songPlaying.title)}</span>
						</div>
					)}
				</div>
			</div>

			<div className="center-controls">
				<div className="top-center-controls">
					<button onClick={onShuffle} className="shuffle">
						{isShuffle ? Svg.shuffleActive : Svg.shuffleInactive}
					</button>

					<button className="backBtn" onClick={() => onChangeSong(false)}>
						{Svg.goBackIcon}
					</button>

					<button className="playBtn" onClick={handlePlay}>
						{isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
					</button>

					<button className="fwdBtn" onClick={() => onChangeSong(true)}>
						{Svg.fwdTrackIcon}
					</button>

					<button className="repeat-btn" onClick={onRepeatClick}>
						{isRepeat ? Svg.repeatActive : Svg.repeatInactive}
					</button>
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

			<div className="volume-bar">
				<button className="btn-mute" onClick={handleMute}>
					{!isMuted ? getVolumeIcon() : Svg.muteIcon}
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
		</div>
	)
}
