import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import "../assets/css/pokecard.css"



const CardDetails = ({ card }) => {
  const { dispatch } = useCardsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('https://PokeCha.onrender.com' + card._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CARD', payload: json})
    }
  }


  return (
    <div className='card-collection'>
      <div className="card-container">
      <a href={`https://bulbapedia.bulbagarden.net/wiki/${card.name}_(Pokémon)`} target="_blank"><img className='sprite' src={card.image} alt='pokemon'/></a>
        <div className='content-container'>
          <h1 className='pokemon-name'> {card.name}</h1>
          <p className='pokemon-id'>#{card.id}</p>
          <p className='pokemon-type'>{card.type1} {card.type2}</p>
          <p className='pokemon-height'>Height: {card.height} dm</p>
          <p className='pokemon-weight'>Weight: {card.weight} hg</p>
          <button className="btn delete delete-button" onClick={handleClick}><i className="fa fa-trash-o"></i></button>
        </div>
      </div>
    </div>
  )
}

export default CardDetails