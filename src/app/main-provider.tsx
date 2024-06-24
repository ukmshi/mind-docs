import * as React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { MainErrorFallback } from '@/components/errors/main';
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    // ここでエラーをログに記録したり、エラー追跡サービスに送信したりできます
    console.error("Caught an error:", error, info);
  };  

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          読み込み中
          {/* <Spinner size="xl" /> */}
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback} onError={handleError}>
        {/* <Notifications /> */}
        {children}
      </ErrorBoundary>
    </React.Suspense>
  );
};