import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStations, setSongsToSearch } from '../store/actions/station.actions';
import { stationService } from '../services/station.service.local';
import { GenrePreview } from './GenrePreview';
import { setSongPlaying } from '../store/actions/player.actions';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import { trackService } from '../services/track.service.js'
import { utilService } from '../services/util.service';
import { addSongToStation } from '../store/actions/station.actions';

export function SearchPage() {
    const songs = useSelector((storeState) => storeState.stationModule.songsToSearch);
    const stations = useSelector((storeState) => storeState.stationModule.stations.slice(1, 9));
    const [genres, setGenres] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const [playlists, setPlaylists] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
    const handleLikeIconClick = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        loadGenres();
        return () => {
            setSongsToSearch(null);
        };
    }, []);


    async function loadGenres() {
        const allGenres = await stationService.getGenres();
        // console.log(allGenres)
        setGenres(allGenres);
        loadPlaylists(allGenres);
    }

    async function loadPlaylists(genres) {

        const allPlaylists = await stationService.getGenres();
        // console.log('All playlists:', allPlaylists);
        setPlaylists(allPlaylists);
    }



    function getPlaylistNames() {

        return stationsDemo.map((station) => ({
            _id: station._id,
            name: station.name,
        }));
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
            x: event.clientX,
            y: event.clientY,
        };
        setSelectedSong(song);
        setSvgPosition(svgPosition);
        setIsModalOpen(true);
    }

    async function addToLikedSongs(ev, song) {
        ev.stopPropagation()

        const likedStation = await stationService.getLikedSongs()
        console.log(likedStation);
        addSongToStation(song, likedStation._id)
    }

    function closeAddToPlaylistModal() {
        setIsModalOpen(false);
        setSelectedSong(null);
    }

    function addToPlaylist(playlistId) {

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
                            <li key={idx} onClick={() => playSong(song)}>
                                <img src={song.snippet.thumbnails.high.url} alt="" />
                                <span className='text-song-name'>{trackService.getCleanTitle(song.snippet.title)}</span>
                                <div className="options">

                                    <svg
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleLikeIconClick();
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={isLiked ? '#1ed760' : 'white'}
                                        height="37"
                                        width="37"
                                        aria-hidden="true"
                                        viewBox="0 0 16 16"
                                        data-encore-id="icon"
                                        className={`liked-song-icon ${isLiked ? 'liked' : ''}`}
                                    >
                                        <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z" />
                                    </svg>



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
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openAddToPlaylistModal(event, song);
                                        }}
                                        style={{ cursor: 'pointer' }}
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
                    stations={stations}
                    svgPosition={svgPosition}
                    onClose={closeAddToPlaylistModal}
                    onAddToPlaylist={addToPlaylist}
                />
            )}
        </>
    );
}
