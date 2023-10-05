import { Link } from "react-router-dom";
import { RecomendedPreview } from "./RecomendedPreview";


export function RecomendedList({recomended}){
    console.log(recomended);
    return(
        <section className="recomended-list ">

       
     {   recomended.map((playlist,idx)=>
       <Link key={idx+1} to={`station/${playlist._id}`}><RecomendedPreview playlist={playlist}/></Link> 
        )}
        </section>
    )

}