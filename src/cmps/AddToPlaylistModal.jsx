import { useState } from "react";

export function AddToPlaylistModal({ playlists, onClose, onAddToPlaylist }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  const handleAddToPlaylist = () => {
    if (selectedPlaylist) {
      onAddToPlaylist(selectedPlaylist);
      onClose();
    }
  };

  return (
    <div className="modal"
    style={"color:white"}>
      <h2>Select a Playlist</h2>
      <select
        onChange={(e) => setSelectedPlaylist(e.target.value)}
        value={selectedPlaylist}
      >
        <option value="" disabled>
          Select a Playlist
        </option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddToPlaylist}>Add to Playlist</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}