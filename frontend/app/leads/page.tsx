'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from '@/app/components/StatusBadge';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';

interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  stage: string;
  lastMessageAt?: string;
  lastMessageContent?: string;
  metadata?: Record<string, any>;
}

interface Unit {
  id: string;
  name: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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

    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/leads/unit/${selectedUnit}`,
          {
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error('Falha ao carregar leads');
        }

        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar dados'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();

    // Refresh every 30 seconds
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, [selectedUnit]);

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stageColors: Record<string, string> = {
    lead: 'text-blue-400',
    interessado: 'text-purple-400',
    proposta: 'text-yellow-400',
    cliente: 'text-green-400',
    perda: 'text-red-400',
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leads</h1>
          <p className="text-slate-400">
            Visualize e gerencie todos os leads da sua clínica
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total de Leads</p>
            <p className="text-3xl font-bold">{leads.length}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Ativos (7 dias)</p>
            <p className="text-3xl font-bold text-blue-400">
              {
                leads.filter((l) => {
                  if (!l.lastMessageAt) return false;
                  const lastMsg = new Date(l.lastMessageAt);
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                  return lastMsg > sevenDaysAgo;
                }).length
              }
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Clientes</p>
            <p className="text-3xl font-bold text-green-400">
              {leads.filter((l) => l.stage === 'cliente').length}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Taxa Conversão</p>
            <p className="text-3xl font-bold text-purple-400">
              {leads.length > 0
                ? Math.round(
                    (leads.filter((l) => l.stage === 'cliente').length /
                      leads.length) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">
              Filtrar por Unidade
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white hover:border-blue-500 transition"
            >
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Buscar Lead
            </label>
            <input
              type="text"
              placeholder="Nome, telefone ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 hover:border-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {/* Leads Table */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredLeads.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
            <p className="text-slate-400 text-lg">
              {searchTerm ? 'Nenhum lead encontrado' : 'Nenhum lead cadastrado'}
            </p>
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Nome
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Contato
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Etapa
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Última Msg
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-300">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-slate-700/30 transition cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="text-slate-400">
                          {lead.phone && <p>{lead.phone}</p>}
                          {lead.email && <p>{lead.email}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${
                            stageColors[lead.stage] || 'text-slate-400'
                          }`}
                        >
                          {lead.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {lead.lastMessageContent && (
                          <p className="text-sm text-slate-400 truncate max-w-xs">
                            "{lead.lastMessageContent.substring(0, 40)}..."
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {lead.lastMessageAt
                          ? new Date(lead.lastMessageAt).toLocaleDateString(
                              'pt-BR'
                            )
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lead Details Modal */}
        {selectedLead && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLead(null)}
          >
            <div
              className="bg-slate-800 border border-slate-700 rounded-lg p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {selectedLead.phone && (
                  <div>
                    <p className="text-sm text-slate-400">Telefone</p>
                    <p className="font-medium">{selectedLead.phone}</p>
                  </div>
                )}
                {selectedLead.email && (
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="font-medium">{selectedLead.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-slate-400">Etapa</p>
                  <p
                    className={`font-medium text-lg ${
                      stageColors[selectedLead.stage] || 'text-slate-300'
                    }`}
                  >
                    {selectedLead.stage}
                  </p>
                </div>
                {selectedLead.lastMessageAt && (
                  <div>
                    <p className="text-sm text-slate-400">Última Mensagem</p>
                    <p className="text-sm">
                      {new Date(selectedLead.lastMessageAt).toLocaleString(
                        'pt-BR'
                      )}
                    </p>
                    {selectedLead.lastMessageContent && (
                      <p className="text-sm text-slate-400 mt-2 italic">
                        "{selectedLead.lastMessageContent}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
