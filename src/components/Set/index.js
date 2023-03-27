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
                <div className='buttons-container'>
                    <div className='button' onClick={() => props.setFlags({data: props.cards.map((card) => card.id), have: 1})}>
                        own all
                    </div>
                    <div className='button red' onClick={() => props.setFlags({data: props.cards.map((card) => card.id), ban: 1})}>
                        ban all
                    </div>
                </div>
                <div className='cards-container'>
                    {props.cards.map((card) => <Card setFlags={props.setFlags} {...card} />)}
                </div>
            </div>
        </div>
    )
}

export default Set;