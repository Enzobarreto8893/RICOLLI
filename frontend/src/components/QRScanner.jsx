import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h2>Escanear Código QR</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {scanResult && <p>Resultado del escaneo: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;
