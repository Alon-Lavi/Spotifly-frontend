import { Svg } from './Svg'
import { useSelector } from 'react-redux'
export function RecomendedPreview({ station, onPlayStation }) {
    // console.log(station);
    const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
    const currStation = useSelector((storeState) => storeState.stationModule.currStation)

    console.log(station, currStation);

    return (
        <article key={station._id}>
            <img src={station.createdBy.imgUrl} alt="" />
            <span>{station.name} </span>
            <button className="btn-play-playlist" onClick={() => onPlayStation(station._id)}>
                {currStation && currStation._id === station._id && isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
            </button>
        </article>
    )

}