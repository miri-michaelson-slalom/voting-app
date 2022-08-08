import React from "react"
import axios from 'axios';
import { generate8DigitNumber } from '../utils/math-utils';

const Admin = () => {
  const [qrCode, setQRCode] = React.useState(null);  
  const [gameId, setGameId] = React.useState(null);

  const startSessionHandler = async () => {
    const gameIdNumber = generate8DigitNumber()
    setQRCode(`https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/game-description/${gameIdNumber}size=100x100`)
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
    <div className="Vote">
      <h1>{`Game Id: ${gameId}`}</h1>
      <img src={qrCode} alt="" title={`Game Id: ${gameId}`} />
        <button onClick={startSessionHandler}>Start Session & Generate QR Code</button>
        <button onClick={endSessionHandler}>End Session & display data to users</button>
    </div>
  );
}

export default Admin;