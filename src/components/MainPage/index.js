import { useState } from 'react';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import Modal from '../Modal';
import Set from '../Set';
import Search from '../Search'
import './MainPage.scss';

// const BACK_URL = "http://localhost:80"
const BACK_URL = "https://mtg-back.onrender.com"

const MainPage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
    const [countSets, setCountSets] = useState(0)
    const [searchText, setSearchText] = useState("")
    const [searchSet, setSearchSet] = useState("")
    const [searchBanned, setSearchBanned] = useState(false)

    const load = (showInfo = true) => {
        setIsLoading(true)
        fetch(`${BACK_URL}/search?name=${searchText}&setName=${searchSet}&searchBanned=${searchBanned}`, {headers: {
            'Host': "rpi.najjar.dev"
        }})
        .then((res) => {
            if(res.status !== 200) {
                throw(new Error("Something went wrong!"))
            }
            return res.json()
        })
        .then((res) => {
            setData(res.data);
            setCount(res.count);
            setCountSets(res.countSets)
            if(showInfo)
                toast.success(`${res.count} cards found!`)
        })
        .catch((e) => {
            toast.error(e)
            console.log(`error = ${e}`)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const setFlags = (payload) => {
        console.log(payload)

        setIsLoading(true)
        fetch(`${BACK_URL}/collection`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Host': "rpi.najjar.dev"
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
        .then((res) => {
            if(res.status !== 200) {
                throw(new Error("Something went wrong!"))
            }
            return res.json()
        })
        .then(() => {
            load(false)
            toast.success(`Changes saved!`);
            //TODO: INSTEAD OF DOING load(), CHANGE CARDS STATE ON LOCAL INFO
            // let newData = {...data}

            // const index = newData[card.setId].cards.map((item) => item.id).indexOf(card.id);

            // newData[card.setId].cards[index] = {...card, have: card.have ? 0 : 1};
            
            // setData(newData);
            // toast.success(`${card.name} ${card.have ? "removed" : "added"} from collection!`)
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
        return Object.keys(data).map((set) => <Set key={set.setId} setFlags={setFlags} {...data[set]}/>)
    }

    return (
        <div className='whole-container'>
            <div className={`main-container`}>
                <Modal open={isLoading}>
                    <ReactLoading type={"spin"} color="#2B912D" />
                </Modal>
                <div className={`title-container`}>
                    <div className={`title`}>
                        <h1>
                            najjar-mtg
                        </h1>
                    </div>
                </div>
                <Search 
                    data={data}
                    count={count} 
                    countSets={countSets}
                    setSearchText={setSearchText}
                    setSearchSet={setSearchSet}
                    setSearchBanned={setSearchBanned}
                    load={load}
                />
                <div className={`result-container`}>
                    {renderSets()}
                </div>
            </div>
        </div>
    )
}

export default MainPage;