import { Link } from "react-router-dom";
import { RecomendedPreview } from "./RecomendedPreview";


export function RecomendedList({recomended}){
    console.log(recomended);
    return(
        <section className="recomended-list ">

       
     {   recomended.map(playlist=>
       <Link to={`station/${playlist._id}`}><RecomendedPreview playlist={playlist}/></Link> 
        )}
        </section>
    )

}