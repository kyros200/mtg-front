import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import Modal from '../Modal';
import Set from '../Set';
import './MainPage.css';

const MainPage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
    const [countSets, setCountSets] = useState(0)
    const [searchText, setSearchText] = useState("Chandra")

    useEffect(() => {
        load();
    }, []);

    const load = (sendToast = true) => {
        setIsLoading(true)
        fetch(`http://localhost:80/search?name=${searchText}`)
        .then((res) => {
            if(res.status !== 200) {
                throw("Something went wrong!")
            }
            return res.json()
        })
        .then((res) => {
            setData(res.data);
            setCount(res.count);
            setCountSets(res.countSets)
            if(sendToast) toast.success(`${res.count} cards found!`)
        })
        .catch((e) => {
            toast.error(e)
            console.log(`error = ${e}`)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const collection = (item) => {
        let card = {...item}
        delete card.collection; //useless info

        setIsLoading(true)
        fetch(`http://localhost:80/collection?id=${card.id}&have=${card.have ? 0 : 1}`)
        .then((res) => {
            if(res.status !== 200) {
                throw("Something went wrong!")
            }
            return res.json()
        })
        .then(() => {
            let newData = {...data}

            const index = newData[card.setId].cards.map((item) => item.id).indexOf(card.id);

            newData[card.setId].cards[index] = {...card, have: card.have ? 0 : 1};
            
            setData(newData);
            toast.success(`${card.name} ${card.have ? "removed" : "added"} from collection! Refreshing...`)
        })
        .catch((e) => {
            toast.error(e)
            console.log(`error = ${e}`)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const renderSets = () => {
        return Object.keys(data).map((set) => <Set key={set.setId} collection={collection} {...data[set]}/>)
            
    }

    return (
        <div className='whole-container'>
            <div className={`main-container`}>
                <Modal open={isLoading}>
                    <ReactLoading type={"spin"} color="#2B912D" />
                </Modal>
                <div className={`title-container`}>
                    <div className={`title`}>
                        najjar-mtg
                    </div>
                </div>
                <div className={`search-container`}>
                    <div className='search-fields'>
                        <input className='input' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <div className='button' onClick={() => load()}>Search</div>
                    </div>
                    <div className='search-count-result'>
                        <span className='number'>{count}</span> cards found from <span className='number'>{countSets}</span> sets
                    </div>
                </div>
                <div className={`result-container`}>
                    {renderSets()}
                </div>
            </div>
        </div>
    )
}

export default MainPage;