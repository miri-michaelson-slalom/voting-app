import React from 'react';
import styled from 'styled-components'
import Text from './text'

const StyledButton = styled.button`
  background: linear-gradient(149.51deg, #33C993 -3.29%, #167754 81.47%);
  width: 240px;
  margin-top: 25px;
  `

export const CTA = ({copy, onClickHandler}) => {
  return (
    // 242 pixels wide.
    <div>
      <StyledButton onClick={onClickHandler}>
        <Text type="p" size="large" copy={copy}></Text>
      </StyledButton>
    </div>
  )
}

export default CTA;