import React from 'react';
import { QrReader } from 'react-qr-reader';
import {useNavigate} from 'react-router-dom';


const QRScan = () => {
  let navigate = useNavigate();

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            // TODO: change this
            navigate(result?.text)
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
    </>

  );
}

export default QRScan;