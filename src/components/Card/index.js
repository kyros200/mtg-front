import './Card.scss'
import cardBack from '../../images/card_back.jpg'

const Card = (props) => {

    return (
        <div key={props.id} className={`card-container ${props.have ? "have" : ""}`}>
            <div className='name'>
                {props.name}
            </div>
            <div className='image'>
                <img src={`https://c1.scryfall.com/file/scryfall-cards/normal${props.imageUrl}` || cardBack} alt={props.name} loading="lazy"/>
            </div>
            <div className='prices'>
                <div className='price'>
                    ${props.priceUsd || "-"}
                </div>
            </div>
            <div className='links'>
                <a href={`https://www.tcgplayer.com/product/${props.urlTcg}?page=1&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall`} target={"_blank"} rel="noreferrer">
                    <div className='link'>
                        TCGPlayer
                    </div>
                </a>
            </div>
            <div className={`button ${props.have ? "red" : ""}`} onClick={() => props.setFlags({data: [props.id], have: !props.have})}>
                {props.have ? "Remove from Collection" : "Add to Collection"}
            </div>
            <div className={`button ${props.ban ? "" : "red"}`} onClick={() => props.setFlags({data: [props.id], ban: !props.ban})}>
                {props.ban ? "Unban Card" : "Ban Card"}
            </div>
        </div>
    )
}

export default Card;