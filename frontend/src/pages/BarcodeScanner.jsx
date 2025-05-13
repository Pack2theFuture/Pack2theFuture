import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const codeReaderRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        const text = result.getText();
        console.log("바코드 인식:", text);
        onDetected(text);
        setSuccessMessage("✅ 종이팩 인증에 성공했습니다.");
        controlsRef.current?.stop();
      }
    }).then((controls) => {
      controlsRef.current = controls;
    }).catch((err) => {
      console.error("카메라 접근 오류:", err);
    });

    return () => {
      controlsRef.current?.stop();
    };
  }, [onDetected]);

  const handleClose = () => {
    codeReaderRef.current?.reset();
    setSuccessMessage("");
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md aspect-square">
        <video
          ref={videoRef}
          className="rounded-xl w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />

        {/* 녹색 테두리 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-6 h-6 border-4 border-green-400 rounded-tl-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 top-0 right-0 rounded-tr-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 bottom-0 left-0 rounded-bl-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 bottom-0 right-0 rounded-br-xl" />
        </div>
      </div>

      {/* 안내 및 결과 텍스트 */}
      {successMessage ? (
        <p className="text-green-400 text-sm mt-4">{successMessage}</p>
      ) : (
        <p className="text-white text-sm mt-4">
          바코드를 녹색 테두리 안에 위치시켜 주세요.
        </p>
      )}

      <button
        onClick={handleClose}
        className="mt-4 px-4 py-2 bg-white text-black rounded"
      >
        X
      </button>
    </div>
  );
}

export default BarcodeScanner;