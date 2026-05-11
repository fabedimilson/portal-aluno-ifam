import React, { useState } from 'react';
import { User, LayoutDashboard, ArrowLeft, ChevronRight, Users, GraduationCap, Award } from 'lucide-react';
import ManagerDashboard from './components/ManagerDashboard';
import ProspectiveEcosystem from './components/ProspectiveEcosystem';
import CurrentStudentEcosystem from './components/CurrentStudentEcosystem';
import EgressoEcosystem from './components/EgressoEcosystem';
import { usePortalData } from './hooks/usePortalData';

type Profile = null | 'prospective' | 'current' | 'egresso';

const PROFILES = [
  {
    id: 'prospective' as const,
    emoji: '🎯',
    title: 'Quero ser Aluno',
    subtitle: 'Candidato / Pré-Matrícula',
    description: 'Fui aprovado em edital ou quero conhecer os cursos do IFAM.',
    color: '#2f9e41',
    bg: '#eaf5eb',
  },
  {
    id: 'current' as const,
    emoji: '📘',
    title: 'Sou Aluno',
    subtitle: 'Aluno Matriculado',
    description: 'Acesso ao boletim, horários, documentos e serviços acadêmicos.',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    id: 'egresso' as const,
    emoji: '🎓',
    title: 'Sou Egresso',
    subtitle: 'Ex-Aluno / Concluintes',
    description: 'Vagas de emprego, atualização de trajetória e rede de egressos.',
    color: '#cd191e',
    bg: '#fdf2f2',
  },
];

function App() {
  const [managerView, setManagerView] = useState(false);
  const [profile, setProfile] = useState<Profile>(null);
  
  const { 
    enrollments, protocols, addEnrollment, addProtocol, 
    updateEnrollmentStatus, updateProtocolStatus 
  } = usePortalData();

  if (managerView) {
    return (
      <>
        <button
          onClick={() => setManagerView(false)}
          style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, background: '#2f9e41', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.875rem' }}
        >
          <User size={16} /> Sair do Painel
        </button>
        <ManagerDashboard 
          enrollments={enrollments} 
          protocols={protocols}
          onUpdateEnrollment={updateEnrollmentStatus}
          onUpdateProtocol={updateProtocolStatus}
        />
      </>
    );
  }

  const renderLanding = () => (
    <div className="landing">
      <div className="landing-top">
        <div className="landing-logo-wrap">
          <div className="landing-logo">IF</div>
          <button className="btn-manager-access" onClick={() => setManagerView(true)}>
            <LayoutDashboard size={18} />
          </button>
        </div>
        <h1 className="landing-title">Portal Acadêmico</h1>
        <p className="landing-subtitle">Instituto Federal do Amazonas</p>
        <p className="landing-tagline">Serviços educacionais no seu celular, de qualquer lugar do Amazonas.</p>
      </div>

      <div className="landing-select">
        <p className="landing-prompt">Selecione seu perfil para continuar:</p>
        <div className="profile-list">
          {PROFILES.map(p => (
            <button key={p.id} className="profile-card" onClick={() => setProfile(p.id)}>
              <div className="profile-emoji-wrap" style={{ background: p.bg }}>
                <span className="profile-emoji">{p.emoji}</span>
              </div>
              <div className="profile-text">
                <h3 style={{ color: p.color }}>{p.title}</h3>
                <p className="profile-sub">{p.subtitle}</p>
                <p className="profile-desc">{p.description}</p>
              </div>
              <ChevronRight size={20} className="profile-arrow" />
            </button>
          ))}
        </div>
      </div>

      <div className="landing-footer">
        <p>© 2026 IFAM · Reitoria de Ensino · Todos os direitos reservados</p>
      </div>
    </div>
  );

  const profileConfig = PROFILES.find(p => p.id === profile);

  return (
    <div className="app-container">
      <div className="mobile-layout">
        {!profile ? (
          renderLanding()
        ) : (
          <>
            <header className="ecosystem-header" style={{ borderBottomColor: profileConfig?.color + '33' }}>
              <button className="eco-back-btn" onClick={() => setProfile(null)}>
                <ArrowLeft size={22} />
              </button>
              <div className="eco-header-title">
                <span className="eco-header-emoji">{profileConfig?.emoji}</span>
                <span style={{ color: profileConfig?.color }}>{profileConfig?.title}</span>
              </div>
              <div style={{ width: 36 }} />
            </header>
            <div className="ecosystem-body">
              {profile === 'prospective' && (
                <ProspectiveEcosystem onAddEnrollment={addEnrollment} />
              )}
              {profile === 'current' && (
                <CurrentStudentEcosystem onAddProtocol={addProtocol} protocols={protocols} />
              )}
              {profile === 'egresso' && <EgressoEcosystem />}
            </div>
          </>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; }
        .app-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #e2e8f0; }
        .mobile-layout { width: 100%; max-width: 430px; min-height: 100vh; background: #f8fafc; display: flex; flex-direction: column; position: relative; overflow: hidden; }

        .landing { display: flex; flex-direction: column; min-height: 100vh; padding: 0; background: white; }
        .landing-top { background: white; padding: 3rem 1.5rem 2rem; color: #1e293b; border-bottom: 1px solid #f1f5f9; }
        .landing-logo-wrap { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .landing-logo { width: 56px; height: 56px; background: #2f9e41; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: white; box-shadow: 0 4px 12px rgba(47, 158, 65, 0.2); }
        .btn-manager-access { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; color: #64748b; cursor: pointer; }
        .landing-title { font-size: 2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 0.25rem; color: #1e293b; }
        .landing-subtitle { font-size: 0.9rem; color: #2f9e41; font-weight: 700; margin-bottom: 1.5rem; }
        .landing-tagline { font-size: 0.875rem; color: #64748b; line-height: 1.6; max-width: 280px; }

        .landing-select { flex: 1; padding: 1.5rem; background: #f8fafc; }
        .landing-prompt { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.25rem; }
        .profile-list { display: flex; flex-direction: column; gap: 0.875rem; }
        
        .profile-card { width: 100%; background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .profile-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .profile-card:active { transform: scale(0.98); }
        .profile-emoji-wrap { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .profile-emoji { font-size: 1.75rem; }
        .profile-text { flex: 1; }
        .profile-text h3 { font-size: 1rem; font-weight: 700; margin-bottom: 1px; }
        .profile-sub { font-size: 0.7rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .profile-desc { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
        .profile-arrow { color: #cbd5e1; flex-shrink: 0; }

        .landing-footer { padding: 1.5rem; text-align: center; }
        .landing-footer p { font-size: 0.65rem; color: #cbd5e1; }

        .ecosystem-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: white; border-bottom: 2px solid; position: sticky; top: 0; z-index: 100; }
        .eco-back-btn { background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; }
        .eco-header-title { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1rem; }
        .eco-header-emoji { font-size: 1.25rem; }
        .ecosystem-body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
      `}</style>
    </div>
  );
}

export default App;
