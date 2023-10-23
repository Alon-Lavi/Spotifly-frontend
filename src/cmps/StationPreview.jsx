import React, { useEffect } from 'react'
import { Svg } from './Svg'
import { useSelector } from 'react-redux'
import { setCurrStation } from '../store/actions/station.actions'

export function StationPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	console.log(currStation, station);


	return (
		<>
			<div className="img-container">
				<img src={station.imgUrl} alt="" />
				<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
					{currStation && currStation._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
				</button>
			</div>

			<span>{station.name || station.title} </span>
			<p>{station.songs && station.songs.map((song, idx) => <span key={idx}>{song.artist} </span>)}</p>
		</>
	)
}

