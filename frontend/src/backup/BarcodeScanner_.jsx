// BarcodeScanner.jsx
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";

function BarcodeScanner({ onDetected, onClose }) {
  const webcamRef = useRef(null);
  const codeReader = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    const interval = setInterval(() => {
      const video = webcamRef.current?.video;
      if (video && video.readyState === 4) {
        codeReader.current
          .decodeFromVideoElement(video)
          .then((result) => {
            const text = result.getText();
            console.log("✅ 인식된 바코드:", text);
            setSuccessMessage("✅ 종이팩 인증에 성공했습니다.");

            setTimeout(() => {
              onDetected(text);
              onClose();
            }, 1500);
          })
          .catch(() => {
            // 계속 시도
          });
      }
    }, 800);

    return () => {
      clearInterval(interval);
      codeReader.current.reset();
    };
  }, [onDetected, onClose]);

  const videoConstraints = {
    facingMode: { exact: "environment" }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md aspect-square">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="rounded-xl w-full h-full object-cover"
          videoConstraints={videoConstraints}
        />
        {/* 녹색 테두리 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-6 h-6 border-4 border-green-400 rounded-tl-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 top-0 right-0 rounded-tr-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 bottom-0 left-0 rounded-bl-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 bottom-0 right-0 rounded-br-xl" />
        </div>
      </div>

      <p className={`mt-4 text-sm ${successMessage ? "text-green-400" : "text-white"}`}>
        {successMessage || "바코드를 녹색 테두리 안에 위치시켜 주세요."}
      </p>

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-white text-black rounded"
      >
        X
      </button>
    </div>
  );
}

export default BarcodeScanner;
