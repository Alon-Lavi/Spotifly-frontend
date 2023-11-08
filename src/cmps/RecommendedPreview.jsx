import { useSelector } from 'react-redux'

import { Svg } from './Svg'
import { getBgc } from '../store/actions/station.actions'

export function RecommendedPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)

	if (!station) return
	return (
		<article
			key={station?._id}
			onClick={() => getBgc(station.imgUrl)}
			onMouseLeave={() => getBgc(currStation?.imgUrl)}
			onMouseEnter={() => getBgc(station.imgUrl)}
		>
			<img src={station?.imgUrl} alt="" />
			<span>{station?.name} </span>

			<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
				{currStation && currStation._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
			</button>
		</article>
	)
}
