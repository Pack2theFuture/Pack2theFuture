import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    // 한 번만 인식하면 자동 종료됨
    codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current)
      .then((result) => {
        const text = result.getText();
        console.log("바코드 인식:", text);
        setSuccessMessage("✅ 종이팩 인증에 성공했습니다.");

        // 1.5초 후 모달 닫고 결과 전달
        setTimeout(() => {
          onDetected(text);
          onClose();
        }, 1500);
      })
      .catch((err) => {
        console.error("바코드 인식 오류:", err);
      });

    // 컴포넌트 unmount 시 카메라 종료
    return () => {
      codeReader.reset();
    };
  }, [onDetected, onClose]);

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
