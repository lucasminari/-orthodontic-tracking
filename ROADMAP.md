# 🗺️ Roadmap - Sistema de Acompanhamento OrthoDontic

## Fase 1: Infraestrutura ✅ CONCLUÍDA
- [x] Scaffold NestJS + TypeScript
- [x] Scaffold Next.js 14 + TypeScript
- [x] Entidades TypeORM
- [x] Estrutura de domínios (auth, kommo, leads, attention, dashboard)
- [x] Variáveis de ambiente
- [x] Docker Compose (PostgreSQL)
- [x] Swagger/OpenAPI

## Fase 2: API Core (PRÓXIMA - 2-3 dias)

### 2.1 Autenticação
- [ ] Implementar JWT completo (geração, validação, refresh)
- [ ] Hash de senhas (bcrypt)
- [ ] Guards de autenticação
- [ ] Testes de login/logout

### 2.2 Integração Kommo
- [ ] Implementar chamadas reais à API do Kommo
  - [ ] GET /leads
  - [ ] GET /leads/:id
  - [ ] GET /leads/:id/notes (conversas)
- [ ] Validação de webhook (HMAC)
- [ ] Processamento de eventos do Kommo
- [ ] Sync periódico via job (Bull queue)

### 2.3 Gestão de Leads
- [ ] Upsert de leads (criar/atualizar do Kommo)
- [ ] Rastreamento de conversas
- [ ] Rastreamento de transições de etapa
- [ ] Filtros avançados (data, etapa, unidade)

### 2.4 Central de Atenção
- [ ] Detectar timeout da IA (configurável por unidade)
- [ ] Análise de sentimento (palavras de frustração)
- [ ] Detectar repetição de mensagens
- [ ] Detectar pedido de humano (keywords)
- [ ] Priorização inteligente
- [ ] Testes unitários

### 2.5 Dashboard
- [ ] Métricas em tempo real
  - [ ] Leads do dia
  - [ ] Taxa de conversão
  - [ ] Tempo médio de atendimento
  - [ ] Agendamentos pendentes
- [ ] Histórico de 7 dias
- [ ] Comparativo entre unidades

## Fase 3: Frontend (3-4 dias)

### 3.1 Autenticação
- [ ] Página de login
- [ ] JWT storage seguro (httpOnly cookie)
- [ ] Logout e expiração

### 3.2 Dashboard
- [ ] Cards de métricas
- [ ] Gráficos (Chart.js ou Recharts)
- [ ] Filtros por unidade
- [ ] Refresh em tempo real (websocket ou polling)

### 3.3 Central de Atenção
- [ ] Tabela de itens pendentes
- [ ] Ordenação por prioridade
- [ ] Link para Kommo CRM
- [ ] Botões resolve/dismiss
- [ ] Badge de notificações
- [ ] Filtros (unidade, motivo, status)

### 3.4 Leads
- [ ] Listagem com paginação
- [ ] Detalhes do lead (histórico de conversas)
- [ ] Timeline de etapas
- [ ] Busca avançada

## Fase 4: Notificações (2 dias)

### 4.1 Push Notifications
- [ ] WebSocket para notificações em tempo real
- [ ] Service Worker para background notifications
- [ ] Permissões do navegador
- [ ] Preferências por usuário

### 4.2 Badge de Atenção
- [ ] Contador de pendentes (UI)
- [ ] Som/notificação ao novo item
- [ ] Notificar apenas gerente da unidade

## Fase 5: Testes & Qualidade (2-3 dias)

### 5.1 Backend
- [ ] Testes unitários (jest)
- [ ] Testes de integração
- [ ] Testes de webhook
- [ ] Coverage > 80%

### 5.2 Frontend
- [ ] Testes unitários (jest + React Testing Library)
- [ ] Testes E2E (Cypress/Playwright)
- [ ] Accessibility (a11y)

### 5.3 Performance
- [ ] Otimização de queries (índices)
- [ ] Caching (Redis)
- [ ] Lazy loading no frontend
- [ ] Code splitting

## Fase 6: Deploy & Produção (2 dias)

### 6.1 Railway
- [ ] PostgreSQL managed
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] CI/CD (GitHub Actions)

### 6.2 Monitoramento
- [ ] Sentry (error tracking)
- [ ] LogRocket (frontend)
- [ ] Uptime monitoring

### 6.3 Segurança
- [ ] HTTPS/SSL
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input validation/sanitization
- [ ] Audit logs

## Fase 7: Enhancements (Ongoing)

### 7.1 IA & Automation
- [ ] Análise de sentimento mais sofisticada
- [ ] Predição de churn
- [ ] Auto-categorização de leads

### 7.2 Relatórios
- [ ] Exportar para Excel/PDF
- [ ] Agendamento de relatórios
- [ ] Dashboards customizáveis

### 7.3 Integrações Adicionais
- [ ] Google Calendar (agendar)
- [ ] Slack (notificações)
- [ ] WhatsApp (resposta automática)

### 7.4 Interface de Atendimento
- [ ] Quando passar de 50 intervenções/dia
- [ ] Chat interno integrado
- [ ] Histórico de atendimentos

## Dependências Entre Fases

```
Fase 1 (Infra) ✅
    ↓
Fase 2 (API Core) → Fase 3 (Frontend)
    ↓
Fase 4 (Notificações)
    ↓
Fase 5 (Testes)
    ↓
Fase 6 (Deploy)
    ↓
Fase 7 (Enhancements)
```

## Estimativa Total

| Fase | Estimado |
|------|----------|
| 1 | ✅ Concluído |
| 2 | 2-3 dias |
| 3 | 3-4 dias |
| 4 | 2 dias |
| 5 | 2-3 dias |
| 6 | 2 dias |
| **Total** | **~2-2.5 semanas** |

## Prioridades

🔴 **Critical (Sprint 1)**
- Integração completa Kommo
- Central de Atenção funcionando
- Dashboard básico
- Autenticação JWT

🟡 **High (Sprint 2)**
- Frontend completo
- Notificações
- Testes

🟢 **Nice-to-have (Sprint 3+)**
- IA avançada
- Integrações adicionais
- Interface de atendimento

---

**Última atualização:** 7 de Maio de 2026
