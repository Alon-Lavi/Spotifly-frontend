import { useSelector } from 'react-redux'
import { Svg } from './Svg'

export function StationPreview({ station, onPlayStation }) {
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
	const currStation = useSelector((storeState) => storeState.stationModule.currStation)

	return (
		<>
			<div className="img-container">
				<img src={station.imgUrl} alt="" />

				<button className="btn-play-playlist" onClick={(event) => onPlayStation(station, event)}>
					{currStation?._id === station._id && isPlaying ? Svg.pauseTrackIcon : Svg.playTrackIcon}
				</button>
			</div>

			<span className='small-title'>{station.name || station.title} </span>

			<p>{station.songs && station.songs.map((song, idx) => <span key={idx}>{song.artist} </span>)}</p>
		</>
	)
}
