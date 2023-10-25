import { useEffect, useState } from 'react'
import { Svg } from './Svg'
import { useSelector } from 'react-redux'
import { bgcService } from '../services/bgc.service'
useEffect
export function RecommendedPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const [bgc, setBgc] = useState('rgb(10, 10, 10)')

	getBgc()
	function changePrimaryClr(color = 'gray') {
		let header = document.querySelector('.app-header')
		header.style.setProperty('background-color', color)
		let recommended = document.querySelector('.recommended-list ')
		recommended.style.setProperty('background-color', color)
		// let greeting = document.querySelector('.greeting')
		// greeting.style.setProperty('background-color', color)
	}

	async function getBgc(imgUrl) {
		// console.log(imgUrl)
		try {
			const color = await bgcService.getColorFromUrl(imgUrl)
			console.log(color)
			changePrimaryClr(color)
			setBgc(color)
		} catch (err) {
			console.log('Could not load color', err)
		}
	}

	return (
		<article key={station._id} onMouseEnter={() => getBgc(station.imgUrl)}>
			<img src={station.imgUrl} alt="" />
			<span>{station.name} </span>
			<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
				{currStation && currStation._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
			</button>
		</article>
	)
}
