export declare global {
  interface Window {
    FileIO: {
      counter: (count: number) => number;
      readFile: (filePath: string) => string;    
    };
  }
}
