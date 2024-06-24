import MindElixir, { MindElixirInstance, MindElixirData } from "mind-elixir";
import { useEffect, useRef, useState, useCallback } from "react";

export const MindMap: React.FC = () => {
  const me = useRef<MindElixirInstance | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<MindElixirData | null>(null);

  const saveMindMap = useCallback(async (data: MindElixirData, filePath: string) => {
    setSaveStatus('saving');
    try {
      const content = JSON.stringify(data, null, 2);
      await window.FileIO.write(filePath, content);
      console.log('Mind map saved successfully');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving mind map:', error);
      setError('Failed to save mind map: ' + (error instanceof Error ? error.message : String(error)));
      setSaveStatus('error');
    }
  }, []);

  const operationListener = useCallback(() => {
    if (currentFilePath && me.current) {
      saveMindMap(me.current.getData(), currentFilePath);
    }
  }, [currentFilePath, saveMindMap]);

  const initializeMindMap = useCallback((data?: MindElixirData) => {
    if (me.current) {
      me.current.bus.removeListener('operation', operationListener);
    }

    const instance = new MindElixir({
      el: "#map",
      direction: MindElixir.RIGHT,
      draggable: true,
      contextMenu: true,
      toolBar: true,
      nodeMenu: true,
      keypress: true
    });

    if (data) {
      instance.init(data);
    } else {
      instance.init(MindElixir.new("new topic"));
    }

    instance.bus.addListener('operation', operationListener);
    me.current = instance;
  }, [operationListener]);

  useEffect(() => {
    if (currentData) {
      initializeMindMap(currentData);
    } else {
      initializeMindMap();
    }
  }, [currentData, initializeMindMap]);

  const loadMindMap = async (filePath: string): Promise<MindElixirData | null> => {
    try {
      const content = await window.FileIO.read(filePath);
      return JSON.parse(content) as MindElixirData;
    } catch (error) {
      console.error('Error loading mind map:', error);
      setError('Failed to load mind map: ' + (error instanceof Error ? error.message : String(error)));
      return null;
    }
  };

  const handleFileSelect = async () => {
    try {
      const filePath = await window.FileIO.select({
        properties: ['openFile'],
        filters: [{ name: 'JSON', extensions: ['json'] }]
      });
      
      if (filePath) {
        const data = await loadMindMap(filePath);
        if (data) {
          setCurrentFilePath(filePath);
          setCurrentData(data);
        }
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      setError('Failed to select file: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const getSaveStatusMessage = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved!';
      case 'error':
        return 'Save failed';
      default:
        return '';
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleFileSelect}>Select Mind Map File</button>
        {currentFilePath && <span>Current file: {currentFilePath}</span>}
      </div>
      <div id="map" style={{ transition: "flex 0.3s", height: "80vh", overflow: "hidden" }} />
      <div style={{ position: 'fixed', bottom: 10, right: 10, padding: '5px 10px', backgroundColor: saveStatus === 'error' ? 'red' : 'green', color: 'white', borderRadius: '5px' }}>
        {getSaveStatusMessage()}
      </div>
      {error && <div style={{ color: 'red', position: 'fixed', bottom: 40, right: 10 }}>{error}</div>}
    </div>
  );
};