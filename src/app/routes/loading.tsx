import { BlockNote } from "@/features/blocknote/components/blocknote";
import { MindMap } from "@/features/mindmap/components/maindamp";
import { useEffect, useState } from "react";

export const LandingRoute = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const readFile = async () => {
      try {
        const content = await window.FileIO.read('/Users/ukmashi/mind-docs/README.md');
        setFileContent(content);
        console.log(content);
      } catch (error) {
        console.error('Error reading file:', error);
        setError('Error reading file: ' + (error instanceof Error ? error.message : String(error)));
      }
    };

    readFile();
  }, []);


  return (
    <>
      {/* <BlockNote /> */}
      <MindMap />
    </>
  );
};