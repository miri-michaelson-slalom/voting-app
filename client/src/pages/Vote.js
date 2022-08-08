
import axios from 'axios';
import React from 'react';
import Text from '../components/text';
import { useParams, useNavigate } from 'react-router-dom'
import {
  DefaultPlant1,
  DefaultPlant2,
  DefaultPlant3,
  DefaultPlant4,
  SelectedPlant1,
  SelectedPlant2,
  SelectedPlant3,
  SelectedPlant4
} from '../public/images'

import styled from 'styled-components'

const PageWrapper = styled.div`
  margin: 10px;
`

const TextWrapper = styled.div`
  margin: 10px;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const ImagesWrapper = styled.div`
  display: flex; 
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const ImageWrapper = styled.div`
  margin: 10px;
  width: 140px;
  height: 140px;
  box-sizing: border-box;
  background: ${props => props.selected ? "linear-gradient(56.63deg, #33C993 4.06%, #167754 117.29%)" : 'linear-gradient(149.51deg, #363F51 -3.29%, #172230 81.47%)'};
  display:flex;
  justify-content: center;
  align-items: center;
`


const Vote = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const userId = localStorage.getItem('userId')
  const [gameEnded, setGameEnded] = React.useState(false)

  setInterval(async () =>  {
    const game = await axios.get(`http://localhost:5000/games/${gameId}`)
    const gameEnded = !game.data[0].isOngoing;
    setGameEnded(gameEnded)
  }, 5000)

  React.useEffect(() => {
    if (gameEnded) {
      navigate(`/game-over/${gameId}`);
    }
  }, [navigate, gameId, gameEnded]);

  const submitHandler = (e) => {
    axios.post('http://localhost:5000/register-vote', {game_id: gameId, userId: userId }).then(response =>  console.log(response))
    setTimeout(() => setGameEnded(true), 2000)
  };

  const Image = (plantIndex) => {
    let plantSrc
    const [isPlantSelected, setIsPlantSelected] = React.useState(null);
    if (plantIndex === 0 ) plantSrc = isPlantSelected ? SelectedPlant1 : DefaultPlant1
    if (plantIndex === 1 ) plantSrc = isPlantSelected ? SelectedPlant2 : DefaultPlant2
    if (plantIndex === 2 ) plantSrc = isPlantSelected ? SelectedPlant3 : DefaultPlant3
    if (plantIndex === 3 ) plantSrc = isPlantSelected ? SelectedPlant4 : DefaultPlant4

    return (!isPlantSelected ? (
      <ImageWrapper  key={plantIndex}>
        <img src={plantSrc} alt={`Plant ${plantIndex}`} onClick={() => {
          setIsPlantSelected(true)
          submitHandler()
        }}/>
      </ImageWrapper>
    ) : (
      <ImageWrapper  selected key={plantIndex}>
        <img src={plantSrc} alt={`Plant ${plantIndex}`}/>
      </ImageWrapper>
    )
    )
  };
  

  return (
    <PageWrapper>  
      <TextWrapper>
        <Text type='h1' copy='CHOOSE THE EDIBLE PLANT'/>
        <Text type='p' size='small' copy="Your mission is to discover which plant is edible and will help you recover your health while you explore this world."/>
      </TextWrapper> 
      <ImagesWrapper>
      {[...Array(4)].map((e, i) => Image(i))}
      </ImagesWrapper>
    </PageWrapper> 
  );
}

export default Vote;