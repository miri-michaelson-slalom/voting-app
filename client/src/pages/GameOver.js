
import CTA from '../components/CTA';
import Text from '../components/text';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

import styled from 'styled-components'

const StyledDiv = styled.div`
  height: 100%;
  padding: 10px;
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
  text-align: center;
`

const GameOver = () => {
  let navigate = useNavigate();

  const { gameId } = useParams();
  const userId = localStorage.getItem("userId");

  const [hasUserVoted, setHasUserVoted] = React.useState(false)

  React.useEffect(() => {
    const getUsersVote = async () => {
      await axios.get(`http://localhost:5000/${gameId}/${userId}`)
        .then(response => setHasUserVoted(response.data.length > 0))
    }
    getUsersVote()
  }, [gameId, userId])

  const onClickHandler = () => {
    navigate(`/`);
  }

  const hasVotedGameOverText = 
    'Your vote was registered. Your score will be shown at the end of the game, time to move on to the next adventure.'
  const timedOutGameOverText = 
    'Voting has ended on this round, time to move on to the next adventure. '
  const gameOverText = hasUserVoted ? hasVotedGameOverText : timedOutGameOverText

  return (
    <StyledDiv className="GameDescription" >
      <TextWrapper>
        <Text type='h1' copy='ROUND COMPLETE!'/>
        <Text type='p' size='small' copy={gameOverText}/>
      </TextWrapper>
      <CTA onClickHandler={onClickHandler} copy="START"/>
    </StyledDiv>
  );
}

export default GameOver;