'use client';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({
  message = 'Ocorreu um erro ao carregar os dados. Tente novamente.',
}: ErrorMessageProps) {
  return (
    <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
      <p className="text-red-300">⚠️ {message}</p>
    </div>
  );
}
