import { useAuthContext } from '../hooks/useAuthContext'
import { useCardsContext } from '../hooks/useCardsContext'

const GachaSystem = () => {
  const { user } = useAuthContext()
  const { dispatch } = useCardsContext()

  async function getPokemonData(pokemonId) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
      return data;
    }

  async function rollPokemon() {

      const randomPokemonId = Math.floor(Math.random() * 905) + 1;
      const data = await getPokemonData(randomPokemonId);
      const pokemonId = data.id;
      const pokemonName = data.name;
      const pokemonType1 = data.types[0].type.name;
      const pokemonType2 = data.types[1]?.type.name ?? null;
      const pokemonWeight = data.weight;
      const pokemonHeight = data.height;
      const pokemonImage = data.sprites.front_default;
      const card = {
          id: pokemonId,
          name: pokemonName,
          type1: pokemonType1,
          type2: pokemonType2,
          height: pokemonHeight,
          weight: pokemonWeight,
          image: pokemonImage,
      };
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify(card)
      };
      const response = await fetch('http://localhost:9000/api/cards', options);
      const json = await response.json();
      if (response.ok) {
        dispatch({type: 'CREATE_CARDS', payload: json})
      }
    }

    return (
      <button className='roll-button btn' onClick={() => rollPokemon()}>Roll Pokemon</button>
    )
  } 


export default GachaSystem