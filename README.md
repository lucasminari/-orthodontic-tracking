# Sistema de Acompanhamento OrthoDontic

Sistema independente para monitorar e gerenciar conversas do Kommo CRM da rede OrthoDontic (Central do Sorriso).

## Objetivo

Substituir vigilância manual de conversas da IA Olívia (chatbot WhatsApp), detectando automaticamente quando há necessidade de intervenção humana (~10 intervenções/dia atualmente).

## Estrutura do Projeto

```
orthodontic-tracking/
├── backend/          # NestJS + TypeScript
├── frontend/         # Next.js 14 + TypeScript
├── docker-compose.yml
└── README.md
```

## Módulos do Sistema

### 1. Dashboard
- Métricas em tempo real por unidade
- Leads do dia
- Funil com taxa de conversão
- Agendamentos pendentes
- Comparativo semanal

### 2. Central de Atenção
- Fila priorizada de conversas
- Detecção de: timeout da IA, frustração, pedido de humano, repetição
- Notificação push ao gerente da unidade
- Link direto para Kommo

### 3. Ingestão Kommo
- Webhook em tempo real
- Sync periódico via API
- Segurança de transições de etapa

## Stack Técnico

- **Backend**: NestJS + TypeScript
- **Frontend**: Next.js 14 + TypeScript  
- **Banco**: PostgreSQL
- **Deploy**: Railway
- **API**: Swagger/OpenAPI

## Unidades

- Jundiaí Centro
- Várzea Paulista
- Jundiaí Hortolândia

## Princípios

- Standalone mas preparado para ser módulo de sistema maior
- Backend organizado por domínios
- Tudo configurável via variáveis de ambiente
- Frontend consome apenas API REST

## Fora de Escopo V1

- Interface própria de atendimento (reavaliável em 50+ intervenções/dia)
- Notificação por WhatsApp

## Stakeholders

- Lucas (sócio, definição de produto)
- Priscilla (sócia)
- 3 gerentes de unidade (usuários)
