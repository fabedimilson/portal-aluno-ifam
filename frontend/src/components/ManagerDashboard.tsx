import React, { useState } from 'react';
import { 
  Users, Briefcase, GraduationCap, TrendingUp, Search, Filter, 
  MoreHorizontal, CheckCircle2, Clock, AlertCircle, FileText, 
  Info, Download, Eye, Check, X, ArrowLeft, Image as ImageIcon, 
  Building2, ShieldCheck, UserCheck, BarChart3, FileCheck2, History
} from 'lucide-react';

const ManagerDashboard = ({ enrollments, protocols, onUpdateEnrollment, onUpdateProtocol }: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [scope, setScope] = useState<'rede' | 'campus'>('campus');
  const [toast, setToast] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateStatus = (status: 'Deferido' | 'Indeferido') => {
    if (selectedItem.studentName) {
      onUpdateProtocol(selectedItem.id, status, status === 'Deferido' ? 'Solicitação aprovada pela secretaria.' : 'Indeferido conforme análise documental.');
      showToast(`Protocolo ${status} com sucesso!`);
    } else {
      onUpdateEnrollment(selectedItem.id, status);
      showToast(`Matrícula ${status} com sucesso!`);
    }
    setSelectedItem(null);
  };

  const handleGenerateReport = (type: string) => {
    setGenerating(type);
    setTimeout(() => {
      setGenerating(null);
      showToast(`Relatório ${type} baixado com sucesso!`);
    }, 2000);
  };

  const renderAnalysis = () => (
    <div className="analysis-view">
      <div className="analysis-header">
        <button className="btn-back" onClick={() => setSelectedItem(null)}>
          <ArrowLeft size={20} /> Voltar para a Fila
        </button>
        <div className="analysis-title">
          <h2>{selectedItem.type ? 'Análise de Protocolo' : 'Análise de Matrícula'}: {selectedItem.name}</h2>
          <p>{selectedItem.curso || selectedItem.subject} • Campus {selectedItem.campus}</p>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="doc-viewer">
          <div className="viewer-header">
            <span>Documento: <strong>{selectedItem.currentDoc || 'Documento Principal'}</strong></span>
            <div className="viewer-controls">
              <button className="btn-icon"><TrendingUp size={16} /> Girar</button>
              <button className="btn-icon"><Search size={16} /> Zoom</button>
            </div>
          </div>
          <div className="doc-placeholder">
            <ImageIcon size={48} />
            <p>Visualização do documento enviado via Celular</p>
            <small>(Preview em Alta Resolução)</small>
          </div>
        </div>

        <div className="checklist-panel">
          {!selectedItem.type ? (
            <>
              <div className="info-block-cota">
                <label>Modalidade de Concorrência</label>
                <div className="cota-badge">{selectedItem.cota || 'Ampla Concorrência'}</div>
              </div>
              <h4>Checklist de Matrícula</h4>
              <div className="check-item ok">
                <div className="check-status"><Check size={14} /></div>
                <div className="check-info"><strong>Declarações Jurídicas</strong><span>4 itens aceitos pelo candidato</span></div>
              </div>
              <div className="check-item active">
                <div className="check-status"><Clock size={14} /></div>
                <div className="check-info"><strong>RG / Identidade</strong><span>Aguardando conferência</span></div>
              </div>
            </>
          ) : (
            <>
              <div className="info-block-cota">
                <label>Tipo de Requerimento</label>
                <div className="cota-badge">{selectedItem.type}</div>
              </div>
              <h4>Validar Protocolo</h4>
              <div className="check-item active">
                <div className="check-status"><Clock size={14} /></div>
                <div className="check-info"><strong>Atestado/Documento</strong><span>Verifique a validade e datas</span></div>
              </div>
            </>
          )}

          <div className="rejection-box">
            <label>Parecer do Gestor (Opcional)</label>
            <textarea placeholder="Escreva o motivo em caso de indeferimento..."></textarea>
          </div>

          <div className="analysis-footer">
            <button className="btn-danger-outline" onClick={() => handleUpdateStatus('Indeferido')}>Indeferir Pedido</button>
            <button className="btn-primary" onClick={() => handleUpdateStatus('Deferido')}>Deferir / Aprovar</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      <div className="content-header">
        <div>
          <h2>Gestão de Performance {scope === 'rede' ? 'da Rede IFAM' : 'do Campus CMC'}</h2>
          <p>Indicadores consolidados de ensino e egressos</p>
        </div>
        <div className="header-actions">
          <div className="scope-toggle">
            <button className={`btn-scope ${scope === 'rede' ? 'active' : ''}`} onClick={() => setScope('rede')}>Rede IFAM</button>
            <button className={`btn-scope ${scope === 'campus' ? 'active' : ''}`} onClick={() => setScope('campus')}>Meu Campus</button>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon blue"><FileCheck2 size={24} /></div>
          <div className="kpi-data"><span>Matrículas Pendentes</span><h3>248</h3><small className="trend up">12 novas hoje</small></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon orange"><History size={24} /></div>
          <div className="kpi-data"><span>Protocolos Abertos</span><h3>86</h3><small className="trend">Média 4.2h resposta</small></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green"><Briefcase size={24} /></div>
          <div className="kpi-data"><span>Empregabilidade</span><h3>74.2%</h3><small className="trend up">+5% vs meta</small></div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple"><TrendingUp size={24} /></div>
          <div className="kpi-data"><span>Eficiência Global</span><h3>91%</h3><small>Metas Institucionais</small></div>
        </div>
      </div>

      <div className="dashboard-charts-grid">
        <div className="chart-card">
          <h4>Performance por Campus (Vagas Preenchidas)</h4>
          <div className="bar-chart-sim horizontal">
            {[
              { label: 'Manaus Centro', value: 98, color: 'green' },
              { label: 'Parintins', value: 85, color: 'blue' },
              { label: 'Maués', value: 72, color: 'purple' },
              { label: 'Tabatinga', value: 64, color: 'blue' }
            ].map((item, idx) => (
              <div key={idx} className="bar-group">
                <div className="bar-label">{item.label}</div>
                <div className="bar-container"><div className={`bar-fill ${item.color}`} style={{ width: `${item.value}%` }}></div></div>
                <div className="bar-value">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header-flex">
            <h4>Protocolos Recentes para Validação</h4>
            <button className="btn-text-sm" onClick={() => setActiveTab('protocolos')}>Ver fila</button>
          </div>
          <div className="activity-list">
            {protocols.slice(0, 3).map((item: any, i: number) => (
              <div key={i} className="activity-item">
                <div className="activity-avatar">{(item.studentName || item.name)[0]}</div>
                <div className="activity-info"><strong>{item.studentName || item.name}</strong><span>{item.type} • {item.campus}</span></div>
                <button className="btn-check-sm" onClick={() => setSelectedItem(item)}>Analisar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="manager-container">
      {toast && <div className="manager-toast"><CheckCircle2 size={18} /> {toast}</div>}
      <aside className="manager-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">IF</div>
          <span>Gestão IFAM</span>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><BarChart3 size={20} /> Dashboard BI</button>
          <button className={`nav-link ${activeTab === 'matriculas' ? 'active' : ''}`} onClick={() => setActiveTab('matriculas')}><UserCheck size={20} /> Matrículas <span className="badge">12</span></button>
          <button className={`nav-link ${activeTab === 'protocolos' ? 'active' : ''}`} onClick={() => setActiveTab('protocolos')}><History size={20} /> Protocolos <span className="badge">4</span></button>
          <button className={`nav-link ${activeTab === 'egressos' ? 'active' : ''}`} onClick={() => setActiveTab('egressos')}><Users size={20} /> Egressos</button>
          <button className={`nav-link ${activeTab === 'relatorios' ? 'active' : ''}`} onClick={() => setActiveTab('relatorios')}><Download size={20} /> Relatórios</button>
        </nav>
      </aside>

      <main className="manager-main">
        <header className="manager-header">
          <div className="header-search"><Search size={18} /><input type="text" placeholder="Buscar aluno, protocolo ou CPF..." /></div>
          <div className="header-profile">
            <div className="profile-info"><strong>Gestor Local</strong><span>{scope === 'rede' ? 'Pró-Reitoria de Ensino' : 'Campus Manaus Centro'}</span></div>
            <div className="profile-avatar">GC</div>
          </div>
        </header>

        <section className="manager-content">
          {selectedItem ? renderAnalysis() : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'matriculas' && (
                <div className="tab-content">
                  <div className="content-header"><h2>Fila de Pré-Matrículas</h2><span className="badge-local"><Building2 size={14} /> Apenas CMC</span></div>
                  <div className="matricula-grid">
                    {enrollments.map((item: any, i: number) => (
                      <div key={i} className="matricula-card">
                        <div className="m-card-header">
                          <div className="m-avatar">{item.name[0]}</div>
                          <div className="m-info"><strong>{item.name}</strong><span>{item.course}</span><small>{item.cota}</small></div>
                        </div>
                        <div className="m-card-footer"><button className="btn-secondary-sm" onClick={() => setSelectedItem(item)}><Eye size={14} /> Analisar</button></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'protocolos' && (
                <div className="tab-content">
                  <div className="content-header"><h2>Fila de Protocolos Acadêmicos</h2></div>
                  <div className="table-container">
                    <table className="data-table">
                      <thead><tr><th>Aluno</th><th>Tipo</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead>
                      <tbody>
                        {protocols.map((p: any, i: number) => (
                          <tr key={i}>
                            <td><strong>{p.studentName || p.name}</strong></td>
                            <td>{p.type}</td>
                            <td>{p.date}</td>
                            <td><span className={`status-dot ${p.status === 'Pendente' ? 'orange' : p.status === 'Deferido' ? 'green' : 'red'}`}></span> {p.status}</td>
                            <td><button className="btn-icon" onClick={() => setSelectedItem(p)}><Eye size={16} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === 'relatorios' && (
                <div className="tab-content">
                  <div className="content-header">
                    <div>
                      <h2>Relatórios e Auditoria</h2>
                      <p>Extraia dados consolidados da rede IFAM</p>
                    </div>
                  </div>
                  <div className="reports-grid">
                    {[
                      { id: 'PDF', title: 'Lista de Pré-Matrículas', desc: 'Consolidado de candidatos e documentos por campus.', icon: FileText },
                      { id: 'XLS', title: 'Relatório de Protocolos', desc: 'Status e tempo médio de resposta da secretaria.', icon: BarChart3 },
                      { id: 'EGRESSO', title: 'Métricas de Empregabilidade', desc: 'Mapa de atuação profissional dos egressos 2025.', icon: Briefcase }
                    ].map((report) => (
                      <div key={report.id} className="report-item">
                        <div className="r-icon"><report.icon size={28} /></div>
                        <div className="r-info">
                          <h4>{report.title}</h4>
                          <p>{report.desc}</p>
                        </div>
                        <button 
                          className={`btn-primary-sm ${generating === report.id ? 'loading' : ''}`}
                          onClick={() => handleGenerateReport(report.id)}
                          disabled={generating !== null}
                        >
                          {generating === report.id ? 'Gerando...' : 'Gerar'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <style>{`
        .manager-toast { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #1e293b; color: white; padding: 12px 24px; border-radius: 30px; display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.875rem; z-index: 1000; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: slideDown 0.3s ease; }
        @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }

        .m-badge { font-size: 0.65rem; font-weight: 800; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; margin-left: auto; }
        .m-badge.yellow { background: #fefce8; color: #a16207; }
        .m-badge.green { background: #f0fdf4; color: #166534; }
        .m-badge.blue { background: #eff6ff; color: #1e40af; }
        .m-badge.red { background: #fef2f2; color: #991b1b; }

        .reports-grid { display: grid; gap: 1.5rem; }
        .report-item { background: white; padding: 1.5rem; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 1.5rem; animation: fadeIn 0.3s ease; }
        .r-icon { width: 56px; height: 56px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #2f9e41; }
        .r-info { flex: 1; }
        .r-info h4 { margin-bottom: 4px; color: #1e293b; margin: 0; }
        .r-info p { font-size: 0.875rem; color: #64748b; margin: 0; }
        .btn-primary-sm { background: #2f9e41; color: white; border: none; padding: 8px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-primary-sm:hover { background: #166534; }
        .btn-primary-sm.loading { opacity: 0.7; cursor: wait; }
        .btn-text-sm { background: none; border: none; color: #3b82f6; font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .manager-container { display: flex; height: 100vh; background: #f8fafc; width: 100vw; }
        .manager-sidebar { width: 260px; background: #1e293b; color: white; padding: 1.5rem; display: flex; flex-direction: column; }
        .sidebar-header { display: flex; align-items: center; gap: 1rem; font-weight: 700; font-size: 1.25rem; margin-bottom: 2.5rem; }
        .sidebar-logo { background: #2f9e41; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-link { border: none; background: transparent; display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; color: #94a3b8; cursor: pointer; width: 100%; transition: all 0.2s; font-size: 0.875rem; }
        .nav-link.active, .nav-link:hover { background: #334155; color: white; }
        .badge { background: #cd191e; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px; margin-left: auto; }
        
        .manager-main { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
        .manager-header { height: 70px; background: white; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 50; }
        .header-search { display: flex; align-items: center; gap: 0.75rem; background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 20px; width: 400px; }
        .header-search input { background: transparent; border: none; outline: none; width: 100%; font-size: 0.875rem; }
        .manager-content { padding: 2rem; }
        
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .kpi-card { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 1.25rem; }
        .kpi-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .kpi-icon.blue { background: #eff6ff; color: #3b82f6; }
        .kpi-icon.green { background: #f0fdf4; color: #22c55e; }
        .kpi-icon.purple { background: #faf5ff; color: #a855f7; }
        .kpi-icon.orange { background: #fff7ed; color: #f97316; }

        .cota-badge { background: #f1f5f9; color: #475569; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; margin-top: 4px; }
        .info-block-cota { margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        .info-block-cota label { font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; }

        .scope-toggle { display: flex; background: #f1f5f9; padding: 4px; border-radius: 8px; }
        .btn-scope { background: transparent; border: none; padding: 6px 12px; font-size: 0.75rem; font-weight: 600; color: #64748b; border-radius: 6px; cursor: pointer; }
        .btn-scope.active { background: white; color: #2f9e41; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }

        .matricula-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .matricula-card { background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0; }
        .m-card-header { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .m-avatar { width: 44px; height: 44px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #64748b; }
        .m-info strong { display: block; font-size: 0.9rem; }
        .m-info span { font-size: 0.75rem; color: #64748b; }
        .m-info small { font-size: 0.7rem; color: #3b82f6; font-weight: 600; }
        .m-card-footer { border-top: 1px solid #f1f5f9; padding-top: 1rem; margin-top: 1rem; }

        .analysis-grid { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; }
        .doc-viewer { background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0; height: 600px; display: flex; flex-direction: column; }
        .viewer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .doc-placeholder { flex: 1; background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; }
        .checklist-panel { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; }
        .check-item { display: flex; gap: 1rem; padding: 1rem; border-radius: 8px; border: 1px solid #f1f5f9; margin-bottom: 0.75rem; }
        .check-item.ok { border-color: #22c55e; background: #f0fdf4; }
        .check-item.active { border-color: #3b82f6; background: #eff6ff; }
        .check-status { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; }
        .ok .check-status { background: #22c55e; border-color: #22c55e; color: white; }
        .active .check-status { background: #3b82f6; border-color: #3b82f6; color: white; }
        .check-info strong { display: block; font-size: 0.85rem; }
        .check-info span { font-size: 0.7rem; color: #64748b; }

        .btn-primary { width: 100%; background: #2f9e41; color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
        .btn-danger-outline { width: 100%; background: white; border: 1px solid #ef4444; color: #ef4444; padding: 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; margin-bottom: 0.5rem; }
        .btn-secondary-sm { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.5rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }

        .table-container { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; text-align: left; }
        .data-table th { padding: 1rem; background: #f8fafc; font-size: 0.75rem; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
        .data-table td { padding: 1rem; font-size: 0.875rem; border-bottom: 1px solid #f1f5f9; }
        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
        .status-dot.orange { background: #f97316; }

        .bar-chart-sim { display: flex; flex-direction: column; gap: 1rem; }
        .bar-group { display: flex; align-items: center; gap: 1rem; }
        .bar-label { width: 120px; font-size: 0.75rem; color: #64748b; }
        .bar-container { flex: 1; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 4px; }
        .bar-fill.green { background: #22c55e; }
        .bar-fill.blue { background: #3b82f6; }
        .bar-fill.purple { background: #a855f7; }
        .bar-value { width: 40px; font-size: 0.75rem; font-weight: 700; text-align: right; }
      `}</style>
    </div>
  );
};

export default ManagerDashboard;
