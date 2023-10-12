import axios from "axios";
import { utilService } from "../services/util.service";
import { useState } from "react";
import { setSongsToSearch } from "../store/actions/station.actions";





export function Search() {
    const API_KEY ='AIzaSyCIHRUBlXc7OJQY31NlL6jlfigPqh9_PHE'
const [songs,setSongs] = useState(null)

async function handleChange({target}) {
	const res= await  axios
		.get(
			`https://www.googleapis.com/youtube/v3/search?part=snippet%20&videoEmbeddable=true&type=video&key=${API_KEY}&q=${target.value}`
		)
		// .then((res) => (console.log(res.data.items[3].id.videoId)))
        setSongsToSearch(res.data.items)
        console.log('====================================');
        console.log(res.data.items);
        console.log('====================================');
}

    return (
    <div className="search-bar">
        <form>

            <div className="search-input-container">
                <span>

                </span>
                <input
                onChange={utilService.debounce(handleChange,3000)}
                    name="txt"
                    type="text"
                    placeholder="      &#128269; What do you want to listen to?"
                />
            </div>

        </form>
    </div>

    )
}