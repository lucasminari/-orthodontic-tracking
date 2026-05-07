export default function Home() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="text-6xl mb-6">🦷</div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          OrthoDontic Tracking
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Sistema inteligente de acompanhamento para clínicas ortodônticas.
          Monitore leads, detecte quando a IA precisa de ajuda, e acompanhe conversas em tempo real.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-bold text-lg mb-2">Dashboard</h3>
            <p className="text-slate-400 text-sm">Métricas em tempo real de leads e conversões</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="font-bold text-lg mb-2">Central de Atenção</h3>
            <p className="text-slate-400 text-sm">Detecta quando a IA trava ou cliente quer falar</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-green-500 transition">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-bold text-lg mb-2">Leads</h3>
            <p className="text-slate-400 text-sm">Gestão completa de contatos e conversas</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/dashboard"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition"
          >
            📊 Ir para Dashboard
          </a>
          <a
            href="/attention"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition"
          >
            🚨 Central de Atenção
          </a>
          <a
            href="/leads"
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition"
          >
            👥 Leads
          </a>
        </div>

        <div className="mt-12 text-slate-400 text-sm">
          <p>API docs disponível em <a href="http://localhost:3001/api/docs" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">localhost:3001/api/docs</a></p>
        </div>
      </div>
    </div>
  );
}
