'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from '@/app/components/StatusBadge';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';

interface AttentionItem {
  id: string;
  reason: string;
  status: string;
  description?: string;
  createdAt: string;
  lead?: {
    name: string;
    phone?: string;
    lastMessageContent?: string;
  };
}

interface Unit {
  id: string;
  name: string;
}

export default function AttentionCenter() {
  const [items, setItems] = useState<AttentionItem[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Mock units
  const mockUnits: Unit[] = [
    { id: '1', name: 'Jundiaí Centro' },
    { id: '2', name: 'Várzea Paulista' },
    { id: '3', name: 'Hortolândia' },
  ];

  useEffect(() => {
    setUnits(mockUnits);
    if (!selectedUnit) {
      setSelectedUnit(mockUnits[0].id);
    }
  }, []);

  useEffect(() => {
    if (!selectedUnit) return;

    const fetchAttentionItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/attention/units/${selectedUnit}/pending`,
          {
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error('Falha ao carregar itens de atenção');
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar dados'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttentionItems();

    // Refresh every 10 seconds
    const interval = setInterval(fetchAttentionItems, 10000);
    return () => clearInterval(interval);
  }, [selectedUnit]);

  const handleResolve = async (itemId: string) => {
    try {
      setActionLoading(itemId);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attention/${itemId}/resolve`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'resolved',
            resolvedBy: 'user',
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Falha ao resolver item');
      }

      // Remove from list
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao resolver item'
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDismiss = async (itemId: string) => {
    try {
      setActionLoading(itemId);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attention/${itemId}/resolve`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'dismissed',
            resolvedBy: 'user',
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Falha ao descartar item');
      }

      // Remove from list
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao descartar item'
      );
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = items.filter((item) => item.status === 'pending').length;

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Central de Atenção</h1>
          <p className="text-slate-400">
            Gerenciador de alertas e itens que precisam de atenção
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Itens Pendentes</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total de Itens</p>
            <p className="text-3xl font-bold">{items.length}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Taxa de Resolução</p>
            <p className="text-3xl font-bold text-green-400">
              {items.length > 0
                ? Math.round(
                    ((items.length - pendingCount) / items.length) * 100
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Unit Filter */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Filtrar por Unidade
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full md:w-64 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white hover:border-blue-500 transition"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        {error && <ErrorMessage message={error} />}

        {/* Attention Items Table */}
        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-400 text-lg">
              ✓ Nenhum item de atenção pendente!
            </p>
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Motivo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Criado em
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-700/30 transition"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">
                            {item.lead?.name || 'Lead sem nome'}
                          </p>
                          {item.lead?.lastMessageContent && (
                            <p className="text-sm text-slate-400 truncate">
                              "{item.lead.lastMessageContent.substring(
                                0,
                                50
                              )}..."
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={item.reason}
                          size="sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={item.status}
                          size="sm"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(item.createdAt).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleResolve(item.id)}
                            disabled={actionLoading === item.id}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition disabled:opacity-50"
                          >
                            {actionLoading === item.id ? '...' : 'Resolver'}
                          </button>
                          <button
                            onClick={() => handleDismiss(item.id)}
                            disabled={actionLoading === item.id}
                            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm font-medium transition disabled:opacity-50"
                          >
                            {actionLoading === item.id ? '...' : 'Descartar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
