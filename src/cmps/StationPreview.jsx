import React from 'react'
import { Svg } from './Svg'
import { useSelector } from 'react-redux'


export function StationPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	

	return (
		<>
		<div className='img-container'>
			<img src={station.imgUrl} alt="" />
			<button className="btn-play-playlist" onClick={(event) => onPlayStation(station,event)}>
				{currStation && currStation._id === station._id && isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
			</button>
		</div>

			<span>{station.name||station.title} </span>
			<p>
				{station.songs && station.songs.map((song, idx) => (
					<span key={idx}>{song.artist} </span>
				))}
			</p>
		
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
