import React from 'react';

export const RadioButton = ({group, name}) => {
  return (
    <div>
      <label>{name}</label>
      <input type="radio" name={group} value={name}/>
    </div>
  )
}

export default RadioButton;