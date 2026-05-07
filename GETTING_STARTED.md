# 🚀 Começando - Sistema de Acompanhamento OrthoDontic

## Pré-requisitos

- Node.js 18+
- PostgreSQL 14+ (ou use Docker)
- npm ou yarn

## Estrutura do Projeto

```
orthodontic-tracking/
├── backend/          # API NestJS
├── frontend/         # Interface Next.js 14
├── docker-compose.yml
└── README.md
```

## 1️⃣ Configurar Banco de Dados

### Opção A: Com Docker (recomendado)

```bash
docker-compose up -d
```

Isso inicia PostgreSQL em `localhost:5432`

### Opção B: PostgreSQL Local

Crie um banco de dados:

```sql
CREATE DATABASE orthodontic_tracking;
```

## 2️⃣ Backend (NestJS)

### Configurar variáveis de ambiente

```bash
cd backend
cp .env.example .env
# Edite .env com suas credenciais do Kommo
```

Variáveis necessárias:
- `KOMMO_API_TOKEN` - Token API do Kommo
- `KOMMO_ACCOUNT_ID` - ID da conta Kommo
- `KOMMO_WEBHOOK_SECRET` - Secret para validar webhooks

### Instalar dependências

```bash
npm install
```

### Rodar migrations e seed (se houver)

```bash
npm run migration:generate -- CreateInitial
npm run migration:run
```

### Iniciar servidor

```bash
npm run start:dev
```

Servidor rodará em `http://localhost:3001`
API docs em `http://localhost:3001/api/docs`

## 3️⃣ Frontend (Next.js)

### Configurar variáveis de ambiente

```bash
cd frontend
cp .env.example .env.local
# Variáveis já estão configuradas para dev
```

### Instalar dependências

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

Frontend rodará em `http://localhost:3000`

## 📡 Integração Kommo

### Webhook

A API exponibiliza:

```
POST /kommo/webhooks
```

Configure no Kommo para enviar eventos para:

```
https://{seu_dominio}/kommo/webhooks
```

Verifique em `kommo.service.ts` a validação do `KOMMO_WEBHOOK_SECRET`

## 📊 Módulos da API

### Leads (`/leads`)

- `GET /leads` - Leads do dia
- `GET /leads/:leadId` - Detalhes de um lead
- `GET /leads/unit/:unitId` - Leads de uma unidade

### Atenção (`/attention`)

- `GET /attention/units/:unitId/pending` - Itens pendentes
- `GET /attention/units/:unitId?status=pending` - Filtrar por status
- `POST /attention` - Criar item de atenção
- `PATCH /attention/:itemId/resolve` - Resolver item

### Dashboard (`/dashboard`)

- `GET /dashboard` - Overview de todas as unidades
- `GET /dashboard/units/:unitId` - Métricas da unidade
- `GET /dashboard/units/:unitId/funnel` - Funil de vendas

### Kommo (`/kommo`)

- `GET /kommo/leads/:leadId` - Lead do Kommo
- `GET /kommo/leads/:leadId/conversations` - Conversas
- `POST /kommo/webhooks` - Receber eventos

### Auth (`/auth`)

- `POST /auth/login` - Login
- `GET /auth/users/:userId` - Dados do usuário

## 🗄️ Banco de Dados

### Entidades

| Tabela | Descrição |
|--------|-----------|
| `tracking_units` | Unidades (Jundiaí, Várzea, etc) |
| `tracking_leads` | Leads/contatos |
| `tracking_conversations` | Mensagens da conversa |
| `tracking_stage_transitions` | Histórico de etapas |
| `tracking_attention_items` | Fila de atenção |
| `tracking_users` | Gerentes de unidades |

## 🔐 Detecção de Atenção Necessária

A Central de Atenção detecta automaticamente:

1. **Timeout da IA** - Olívia não respondeu em X minutos
2. **Palavras de frustração** - "nunca", "impossível", "problema", etc
3. **Pedido de humano** - Cliente pediu para falar com gerente
4. **Repetição de mensagens** - Cliente repete mensagem

## 📝 Próximos Passos

- [ ] Implementar autenticação JWT completa
- [ ] Conectar API real do Kommo
- [ ] Criar interface de notificações push
- [ ] Implementar refresh token
- [ ] Adicionar testes unitários
- [ ] Deploy em Railway

## 🆘 Troubleshooting

**Erro ao conectar banco**
- Verifique se PostgreSQL está rodando
- Confirme credenciais em `.env`
- Verifique porta 5432

**Erro ao rodar migrations**
- Execute `npm run migration:generate`
- Depois `npm run migration:run`

**CORS error no frontend**
- Verifique `NEXT_PUBLIC_API_URL` em `.env.local`
- Confirme que backend permite origem do frontend
