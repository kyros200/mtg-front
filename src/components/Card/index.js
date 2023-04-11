import { useState } from 'react';
import './Card.scss'
import cardBack from '../../images/card_back.jpg'

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
                <div className={`button`} onClick={() => setEditPanel(!editPanel)}>
                    E
                </div>
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
                    <div className='link'>
                        <a href={props.urlTcg} target={"_blank"} rel="noreferrer">
                            TCGPlayer
                        </a>
                    </div>
                    }
                </>
                }
            </div>
            {props.isEdit?
            <>
                <div className={`button ${props.have ? "red" : ""}`} onClick={() => props.setFlags({data: [props.id], have: !props.have})}>
                    {props.have ? "Remove from Collection" : "Add to Collection"}
                </div>
                <div className={`button ${props.ban ? "" : "red"}`} onClick={() => props.setFlags({data: [props.id], ban: !props.ban})}>
                    {props.ban ? "Unban Card" : "Ban Card"}
                </div>
            </>
            :<></>}
        </div>
    )
}

export default Card;