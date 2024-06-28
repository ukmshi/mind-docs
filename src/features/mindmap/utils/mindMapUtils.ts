import { NodeObj } from "mind-elixir";
import { SaveStatus } from "../types/MindMapTypes";

export const saveMindMap = async (data: NodeObj, filePath: string): Promise<void> => {
  const content = JSON.stringify(data, null, 2);
  await window.FileIO.write(filePath, content);
};

export const loadMindMap = async (filePath: string): Promise<NodeObj> => {
  const content = await window.FileIO.read(filePath);
  return JSON.parse(content) as NodeObj;
};

export const saveStateToJSON = (state: NodeObj): string => {
  return JSON.stringify(state, null, 2);
};

export const loadStateFromJSON = (json: string): NodeObj => {
  return JSON.parse(json) as NodeObj;
};

export const selectJSONFile = async (forSaving: boolean = false): Promise<string | null> => {
  const properties = forSaving ? ['saveFile'] : ['openFile'];
  return await window.FileIO.select({
    properties,
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
};

export const saveStateToJSONFile = async (data: NodeObj): Promise<void> => {
  const json = saveStateToJSON(data);
  const filePath = await selectJSONFile(true);
  
  if (filePath) {
    await window.FileIO.write(filePath, json);
    console.log('State saved to JSON successfully');
  }
};

export const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const clonedObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
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
