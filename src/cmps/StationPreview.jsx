import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Svg } from '../pages/Svg'
import { trackService } from '../services/track.service'

export function StationPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)

	return (
		<section>
			<section className="station-card">
				<Link to={`/station/${station._id}`}>
					<div className="img-container">
						<img src={station.createdBy.imgUrl} alt="" />
					</div>
					<h3>{station.name}</h3>
					<div className="content">
						{station.songs.length > 0 ? (
							<>
								<div title={station.songs[0].title}>{trackService.getCleanTitle(station.songs[0].title)}</div>
							</>
						) : (
							<div></div>
						)}
					</div>
				</Link>
				<button className="btn-play-playlist" onClick={() => onPlayStation(station._id)}>
					{isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
				</button>
			</section>
		</section>
	)
}

// export function StationPreview({ station }) {
// 	return (
// 		<>
// 			<img src={station.createdBy.imgUrl} alt="" />

// 			<span>{station.name} </span>
// 			<p>
// 				{station.songs.map((song) => (
// 					<span key={song.artist}>{song.artist} </span>
// 				))}
// 			</p>
// 		</>
// 	)
// }
