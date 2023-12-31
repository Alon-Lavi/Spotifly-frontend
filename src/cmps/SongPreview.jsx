import { useLocation } from 'react-router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { utilService } from '../services/util.service'
import { Svg } from './Svg'

export function SongPreview({ station,song, playSong, checkLikedSongs, checkIfLiked, onDeleteSong, idx }) {
	const location = useLocation()
	const isLikedPage = location.pathname === '/likedsongs'

	const [isModalOpen, setModalOpen] = useState(false)

	const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const user = useSelector((storeState) => storeState.userModule.user)

	const openModal = (ev) => {
		ev.stopPropagation()
		setModalOpen(true)
	}

	const closeModal = (ev) => {
		ev.stopPropagation()
		setModalOpen(false)
	}
	return (
		<Draggable key={song.id} draggableId={song.id} index={idx}>
			{(provided) => {
				return (
					<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={() => playSong(song,station)}>
						{songPlaying?.videoId !== song.videoId && (
							<span style={{ color: 'white' }} className="idx">
								{idx + 1}
							</span>
						)}

						{songPlaying?.videoId === song.videoId && !isPlaying && (
							<span style={{ color: '#1ed760' }} className="idx">
								{idx + 1}
							</span>
						)}

						{songPlaying?.videoId === song.videoId && isPlaying && (
							<div style={{ color: '#1ed760' }} className="icon idx">
								<span className="bar"></span>
								<span className="bar"></span>
								<span className="bar"></span>
							</div>
						)}

						<span className="song-play-btn">
							{' '}
							{songPlaying?.videoId === song.videoId && isPlaying ? Svg.songPauseBtn : Svg.songPlayBtn}
						</span>

						<div className="details">
							<img src={song.imgUrl} alt="" />
							<span style={{ color: songPlaying?.videoId === song.videoId ? '#1ed760' : 'white' }}>{song.title}</span>
						</div>

						<span className="date">{utilService.getDate(song.addedAt)}</span>

						{user && (
							<span style={{ opacity: checkIfLiked(song) ? 1 : 0 }} className="like-btn">
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
									viewBox="0 0 16 16"
								>
									<path
										fill={checkIfLiked(song) ? '#1ed760' : 'none'}
										d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"
									></path>

									<path
										fill={checkIfLiked(song) ? '#1ed760' : 'white'}
										d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
									></path>
								</svg>
							</span>
						)}

						<span className="song-dur">{utilService.getSongDurations(song.duration)}</span>

						{!isLikedPage && (
							<span
								onClick={(event) => {
									openModal(event)
								}}
								className="options"
							>
								{Svg.threeDots}
							</span>
						)}

						{isModalOpen && (
							<div className="song-modal">
								<div className="song-modal-content">
									<span
										className="close"
										onClick={(event) => {
											closeModal(event)
										}}
									>
										&times;
									</span>
									<button onClick={(event) => onDeleteSong(event, song.id)}>Delete</button>
									<button
										onClick={(event) => {
											checkLikedSongs(event, song)
										}}
									>
										Add to liked songs
									</button>
								</div>
							</div>
						)}
					</li>
				)
			}}
		</Draggable>
	)
}
