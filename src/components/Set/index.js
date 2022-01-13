import { useState } from 'react';
import Card from '../Card'
import './Set.scss'

const Set = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div key={props.setId} id={props.setId} className={`set-container`}>
            <div className={`accodion-button ${props?.cards?.reduce((a, v) => {return a + v.have}, 0) === props.cards.length ? "completed" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <div className='set-name'>
                    <img src={props.setIcon} alt={props.setName}/>
                    {props.setName}
                </div>
                <div className='quantity'>
                    {props?.cards?.reduce((a, v) => {return a + v.have}, 0)} / {props.cards.length}
                </div>
            </div>
            <div className={`accordion-content ${isOpen ? "" : "hide"}`}>
                {props.cards.map((card) => <Card collection={props.collection} {...card} />)}
            </div>
        </div>
    )
}

export default Set;