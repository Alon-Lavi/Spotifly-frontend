import { useEffect, useState } from 'react';
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
    const [playlists, setPlaylists] = useState([]); // Добавьте состояние для плейлистов
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        loadGenres();
        loadPlaylists(); // Загрузите плейлисты при загрузке компонента
        return () => {
            setSongsToSearch(null);
        };
    }, []);

    async function loadGenres() {
        setGenres(await stationService.getGenres());
    }

    async function loadPlaylists() {
     
        const fetchedPlaylists = await stationService.getPlaylists();
        setPlaylists(fetchedPlaylists);
    }

    function playSong(song) {
        const songToPlay = {
            title: song.snippet.title,
            videoId: song.id.videoId,
            imgUrl: song.snippet.thumbnails.high.url,
        };
        setSongPlaying(songToPlay);
    }

    function openAddToPlaylistModal(event, song) {
        const svgPosition = {
            x: event.clientX, // Получить координаты клика по X
            y: event.clientY, // Получить координаты клика по Y
        };
        setSelectedSong(song);
        setSvgPosition(svgPosition); // Сохранить позицию SVG в состоянии компонента
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
                                <span className='text-song-name'>{song.snippet.title}</span>
                                <div className="options">
                                    <button onClick={() => playSong(song)}>
                                        <svg width="20px"
                                         height="20px" 
                                         viewBox="0 0 1024 1024" 
                                         mlns="http://www.w3.org/2000/svg" 
                                         fill="#ffffff">
                                            <g id="SVGRepo_bgCarrier" 
                                            stroke-width="2">

                                            </g>
                                            <g id="SVGRepo_tracerCarrier" 
                                            stroke-linecap="round" 
                                            stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M716.8 512l-384-256v512z"
                                                 fill="#ffffff" 
                                                 fill-rule="evenodd">
                                                    </path></g>
                                                    </svg>
                                                    </button>
                                    {/* <button onClick={(event) => openAddToPlaylistModal(event, song)}>
                                        Add to Playlist
                                    </button> */}
                                    {/* SVG элемент с обработчиком события onClick */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 23 19"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        onClick={(event) => openAddToPlaylistModal(event, song)} // Добавьте этот обработчик события
                                        style={{ cursor: 'pointer' }} // Добавьте стиль, чтобы курсор был виден при наведении
                                    >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            {isModalOpen && (
                <AddToPlaylistModal
                    playlists={playlists}
                    svgPosition={svgPosition} // Передача svgPosition
                    onClose={closeAddToPlaylistModal}
                    onAddToPlaylist={addToPlaylist}
                />
            )}
        </>
    );
}
