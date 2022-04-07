import { useState } from 'react';
import Card from '../Card'
import './Set.scss'

const Set = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const cardsOwnedThisSet = props?.cards?.reduce((a, v) => {return a + v.have}, 0);
    const cardsTotalThisSet = props.cards.length;
    
    const getSetColor = () => {
        if(cardsOwnedThisSet === cardsTotalThisSet)
            return "completed"
        else if (cardsOwnedThisSet === 0)
            return ""
        else
            return "partial"
    }

    return (
        <div key={props.setId} id={props.setId} className={`set-container`}>
            <div className={`accodion-button ${getSetColor()}`} onClick={() => setIsOpen(!isOpen)}>
                <div className='set-name'>
                    <img src={props.setIcon} alt={props.setName}/>
                    {props.setName}
                </div>
                <div className='quantity'>
                    {cardsOwnedThisSet} / {cardsTotalThisSet}
                </div>
            </div>
            <div className={`accordion-content ${isOpen ? "" : "hide"}`}>
                {props.cards.map((card) => <Card collection={props.collection} {...card} />)}
            </div>
        </div>
    )
}

export default Set;