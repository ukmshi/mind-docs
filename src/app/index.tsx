import { MindMap } from "@/features/mindmap/components/maindamp";
import { useState } from "react";

const App: React.FC = () => {
  const [fileName, setFileName] = useState('');
  const ipcRenderer = (window as any).preload.ipcRenderer;

  const handleOpneFile = () => {
    console.log('ssssssssss');
  }

  return(
    <>
      <h1>Hello world</h1>
      <button onClick={handleOpneFile}>Open File</button>
      <a
        className="App-link"
        onClick={() => ipcRenderer.send("openExternal", "https://reactjs.org")}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      {/* <MindMap /> */}
    </>
  );
};

export default App;