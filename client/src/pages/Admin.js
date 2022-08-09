import React from "react"
import axios from 'axios';
import { generate8DigitNumber } from '../utils/math-utils';
import styled from 'styled-components';
import CTA from '../components/CTA';
import Text from '../components/text';


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Admin = () => {
  const [qrCode, setQRCode] = React.useState(null);  
  const [gameId, setGameId] = React.useState(null);

  const startSessionHandler = async () => {
    // End previous session
    endSessionHandler();    
    
    // Start new session
    const gameIdNumber = generate8DigitNumber()
    setQRCode(`https://api.qrserver.com/v1/create-qr-code/?data=/game-description/${gameIdNumber}size=100x100`)
    setGameId(gameIdNumber)
    console.log("URL")
    console.log(`http://localhost:3000/game-description/${gameIdNumber}`)
    await axios.post("http://localhost:5000/games/addGame", { game_id: gameIdNumber, isOngoing: true }).then(response =>  console.log(response))
    await axios.post("http://localhost:5000/create-collection", { game_id: gameIdNumber }).then(response =>  console.log(response))
  };

  const endSessionHandler = async () => {
    setQRCode(null)
    await axios.post("http://localhost:5000/games/updateGame", { game_id: gameId, isOngoing: false }).then(response =>  console.log(response))
  };
  return (
    <PageWrapper>
        {gameId &&  <Text type='h1' copy={`Game Id: ${gameId}`}/>}
        <img src={qrCode} alt="" title={`Game Id: ${gameId}`} />
          <CTA onClickHandler={startSessionHandler} copy="Start New Session"/>
          <CTA onClickHandler={endSessionHandler} copy="End Session"/>
    </PageWrapper>
  );
}

export default Admin;