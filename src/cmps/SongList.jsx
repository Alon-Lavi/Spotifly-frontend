import { SongPreview } from './SongPreview'

export function SongList({ station, songs, playSong, checkLikedSongs, checkIfLiked, onDeleteSong }) {
console.log(station,'station');

	return songs.map((song, idx) => (
		<SongPreview
			station={station}
			key={song.id}
			idx={idx}
			song={song}
			playSong={playSong}
			checkLikedSongs={checkLikedSongs}
			checkIfLiked={checkIfLiked}
			onDeleteSong={onDeleteSong}
		/>
	))
}
