import './Card.css'

const Card = (props) => {

    return (
        <div key={props.id} className={`card-container ${props.have ? "have" : ""}`}>
            <div className='name-container'>
                {props.name}
            </div>
            <div className='image'>
                <img src={props.imageUrl} alt={props.name}/>
            </div>
            <div className='prices'>
                <div className='price'>
                    ${props.priceUsd || "-"}
                </div>
                <div className='price'>
                    €{props.priceEur || "-"}
                </div>
            </div>
            <div className='links'>
                <a href={props.urlTcg} target={"_blank"} rel="noreferrer">
                    <div className='link'>
                        TCGPlayer
                    </div>
                </a>
                <a href={props.urlCm} target={"_blank"} rel="noreferrer">
                    <div className='link'>
                        CardMarket
                    </div>
                </a>
                <a href={props.urlCh} target={"_blank"} rel="noreferrer">
                    <div className='link'>
                        CardHoarder
                    </div>
                </a>
            </div>
            <div className='button' onClick={() => props.collection(props)}>
                {props.have ? "Remove from Collection" : "Add to Collection"}
            </div>
        </div>
    )
}

export default Card;