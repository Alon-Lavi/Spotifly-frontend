import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/StationList.jsx'
import { RecomendedList } from '../cmps/RecomendedList.jsx'
import { useParams } from 'react-router'
import { setSongPlaying } from '../store/actions/player.actions.js'
import { LoaderService } from '../services/loader.service.jsx'
import { utilService } from '../services/util.service.js'

export function StationIndex() {
	const stations = useSelector((storeState) => storeState.stationModule.stations)
	const [recomended, setRecomended] = useState()
	const { genre } = useParams()

	useEffect(() => {
		loadStations({ genre })
		loadRecomended()
	}, [genre])
	function onPlayStation(song) {
		setSongPlaying(song)
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
			<h3 className="greeting">{utilService.getGreetings()}</h3>
			<main className="main-container">
				{!genre && <RecomendedList recomended={recomended} />}
				<StationList onPlayStation={onPlayStation} stations={stations} />
			</main>
		</div>
	)
}
