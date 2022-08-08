import styled from 'styled-components';

const StyledH1 = styled.h1`
  white-space: pre-line; 
  color: white;
  font-weight: 500;
  font-size: 22px;
  font-family: 'Jost', sans-serif;
`;

const StyledLargeParagraph = styled.p`
  white-space: pre-line;
  color: white;
  font-weight: 400;
  font-size: 22px;
  font-family: 'Jost', sans-serif;
`;

const StyledSmallParagraph = styled.p`
  white-space: pre-line; 
  color: white;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Jost', sans-serif;
`;

const Text = ({type, size = 'large', copy}) => {
  if (type === 'h1') { 
    return <StyledH1>{copy}</StyledH1>
  } else if (type === 'p' && size === 'large') {
    return <StyledLargeParagraph>{copy}</StyledLargeParagraph>
  } else if (type === 'p' && size === 'small') {
    return <StyledSmallParagraph>{copy}</StyledSmallParagraph>
  }
};


export default Text;