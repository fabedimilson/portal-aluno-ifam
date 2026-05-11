import React, { useState } from 'react';
import { Briefcase, Users, Star, MapPin, Clock, ChevronRight, CheckCircle, Edit3, Award } from 'lucide-react';

export default function AlumniEcosystem() {
  const [activeTab, setActiveTab] = useState<'home' | 'vagas' | 'atualizar' | 'rede'>('home');
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const renderHome = () => (
    <div className="al-home">
      <div className="al-hero">
        <div className="al-avatar">MF</div>
        <div className="al-hero-info">
          <h2>Maria Fernanda Lima</h2>
          <p>Técnico em Química • Formada em 2023</p>
          <span className="al-campus-tag">Campus Maués</span>
        </div>
      </div>

      <div className="al-impact">
        <div className="al-impact-icon">🏆</div>
        <div>
          <h3>Você faz parte da rede!</h3>
          <p>12.480 egressos IFAM conectados no Amazonas e Brasil.</p>
        </div>
      </div>

      <div className="al-cards">
        <div className="al-card vagas" onClick={() => setActiveTab('vagas')}>
          <Briefcase size={26} />
          <h3>Mural de Vagas</h3>
          <p>Oportunidades exclusivas para quem é IFAM</p>
          <span className="al-badge-count">8 novas</span>
        </div>
        <div className="al-card update" onClick={() => setActiveTab('atualizar')}>
          <Edit3 size={26} />
          <h3>Minha Trajetória</h3>
          <p>Atualize onde você está hoje</p>
        </div>
      </div>

      <div className="al-status-card">
        <div className="al-status-header"><h4>Meu Status Atual</h4><button onClick={() => setActiveTab('atualizar')}>Editar</button></div>
        <div className="al-status-body">
          <div className="al-status-dot active"></div>
          <div>
            <strong>Trabalhando</strong>
            <p>Técnica de Laboratório • Fiocruz AM</p>
          </div>
        </div>
      </div>

      <div className="al-alumni-card">
        <Award size={20} />
        <div>
          <h4>Perfil Alumni Completo</h4>
          <div className="al-progress-mini"><div className="al-fill" style={{ width: '70%' }}></div></div>
          <p>70% preenchido • Atualize sua trajetória</p>
        </div>
      </div>
    </div>
  );

  const renderVagas = () => (
    <div className="al-vagas">
      <div className="al-page-title"><h2>Mural de Vagas</h2><p>Exclusivo para egressos IFAM</p></div>
      <div className="al-filter-row">
        <button className="al-filter-btn active">Todas</button>
        <button className="al-filter-btn">Estágio</button>
        <button className="al-filter-btn">CLT</button>
        <button className="al-filter-btn">PJ</button>
      </div>
      <div className="al-vagas-list">
        {[
          { title: 'Técnico de Laboratório', company: 'Fiocruz Amazônia', local: 'Manaus, AM', type: 'CLT', area: 'Química', new: true },
          { title: 'Estagiário TI', company: 'Samsung SIDIA', local: 'Manaus, AM', type: 'Estágio', area: 'Informática', new: true },
          { title: 'Analista de Sistemas Jr.', company: 'Tribunal de Justiça AM', local: 'Manaus, AM', type: 'Concurso', area: 'Computação', new: false },
          { title: 'Técnico em Edificações', company: 'Construtora JMV', local: 'Parintins, AM', type: 'CLT', area: 'Edificações', new: false },
        ].map((v, i) => (
          <div key={i} className="al-vaga-card">
            <div className="al-vaga-header">
              <div className="al-company-logo">{v.company[0]}</div>
              <div className="al-vaga-info">
                <h4>{v.title} {v.new && <span className="al-new-tag">Nova</span>}</h4>
                <p>{v.company}</p>
              </div>
            </div>
            <div className="al-vaga-meta">
              <span><MapPin size={12} /> {v.local}</span>
              <span className={`al-type-badge ${v.type.toLowerCase()}`}>{v.type}</span>
            </div>
            <div className="al-vaga-area">Área: {v.area}</div>
            <button className="al-apply-btn">Ver Vaga <ChevronRight size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAtualizar = () => {
    if (submitted) return (
      <div className="al-success">
        <CheckCircle size={64} color="#2f9e41" />
        <h3>Trajetória Atualizada!</h3>
        <p>Obrigado por manter seus dados atualizados. Isso ajuda o IFAM a melhorar seus programas.</p>
        <button className="al-btn-primary" onClick={() => { setSubmitted(false); setActiveTab('home'); }}>Voltar ao Início</button>
      </div>
    );

    return (
      <div className="al-atualizar">
        <div className="al-page-title"><h2>Minha Trajetória</h2><p>Conte-nos onde você está agora</p></div>
        <div className="al-form">
          <div className="al-field"><label>Situação Atual</label>
            <div className="al-situation-grid">
              {[['💼', 'Trabalhando'], ['📚', 'Estudando'], ['🚀', 'Empreendendo'], ['🔍', 'Buscando Oportunidade']].map(([emoji, label]) => (
                <button key={label} className={`al-situation-btn ${situation === label ? 'active' : ''}`} onClick={() => setSituation(label)}>
                  <span>{emoji}</span>{label}
                </button>
              ))}
            </div>
          </div>

          {situation === 'Trabalhando' && <>
            <div className="al-field"><label>Empresa / Instituição</label><input type="text" placeholder="Nome da empresa" /></div>
            <div className="al-field"><label>Cargo / Função</label><input type="text" placeholder="Ex: Analista de TI" /></div>
            <div className="al-field"><label>Faixa Salarial</label>
              <select><option value="">Selecione...</option><option>Até R$ 2.000</option><option>R$ 2.001 – R$ 4.000</option><option>R$ 4.001 – R$ 7.000</option><option>Acima de R$ 7.000</option></select>
            </div>
            <div className="al-field"><label>Sua formação IFAM contribuiu?</label>
              <div className="al-stars">{[1,2,3,4,5].map(s => <Star key={s} size={28} fill="#f59e0b" color="#f59e0b" />)}</div>
            </div>
          </>}

          {situation === 'Estudando' && <>
            <div className="al-field"><label>Instituição</label><input type="text" placeholder="Ex: UFAM, USP..." /></div>
            <div className="al-field"><label>Curso</label><input type="text" placeholder="Pós-graduação, Graduação..." /></div>
          </>}

          {situation && <button className="al-btn-primary" onClick={() => setSubmitted(true)}>Salvar Trajetória ✅</button>}
        </div>
      </div>
    );
  };

  return (
    <div className="al-container">
      <div className="al-content">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'vagas' && renderVagas()}
        {activeTab === 'atualizar' && renderAtualizar()}
      </div>
      <nav className="al-bottom-nav">
        <button className={`al-nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}><Star size={22} /><span>Início</span></button>
        <button className={`al-nav-item ${activeTab === 'vagas' ? 'active' : ''}`} onClick={() => setActiveTab('vagas')}><Briefcase size={22} /><span>Vagas</span></button>
        <button className={`al-nav-item ${activeTab === 'atualizar' ? 'active' : ''}`} onClick={() => setActiveTab('atualizar')}><Edit3 size={22} /><span>Trajetória</span></button>
        <button className={`al-nav-item ${activeTab === 'rede' ? 'active' : ''}`} onClick={() => setActiveTab('rede')}><Users size={22} /><span>Rede</span></button>
      </nav>

      <style>{`
        .al-container { display: flex; flex-direction: column; height: 100%; }
        .al-content { flex: 1; overflow-y: auto; padding: 1.5rem; padding-bottom: 80px; }
        .al-home, .al-vagas, .al-atualizar, .al-success { animation: fadeIn 0.3s ease; }
        
        .al-hero { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .al-avatar { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #cd191e, #9b1316); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; }
        .al-hero-info h2 { font-size: 1.05rem; color: #1e293b; margin: 0 0 2px; }
        .al-hero-info p { font-size: 0.75rem; color: #64748b; margin: 0 0 4px; }
        .al-campus-tag { background: #fdf2f2; color: #cd191e; padding: 2px 8px; border-radius: 20px; font-size: 0.6rem; font-weight: 700; }
        
        .al-impact { display: flex; gap: 1rem; align-items: center; background: linear-gradient(135deg, #1e293b, #334155); padding: 1.25rem; border-radius: 16px; color: white; margin-bottom: 1.5rem; }
        .al-impact-icon { font-size: 2rem; }
        .al-impact h3 { font-size: 0.9rem; margin-bottom: 4px; }
        .al-impact p { font-size: 0.75rem; opacity: 0.8; }
        
        .al-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .al-card { padding: 1.25rem; border-radius: 16px; cursor: pointer; position: relative; overflow: hidden; }
        .al-card.vagas { background: linear-gradient(135deg, #cd191e, #9b1316); color: white; }
        .al-card.update { background: linear-gradient(135deg, #2f9e41, #1f7a2d); color: white; }
        .al-card h3 { font-size: 0.9rem; margin: 0.75rem 0 0.25rem; }
        .al-card p { font-size: 0.7rem; opacity: 0.85; }
        .al-badge-count { position: absolute; top: 0.75rem; right: 0.75rem; background: white; color: #cd191e; padding: 2px 8px; border-radius: 20px; font-size: 0.6rem; font-weight: 800; }
        
        .al-status-card { background: white; border-radius: 16px; padding: 1.25rem; border: 1px solid #e2e8f0; margin-bottom: 1rem; }
        .al-status-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .al-status-header h4 { font-size: 0.875rem; color: #1e293b; }
        .al-status-header button { background: none; border: none; color: #2f9e41; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
        .al-status-body { display: flex; align-items: center; gap: 1rem; }
        .al-status-dot { width: 12px; height: 12px; border-radius: 50%; background: #22c55e; }
        .al-status-body strong { display: block; font-size: 0.875rem; color: #1e293b; }
        .al-status-body p { font-size: 0.75rem; color: #64748b; margin: 0; }
        
        .al-alumni-card { display: flex; gap: 1rem; align-items: center; background: #fef9c3; border: 1px solid #fde047; border-radius: 16px; padding: 1.25rem; color: #854d0e; }
        .al-alumni-card h4 { font-size: 0.875rem; margin-bottom: 6px; }
        .al-alumni-card p { font-size: 0.7rem; margin: 0; }
        .al-progress-mini { height: 6px; background: #fde047; border-radius: 3px; overflow: hidden; margin-bottom: 4px; }
        .al-fill { height: 100%; background: #f59e0b; border-radius: 3px; }
        
        .al-page-title { margin-bottom: 1.25rem; }
        .al-page-title h2 { font-size: 1.35rem; color: #1e293b; }
        .al-page-title p { font-size: 0.8rem; color: #64748b; }
        
        .al-filter-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; overflow-x: auto; padding-bottom: 4px; }
        .al-filter-btn { background: #f1f5f9; border: none; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; color: #64748b; cursor: pointer; white-space: nowrap; }
        .al-filter-btn.active { background: #cd191e; color: white; }
        
        .al-vagas-list { display: flex; flex-direction: column; gap: 1rem; }
        .al-vaga-card { background: white; border-radius: 16px; padding: 1.25rem; border: 1px solid #e2e8f0; }
        .al-vaga-header { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
        .al-company-logo { width: 40px; height: 40px; border-radius: 10px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #475569; }
        .al-vaga-info h4 { font-size: 0.875rem; color: #1e293b; margin: 0 0 2px; }
        .al-vaga-info p { font-size: 0.75rem; color: #64748b; margin: 0; }
        .al-new-tag { background: #f0fdf4; color: #166534; padding: 1px 6px; border-radius: 4px; font-size: 0.6rem; font-weight: 700; margin-left: 6px; }
        .al-vaga-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .al-vaga-meta span { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #94a3b8; }
        .al-type-badge { padding: 2px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; }
        .al-type-badge.clt { background: #eff6ff; color: #1d4ed8; }
        .al-type-badge.estágio { background: #faf5ff; color: #7c3aed; }
        .al-type-badge.concurso { background: #fef9c3; color: #854d0e; }
        .al-vaga-area { font-size: 0.7rem; color: #94a3b8; margin-bottom: 0.75rem; }
        .al-apply-btn { width: 100%; background: #cd191e; color: white; border: none; padding: 0.6rem; border-radius: 8px; font-weight: 600; font-size: 0.8125rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; }

        .al-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .al-field label { display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .al-field input, .al-field select { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.875rem; outline: none; background: white; }
        .al-situation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .al-situation-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 1rem; background: white; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s; }
        .al-situation-btn span { font-size: 1.5rem; }
        .al-situation-btn.active { border-color: #cd191e; background: #fdf2f2; color: #cd191e; }
        .al-stars { display: flex; gap: 4px; }
        .al-btn-primary { width: 100%; background: #2f9e41; color: white; border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; }
        
        .al-success { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem 1rem; gap: 1rem; animation: fadeIn 0.3s ease; }
        .al-success h3 { font-size: 1.35rem; color: #1e293b; }
        .al-success p { font-size: 0.875rem; color: #64748b; line-height: 1.6; }
        
        .al-bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: white; display: flex; border-top: 1px solid #f1f5f9; padding: 0.5rem 0; z-index: 50; max-width: 430px; margin: 0 auto; }
        .al-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; border: none; background: transparent; color: #94a3b8; font-size: 0.6rem; font-weight: 600; cursor: pointer; padding: 6px 0; }
        .al-nav-item.active { color: #cd191e; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
