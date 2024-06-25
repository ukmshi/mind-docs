import { MindElixirData, MindElixirInstance } from "mind-elixir";

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface MindMapState {
  saveStatus: SaveStatus;
  error: string | null;
  currentFilePath: string | null;
  currentData: MindElixirData | null;
}
