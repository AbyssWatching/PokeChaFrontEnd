import { useEffect }from 'react'
import { useCardsContext } from "../hooks/useCardsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import "../assets/css/pokedex.css"

// components
import CardDetails from '../components/CardDetails'
import GachaSystem from '../components/GachaSystem'
import AudioPlayer from '../components/AudioPlayer'

const Home = () => {
  const {cards, dispatch} = useCardsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('http://localhost:9000/api/cards', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CARDS', payload: json})
      }
    }

    if (user) {
      fetchCards()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className='pokedex-top-container'>
      <div className='lens-blue'>
        <div className='lens-shine'></div>
      </div>
        <div className='light-container'><div className='light-red'></div><div className='light-yellow'></div><div className='light-green'></div></div>
        </div>
      <div className="cards">
        <AudioPlayer />
        <GachaSystem />
        <br></br>
        {cards && cards.map((card) => (
          <CardDetails key={card._id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default Home