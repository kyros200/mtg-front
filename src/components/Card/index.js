import { useState } from 'react';
import './Card.scss'
import cardBack from '../../images/card_back.jpg'
import Button from '../shared/Button'

const Card = (props) => {

    const [editPanel, setEditPanel] = useState(false)
    const [alexPrice, setAlexPrice] = useState("")

    const handleCustomPrice = () => {
        setEditPanel(false)
        props.setFlags({data: [props.id], priceAlex: alexPrice})
    }

    return (
        <div key={props.id} className={`card-container ${props.have ? "have" : ""} ${props.ban ? "banned" : ""}`}>
            <div className='name'>
                {props.name}
            </div>
            <div className='image'>
                <img src={props.imageUrl || cardBack} alt={props.name} loading="lazy"/>
                {props.imageUrl.split(",").length > 1 ?
                <img className='otherSide' src={props.imageUrl.split(",")[1] || cardBack} alt={props.name} loading="lazy"/>
                :<></>}
            </div>
            <div className='price-container'>
                {props.isEdit?
                <Button className={`button`} onClick={() => setEditPanel(!editPanel)}>
                    E
                </Button>
                :<></>}
                {editPanel ?
                <>
                    <input className='input' placeholder='Value...' value={alexPrice} onChange={(e) => setAlexPrice(e.target.value)}/>
                    <div className={`button`} onClick={() => handleCustomPrice()}>
                        Save
                    </div>
                </>
                :
                <>
                    <div className='price'>
                        ${props.priceAlex ? props.priceAlex.toFixed(2) : props.priceUsd.toFixed(2)}
                    </div>
                    {props.priceAlex ?
                    <div className='link'>
                            Custom
                    </div>
                    :
                    <Button className='link'>
                        <a href={props.urlTcg} target={"_blank"} rel="noreferrer">
                            TCGPlayer
                        </a>
                    </Button>
                    }
                </>
                }
            </div>
            {props.isEdit?
            <div className='button-container'>
                <Button className={`button ${props.have ? "red" : ""}`} onClick={() => props.setFlags({data: [props.id], have: !props.have})}>
                    {props.have ? "Remove from Collection" : "Add to Collection"}
                </Button>
                <Button className={`button ${props.ban ? "" : "red"}`} onClick={() => props.setFlags({data: [props.id], ban: !props.ban})}>
                    {props.ban ? "Unban Card" : "Ban Card"}
                </Button>
            </div>
            :<></>}
        </div>
    )
}

export default Card;