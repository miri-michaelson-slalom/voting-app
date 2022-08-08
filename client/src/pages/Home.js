import React from "react"
import Loading from '../components/loading';
import traverseLogo from '../public/images/traverse-logo-full.png' 
import CTA from '../components/CTA';
import styled from 'styled-components';
import { generate8DigitNumber } from '../utils/math-utils';

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledImgWrapper = styled.div`
  height: 262px;
`

const Home = () => {
  localStorage.setItem('userId', 'user-' + generate8DigitNumber())

  const [displayLoading, setDisplayLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => setDisplayLoading(false), 2000)
  }, [])

  const HomeScreen = (
    <div>
      <StyledImgWrapper>
        <img alt="traverse logo" src={traverseLogo}/>
      </StyledImgWrapper>
      <h1>SCAN QR CODE TO START GAME</h1>
      <StyledDiv>
      <CTA copy="SCAN NOW"/>
      </StyledDiv>
    </div>
  );

  return (
    <>
      {displayLoading && <Loading />}
      {!displayLoading && HomeScreen}
    </>
  );
}

export default Home;