import './Search.css'

const Search = (props) => {
    return (
        <div className={`search-container`}>
            <div className='search-fields'>
                <input className='input' placeholder='Card Name...' value={props?.searchText} onChange={(e) => props.setSearchText(e.target.value)}/>
                <input className='input' placeholder='Set Name...' value={props?.searchSet} onChange={(e) => props.setSearchSet(e.target.value)}/>
                <div className='button' onClick={() => props.load()}>Search</div>
            </div>
            <div className='search-count-result'>
                <span className='number'>{props.count}</span> cards found from <span className='number'>{props.countSets}</span> sets
            </div>
        </div>
    )
}

export default Search;