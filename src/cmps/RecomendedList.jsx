import { Link } from "react-router-dom";
import { RecomendedPreview } from "./RecomendedPreview";
import { useSelector } from "react-redux";


export function RecomendedList({ onPlayStation,recomended }) {
	const user =useSelector((storeState) => storeState.userModule.user)

    return (
        <section className="recomended-list ">
       {user&&  <Link key={user._id} to={`/likedsongs`}><RecomendedPreview onPlayStation={onPlayStation} station={user.likedSongs} /></Link>}

            {recomended.map((station, idx) =>
                <Link key={idx + 1} to={`station/${station._id}`}><RecomendedPreview onPlayStation={onPlayStation} station={station} /></Link>
            )}
        </section>
    )

}