import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './routes';
import { AppProvider } from './main-provider';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const AppRouter = () => {

  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

function App() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  return (
    <AppProvider>
      {/* <AppRouter /> */}
      <h1>aaaaaaaa</h1>
      <BlockNoteView editor={editor} />
    </AppProvider>
  );
}

export default App;