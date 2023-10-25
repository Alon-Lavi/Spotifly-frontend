import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation, setCurrStation } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/StationList.jsx'
import { RecommendedList } from '../cmps/RecommendedList.jsx'
import { useParams } from 'react-router'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions.js'
import { LoaderService } from '../cmps/Loader.jsx'
import { utilService } from '../services/util.service.js'

export function StationIndex() {
	const [recommended, setRecommended] = useState()
	const { genre } = useParams()

	const stations = useSelector((storeState) => storeState.stationModule.stations)
	const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const player = useSelector((storeState) => storeState.playerModule.player)
	const user = useSelector((storeState) => storeState.userModule.user)

	useEffect(() => {
		loadStations({ genre })
		loadRecommended()
	}, [genre, user])

	function onPlayStation(station, ev) {
		if (station._id === currStation?._id) {
			ev.stopPropagation()
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
		<div className="main-container-page">
			<main className="main-container">
				<h3 className="greeting">{utilService.getGreetings()}</h3>
				{!genre && <RecommendedList onPlayStation={onPlayStation} recommended={recommended} />}
				<StationList onPlayStation={onPlayStation} stations={stations} />
			</main>
		</div>
	)
}
