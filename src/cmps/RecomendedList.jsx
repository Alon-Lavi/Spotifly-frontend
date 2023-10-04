import { RecomendedPreview } from "./RecomendedPreview";


export function RecomendedList({recomended}){
    console.log(recomended);
    return(
        <section className="recomended-list">

       
     {   recomended.map(playlist=>
        <RecomendedPreview playlist={playlist}/>
        )}
        </section>
    )
}