import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await params;

  // Mock data baseado na unidade
  const allItems = [
    {
      id: '1',
      reason: 'Sem resposta há 3 dias',
      status: 'pending',
      description: 'Lead não respondeu após última mensagem',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      unitId: '1',
      lead: {
        name: 'Maria Silva',
        phone: '+55 11 98765-4321',
        lastMessageContent: 'Gostaria de saber mais sobre o tratamento',
      },
    },
    {
      id: '2',
      reason: 'Consulta não confirmada',
      status: 'pending',
      description: 'Consulta agendada para amanhã sem confirmação',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      unitId: '1',
      lead: {
        name: 'João Santos',
        phone: '+55 11 91234-5678',
        lastMessageContent: 'Confirmo presença',
      },
    },
    {
      id: '3',
      reason: 'Reagendamento solicitado',
      status: 'pending',
      description: 'Cliente solicitou reagendamento',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      unitId: '2',
      lead: {
        name: 'Ana Costa',
        phone: '+55 11 99876-5432',
        lastMessageContent: 'Posso reagendar para a próxima semana?',
      },
    },
    {
      id: '4',
      reason: 'Lead frio',
      status: 'pending',
      description: 'Sem interação há mais de 7 dias',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      unitId: '3',
      lead: {
        name: 'Pedro Almeida',
        phone: '+55 11 97777-1111',
        lastMessageContent: 'Vou pensar e retorno',
      },
    },
  ];

  const filtered = allItems.filter((item) => item.unitId === unitId);
  return NextResponse.json(filtered);
}
