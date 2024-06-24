import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { PartialBlock } from "@blocknote/core";

export const BlockNote = () => {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'heading',
        content: 'test',
      } as PartialBlock,
    ],
  });

  return <BlockNoteView editor={editor} />;
}
