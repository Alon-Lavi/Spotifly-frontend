
export function RecomendedPreview({playlist}){
    console.log(playlist);

    return (
        <article key={playlist._id}>
            <img src={playlist.createdBy.imgUrl} alt="" />
            <span>{playlist.name} </span>

        </article>
    )

}