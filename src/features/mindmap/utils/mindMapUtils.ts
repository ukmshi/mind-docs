import { MindElixirData } from "mind-elixir";
import { SaveStatus } from "../types/MindMapTypes";

export const saveMindMap = async (data: MindElixirData, filePath: string): Promise<void> => {
  const content = JSON.stringify(data, null, 2);
  await window.FileIO.write(filePath, content);
};

export const loadMindMap = async (filePath: string): Promise<MindElixirData> => {
  const content = await window.FileIO.read(filePath);
  return JSON.parse(content) as MindElixirData;
};

const saveStatusMessages: Record<SaveStatus, string> = {
  idle: '',
  saving: 'Saving...',
  saved: 'Saved!',
  error: 'Save failed'
};

export const getSaveStatusMessage = (status: SaveStatus): string => {
  return saveStatusMessages[status];
};
