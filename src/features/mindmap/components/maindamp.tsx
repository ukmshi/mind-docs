import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useMindMap } from "../hooks/useMindMap";
import { mindMapState } from "../stores/mindMapState";
import { getSaveStatusMessage } from "../utils/mindMapUtils";

export const MindMap: React.FC = () => {
  const { initializeMindMap, handleFileSelect, handleSaveStateToJSONFile, loadStateFromJSONFile } = useMindMap();
  const { currentData, currentFilePath, saveStatus, error } = useRecoilValue(mindMapState);

  useEffect(() => {
    if (currentData?.nodeData) {
      initializeMindMap(currentData.nodeData);
    } else {
      initializeMindMap();
    }
  }, [currentData, initializeMindMap]);

  return (
    <div>
      <div>
        <button onClick={handleFileSelect}>Select Mind Map File</button>
        <button onClick={handleSaveStateToJSONFile}>Save to JSON</button>
        <button onClick={loadStateFromJSONFile}>Load from JSON</button>
        {currentFilePath && <span>Current file: {currentFilePath}</span>}
      </div>
      <div id="map" style={{ transition: "flex 0.3s", height: "80vh", overflow: "hidden" }} />
      <div style={{ position: 'fixed', bottom: 10, right: 10, padding: '5px 10px', backgroundColor: saveStatus === 'error' ? 'red' : 'green', color: 'white', borderRadius: '5px' }}>
        {getSaveStatusMessage(saveStatus)}
      </div>
      {error && <div style={{ color: 'red', position: 'fixed', bottom: 40, right: 10 }}>{error}</div>}
    </div>
  );
};