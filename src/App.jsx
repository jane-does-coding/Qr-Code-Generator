import { useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";

function App() {
  const [qrCode, setQrCode] = useState("hello");
  const [input, setInput] = useState("");

  let handleGenerate = () => {
    setQrCode(input);
    setInput("");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col items-center justify-center">
        <div>
          <h1 className="font-sans text-3xl mb-4 text-center">
            QR Code Generator
          </h1>
          <div className="my-4 flex justify-between gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              name=""
              placeholder="Enter the url"
              className="outline-none border-2 border-slate-300 rounded-md py-2 px-4 w-full"
            />
            <button
              className="py-2 px-4 bg-sky-500 hover:bg-sky-600 transition text-slate-100 font-semibold rounded-md cursor-pointer"
              disabled={input == ""}
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
          <div className="">
            <QRCode
              id="qr-code-value"
              value={qrCode}
              size={400}
              bgColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
