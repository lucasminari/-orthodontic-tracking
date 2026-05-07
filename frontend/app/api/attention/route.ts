import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      leadName: 'Maria Silva',
      phone: '+55 11 98765-4321',
      reason: 'Sem resposta há 3 dias',
      priority: 'high',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
    },
    {
      id: '2',
      leadName: 'João Santos',
      phone: '+55 11 91234-5678',
      reason: 'Consulta não confirmada',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
    },
    {
      id: '3',
      leadName: 'Ana Costa',
      phone: '+55 11 99876-5432',
      reason: 'Reagendamento solicitado',
      priority: 'low',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
    },
  ]);
}
