import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadStations, setCurrStation } from '../store/actions/station.actions'
import { StationList } from '../cmps/StationList'
import { LoaderService } from '../cmps/Loader'
import { setIsPlaying, setSongPlaying } from '../store/actions/player.actions'

export function Library() {
	const [stations, setStations] = useState(null)

	const user = useSelector((storeState) => storeState.userModule.user)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const player = useSelector((storeState) => storeState.playerModule.player)

	useEffect(() => {
		getLikedStation()
	}, [])

	async function getLikedStation() {
		const likedStations = await loadStations({ user, liked: true })
		setStations(likedStations)
	}

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

	if (!stations) return LoaderService.threeDots
	return (
		<main className="main-container">
			<StationList onPlayStation={onPlayStation} stations={stations} library={true} />
		</main>
	)
}
