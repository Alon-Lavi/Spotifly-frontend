import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { Svg } from './Svg'
import { trackService } from '../services/track.service'

export function StationPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)

	useEffect(() => {
		console.log(isPlaying, 'isPlaying')
	}, [isPlaying])

	if (!station) return
	return (
		<>
			<div className="img-container">
				<img src={station?.imgUrl} alt="" />

				<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
					{currStation?._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
				</button>
			</div>

			<span className="small-title">{station.name || station.title} </span>

			<p>
				<span>{trackService.getArtists(station)}</span>
			</p>
		</>
	)
}
