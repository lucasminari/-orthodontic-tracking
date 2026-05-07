'use client';

interface MetricsCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: 'up' | 'down' | 'neutral';
}

export function MetricsCard({
  icon,
  label,
  value,
  trend,
  trendColor = 'neutral',
}: MetricsCardProps) {
  const trendColorClass = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-slate-400',
  }[trendColor];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && <p className={`text-sm mt-2 ${trendColorClass}`}>{trend}</p>}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
