import { useCallback, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import MindElixir, { MindElixirData, MindElixirInstance, NodeObj } from "mind-elixir";
import { mindMapDataState, currentFilePathState, saveStatusState, errorState } from '../stores/mindMapState';
import { saveMindMap, loadMindMap, saveStateToJSON, selectJSONFile, saveStateToJSONFile, deepClone } from '../utils/mindMapUtils';

export const useMindMap = () => {
  const [mindMapData, setMindMapData] = useRecoilState(mindMapDataState);
  const [currentFilePath, setCurrentFilePath] = useRecoilState(currentFilePathState);
  const setSaveStatus = useSetRecoilState(saveStatusState);
  const setError = useSetRecoilState(errorState);
  const me = useRef<MindElixirInstance | null>(null);

  const handleSaveMindMap = useCallback(async (data: NodeObj, filePath: string) => {
    setSaveStatus('saving');
    try {
      await saveMindMap(data, filePath);
      console.log('Mind map saved successfully');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving mind map:', error);
      setError('Failed to save mind map: ' + (error instanceof Error ? error.message : String(error)));
      setSaveStatus('error');
    }
  }, [setSaveStatus, setError]);

  const operationListener = useCallback(() => {
    if (currentFilePath && me.current) {
      const data: NodeObj = me.current.getData().nodeData;
      handleSaveMindMap(data, currentFilePath);
    }
  }, [currentFilePath, handleSaveMindMap]);

  const handleDoubleClick = useCallback(() => {
    console.log('ダブルクリックがあった');
  }, []);

  const initializeMindMap = useCallback((data?: NodeObj) => {
    if (me.current) {
      me.current.bus.removeListener('operation', operationListener);
      me.current.mindElixirBox.removeEventListener('dblclick', handleDoubleClick);
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
      const clonedData = deepClone(data);
      const mindElixirData: MindElixirData = { nodeData: clonedData };
      instance.init(mindElixirData);
    } else {
      instance.init(MindElixir.new("new topic"));
    }

    instance.bus.addListener('operation', operationListener);
    instance.mindElixirBox.addEventListener('dblclick', handleDoubleClick);
    me.current = instance;
  }, [operationListener]);


  const handleFileSelect = async () => {
    try {
      const filePath = await window.FileIO.select({
        properties: ['openFile'],
        filters: [{ name: 'JSON', extensions: ['json'] }]
      });
      
      if (filePath) {
        const data = await loadMindMap(filePath);
        const mindElixirData: MindElixirData = { nodeData: data };
        setMindMapData(mindElixirData);
        setCurrentFilePath(filePath);
        initializeMindMap(data);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      setError('Failed to select file: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleSaveStateToJSONFile = async () => {
    if (!me.current) return;

    const data: NodeObj = me.current.getData().nodeData;
    
    try {
      await saveStateToJSONFile(data);
    } catch (error) {
      console.error('Error saving state to JSON:', error);
      setError('Failed to save state to JSON: ' + (error instanceof Error ? error.message : String(error)));
    }
  };


  const loadStateFromJSONFile = async () => {
    try {
      const filePath = await selectJSONFile();
      
      if (filePath) {
        const data = await loadMindMap(filePath);
        const mindElixirData: MindElixirData = { nodeData: data };
        setMindMapData(mindElixirData);
        setCurrentFilePath(filePath);
        initializeMindMap(data);
      }
    } catch (error) {
      console.error('Error loading state from JSON:', error);
      setError('Failed to load state from JSON: ' + (error instanceof Error ? error.message : String(error)));
    }
  };
  return {
    initializeMindMap,
    handleFileSelect,
    handleSaveStateToJSONFile,
    loadStateFromJSONFile,
  };
};