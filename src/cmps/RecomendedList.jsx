import { Link } from "react-router-dom";
import { RecomendedPreview } from "./RecomendedPreview";


export function RecomendedList({recomended}){
    console.log(recomended);
    return(
        <section className="recomended-list ">

       
     {   recomended.map((station,idx)=>
       <Link key={idx+1} to={`station/${station._id}`}><RecomendedPreview station={station}/></Link> 
        )}
        </section>
    )

}