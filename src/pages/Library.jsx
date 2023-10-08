import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { UserStationPreview } from '../cmps/UserStationPreview'
import { stationService } from '../services/station.service.local'
import { addStation } from '../store/actions/station.actions'
import { NavBar } from '../cmps/NavBar'

export function Library() {
	const navigate = useNavigate()
	const stations = useSelector((storeState) => storeState.stationModel.stations)

	async function onAddStation() {
		const station = stationService.getEmptyStation()

		try {
			const addedStation = await addStation(station)
			navigate(`/station/${addedStation._id}`)
		} catch (err) {
			console.error('Cannot add Station')
		}
	}

	function getLikedSongStation() {
		const [likedSongStation] = stations.filter((station) => {
			return station.name === 'Liked Songs'
		})
		return likedSongStation
	}

	return (
		<section className="lib-container">
			<SideNavLibrary onAddStation={onAddStation} />
			<div className="lib-stations">
				{getLikedSongStation() && <UserStationPreview station={getLikedSongStation()} />}
				{stations
					.filter((station) => station.createdBy?.owner === 'admin' && station.name !== 'Liked Songs')
					.map((station) => (
						<UserStationPreview station={station} key={station._id} />
					))}
			</div>
		</section>
	)
}
