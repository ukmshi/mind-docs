// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("FileIO", {
  read: (filePath) => ipcRenderer.invoke('read', filePath),
  write: (filePath: string, content: string) => ipcRenderer.invoke('write', filePath, content),
});