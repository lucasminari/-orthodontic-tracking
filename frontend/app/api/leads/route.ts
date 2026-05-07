import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      name: 'Maria Silva',
      phone: '+55 11 98765-4321',
      stage: 'Em Atendimento',
      lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      unitName: 'Unidade Centro',
    },
    {
      id: '2',
      name: 'João Santos',
      phone: '+55 11 91234-5678',
      stage: 'Consulta Agendada',
      lastMessageAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      unitName: 'Unidade Centro',
    },
    {
      id: '3',
      name: 'Ana Costa',
      phone: '+55 11 99876-5432',
      stage: 'Novo Lead',
      lastMessageAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      unitName: 'Unidade Sul',
    },
    {
      id: '4',
      name: 'Carlos Oliveira',
      phone: '+55 11 98888-7777',
      stage: 'Consulta Realizada',
      lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      unitName: 'Unidade Norte',
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      phone: '+55 11 97777-8888',
      stage: 'Tratamento Iniciado',
      lastMessageAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      unitName: 'Unidade Centro',
    },
  ]);
}
