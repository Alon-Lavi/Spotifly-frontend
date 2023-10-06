

export function GenrePreview({genre}){
    console.log('====================================');
    console.log(genre);
    console.log('====================================');
    const divStyle = {
        backgroundColor: genre.backgroundcolor,
      };
    return(
        <li style={divStyle} className="genre-preview" key={genre.title}>
        <h1>{genre.title} </h1>
        <img src={genre.imgUrl} alt="" />
        </li>
    )
}