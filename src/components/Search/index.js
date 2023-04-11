import Input from '../shared/Input'
import Button from '../shared/Button'
import './Search.scss'

const Search = (props) => {
    let allCards = [];
    Object.keys(props.data).forEach((set) => {
        allCards = [...allCards, ...props.data[set].cards]
    })
    const collectedCards = allCards.reduce((a, v) => {return a + v.have}, 0)
    return (
        <div className={`search-container`}>
            <div className='search-fields'>
                <Input className='input' label='Card Name' value={props?.searchText} onChange={(e) => props.setSearchText(e.target.value)}/>
                <Input className='input' label='Set Name' value={props?.searchSet} onChange={(e) => props.setSearchSet(e.target.value)}/>
                <input type="checkbox" className='' value={props?.searchBanned} onChange={(e) => props.setSearchBanned(e.target.checked)}/>
                <div>
                    Search Banned?
                </div>
                <input checked={props?.searchOwned} type="checkbox" className='' value={props?.searchOwned} onChange={(e) => props.setSearchOwned(e.target.checked)}/>
                <div>
                    Search Owned?
                </div>
                <Button className='button' onClick={() => props.load()}>Search</Button>
            </div>
            {props.count ?
            <>
                <div className='search-count-result'>
                    <span className='number'>{props.count}</span> cards found from <span className='number'>{props.countSets}</span> sets
                </div>
                <div className='search-count-result'>
                    You have collected <span className='number'>{collectedCards}</span> ({(collectedCards / props.count * 100).toFixed(2)}%) cards from this search
                </div>
            </>
            :
            <>
                <div className='search-count-result'>
                    No Cards Found! Search Again Above.
                </div>
            </>
            }
        </div>
    )
}

export default Search;