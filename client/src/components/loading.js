import React from 'react';
import traverseLoadingLogo from '../public/images/traverse-logo-icon.svg' 


export const Loading = () => {
  const loadingImage = (
    <img alt="traverse-loading-icon" src={traverseLoadingLogo}/>
  )

  return (
    <>
      {loadingImage}
    </>
  )
}

export default Loading;