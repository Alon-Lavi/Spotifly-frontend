import React from 'react'
 import { Svg } from './Svg'
import { useSelector } from 'react-redux'


export function StationPreview({ station,onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)

	return (
		<>
			<img src={station.createdBy.imgUrl} alt="" />

			<span>{station.name} </span>
			<p>
				{station.songs &&station.songs.map((song, idx) => (
					<span key={idx}>{song.artist} </span>
				))}
			</p>
			<button className="btn-play-playlist" onClick={() => onPlayStation(station.songs[0])}>
				{isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
			</button>
		</>
	)
}

// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { Svg } from './Svg'
// import { trackService } from '../services/track.service'
// export function StationPreview({ station, onPlayStation }) {
// 	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)

// 	return (
// 		<section className="station-card-page">
// 			<section className="station-card">
// 				<Link to={`/station/${station._id}`}>
// 					<div className="img-container">
// 						<img src={station.createdBy.imgUrl} alt="" />
// 					</div>
// 					<h3>{station.name}</h3>
// 					<div className="content">
// 						{station.songs.length > 0 ? (
// 							<>
// 								<div title={station.songs[0].title}>{trackService.getCleanTitle(station.songs[0].title)}</div>
// 							</>
// 						) : (
// 							<div></div>
// 						)}
// 					</div>
// 				</Link>
// 				<button className="btn-play-playlist" onClick={() => onPlayStation(station._id)}>
// 					{isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
// 				</button>
// 			</section>
// 		</section>
// 	)
// }
