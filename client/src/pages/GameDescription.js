
import CTA from '../components/CTA';
import Text from '../components/text';
import { useParams, useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const StyledDiv = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  max-width: 500px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TextWrapper = styled.div`
  margin: 10px;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
`

const GameDescription = () => {
  const { gameId } = useParams();
  let navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/game/${gameId}`);
  }
  const gameDescriptionText = `
    You just appeared in a world where there’s not many natural resources around and you are really hungry and need to eat to carry on your adventure... 
    There seem to be plants around, and one that you can eat.
    \n
    Pay attention to every detail and try to determine which one is the edible plant by yourself or with the help of others...
  `
  return (
    <StyledDiv className="GameDescription" >
      <TextWrapper>
        <Text type='h1' copy='CHOOSE THE EDIBLE PLANT'/>
        <Text type='p' size='small' copy={gameDescriptionText}/>
      </TextWrapper>
      <CTA onClickHandler={onClickHandler} copy="START"/>
    </StyledDiv>
  );
}

export default GameDescription;