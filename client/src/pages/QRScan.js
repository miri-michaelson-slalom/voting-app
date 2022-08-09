import React from 'react';
// import { QrReader } from 'react-qr-reader';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {useNavigate} from 'react-router-dom';


const QRScan = () => {
  let navigate = useNavigate();

  return (
    <>
    <BarcodeScannerComponent
      width={500}
      height={500}
      onUpdate={(err, result) => {
        console.log(result)
        if (result) navigate(result.text)
        else console.error("Not Found");
      }}
    />
  </>
  );
}

export default QRScan;