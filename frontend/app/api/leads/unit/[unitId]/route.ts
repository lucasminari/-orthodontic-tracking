import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await params;

  const allLeads = [
    {
      id: '1',
      name: 'Maria Silva',
      phone: '+55 11 98765-4321',
      email: 'maria.silva@email.com',
      stage: 'Em Atendimento',
      lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      lastMessageContent: 'Gostaria de saber mais sobre o tratamento',
      unitId: '1',
    },
    {
      id: '2',
      name: 'João Santos',
      phone: '+55 11 91234-5678',
      email: 'joao.santos@email.com',
      stage: 'Consulta Agendada',
      lastMessageAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      lastMessageContent: 'Confirmo presença',
      unitId: '1',
    },
    {
      id: '3',
      name: 'Ana Costa',
      phone: '+55 11 99876-5432',
      email: 'ana.costa@email.com',
      stage: 'Novo Lead',
      lastMessageAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      lastMessageContent: 'Olá, vi a propaganda',
      unitId: '2',
    },
    {
      id: '4',
      name: 'Carlos Oliveira',
      phone: '+55 11 98888-7777',
      email: 'carlos.oliveira@email.com',
      stage: 'Consulta Realizada',
      lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastMessageContent: 'Obrigado pelo atendimento',
      unitId: '3',
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      phone: '+55 11 97777-8888',
      email: 'fernanda.lima@email.com',
      stage: 'Tratamento Iniciado',
      lastMessageAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastMessageContent: 'Pronta para iniciar',
      unitId: '1',
    },
    {
      id: '6',
      name: 'Pedro Almeida',
      phone: '+55 11 97777-1111',
      email: 'pedro.almeida@email.com',
      stage: 'Em Atendimento',
      lastMessageAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      lastMessageContent: 'Vou pensar e retorno',
      unitId: '3',
    },
    {
      id: '7',
      name: 'Juliana Mendes',
      phone: '+55 11 96666-2222',
      email: 'juliana.mendes@email.com',
      stage: 'Consulta Agendada',
      lastMessageAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      lastMessageContent: 'Confirmo a consulta',
      unitId: '2',
    },
  ];

  const filtered = allLeads.filter((lead) => lead.unitId === unitId);
  return NextResponse.json(filtered);
}
