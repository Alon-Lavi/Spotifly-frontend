import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation, setCurrStation } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/StationList.jsx'
import { RecomendedList } from '../cmps/RecomendedList.jsx'
import { useParams } from 'react-router'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions.js'
import { LoaderService } from '../cmps/Loader.jsx'
import { utilService } from '../services/util.service.js'

export function StationIndex() {
	const stations = useSelector((storeState) => storeState.stationModule.stations)
	const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const player = useSelector((storeState) => storeState.playerModule.player)
	const user =useSelector((storeState) => storeState.userModule.user)


	const [recomended, setRecomended] = useState()
	const { genre } = useParams()

	useEffect(() => {
		loadStations({ genre,user })
		loadRecomended()
		console.log(currStation);
	}, [genre,user])


	function onPlayStation(station,ev) {
		console.log(station);
		if (station._id === currStation?._id) {
			ev.stopPropagation()
			const isCurrentlyPlaying = !isPlaying
			isCurrentlyPlaying ? player.playVideo() : player.pauseVideo()
			setIsPlaying(isCurrentlyPlaying)
		}
		else{
			setCurrStation(station)
			setSongPlaying(station.songs[0])
		}
		
	}

	async function loadRecomended() {
		try {
			const getRecomended = await stationService.query({ isRecomended: true })
			setRecomended(getRecomended)
		} catch (error) {
			showErrorMsg('Cannot get station')
		}
	}

	if (!recomended || !stations) return LoaderService.threeDots
	return (
		<div className="main-container-page">
			<main className="main-container">
			<h3 className="greeting">{utilService.getGreetings()}</h3>
				{!genre && <RecomendedList recomended={recomended} />}
				<StationList onPlayStation={onPlayStation} stations={stations} />
			</main>
		</div>
	)
}
