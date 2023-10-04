import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/StationList.jsx'
import { RecomendedList } from '../cmps/RecomendedList.jsx'

export function StationIndex() {
	const stations = useSelector((storeState) => storeState.stationModule.stations)
	const [recomended,setRecomended] =useState(stationService.getRecomended())
	useEffect(() => {
		loadStations()
     
	}, [])

	async function onRemoveStation(stationId) {
		try {
			await removeStation(stationId)
			showSuccessMsg('Station removed')
		} catch (err) {
			showErrorMsg('Cannot remove station')
		}
	}

	async function onAddStation() {
		const station = stationService.getEmptyStation()
		station.vendor = prompt('Vendor?')
		try {
			const savedStation = await addStation(station)
			showSuccessMsg(`Station added (id: ${savedStation._id})`)
		} catch (err) {
			showErrorMsg('Cannot add station')
		}
	}

	async function onUpdateStation(station) {
		const price = +prompt('New price?')
		const stationToSave = { ...station, price }
		try {
			const savedStation = await updateStation(stationToSave)
			showSuccessMsg(`Station updated, new price: ${savedStation.price}`)
		} catch (err) {
			showErrorMsg('Cannot update station')
		}
	}

	function onAddToStationt(station) {
		console.log(`Adding ${station.vendor} to Stationt`)
		addToStationt(station)
		showSuccessMsg('Added to Stationt')
	}

	function onAddStationMsg(station) {
		console.log(`TODO Adding msg to station`)
	}
	function shouldShowActionBtns(station) {
		const user = userService.getLoggedinUser()
		if (!user) return false
		if (user.isAdmin) return true
		return station.owner?._id === user._id
	}
if(!recomended||!stations)return <div>loading </div>
	return (
		<div>
			<h3>Stations App</h3>
			<main>
				<button onClick={onAddStation}>Add Station </button>
                <RecomendedList recomended={recomended}/>
                <StationList onRemoveStation={onRemoveStation} onUpdateStation={onUpdateStation} stations={stations}/>

				
			</main>
		</div>
	)
}
