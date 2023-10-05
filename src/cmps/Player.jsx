// import React from 'react'
// import YouTube from 'react-youtube'

// export class Player extends React.Component {
// 	render() {
// 		const opts = {
// 			height: '390',
// 			width: '640',
// 			playerVars: {
// 				https: '//developers.google.com/youtube/player_parameters',
// 				autoplay: 1,
// 			},
// 		}

// 		return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
// 	}

// 	_onReady(event) {
// 		// access to player in all event handlers via event.target
// 		event.target.pauseVideo()
// 	}
// }
// import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

// export const Player = () => (
// 	<div className="music-player">
// 		<AudioPlayer
// 			autoPlay
// 			src="https://www.youtube.com/watch?v=m8qFZ7hHgQ0&ab_channel=Levy%27sFit"
// 			onPlay={(e) => console.log('onPlay')}
// 			// other props here
// 		/>
// 	</div>
// )

import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { setSongProgress, toggleIsPlaying, setCurrSong, setNextSong, setPrevSong } from '../store/actions/player.actions'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { SongPreview } from './SongPreview.jsx'
// import { UserMsg } from './UserMsg.jsx'

export function Player() {
	// const songProgress = useSelector(storeState => storeState.playerModule.songProgress)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currSong = useSelector((storeState) => storeState.playerModule.currSong)
	const [volume, setVolume] = useState(0.5)
	const [isMuted, setIsMuted] = useState(false)
	const [isLooped, setIsLooped] = useState(false)
	const playerRef = useRef(null)
	const [currentTime, setCurrentTime] = useState(0)

	const handleProgress = (state) => {
		if (!state.loaded) return
		setCurrentTime(state.playedSeconds)
	}

	const handleSeek = (e) => {
		const seekTime = e.target.value
		setCurrentTime(seekTime)
		playerRef.current.seekTo(seekTime)
	}

	function nextSong() {
		// Implement logic to switch to the next song
	}

	function prevSong() {
		// Implement logic to switch to the prev song
	}

	function playSong() {
		toggleIsPlaying(isPlaying)
	}

	function shuffelSong() {
		// Implement logic to shuffel a song
	}

	function muteSong() {
		setIsMuted(!isMuted)
	}

	function loopSong() {
		setIsLooped(!isLooped)
	}

	function heartSong() {}

	const handleVolumeChange = (event) => {
		const newVolume = parseFloat(event.target.value)
		setVolume(newVolume)
	}

	const handleEnded = () => {
		if (isLooped) {
			setCurrentTime(0)
			playerRef.current.seekTo(0)
		}
	}

	return (
		<footer className="app-player">
			<div className="player-song-preview">
				{/* <SongPreview props={props}/> */}
				<button onClick={heartSong}>heart</button>
			</div>

			<div className="player-main">
				<div className="main-controls">
					<button onClick={loopSong}>
						loop
						{/* {isLooped ? 'is looping' : 'no looping'} */}
					</button>
					<button onClick={prevSong}>Previous</button>
					<button className="play-pause-button" onClick={playSong}>
						{/* {isPlaying ? 'Pause' : 'Play'} */}
						{/* {isPlaying ? (
							// <img className="pause-icon" src="public\img\spotify android icons 24px (Community)\Pause Button.png" alt="" />
						) : (
							// <img className="play-icon" src="public/img/spotify android icons 24px (Community)/Play Button.png" alt="" />
						)} */}
					</button>
					<button onClick={nextSong}>Next</button>
					<button onClick={shuffelSong}>Shuffel</button>
				</div>

				<ReactPlayer
					className="react-player"
					ref={playerRef}
					url={'https://www.youtube.com/watch?v=WYpjUEPbL-o&list=RDWYpjUEPbL-o&start_radio=1'}
					config={{
						youtube: {
							playerVars: {
								showinfo: 1,
							},
						},
					}}
					width="0%"
					height="0%"
					playing={isPlaying}
					volume={volume}
					muted={isMuted}
					// loop={isLooped}
					onProgress={handleProgress}
					onEnded={handleEnded}
				/>

				<div className="progress-bar">
					<label htmlFor="progressBar"></label>
					<input
						className="bar"
						type="range"
						id="progressBar"
						name="progressBar"
						min={0}
						max={playerRef.current ? playerRef.current.getDuration() : 0}
						value={currentTime}
						step={0.1}
						onChange={handleSeek}
					/>
				</div>
			</div>

			<div className="player-side-controls">
				<button onClick={muteSong}>mute</button>
				<div className="volume-bar">
					<label htmlFor="volumeRange"></label>
					<input
						type="range"
						id="volumeRange"
						name="volumeRange"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={handleVolumeChange}
					/>
				</div>
			</div>
		</footer>
	)
}
