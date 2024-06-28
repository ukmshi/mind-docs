import { FallbackProps } from "react-error-boundary";

export const MainErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div
      className='text-red-500 w-screen h-screen flex flex-col justify-center items-center'
      role='alert'
    >
      <h2 className='text-2xl font-bold mb-4'>申し訳ありません。エラーが発生しました。</h2>
      <p className='text-lg mb-4'>エラーの詳細: {error.message}</p>
      <p className='mb-4'>このエラーは一時的なものかもしれません。以下のオプションをお試しください：</p>
      <ul className='list-disc list-inside mb-4'>
        <li>ページを再読み込みする</li>
        <li>ブラウザのキャッシュをクリアする</li>
        <li>しばらくしてから再度アクセスする</li>
      </ul>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={resetErrorBoundary}
      >
        もう一度試す
      </button>
      <p className='mt-4'>
        問題が解決しない場合は、
        <a href="mailto:support@example.com" className='text-blue-500 hover:underline'>
          サポートチーム
        </a>
        までお問い合わせください。
      </p>
    </div>
  );
};