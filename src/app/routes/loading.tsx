import { BlockNote } from "@/features/blocknote/components/blocknote";
import { MindMap } from "@/features/mindmap/components/maindamp";
import { useEffect, useState } from "react";

export const LandingRoute = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    try {
      const content = window.FileIO.readFile('/Users/ukmashi/mind-docs/README.md');
      setFileContent(content);
      console.log(content);
    } catch (error) {
      console.error('Error reading file:', error);
      setFileContent('Error reading file');
    }
  }, []);

  return (
    <>
      {/* <BlockNote /> */}
      <MindMap />
    </>
  );
};