import { useState, useCallback, useRef } from 'react';
import MindElixir, { MindElixirInstance, MindElixirData } from "mind-elixir";
import { MindMapState, SaveStatus } from '../types/MindMapTypes';
import { saveMindMap, loadMindMap } from '../utils/mindMapUtils';

export const useMindMap = () => {
  const [state, setState] = useState<MindMapState>({
    saveStatus: 'idle',
    error: null,
    currentFilePath: null,
    currentData: null,
  });
  const me = useRef<MindElixirInstance | null>(null);

  const updateState = (newState: Partial<MindMapState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const handleSaveMindMap = useCallback(async (data: MindElixirData, filePath: string) => {
    updateState({ saveStatus: 'saving' });
    try {
      await saveMindMap(data, filePath);
      console.log('Mind map saved successfully');
      updateState({ saveStatus: 'saved' });
      setTimeout(() => updateState({ saveStatus: 'idle' }), 2000);
    } catch (error) {
      console.error('Error saving mind map:', error);
      updateState({
        error: 'Failed to save mind map: ' + (error instanceof Error ? error.message : String(error)),
        saveStatus: 'error'
      });
    }
  }, []);

  // 操作があった場合に状態を保存する
  const operationListener = useCallback(() => {
    if (state.currentFilePath && me.current) {
      handleSaveMindMap(me.current.getData(), state.currentFilePath);
    }
  }, [state.currentFilePath, handleSaveMindMap]);

  const handleDoubleClick = useCallback(() => {
    console.log('ダブルクリックがあった');
  }, []);

  // インスタンスを生成
  const initializeMindMap = useCallback((data?: MindElixirData) => {
    if (me.current) {
      console.log('remove event listener');
      
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
      instance.init(data);
    } else {
      instance.init(MindElixir.new("new topic"));
    }

    console.log('add event listener');
    instance.bus.addListener('operation', operationListener);
    instance.mindElixirBox.addEventListener('dblclick', handleDoubleClick);
    me.current = instance;
  }, [operationListener]);

  // ファイルを選択して読み込む
  const handleFileSelect = async () => {
    try {
      const filePath = await window.FileIO.select({
        properties: ['openFile'],
        filters: [{ name: 'JSON', extensions: ['json'] }]
      });
      
      if (filePath) {
        const data = await loadMindMap(filePath);
        updateState({ currentFilePath: filePath, currentData: data });
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      updateState({ error: 'Failed to select file: ' + (error instanceof Error ? error.message : String(error)) });
    }
  };

  return {
    state,
    initializeMindMap,
    handleFileSelect,
  };
};
