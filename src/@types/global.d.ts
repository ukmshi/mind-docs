export declare global {
  interface Window {
    FileIO: {
      counter: (count: number) => number;
      read: (filePath: string) => Promise<string>;
      write: (filePath: string, content: string) => Promise<void>;
      select: (options: Electron.OpenDialogOptions) => Promise<string | null>;
    };
  }
}
