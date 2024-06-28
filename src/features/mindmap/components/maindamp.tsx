import React, { useEffect } from "react";
import { useMindMap } from "../hooks/useMindMap";
import { getSaveStatusMessage } from "../utils/mindMapUtils";

export const MindMap: React.FC = () => {
  const { state, me, initializeMindMap, handleFileSelect } = useMindMap();

  useEffect(() => {
    if (state.currentData) {
      initializeMindMap(state.currentData);
    } else {
      initializeMindMap();
    }
  }, [state.currentData, initializeMindMap]);

  return (
    <div>
      <div>
        <button onClick={handleFileSelect}>Select Mind Map File</button>
        {state.currentFilePath && <span>Current file: {state.currentFilePath}</span>}
      </div>
      <div id="map" style={{ transition: "flex 0.3s", height: "80vh", overflow: "hidden" }} />
      <div style={{ position: 'fixed', bottom: 10, right: 10, padding: '5px 10px', backgroundColor: state.saveStatus === 'error' ? 'red' : 'green', color: 'white', borderRadius: '5px' }}>
        {getSaveStatusMessage(state.saveStatus)}
      </div>
      {state.error && <div style={{ color: 'red', position: 'fixed', bottom: 40, right: 10 }}>{state.error}</div>}
    </div>
  );
};
