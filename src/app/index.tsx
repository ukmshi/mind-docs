import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './routes';

import { AppProvider } from './main-provider';

const AppRouter = () => {

  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      {/* <AppRouter /> */}
      <h1>aaaaaaaa</h1>
    </AppProvider>
  );
}

export default App;