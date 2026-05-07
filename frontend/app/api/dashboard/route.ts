import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalLeads: 127,
    activeLeads: 84,
    conversionRate: 66,
    pendingAttention: 12,
    avgResponseTime: 45,
    satisfactionRate: 92,
    funnel: [
      { stage: 'Novo Lead', count: 43, percentage: 34 },
      { stage: 'Em Atendimento', count: 38, percentage: 30 },
      { stage: 'Consulta Agendada', count: 25, percentage: 20 },
      { stage: 'Consulta Realizada', count: 14, percentage: 11 },
      { stage: 'Tratamento Iniciado', count: 7, percentage: 5 },
    ],
  });
}
