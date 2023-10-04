import { RecomendedPreview } from "./RecomendedPreview";


export function RecomendedList({recomended}){
    console.log(recomended);
    return(
        <section>

       
     {   recomended.map(playlist=>
        <RecomendedPreview playlist={playlist}/>
        )}
        </section>
    )
}