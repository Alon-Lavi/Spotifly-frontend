import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStations, setSongsToSearch } from '../store/actions/station.actions';
import { stationService } from '../services/station.service.local';
import { GenrePreview } from './GenrePreview';
import { setSongPlaying } from '../store/actions/player.actions';
import { AddToPlaylistModal } from './AddToPlaylistModal';

export function SearchPage() {
  const songs = useSelector((storeState) => storeState.stationModule.songsToSearch);
  const [genres, setGenres] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadGenres();
    return () => {
      setSongsToSearch(null);
    };
  }, []);

  async function loadGenres() {
    setGenres(await stationService.getGenres());
  }

  function playSong(song) {
    const songToPlay = {
      title: song.snippet.title,
      videoId: song.id.videoId,
      imgUrl: song.snippet.thumbnails.high.url,
    };
    setSongPlaying(songToPlay);
  }

  function openAddToPlaylistModal(song) {
    setSelectedSong(song);
    setIsModalOpen(true);
  }

  function closeAddToPlaylistModal() {
    setIsModalOpen(false);
    setSelectedSong(null);
  }

  function addToPlaylist(playlistId) {
    // Ваш код для добавления песни в плейлист по ID
    // Например, вызов API для добавления песни в плейлист
    // stationService.addToPlaylist(playlistId, selectedSong);
    // Закройте модальное окно после добавления
    closeAddToPlaylistModal();
  }

  return (
    <>
      <section className="search-page">
        {!songs && genres && (
          <ul className="genres-list">
            {genres.map((genre, idx) => (
              <Link to={`station/${genre.title}`} key={idx}>
                <GenrePreview genre={genre} />
              </Link>
            ))}
          </ul>
        )}
        {songs && (
          <ul className="song-list">
            {songs.map((song, idx) => (
              <li key={idx}>
                <img src={song.snippet.thumbnails.high.url} alt="" />
                <div className="options">
                <span>{song.snippet.title}</span>
                  <button onClick={() => playSong(song)}>Play</button>
                  <button onClick={() => openAddToPlaylistModal(song)}> Add to Playlist </button>
                  {/* Ваши три точки и модальное окно */}
                  {<svg  className='option' fill="#ffffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">#ffffff&lt;#ffffffg#ffffff #ffffffi#ffffffd#ffffff=#ffffff"#ffffffS#ffffffV#ffffffG#ffffffR#ffffffe#ffffffp#ffffffo#ffffff_#ffffffb#ffffffg#ffffffC#ffffffa#ffffffr#ffffffr#ffffffi#ffffffe#ffffffr#ffffff"#ffffff #ffffffs#fffffft#ffffffr#ffffffo#ffffffk#ffffffe#ffffff-#ffffffi#ffffffd#fffffft#ffffffh#ffffff=#ffffff"#ffffff0#ffffff"#ffffff&gt;#ffffff&lt;#ffffff/#ffffffg#ffffff&gt;#ffffff&lt;#ffffffg#ffffff #ffffffi#ffffffd#ffffff=#ffffff"#ffffffS#ffffffV#ffffffG#ffffffR#ffffffe#ffffffp#ffffffo#ffffff_#fffffft#ffffffr#ffffffa#ffffffc#ffffffe#ffffffr#ffffffC#ffffffa#ffffffr#ffffffr#ffffffi#ffffffe#ffffffr#ffffff"#ffffff #ffffffs#fffffft#ffffffr#ffffffo#ffffffk#ffffffe#ffffff-#ffffffl#ffffffi#ffffffn#ffffffe#ffffffc#ffffffa#ffffffp#ffffff=#ffffff"#ffffffr#ffffffo#ffffffu#ffffffn#ffffffd#ffffff"#ffffff #ffffffs#fffffft#ffffffr#ffffffo#ffffffk#ffffffe#ffffff-#ffffffl#ffffffi#ffffffn#ffffffe#ffffffj#ffffffo#ffffffi#ffffffn#ffffff=#ffffff"#ffffffr#ffffffo#ffffffu#ffffffn#ffffffd#ffffff"#ffffff&gt;#ffffff&lt;#ffffff/#ffffffg#ffffff&gt;#ffffff&lt;#ffffffg#ffffff #ffffffi#ffffffd#ffffff=#ffffff"#ffffffS#ffffffV#ffffffG#ffffffR#ffffffe#ffffffp#ffffffo#ffffff_#ffffffi#ffffffc#ffffffo#ffffffn#ffffffC#ffffffa#ffffffr#ffffffr#ffffffi#ffffffe#ffffffr#ffffff"#ffffff&gt;#ffffff&lt;#ffffffp#ffffffa#fffffft#ffffffh#ffffff #ffffffd#ffffff=#ffffff"#ffffffM#ffffff1#ffffff2#ffffff,#ffffff1#ffffff0#ffffffa#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff1#ffffff-#ffffff2#ffffff,#ffffff2#ffffffA#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff1#ffffff2#ffffff,#ffffff1#ffffff0#ffffffZ#ffffffM#ffffff4#ffffff,#ffffff1#ffffff4#ffffffa#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff0#ffffff-#ffffff2#ffffff-#ffffff2#ffffffA#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff4#ffffff,#ffffff1#ffffff4#ffffffZ#ffffffm#ffffff1#ffffff6#ffffff-#ffffff4#ffffffa#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff1#ffffff,#ffffff0#ffffff,#ffffff2#ffffff,#ffffff2#ffffffA#ffffff2#ffffff,#ffffff2#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff0#ffffff,#ffffff2#ffffff0#ffffff,#ffffff1#ffffff0#ffffffZ#ffffff"#ffffff&gt;#ffffff&lt;#ffffff/#ffffffp#ffffffa#fffffft#ffffffh#ffffff&gt;#ffffff&lt;#ffffff/#ffffffg#ffffff&gt;#ffffff</svg>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* {isModalOpen && (
        <AddToPlaylistModal
          playlists={""}
          onClose={closeAddToPlaylistModal}
          onAddToPlaylist={addToPlaylist}
        />
      )} */}
    </>
  );
}
