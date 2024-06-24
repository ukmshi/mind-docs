export declare global {
  interface Window {
    FileIO: {
      counter: (count: number) => number;
      read: (filePath: string) => string;
      write: (filePath: string, content: string) => void;
    };
  }
}
