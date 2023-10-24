import { Svg } from './Svg'
import { useSelector } from 'react-redux'
export function RecommendedPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)

	return (
		<article key={station._id}>
			<img src={station.imgUrl} alt="" />
			<span>{station.name} </span>
			<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
				{currStation && currStation._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
			</button>
		</article>
	)
}
