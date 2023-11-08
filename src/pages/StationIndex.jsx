import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadStations, setBgc, setCurrStation } from '../store/actions/station.actions.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.js'
import { StationList } from '../cmps/StationList.jsx'
import { RecommendedList } from '../cmps/RecommendedList.jsx'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions.js'
import { LoaderService } from '../cmps/Loader.jsx'

export function StationIndex() {
	const [recommended, setRecommended] = useState()
	const { genre } = useParams()

	const stations = useSelector((storeState) => storeState.stationModule.stations)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const player = useSelector((storeState) => storeState.playerModule.player)
	const user = useSelector((storeState) => storeState.userModule.user)

	useEffect(() => {
		loadStations({ genre })
		loadRecommended()
		if (isPlaying) {
			setBgc(currStation?.imgUrl)
		}
	}, [genre, user])

	function onPlayStation(station, ev) {
		ev.stopPropagation()
		if (station._id === currStation?._id) {
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		} else {
			setCurrStation(station)
			setSongPlaying(station.songs[0])
		}
	}

	async function loadRecommended() {
		try {
			const getRecommended = await stationService.query({ isRecommended: true })
			setRecommended(getRecommended)
		} catch (error) {
			showErrorMsg('Cannot get station')
		}
	}

	if (!recommended || !stations) return LoaderService.threeDots
	return (
		<main className="main-container">
			{!genre && <RecommendedList onPlayStation={onPlayStation} recommended={recommended} />}
			<StationList genre={genre} onPlayStation={onPlayStation} stations={stations} />
		</main>
	)
}
