import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        console.log("바코드 인식:", result.getText());
        onDetected(result.getText());
        controlsRef.current?.stop();
        }
    }).then(controls => {
      controlsRef.current = controls;
    }).catch(err => {
      console.error("카메라 접근 오류:", err);
    });


    return () => {
      controlsRef.current?.stop(); // unmount 시 카메라 정지
    };
  }, [onDetected]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
      <video ref={videoRef} className="w-full max-w-md rounded-lg" />
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-white text-black rounded"
      >
        X
      </button>
      {/* 카메라 미리보기 */}
      <div className="relative w-full max-w-md aspect-square">
        <video
          ref={videoRef}
          className="rounded-xl w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />

        {/* 녹색 모서리 테두리 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-6 h-6 border-4 border-green-400 rounded-tl-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 top-0 right-0 rounded-tr-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 bottom-0 left-0 rounded-bl-xl" />
          <div className="absolute w-6 h-6 border-4 border-green-400 bottom-0 right-0 rounded-br-xl" />
        </div>
      </div>

      {/* 안내 텍스트 */}
      <p className="text-white text-sm mt-4">
        바코드를 녹색 테두리 안에 위치시켜 주세요
      </p>
      <button
        onClick={() => {
          if (codeReaderRef.current) {
            codeReaderRef.current.reset(); // 수동 중단
          }
          onClose(); // 모달 닫기
        }}
        className="mt-4 px-4 py-2 bg-white text-black rounded"
      >
        X
      </button>

    </div>
  );
}

export default BarcodeScanner;