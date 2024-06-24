import MindElixir, { MindElixirInstance, NodeObj, MindElixirData } from "mind-elixir";
import { useEffect, useRef, useState } from "react";

const MINDMAP_FILE_PATH = '/Users/ukmashi/mind-docs/mindmap.json';

export const MindMap: React.FC = () => {
  const me = useRef<MindElixirInstance | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMindMap = async () => {
      try {
        const savedData = await loadMindMap();
        const instance = new MindElixir({
          el: "#map",
          direction: MindElixir.RIGHT,
          draggable: true,
          contextMenu: true,
          toolBar: true,
          nodeMenu: true,
          keypress: true
        });

        if (savedData) {
          instance.init(savedData);
        } else {
          instance.init(MindElixir.new("new topic"));
        }

        instance.bus.addListener('operation', (operation) => {
          const data = instance.getData();
          saveMindMap(data);
        });

        me.current = instance;
      } catch (error) {
        console.error('Error initializing mind map:', error);
        setError('Failed to initialize mind map: ' + (error instanceof Error ? error.message : String(error)));
      }
    };

    initializeMindMap();

    return () => {
      me.current = null;
    };
  }, []);

  const loadMindMap = async (): Promise<MindElixirData | null> => {
    try {
      const content = await window.FileIO.read(MINDMAP_FILE_PATH);
      return JSON.parse(content) as MindElixirData;
    } catch (error) {
      console.error('Error loading mind map:', error);
      // If file doesn't exist or is invalid, return null to create a new mind map
      return null;
    }
  };

  const saveMindMap = async (data: MindElixirData) => {
    setSaveStatus('saving');
    try {
      const content = JSON.stringify(data, null, 2);
      await window.FileIO.write(MINDMAP_FILE_PATH, content);
      console.log('Mind map saved successfully');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving mind map:', error);
      setError('Failed to save mind map: ' + (error instanceof Error ? error.message : String(error)));
      setSaveStatus('error');
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
      <div id="map" style={{ transition: "flex 0.3s", height: "80vh", overflow: "hidden" }} />
      <div style={{ position: 'fixed', bottom: 10, right: 10, padding: '5px 10px', backgroundColor: saveStatus === 'error' ? 'red' : 'green', color: 'white', borderRadius: '5px' }}>
        {getSaveStatusMessage()}
      </div>
      {error && <div style={{ color: 'red', position: 'fixed', bottom: 40, right: 10 }}>{error}</div>}
    </div>
  );
};