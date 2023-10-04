export function StationPreview({station}) {
return(
    <>
    <img src={station.createdBy.imgUrl} alt="" />
  
    <span>{station.name} </span>
    <p>
        {station.songs.map(song=> <span>{song.artist} </span> )}
    </p>
    </>
)
}
