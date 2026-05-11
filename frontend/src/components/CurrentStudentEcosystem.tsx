import React, { useState } from 'react';
import {
  BookOpen, Clock, Download, Bell, FileText, Star, 
  TrendingUp, Calendar, ChevronRight, CheckCircle, AlertCircle,
  Plus, History, FileUp, Send, X, User, MapPin, Sparkles, GraduationCap
} from 'lucide-react';

const schedule = [
  { time: '07:30', subject: 'Algoritmos e Estrutura de Dados', room: 'Lab 4', teacher: 'Prof. Ricardo', status: 'done' },
  { time: '09:30', subject: 'Sistemas Operacionais', room: 'Sala 202', teacher: 'Profa. Maria', status: 'now' },
  { time: '11:10', subject: 'Redes de Computadores', room: 'Lab 2', teacher: 'Prof. Carlos', status: 'next' },
  { time: '13:30', subject: 'Banco de Dados II', room: 'Lab 4', teacher: 'Profa. Ana', status: '' },
];

const grades = [
  { subject: 'Algoritmos', n1: 9.0, n2: 8.5, freq: 95 },
  { subject: 'Sistemas Operacionais', n1: 7.5, n2: 8.0, freq: 88 },
  { subject: 'Redes de Computadores', n1: 8.0, n2: null, freq: 92 },
  { subject: 'Banco de Dados II', n1: 9.5, n2: null, freq: 97 },
  { subject: 'Empreendedorismo', n1: 7.0, n2: 7.5, freq: 75 },
];

export default function CurrentStudentEcosystem({ protocols, onAddProtocol }: any) {
  const [activeTab, setActiveTab] = useState<'home' | 'notas' | 'horario' | 'protocolos'>('home');
  const [showNewProtocol, setShowNewProtocol] = useState(false);
  const [protocolType, setProtocolType] = useState('');

  const renderHome = () => (
    <div className="cs-home-modern">
      <div className="cs-header-premium">
        <div className="cs-profile-main">
          <div className="cs-avatar-premium">JS</div>
          <div className="cs-profile-info">
            <h2>João da Silva</h2>
            <p>Técnico em Informática • 4º Período</p>
          </div>
        </div>
        <button className="cs-notif-btn-modern"><Bell size={20} /><span className="notif-dot"></span></button>
      </div>

      <div className="cs-stats-premium">
        <div className="stat-pill"><span className="label">CR</span><strong>8.7</strong></div>
        <div className="stat-pill"><span className="label">FREQ</span><strong>92%</strong></div>
        <div className="stat-pill"><span className="label">FALTAS</span><strong>4</strong></div>
      </div>

      <div className="cs-card-section-modern">
        <div className="section-title-wrap">
          <div className="section-title-dot"></div>
          <h3>Aula em Andamento</h3>
          <span className="live-pill">LIVE</span>
        </div>
        <div className="cs-live-card-premium">
          <div className="live-content">
            <div className="live-info">
              <h4>Sistemas Operacionais</h4>
              <div className="live-meta">
                <span><MapPin size={14} /> Sala 202</span>
                <span><User size={14} /> Profa. Maria</span>
              </div>
            </div>
            <div className="live-time-box">
              <Clock size={16} />
              <span>09:30 - 11:10</span>
            </div>
          </div>
          <div className="live-progress-bar"><div className="fill" style={{ width: '65%' }}></div></div>
        </div>
      </div>

      <div className="cs-card-section-modern">
        <div className="section-title-wrap">
          <div className="section-title-dot grey"></div>
          <h3>Próximas Atividades</h3>
          <button className="btn-text" onClick={() => setActiveTab('protocolos')}>Ver Todos</button>
        </div>
        <div className="cs-activities-stack">
          {protocols.slice(0, 2).map((p: any, i: number) => (
            <div key={i} className="cs-activity-item-premium">
              <div className="act-icon"><FileText size={18} /></div>
              <div className="act-text">
                <strong>{p.type}</strong>
                <span>Solicitado em {p.date}</span>
              </div>
              <div className={`act-status ${p.status.toLowerCase()}`}>{p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotas = () => (
    <div className="cs-page-modern">
      <div className="cs-page-header-premium">
        <div className="header-badge"><TrendingUp size={14} /> Desempenho</div>
        <h2>Boletim Escolar</h2>
        <p>Acompanhamento de notas 2026.1</p>
      </div>

      <div className="cs-grades-stack">
        {grades.map((g, i) => (
          <div key={i} className="cs-grade-card-premium">
            <div className="grade-main">
              <div className="grade-icon"><BookOpen size={20} /></div>
              <div className="grade-text">
                <h4>{g.subject}</h4>
                <div className="grade-details">
                  <span>N1: <strong>{g.n1}</strong></span>
                  <span>N2: <strong>{g.n2 || '-'}</strong></span>
                </div>
              </div>
            </div>
            <div className={`grade-final-badge ${((g.n1 + (g.n2||g.n1))/2) >= 7 ? 'pass' : 'fail'}`}>
              {((g.n1 + (g.n2||g.n1))/2).toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProtocolos = () => (
    <div className="cs-page-modern">
      <div className="cs-page-header-premium">
        <div className="header-badge blue"><History size={14} /> Secretaria</div>
        <h2>Protocolos</h2>
        <p>Requerimentos e atestados</p>
      </div>

      {!showNewProtocol ? (
        <div className="cs-protocol-view-modern">
          <button className="btn-add-premium" onClick={() => setShowNewProtocol(true)}>
            <Plus size={20} /> Abrir Novo Requerimento
          </button>
          <div className="cs-protocol-list-modern">
            {protocols.map((p: any, i: number) => (
              <div key={i} className="cs-protocol-card-premium">
                <div className="card-top">
                  <span className={`status-pill ${p.status.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
                  <span className="date">{p.date}</span>
                </div>
                <h4>{p.type}</h4>
                <div className="card-result">
                  <div className="result-label">RESULTADO</div>
                  <p>{p.result || 'Em processamento pela secretaria acadêmica.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="cs-form-modern">
          <div className="form-header-premium">
            <h3>Novo Requerimento</h3>
            <button className="btn-close" onClick={() => setShowNewProtocol(false)}><X size={20} /></button>
          </div>
          <div className="field-modern"><label>Tipo de Solicitação</label>
            <select className="select-modern" value={protocolType} onChange={e => setProtocolType(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="atestado">Atestado Médico</option>
              <option value="justificativa">Justificativa de Falta</option>
            </select>
          </div>
          <div className="field-modern"><label>Motivo / Justificativa</label><textarea className="area-modern" placeholder="Detalhe seu pedido aqui..."></textarea></div>
          <div className="field-modern"><label>Anexar Comprovante (PDF/JPG)</label>
            <label className="upload-box-premium"><FileUp size={32} /><span>Clique para fazer upload</span><input type="file" hidden /></label>
          </div>
          <div className="form-actions-premium">
            <button className="btn-cancel" onClick={() => setShowNewProtocol(false)}>Cancelar</button>
            <button className="btn-send-premium" onClick={() => {
              onAddProtocol({
                studentName: 'João da Silva',
                type: protocolType === 'atestado' ? 'Atestado Médico' : 'Justificativa de Falta',
                campus: 'Manaus Centro (CMC)',
              });
              setShowNewProtocol(false);
            }}><Send size={18} /> Enviar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderHorario = () => (
    <div className="cs-page-modern">
      <div className="cs-page-header-premium">
        <div className="header-badge purple"><Calendar size={14} /> Cronograma</div>
        <h2>Horário do Dia</h2>
        <p>Suas aulas de hoje</p>
      </div>
      <div className="cs-schedule-stack-premium">
        {schedule.map((s, i) => (
          <div key={i} className={`cs-schedule-item-premium ${s.status}`}>
            <div className="sch-time-box"><strong>{s.time}</strong></div>
            <div className="sch-info">
              <h4>{s.subject}</h4>
              <div className="sch-meta"><span>{s.room}</span><span>{s.teacher}</span></div>
            </div>
            {s.status === 'now' && <div className="now-indicator"><Sparkles size={12} /> AGORA</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="cs-root-premium">
      <div className="cs-scroll-area">{activeTab === 'home' && renderHome()} {activeTab === 'notas' && renderNotas()} {activeTab === 'protocolos' && renderProtocolos()} {activeTab === 'horario' && renderHorario()}</div>
      
      <nav className="cs-tabbar-premium">
        <button className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}><div className="icon-wrap"><Star size={24} /></div><span>Início</span></button>
        <button className={`tab-btn ${activeTab === 'notas' ? 'active' : ''}`} onClick={() => setActiveTab('notas')}><div className="icon-wrap"><TrendingUp size={24} /></div><span>Notas</span></button>
        <button className={`tab-btn ${activeTab === 'protocolos' ? 'active' : ''}`} onClick={() => setActiveTab('protocolos')}><div className="icon-wrap"><History size={24} /></div><span>Protocolos</span></button>
        <button className={`tab-btn ${activeTab === 'horario' ? 'active' : ''}`} onClick={() => setActiveTab('horario')}><div className="icon-wrap"><Calendar size={24} /></div><span>Horário</span></button>
      </nav>

      <style>{`
        .cs-root-premium { display: flex; flex-direction: column; height: 100%; background: #f0f4f8; }
        .cs-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 90px; }

        /* HEADER PREMIUM */
        .cs-header-premium { display: flex; justify-content: space-between; align-items: center; padding: 2rem 1.5rem 1.5rem; background: white; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .cs-profile-main { display: flex; align-items: center; gap: 1rem; }
        .cs-avatar-premium { width: 52px; height: 52px; background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2); }
        .cs-profile-info h2 { font-size: 1.1rem; color: #1e293b; font-weight: 800; }
        .cs-profile-info p { font-size: 0.75rem; color: #64748b; }
        .cs-notif-btn-modern { width: 44px; height: 44px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #64748b; position: relative; }
        .notif-dot { position: absolute; top: 12px; right: 12px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid white; }

        /* STATS PILLS */
        .cs-stats-premium { display: flex; gap: 0.75rem; padding: 0 1.5rem 2rem; background: white; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .stat-pill { flex: 1; background: #f8fafc; border: 1.5px solid #f1f5f9; padding: 1rem; border-radius: 18px; text-align: center; }
        .stat-pill .label { display: block; font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
        .stat-pill strong { font-size: 1.25rem; color: #1e293b; font-weight: 900; }

        /* SECTIONS */
        .cs-card-section-modern { padding: 0 1.5rem 2rem; }
        .section-title-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; }
        .section-title-dot { width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        .section-title-dot.grey { background: #94a3b8; box-shadow: none; }
        .section-title-wrap h3 { font-size: 1rem; color: #1e293b; font-weight: 800; flex: 1; }
        .live-pill { background: #fee2e2; color: #ef4444; padding: 4px 10px; border-radius: 20px; font-size: 0.6rem; font-weight: 900; }
        .btn-text { background: none; border: none; color: #3b82f6; font-size: 0.75rem; font-weight: 700; }

        /* LIVE CARD PREMIUM */
        .cs-live-card-premium { background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 1.5rem; border-radius: 24px; color: white; box-shadow: 0 15px 30px rgba(59, 130, 246, 0.25); position: relative; overflow: hidden; }
        .cs-live-card-premium::after { content: ''; position: absolute; bottom: -20%; left: -10%; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%; }
        .live-content { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .live-info h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; }
        .live-meta { display: flex; gap: 1rem; font-size: 0.8rem; opacity: 0.9; }
        .live-meta span { display: flex; align-items: center; gap: 6px; }
        .live-time-box { background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); padding: 6px 12px; border-radius: 12px; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; }
        .live-progress-bar { height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden; }
        .live-progress-bar .fill { height: 100%; background: white; border-radius: 3px; }

        /* ACTIVITIES */
        .cs-activities-stack { display: flex; flex-direction: column; gap: 0.75rem; }
        .cs-activity-item-premium { background: white; padding: 1rem; border-radius: 20px; border: 1.5px solid #f1f5f9; display: flex; align-items: center; gap: 1rem; }
        .act-icon { width: 44px; height: 44px; background: #eff6ff; color: #3b82f6; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .act-text { flex: 1; }
        .act-text strong { display: block; font-size: 0.9rem; color: #1e293b; }
        .act-text span { font-size: 0.75rem; color: #94a3b8; }
        .act-status { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
        .act-status.deferido { background: #f0fdf4; color: #166534; }
        .act-status.pendente { background: #fffbeb; color: #92400e; }

        /* PAGES MODERN */
        .cs-page-modern { padding: 2rem 1.5rem; }
        .cs-page-header-premium { margin-bottom: 2rem; }
        .header-badge { display: inline-flex; align-items: center; gap: 6px; background: #f0fdf4; color: #166534; padding: 6px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.75rem; }
        .header-badge.blue { background: #eff6ff; color: #1e40af; }
        .header-badge.purple { background: #faf5ff; color: #7e22ce; }
        .cs-page-header-premium h2 { font-size: 1.75rem; color: #1e293b; font-weight: 800; letter-spacing: -1px; }
        .cs-page-header-premium p { font-size: 0.9rem; color: #64748b; }

        /* GRADES PREMIUM */
        .cs-grades-stack { display: flex; flex-direction: column; gap: 1rem; }
        .cs-grade-card-premium { background: white; padding: 1.25rem; border-radius: 24px; border: 1.5px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .grade-main { display: flex; gap: 1rem; align-items: center; }
        .grade-icon { width: 48px; height: 48px; background: #f8fafc; color: #94a3b8; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .grade-text h4 { font-size: 0.95rem; color: #1e293b; font-weight: 800; margin-bottom: 4px; }
        .grade-details { font-size: 0.75rem; color: #94a3b8; display: flex; gap: 1rem; }
        .grade-details strong { color: #1e293b; }
        .grade-final-badge { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.1rem; }
        .grade-final-badge.pass { background: #eaf5eb; color: #2f9e41; }
        .grade-final-badge.fail { background: #fef2f2; color: #ef4444; }

        /* PROTOCOLS MODERN */
        .btn-add-premium { width: 100%; background: #1e293b; color: white; border: none; padding: 1.1rem; border-radius: 18px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(30, 41, 59, 0.15); }
        .cs-protocol-card-premium { background: white; border-radius: 24px; padding: 1.5rem; border: 1.5px solid #f1f5f9; margin-bottom: 1rem; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .status-pill { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; }
        .status-pill.deferido { background: #eaf5eb; color: #2f9e41; }
        .status-pill.pendente { background: #fffbeb; color: #d97706; }
        .status-pill.indeferido { background: #fef2f2; color: #ef4444; }
        .card-top .date { font-size: 0.75rem; color: #cbd5e1; font-weight: 600; }
        .cs-protocol-card-premium h4 { font-size: 1.1rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem; }
        .card-result { background: #f8fafc; padding: 1rem; border-radius: 16px; border-left: 4px solid #e2e8f0; }
        .result-label { font-size: 0.6rem; font-weight: 900; color: #94a3b8; margin-bottom: 4px; letter-spacing: 1px; }
        .card-result p { font-size: 0.85rem; color: #475569; line-height: 1.5; }

        /* FORM PREMIUM */
        .cs-form-modern { background: white; border-radius: 28px; padding: 2rem 1.5rem; border: 1px solid white; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .form-header-premium { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .form-header-premium h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
        .btn-close { width: 40px; height: 40px; background: #f1f5f9; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #94a3b8; }
        .field-modern { margin-bottom: 1.5rem; }
        .field-modern label { display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.75rem; }
        .select-modern, .area-modern { width: 100%; padding: 1rem; border-radius: 16px; border: 1.5px solid #f1f5f9; background: #f8fafc; font-size: 0.95rem; outline: none; transition: all 0.2s; }
        .area-modern { height: 120px; resize: none; }
        .upload-box-premium { border: 2.5px dashed #e2e8f0; border-radius: 24px; padding: 2.5rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #94a3b8; cursor: pointer; transition: all 0.2s; }
        .upload-box-premium:hover { border-color: #3b82f6; background: #eff6ff; color: #3b82f6; }
        .form-actions-premium { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { flex: 1; padding: 1.1rem; background: #f1f5f9; border: none; border-radius: 18px; font-weight: 800; color: #64748b; }
        .btn-send-premium { flex: 2; padding: 1.1rem; background: #2f9e41; color: white; border: none; border-radius: 18px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 10px 20px rgba(47, 158, 65, 0.2); }

        /* SCHEDULE PREMIUM */
        .cs-schedule-stack-premium { display: flex; flex-direction: column; gap: 1rem; }
        .cs-schedule-item-premium { background: white; padding: 1.25rem; border-radius: 24px; display: flex; align-items: center; gap: 1.25rem; border: 1.5px solid #f1f5f9; transition: all 0.2s; }
        .cs-schedule-item-premium.now { border-color: #3b82f6; background: #eff6ff; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1); }
        .cs-schedule-item-premium.done { opacity: 0.5; }
        .sch-time-box { background: #f8fafc; padding: 10px 14px; border-radius: 14px; color: #1e293b; font-size: 0.85rem; }
        .now .sch-time-box { background: #3b82f6; color: white; }
        .sch-info h4 { font-size: 1rem; color: #1e293b; font-weight: 800; margin-bottom: 4px; }
        .sch-meta { display: flex; gap: 12px; font-size: 0.75rem; color: #94a3b8; }
        .now-indicator { margin-left: auto; background: #3b82f6; color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.6rem; font-weight: 900; display: flex; align-items: center; gap: 4px; }

        /* TABBAR PREMIUM */
        .cs-tabbar-premium { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(15px); display: flex; height: 80px; border-top: 1px solid rgba(0,0,0,0.05); z-index: 1000; max-width: 430px; margin: 0 auto; }
        .tab-btn { flex: 1; background: none; border: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: #94a3b8; cursor: pointer; }
        .tab-btn.active { color: #3b82f6; }
        .icon-wrap { width: 44px; height: 32px; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .tab-btn.active .icon-wrap { background: #eff6ff; }
        .tab-btn span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
      `}</style>
    </div>
  );
}
