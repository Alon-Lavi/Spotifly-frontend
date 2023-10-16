import { useState, useEffect } from 'react';

export function AddToPlaylistModal({ stations, onClose, onAddToPlaylist, svgPosition }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    if (svgPosition) {
      const { x, y } = svgPosition;
      setModalStyle({ top: `${y}px`, left: `${x}px` });
    }
  }, [svgPosition]);

  const handleAddToPlaylist = () => {
    if (selectedPlaylist) {
      onAddToPlaylist(selectedPlaylist);
      onClose();
    }
  }

  return (
    <div className="modal" style={modalStyle}>
      <select
        className="select-txt"
        onChange={(e) => setSelectedPlaylist(e.target.value)}
        value={selectedPlaylist}
      >
        <option value="" disabled>
          Select a Playlist
        </option>

        {stations.map((station, idx) => (
          <option key={station._id} value={station._id}>
            {station.name}
          </option>
        ))}
      </select>

      <button className='button-select-modal-add' onClick={handleAddToPlaylist}>Add to Playlist</button>
      <button className='button-select-modal-close' onClick={onClose}>Close</button>
    </div>
  );
}
