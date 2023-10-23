import { SongPreview } from "./SongPreview";

export function SongList({songs, playSong, checkLikedSongs, checkIfLiked, onDeleteSong}){


    return(
        songs.map((song,idx)=> <SongPreview key={song._id} idx={idx} song={song} playSong={playSong} checkLikedSongs={checkLikedSongs} checkIfLiked={checkIfLiked} onDeleteSong={onDeleteSong} />)
    )
}