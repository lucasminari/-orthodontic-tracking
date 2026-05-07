'use client';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }[size];

  const statusConfig: Record<
    string,
    {
      bg: string;
      text: string;
      label: string;
    }
  > = {
    pending: { bg: 'bg-yellow-900/30', text: 'text-yellow-300', label: 'Pendente' },
    in_progress: {
      bg: 'bg-blue-900/30',
      text: 'text-blue-300',
      label: 'Em Andamento',
    },
    resolved: { bg: 'bg-green-900/30', text: 'text-green-300', label: 'Resolvido' },
    dismissed: { bg: 'bg-slate-700', text: 'text-slate-300', label: 'Descartado' },
    ai_timeout: {
      bg: 'bg-red-900/30',
      text: 'text-red-300',
      label: 'Timeout IA',
    },
    frustration_words: {
      bg: 'bg-orange-900/30',
      text: 'text-orange-300',
      label: 'Palavras Frustração',
    },
    human_request: {
      bg: 'bg-blue-900/30',
      text: 'text-blue-300',
      label: 'Solicitação Humana',
    },
    message_repetition: {
      bg: 'bg-purple-900/30',
      text: 'text-purple-300',
      label: 'Repetição Mensagem',
    },
    manual: { bg: 'bg-indigo-900/30', text: 'text-indigo-300', label: 'Manual' },
  };

  const config = statusConfig[status] || {
    bg: 'bg-slate-700',
    text: 'text-slate-300',
    label: status,
  };

  return (
    <span className={`${sizeClass} rounded-full font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
