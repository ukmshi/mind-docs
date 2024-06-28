export declare global {
  interface Window {
    FileIO: {
      read: (filePath: string) => Promise<string>;
      write: (filePath: string, content: string) => Promise<void>;
      select: (options: Electron.OpenDialogOptions) => Promise<string | null>;
    };
  }
}
