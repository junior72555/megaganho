interface BadgeErrorsMessageProps {
  type: string;
  message: string;
}

export default function BadgeErrorsMessage({ type, message }: BadgeErrorsMessageProps) {
  return (
    <>
      {type === 'error' && message.length && (
        <div className="bg-red-800/50 text-red-200 w-full rounded p-2 mb-4 text-center">
          {message}
        </div>
      )}

      {type === 'success' && message.length && (
        <div className="bg-green-900/50 text-green-500 w-full rounded p-2 mb-4 text-center">
          {message}
        </div>
      )}

      {type === 'loading' && (
        <div className="bg-sky-900/50 text-sky-500 w-full rounded p-2 mb-4 text-center">Carregando...</div>
      )}
    </>
  )
}