import React, { useState } from 'react';
import { 
  Briefcase, Users, Star, MapPin, Clock, ChevronRight, 
  CheckCircle, Edit3, Award, Search, Filter, Share2, 
  Link2, GraduationCap, Building2, TrendingUp, X, Sparkles
} from 'lucide-react';

export default function EgressoEcosystem() {
  const [activeTab, setActiveTab] = useState<'home' | 'vagas' | 'atualizar' | 'rede'>('home');
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [applying, setApplying] = useState<number | null>(null);

  const handleApply = (id: number) => {
    setApplying(id);
    setTimeout(() => {
      setApplying(null);
      alert('Candidatura enviada com sucesso via Perfil IFAM!');
    }, 1500);
  };

  const renderHome = () => (
    <div className="eg-home-modern">
      <div className="eg-header-premium">
        <div className="eg-profile-wrap">
          <div className="eg-avatar-premium">MF</div>
          <div className="eg-profile-info">
            <h2>Maria Fernanda Lima</h2>
            <p>Técnico em Química • Formada em 2023</p>
            <span className="eg-badge-campus">Campus Maués</span>
          </div>
        </div>
      </div>

      <div className="eg-impact-banner-premium">
        <div className="impact-icon-wrap"><Award size={32} /></div>
        <div className="impact-text">
          <h3>Sua jornada continua</h3>
          <p>Você é um dos <strong>12.480</strong> profissionais formados pelo IFAM transformando o Amazonas.</p>
        </div>
      </div>

      <div className="eg-stats-grid-premium">
        <div className="eg-stat-card"><strong>85%</strong><span>Empregabilidade</span></div>
        <div className="eg-stat-card"><strong>150</strong><span>Vagas Ativas</span></div>
        <div className="eg-stat-card"><strong>1.2k</strong><span>Mentores</span></div>
      </div>

      <div className="eg-menu-premium">
        <div className="eg-menu-item-premium red" onClick={() => setActiveTab('vagas')}>
          <div className="icon-box"><Briefcase size={22} /></div>
          <div className="text-box"><strong>Mural de Oportunidades</strong><p>Vagas exclusivas para egressos</p></div>
          <ChevronRight size={18} className="arrow" />
        </div>
        <div className="eg-menu-item-premium green" onClick={() => setActiveTab('atualizar')}>
          <div className="icon-box"><TrendingUp size={22} /></div>
          <div className="text-box"><strong>Atualizar Trajetória</strong><p>Mantenha seu vínculo ativo</p></div>
          <ChevronRight size={18} className="arrow" />
        </div>
      </div>

      <div className="eg-status-preview-premium">
        <div className="preview-header">
          <h4><Sparkles size={14} /> Status Atual</h4>
          <button onClick={() => setActiveTab('atualizar')}>Editar</button>
        </div>
        <div className="preview-card-inner">
          <div className="status-badge"><CheckCircle size={14} /> Trabalhando</div>
          <h4>Técnica de Laboratório</h4>
          <p>Fiocruz Amazônia • Manaus, AM</p>
          <small>Membro desde Jan 2024</small>
        </div>
      </div>
    </div>
  );

  const renderVagas = () => (
    <div className="eg-page-modern">
      <div className="eg-page-header-premium">
        <div className="header-badge-vagas"><Briefcase size={14} /> Oportunidades</div>
        <h2>Vagas Exclusivas</h2>
        <div className="eg-search-premium"><Search size={18} /><input type="text" placeholder="Cargo, empresa ou cidade..." /></div>
      </div>

      <div className="eg-vagas-stack-premium">
        {[
          { id: 1, title: 'Técnico de Laboratório', company: 'Fiocruz Amazônia', local: 'Manaus, AM', type: 'CLT', salary: 'R$ 3.800' },
          { id: 2, title: 'Analista Jr', company: 'Samsung SIDIA', local: 'Manaus, AM', type: 'CLT', salary: 'R$ 4.500' },
          { id: 3, title: 'Técnico Eletrotécnica', company: 'Amazonas Energia', local: 'Itacoatiara, AM', type: 'CLT', salary: 'R$ 3.200' },
        ].map((v) => (
          <div key={v.id} className="eg-vaga-card-premium">
            <div className="vaga-header">
              <div className="company-icon">{v.company[0]}</div>
              <div className="vaga-title-box">
                <h4>{v.title}</h4>
                <p>{v.company} • {v.local}</p>
              </div>
            </div>
            <div className="vaga-pills">
              <span className="pill-type">{v.type}</span>
              <span className="pill-salary">{v.salary}</span>
            </div>
            <button 
              className={`btn-apply-premium ${applying === v.id ? 'loading' : ''}`}
              onClick={() => handleApply(v.id)}
              disabled={applying !== null}
            >
              {applying === v.id ? 'Processando...' : 'Candidatar-se agora'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAtualizar = () => {
    if (submitted) return (
      <div className="eg-success-modern">
        <div className="success-icon-wrap"><CheckCircle size={64} /></div>
        <h3>Dados Sincronizados!</h3>
        <p>Sua trajetória é o orgulho do IFAM. Obrigado por colaborar com nossas métricas.</p>
        <button className="btn-back-hub" onClick={() => { setSubmitted(false); setActiveTab('home'); }}>Voltar ao Início</button>
      </div>
    );

    return (
      <div className="eg-page-modern">
        <div className="eg-page-header-premium">
          <div className="header-badge-vagas green"><TrendingUp size={14} /> Carreira</div>
          <h2>Minha Trajetória</h2>
          <p>Onde você está brilhando hoje?</p>
        </div>

        <div className="eg-form-card-premium">
          <label className="form-label-premium">Como você está hoje?</label>
          <div className="sit-grid-premium">
            {[
              { id: 'work', label: 'Trabalhando', emoji: '💼' },
              { id: 'study', label: 'Estudando', emoji: '📚' },
              { id: 'biz', label: 'Empreendendo', emoji: '🚀' },
              { id: 'search', label: 'Buscando', emoji: '🔍' }
            ].map(item => (
              <button 
                key={item.id} 
                className={`sit-card-premium ${situation === item.id ? 'active' : ''}`}
                onClick={() => setSituation(item.id)}
              >
                <span className="emoji">{item.emoji}</span>
                <span className="label">{item.label}</span>
              </button>
            ))}
          </div>

          {situation && (
            <div className="eg-extra-fields animate-slide-up">
              <div className="field-modern-eg"><label>Empresa ou Instituição</label><input type="text" placeholder="Onde você atua?" /></div>
              <div className="field-modern-eg"><label>Cargo ou Curso</label><input type="text" placeholder="Sua função atual" /></div>
              <button className="btn-save-premium" onClick={() => setSubmitted(true)}>Salvar Alterações</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRede = () => (
    <div className="eg-page-modern">
      <div className="eg-page-header-premium">
        <div className="header-badge-vagas purple"><Users size={14} /> Alumni</div>
        <h2>Rede de Egressos</h2>
        <p>Conexões que geram valor</p>
      </div>
      
      <div className="eg-featured-alumni">
        <div className="alumni-card-premium">
          <div className="alumni-avatar">RL</div>
          <div className="alumni-info">
            <strong>Ricardo Lopes</strong>
            <p>Engenharia Civil • Formado em 2015</p>
            <div className="alumni-tags"><span>Mentor</span><span>Engenharia</span></div>
            <button className="btn-connect-linkedin"><Link2 size={14} /> Ver Perfil</button>
          </div>
        </div>
      </div>

      <div className="eg-mentoria-card-premium">
        <div className="icon-wrap-m"><GraduationCap size={24} /></div>
        <div className="text-wrap-m">
          <h4>Seja um Mentor IFAM</h4>
          <p>Ajude novos alunos com sua experiência.</p>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  );

  return (
    <div className="eg-root-premium">
      <div className="eg-scroll-area">{activeTab === 'home' && renderHome()} {activeTab === 'vagas' && renderVagas()} {activeTab === 'atualizar' && renderAtualizar()} {activeTab === 'rede' && renderRede()}</div>
      
      <nav className="eg-tabbar-premium">
        <button className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}><div className="icon-wrap"><Star size={24} /></div><span>Início</span></button>
        <button className={`tab-btn ${activeTab === 'vagas' ? 'active' : ''}`} onClick={() => setActiveTab('vagas')}><div className="icon-wrap"><Briefcase size={24} /></div><span>Vagas</span></button>
        <button className={`tab-btn ${activeTab === 'atualizar' ? 'active' : ''}`} onClick={() => setActiveTab('atualizar')}><div className="icon-wrap"><TrendingUp size={24} /></div><span>Trajetória</span></button>
        <button className={`tab-btn ${activeTab === 'rede' ? 'active' : ''}`} onClick={() => setActiveTab('rede')}><div className="icon-wrap"><Users size={24} /></div><span>Rede</span></button>
      </nav>

      <style>{`
        .eg-root-premium { display: flex; flex-direction: column; height: 100%; background: #f0f4f8; }
        .eg-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 90px; }

        /* HEADER PREMIUM */
        .eg-header-premium { background: white; padding: 2.5rem 1.5rem 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .eg-profile-wrap { display: flex; align-items: center; gap: 1.25rem; }
        .eg-avatar-premium { width: 64px; height: 64px; background: linear-gradient(135deg, #cd191e, #8b1114); color: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.5rem; box-shadow: 0 10px 20px rgba(205, 25, 30, 0.2); }
        .eg-profile-info h2 { font-size: 1.2rem; color: #1e293b; font-weight: 800; margin-bottom: 2px; }
        .eg-profile-info p { font-size: 0.8rem; color: #64748b; margin-bottom: 6px; }
        .eg-badge-campus { background: #fdf2f2; color: #cd191e; padding: 2px 10px; border-radius: 20px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }

        /* IMPACT BANNER */
        .eg-impact-banner-premium { background: #1e293b; margin: 1.5rem; padding: 1.5rem; border-radius: 24px; color: white; display: flex; align-items: center; gap: 1.25rem; box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
        .impact-icon-wrap { width: 56px; height: 56px; background: rgba(255,255,255,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fbbf24; }
        .impact-text h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 4px; }
        .impact-text p { font-size: 0.8rem; opacity: 0.8; line-height: 1.4; }

        /* STATS GRID */
        .eg-stats-grid-premium { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; padding: 0 1.5rem 1.5rem; }
        .eg-stat-card { background: white; padding: 1.25rem 0.5rem; border-radius: 20px; text-align: center; border: 1.5px solid #f1f5f9; }
        .eg-stat-card strong { display: block; font-size: 1.25rem; color: #1e293b; font-weight: 900; }
        .eg-stat-card span { font-size: 0.6rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-top: 4px; }

        /* MENU PREMIUM */
        .eg-menu-premium { display: flex; flex-direction: column; gap: 0.75rem; padding: 0 1.5rem 1.5rem; }
        .eg-menu-item-premium { background: white; padding: 1.25rem; border-radius: 22px; border: 1.5px solid #f1f5f9; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; }
        .eg-menu-item-premium:active { transform: scale(0.98); }
        .eg-menu-item-premium .icon-box { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .eg-menu-item-premium.red .icon-box { background: #fdf2f2; color: #cd191e; }
        .eg-menu-item-premium.green .icon-box { background: #f0fdf4; color: #2f9e41; }
        .eg-menu-item-premium .text-box { flex: 1; }
        .eg-menu-item-premium .text-box strong { font-size: 0.95rem; color: #1e293b; font-weight: 800; }
        .eg-menu-item-premium .text-box p { font-size: 0.75rem; color: #94a3b8; }
        .eg-menu-item-premium .arrow { color: #cbd5e1; }

        /* STATUS PREVIEW */
        .eg-status-preview-premium { background: white; margin: 0 1.5rem 2rem; padding: 1.5rem; border-radius: 24px; border: 1.5px solid #f1f5f9; }
        .preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .preview-header h4 { font-size: 0.8rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
        .preview-header h4 svg { color: #fbbf24; }
        .preview-header button { background: none; border: none; color: #2f9e41; font-weight: 800; font-size: 0.75rem; }
        .status-badge { display: inline-flex; align-items: center; gap: 6px; background: #f0fdf4; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 0.65rem; font-weight: 900; margin-bottom: 0.75rem; }
        .preview-card-inner h4 { font-size: 1.1rem; color: #1e293b; font-weight: 800; margin-bottom: 4px; }
        .preview-card-inner p { font-size: 0.85rem; color: #64748b; margin-bottom: 8px; }
        .preview-card-inner small { font-size: 0.7rem; color: #cbd5e1; font-weight: 600; }

        /* VAGAS PAGE */
        .eg-page-modern { padding: 2rem 1.5rem; }
        .eg-page-header-premium { margin-bottom: 2rem; }
        .header-badge-vagas { display: inline-flex; align-items: center; gap: 6px; background: #fdf2f2; color: #cd191e; padding: 6px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 900; text-transform: uppercase; margin-bottom: 1rem; }
        .header-badge-vagas.green { background: #f0fdf4; color: #2f9e41; }
        .header-badge-vagas.purple { background: #faf5ff; color: #7e22ce; }
        .eg-page-header-premium h2 { font-size: 1.75rem; font-weight: 900; color: #1e293b; letter-spacing: -1px; margin-bottom: 1rem; }
        .eg-search-premium { display: flex; align-items: center; gap: 10px; background: white; border: 1.5px solid #e2e8f0; padding: 0.875rem 1.25rem; border-radius: 18px; }
        .eg-search-premium input { border: none; outline: none; font-size: 0.95rem; flex: 1; }

        .eg-vagas-stack-premium { display: flex; flex-direction: column; gap: 1rem; }
        .eg-vaga-card-premium { background: white; border-radius: 24px; padding: 1.5rem; border: 1.5px solid #f1f5f9; box-shadow: 0 5px 15px rgba(0,0,0,0.02); }
        .vaga-header { display: flex; gap: 1rem; margin-bottom: 1.25rem; }
        .company-icon { width: 52px; height: 52px; background: #f8fafc; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; color: #94a3b8; border: 1.5px solid #f1f5f9; }
        .vaga-title-box h4 { font-size: 1rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
        .vaga-title-box p { font-size: 0.8rem; color: #64748b; }
        .vaga-pills { display: flex; gap: 8px; margin-bottom: 1.5rem; }
        .vaga-pills span { padding: 4px 10px; border-radius: 8px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
        .pill-type { background: #eff6ff; color: #1e40af; }
        .pill-salary { background: #f0fdf4; color: #166534; }
        .btn-apply-premium { width: 100%; background: #cd191e; color: white; border: none; padding: 1.1rem; border-radius: 18px; font-weight: 800; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 16px rgba(205, 25, 30, 0.15); }
        .btn-apply-premium:hover { opacity: 0.9; }

        /* FORM PREMIUM */
        .eg-form-card-premium { background: white; border-radius: 28px; padding: 2rem 1.5rem; border: 1px solid white; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .form-label-premium { display: block; font-size: 0.8rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; margin-bottom: 1.5rem; text-align: center; }
        .sit-grid-premium { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .sit-card-premium { background: #f8fafc; border: 2px solid #f1f5f9; padding: 1.5rem; border-radius: 22px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .sit-card-premium .emoji { font-size: 2rem; }
        .sit-card-premium .label { font-size: 0.85rem; font-weight: 800; color: #64748b; }
        .sit-card-premium.active { border-color: #2f9e41; background: #f0fdf4; }
        .sit-card-premium.active .label { color: #2f9e41; }
        .field-modern-eg { margin-bottom: 1.25rem; }
        .field-modern-eg label { display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.5rem; margin-left: 4px; }
        .field-modern-eg input { width: 100%; padding: 1rem; border-radius: 16px; border: 1.5px solid #f1f5f9; background: #f8fafc; font-size: 0.95rem; outline: none; }
        .btn-save-premium { width: 100%; background: #2f9e41; color: white; border: none; padding: 1.1rem; border-radius: 18px; font-weight: 800; margin-top: 1.5rem; box-shadow: 0 10px 20px rgba(47, 158, 65, 0.2); }

        /* SUCCESS */
        .eg-success-modern { text-align: center; padding: 3rem 0; }
        .success-icon-wrap { width: 96px; height: 96px; background: #f0fdf4; color: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
        .btn-back-hub { width: 100%; background: #1e293b; color: white; border: none; padding: 1.1rem; border-radius: 18px; font-weight: 800; margin-top: 2.5rem; }

        /* REDE */
        .alumni-card-premium { background: #1e293b; padding: 2rem 1.5rem; border-radius: 24px; color: white; display: flex; gap: 1.25rem; align-items: center; margin-bottom: 1.5rem; }
        .alumni-avatar { width: 64px; height: 64px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.5rem; }
        .alumni-info p { font-size: 0.8rem; opacity: 0.7; margin-bottom: 8px; }
        .alumni-tags { display: flex; gap: 6px; margin-bottom: 12px; }
        .alumni-tags span { background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 6px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; }
        .btn-connect-linkedin { background: #0077b5; color: white; border: none; padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; display: flex; align-items: center; gap: 6px; }

        .eg-mentoria-card-premium { background: white; padding: 1.5rem; border-radius: 24px; border: 1.5px solid #f1f5f9; display: flex; align-items: center; gap: 1.25rem; }
        .icon-wrap-m { width: 52px; height: 52px; background: #faf5ff; color: #7e22ce; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .text-wrap-m h4 { font-size: 1rem; color: #1e293b; font-weight: 800; margin-bottom: 4px; }
        .text-wrap-m p { font-size: 0.8rem; color: #64748b; }

        /* TABBAR PREMIUM */
        .eg-tabbar-premium { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(15px); display: flex; height: 80px; border-top: 1px solid rgba(0,0,0,0.05); z-index: 1000; max-width: 430px; margin: 0 auto; }
        .tab-btn { flex: 1; background: none; border: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: #94a3b8; cursor: pointer; }
        .tab-btn.active { color: #cd191e; }
        .icon-wrap { width: 44px; height: 32px; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .tab-btn.active .icon-wrap { background: #fdf2f2; }
        .tab-btn span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }

        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
