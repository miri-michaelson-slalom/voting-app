import React from "react"
import Loading from '../components/loading';
import traverseLogo from '../public/images/traverse-logo-full.png' 
import CTA from '../components/CTA';
import Text from '../components/text';
import styled from 'styled-components';
import { generate8DigitNumber } from '../utils/math-utils';

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledImgWrapper = styled.div`
  height: 200px;
`

const PageWrapper = styled.div`
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
  text-align: center;
`

const Home = () => {
  localStorage.setItem('userId', 'user-' + generate8DigitNumber())

  const [displayLoading, setDisplayLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => setDisplayLoading(false), 2000)
  }, [])

  const HomeScreen = (
    <PageWrapper>
      <StyledImgWrapper>
        <img alt="traverse logo" width="250px" src={traverseLogo}/>
      </StyledImgWrapper>
      <TextWrapper>
        <Text type='h1' copy='SCAN QR CODE TO START GAME!'/>
      </TextWrapper>
      <StyledDiv>
      <CTA copy="SCAN NOW"/>
      </StyledDiv>
    </PageWrapper>
  );

  return (
    <>
      {displayLoading && <Loading />}
      {!displayLoading && HomeScreen}
    </>
  );
}

export default Home;