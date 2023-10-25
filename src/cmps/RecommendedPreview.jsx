import { useEffect, useState } from 'react'
import { Svg } from './Svg'
import { useSelector } from 'react-redux'
import { bgcService } from '../services/bgc.service'
import { getBgc, setBgc } from '../store/actions/station.actions'

export function RecommendedPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)


	// function changePrimaryClr(color = 'gray') {
	// 	let header = document.querySelector('.app-header')
	// 	header.style.setProperty('background-color', color)
	// 	let recommended = document.querySelector('.recommended-container ')
	// 	recommended.style.setProperty('background-image', `linear-gradient(180deg, ${color}, transparent)`)
	// 	let stationHaeder = document.querySelector('.station-details')
	// 	stationHaeder.style.setProperty('background-color', color)
	// }



	return (
		<article key={station._id} onClick={() => getBgc(station.imgUrl)} onMouseLeave={()=> getBgc(currStation.imgUrl)}  onMouseEnter={() => getBgc(station.imgUrl)}>
			<img src={station.imgUrl} alt="" />
			<span>{station.name} </span>
			<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
				{currStation && currStation._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
			</button>
		</article>
	)
}
