'use client';

import { useEffect, useState } from 'react';
import { MetricsCard } from '@/app/components/MetricsCard';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';

interface DashboardMetrics {
  totalLeads: number;
  activeLeads: number;
  conversionRate: number;
  pendingAttention: number;
  avgResponseTime: number;
  satisfactionRate: number;
  funnel: {
    stage: string;
    count: number;
    percentage: number;
  }[];
}

interface Unit {
  id: string;
  name: string;
  location: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const metricsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
          {
            cache: 'no-store',
          }
        );

        if (!metricsRes.ok) {
          throw new Error('Falha ao carregar métricas');
        }

        const metricsData = await metricsRes.json();
        setMetrics(metricsData);

        // Mock units data - in production, this would come from an API
        setUnits([
          {
            id: '1',
            name: 'Jundiaí Centro',
            location: 'Jundiaí - SP',
          },
          {
            id: '2',
            name: 'Várzea Paulista',
            location: 'Várzea Paulista - SP',
          },
          {
            id: '3',
            name: 'Hortolândia',
            location: 'Hortolândia - SP',
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar dados'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh metrics every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-8">
          Acompanhe as métricas em tempo real de todas as unidades
        </p>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <MetricsCard
            icon="👥"
            label="Total de Leads"
            value={metrics?.totalLeads || 0}
            trend="+12 nesta semana"
            trendColor="up"
          />
          <MetricsCard
            icon="💬"
            label="Leads Ativos"
            value={metrics?.activeLeads || 0}
            trend="+8 hoje"
            trendColor="up"
          />
          <MetricsCard
            icon="📈"
            label="Taxa de Conversão"
            value={`${metrics?.conversionRate || 0}%`}
            trend="+2.5% vs semana passada"
            trendColor="up"
          />
          <MetricsCard
            icon="🚨"
            label="Atenção Pendente"
            value={metrics?.pendingAttention || 0}
            trend={
              (metrics?.pendingAttention || 0) > 5
                ? 'Verificar itens críticos'
                : 'Situação normal'
            }
            trendColor={
              (metrics?.pendingAttention || 0) > 5 ? 'down' : 'up'
            }
          />
          <MetricsCard
            icon="⏱️"
            label="Tempo Resp. Médio"
            value={`${metrics?.avgResponseTime || 0}s`}
            trend="-5s vs semana passada"
            trendColor="up"
          />
          <MetricsCard
            icon="⭐"
            label="Taxa Satisfação"
            value={`${metrics?.satisfactionRate || 0}%`}
            trend="+1.2% vs semana passada"
            trendColor="up"
          />
        </div>

        {/* Units Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏥</span>
                <div>
                  <h3 className="font-bold text-lg">{unit.name}</h3>
                  <p className="text-sm text-slate-400">{unit.location}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Leads ativos</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Conv. pendentes</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Atenções</span>
                  <span className="font-bold text-yellow-400">2</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Funil de Vendas</h2>
          <div className="space-y-4">
            {metrics?.funnel && metrics.funnel.length > 0 ? (
              metrics.funnel.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">{stage.stage}</span>
                    <span className="font-bold">
                      {stage.count} leads ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${stage.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Sem dados disponíveis</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
