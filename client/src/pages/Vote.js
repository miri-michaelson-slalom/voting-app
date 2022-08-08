
import RadioButton from '../components/radio-button';
import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const options = [
  {name: 'Option 1', color: 'red'}, 
  {name: 'Option 2', color: 'blue'}, 
  {name: 'Option 3', color: 'pink'}, 
  {name: 'Option 4', color: 'purple'}, 
]

const Vote = () => {
  const { gameId } = useParams();
  const userId = localStorage.getItem('userId')
  const [gameEnded, setGameEnded] = React.useState(false)

  let navigate = useNavigate();

  setInterval(async () =>  {
    const game = await axios.get(`http://localhost:5000/games/${gameId}`)
    const gameEnded = !game.data[0].isOngoing;

    setGameEnded(gameEnded)
  }, 5000)

  React.useEffect(() => {
    console.log("in use effect")
    if (gameEnded) {
      console.log("before / game over")

      navigate(`/game-over/${gameId}`);
    }
  }, [navigate, gameEnded]);

  const submitHandler = (e) => {
    axios.post('http://localhost:5000/register-vote', {game_id: gameId, userId: userId }).then(response =>  console.log(response))
    setGameEnded(true)
    e.preventDefault()
  };

  return (
    <div className="Vote">
      <h1>CHOOSE THE EDIBLE PLANT</h1>
      <h2>Your mission is to discover which plant is edible and will help you recover your health while you explore this world.</h2>
      <form onSubmit={submitHandler}>
        {options.map( (option) => {  
            return (   
              <RadioButton group='radioOptions' name={option.name} key={option.name}/>
            )
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Vote;