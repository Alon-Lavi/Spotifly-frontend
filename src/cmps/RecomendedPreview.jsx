import { Svg } from './Svg'
import { useSelector } from 'react-redux'
export function RecomendedPreview({playlist,onPlayStation}){
    // console.log(playlist);
	const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)


    return (
        <article key={playlist._id}>
            <img src={playlist.createdBy.imgUrl} alt="" />
            <span>{playlist.name} </span>
            <button className="btn-play-playlist" onClick={() => onPlayStation(station._id)}>
				{isPlaying ? Svg.playerPauseTrackIcon : Svg.playerPlayTrackIcon}
			</button>
        </article>
    )

}