import { useState } from 'react';
import Card from '../Card'
import './Set.css'

const Set = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div key={props.setId} id={props.setId} className={`set-container`}>
            <div className={`accodion-button`} onClick={() => setIsOpen(!isOpen)}>
                {props.setName}
            </div>
            <div className={`accordion-content ${isOpen ? "" : "hide"}`}>
                {props.cards.map((card) => <Card collection={props.collection} {...card} />)}
            </div>
        </div>
    )
}

export default Set;