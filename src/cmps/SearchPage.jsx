



export function SearchPage() {
    return (
        <section className="search-page">
            <div className="search-bar">
               <form>
                <h4 className="search-header">Browse all</h4>
                <div className="search-input-container">
                 <input
                 name="txt"
                 value={""}
                 type="text"
                 placeholder="What do you want to listen..."/>
                </div>
                <button className="search-button" type="submit">
                    Search
                </button>
               </form>
            </div>
        </section>
    )
}
