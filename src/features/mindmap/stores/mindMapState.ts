import { atom, selector } from 'recoil';
import { MindElixirData } from 'mind-elixir';
import { SaveStatus } from '../types/MindMapTypes';

export const mindMapDataState = atom<MindElixirData | null>({
  key: 'mindMapDataState',
  default: null,
});

export const currentFilePathState = atom<string | null>({
  key: 'currentFilePathState',
  default: null,
});

export const saveStatusState = atom<SaveStatus>({
  key: 'saveStatusState',
  default: 'idle',
});

export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});

export const mindMapState = selector({
  key: 'mindMapState',
  get: ({ get }) => ({
    currentData: get(mindMapDataState),
    currentFilePath: get(currentFilePathState),
    saveStatus: get(saveStatusState),
    error: get(errorState),
  }),
});