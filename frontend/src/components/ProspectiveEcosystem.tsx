import React, { useState } from 'react';
import {
  FileCheck2, Info, ChevronRight, Building2, User, Camera, UploadCloud,
  CheckCircle, ArrowRight, MapPin, Clock, AlertCircle, ShieldCheck, FileUp, Bell, X,
  GraduationCap, Search, Sparkles, BookOpen, Smartphone, Mail, Users
} from 'lucide-react';

const CAMPUSES = [
  'Manaus Centro (CMC)', 'Manaus Zona Leste (CMZL)', 'Manaus Distrito Industrial (CMDI)',
  'Coari', 'Eirunepé', 'Humaitá', 'Iranduba (Avançado)', 'Itacoatiara', 'Lábrea',
  'Manacapuru', 'Maués', 'Parintins', 'Presidente Figueiredo', 'São Gabriel da Cachoeira',
  'Tabatinga', 'Tefé', 'Boca do Acre'
];

const COURSES_BY_LEVEL: Record<string, string[]> = {
  integrado: ['Técnico em Informática', 'Técnico em Edificações', 'Técnico em Química', 'Técnico em Meio Ambiente', 'Técnico em Mecânica', 'Técnico em Eletrotécnica'],
  subsequente: ['Técnico em Mecânica', 'Técnico em Eletrotécnica', 'Técnico em Informática', 'Técnico em Edificações', 'Técnico em Redes de Computadores'],
  eja: ['Técnico em Mecânica (PROEJA)', 'Técnico em Informática (PROEJA)'],
  graduacao: ['Engenharia Civil', 'Engenharia Mecânica', 'Bacharelado em Ciência da Computação', 'Tecnologia em Processos Químicos', 'Licenciatura em Matemática']
};

const COTAS = [
  { id: 'ampla', label: 'Ampla Concorrência' },
  { id: 'l1', label: 'L1 - Renda ≤ 1,5 SM / Escola Pública' },
  { id: 'l2', label: 'L2 - Renda ≤ 1,5 SM / Escola Pública / PPI' },
  { id: 'l5', label: 'L5 - Escola Pública Independente de Renda' },
  { id: 'l6', label: 'L6 - Escola Pública / PPI / Independente de Renda' },
  { id: 'l9', label: 'L9 - Pessoa com Deficiência / Renda ≤ 1,5 SM' },
  { id: 'l10', label: 'L10 - PcD / Renda ≤ 1,5 SM / PPI' },
  { id: 'l13', label: 'L13 - PcD / Escola Pública' },
  { id: 'l14', label: 'L14 - PcD / Escola Pública / PPI' }
];

const STEPS = ['Campus/Curso', 'Dados Pessoais', 'Contatos', 'Endereço', 'Documentação', 'Finalização'];

export default function ProspectiveEcosystem({ onAddEnrollment }: any) {
  const [screen, setScreen] = useState<'hub' | 'pre_matricula' | 'acompanhar'>('hub');
  const [step, setStep] = useState(1);
  const [view, setView] = useState<'form' | 'profile'>('form');

  // Form State (Restoring all required fields)
  const [formData, setFormData] = useState({
    campus: '', level: '', course: '', cota: '',
    nome: '', cpf: '', rg: '', orgao: '', ufRg: '', dataNasc: '', sexo: '', nomeMae: '',
    email: '', telefone: '',
    cep: '', rua: '', bairro: '', cidade: '', uf: 'AM'
  });

  // Terms
  const [agreedVeracity, setAgreedVeracity] = useState(false);
  const [agreedEdital, setAgreedEdital] = useState(false);
  const [agreedLGPD, setAgreedLGPD] = useState(false);

  const updateForm = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const renderContent = () => {
    if (view === 'profile') return (
      <div className="pe-profile-view animate-in">
        <div className="pe-profile-card">
          <div className="pe-profile-avatar"><User size={32} /></div>
          <div className="pe-profile-info"><h3>Candidato Externo</h3><p>Acesso via CPF: {formData.cpf || 'Não informado'}</p></div>
        </div>
        <div className="pe-menu-group">
          <button className="pe-menu-item"><ShieldCheck size={20} /> Privacidade e LGPD <ChevronRight size={16} /></button>
          <button className="pe-menu-item logout" onClick={() => window.location.reload()}><X size={20} /> Sair</button>
        </div>
      </div>
    );
    
    if (screen === 'pre_matricula') {
      if (step === 7) return (
        <div className="pe-success-modern animate-in">
          <div className="success-lottie">✓</div>
          <h2>Solicitação Recebida!</h2>
          <p>Sua pré-matrícula para o curso <strong>{formData.course}</strong> foi enviada com sucesso.</p>
          <div className="pe-protocol-badge">PROTOCOLO: {new Date().getFullYear()}.{formData.campus.substring(0,3).toUpperCase()}.{Math.floor(Math.random()*90000)}</div>
          <button className="btn-finish" onClick={() => { setScreen('hub'); setStep(1); }}>Voltar ao Início</button>
        </div>
      );

      return (
        <div className="pe-form-container">
          <div className="pe-stepper-modern">
            <div className="stepper-track"><div className="stepper-progress" style={{ width: `${(step/6)*100}%` }}></div></div>
            <div className="stepper-labels"><span>Etapa {step} de 6</span><strong>{STEPS[step-1]}</strong></div>
          </div>

          <div className="pe-card-glass">
            {step === 1 && (
              <div className="pe-step-content animate-in">
                <div className="step-header"><Building2 size={24} /> <h3>Dados da Vaga</h3></div>
                <div className="field-modern"><label>Campus</label>
                  <select className="select-modern" value={formData.campus} onChange={e => updateForm('campus', e.target.value)}>
                    <option value="">Selecione o Campus...</option>
                    {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field-modern"><label>Nível de Ensino</label>
                  <div className="options-grid">
                    {Object.keys(COURSES_BY_LEVEL).map(lvl => (
                      <button key={lvl} className={`opt-btn ${formData.level === lvl ? 'active' : ''}`} onClick={() => updateForm('level', lvl)}>
                        {lvl === 'integrado' ? <BookOpen size={18} /> : lvl === 'graduacao' ? <GraduationCap size={18} /> : <Users size={18} />}
                        <span>{lvl.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {formData.level && <div className="field-modern"><label>Curso</label>
                  <select className="select-modern" value={formData.course} onChange={e => updateForm('course', e.target.value)}>
                    <option value="">Selecione o curso...</option>
                    {COURSES_BY_LEVEL[formData.level]?.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>}
                <div className="field-modern"><label>Cota de Inscrição</label>
                  <select className="select-modern" value={formData.cota} onChange={e => updateForm('cota', e.target.value)}>
                    <option value="">Selecione a modalidade...</option>
                    {COTAS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="nav-modern"><button className="btn-primary-modern" disabled={!formData.cota || !formData.course} onClick={() => setStep(2)}>Avançar <ArrowRight size={18} /></button></div>
              </div>
            )}

            {step === 2 && (
              <div className="pe-step-content animate-in">
                <div className="step-header"><User size={24} /> <h3>Dados Pessoais</h3></div>
                <div className="field-modern"><label>Nome Completo</label><input type="text" className="input-modern" value={formData.nome} onChange={e => updateForm('nome', e.target.value)} /></div>
                <div className="field-row-modern">
                  <div className="field-modern"><label>CPF</label><input type="text" className="input-modern" placeholder="000.000.000-00" value={formData.cpf} onChange={e => updateForm('cpf', e.target.value)} /></div>
                  <div className="field-modern"><label>Data Nascimento</label><input type="date" className="input-modern" value={formData.dataNasc} onChange={e => updateForm('dataNasc', e.target.value)} /></div>
                </div>
                <div className="field-row-modern">
                  <div className="field-modern"><label>RG</label><input type="text" className="input-modern" value={formData.rg} onChange={e => updateForm('rg', e.target.value)} /></div>
                  <div className="field-modern"><label>Órgão/UF</label><input type="text" className="input-modern" placeholder="SSP/AM" value={formData.orgao} onChange={e => updateForm('orgao', e.target.value)} /></div>
                </div>
                <div className="field-modern"><label>Nome da Mãe</label><input type="text" className="input-modern" value={formData.nomeMae} onChange={e => updateForm('nomeMae', e.target.value)} /></div>
                <div className="nav-modern"><button className="btn-ghost-modern" onClick={() => setStep(1)}>Voltar</button><button className="btn-primary-modern" onClick={() => setStep(3)}>Avançar</button></div>
              </div>
            )}

            {step === 3 && (
              <div className="pe-step-content animate-in">
                <div className="step-header"><Smartphone size={24} /> <h3>Contatos</h3></div>
                <div className="field-modern"><label>E-mail</label><input type="email" className="input-modern" placeholder="email@exemplo.com" value={formData.email} onChange={e => updateForm('email', e.target.value)} /></div>
                <div className="field-modern"><label>Celular / WhatsApp</label><input type="tel" className="input-modern" placeholder="(92) 90000-0000" value={formData.telefone} onChange={e => updateForm('telefone', e.target.value)} /></div>
                <div className="nav-modern"><button className="btn-ghost-modern" onClick={() => setStep(2)}>Voltar</button><button className="btn-primary-modern" onClick={() => setStep(4)}>Avançar</button></div>
              </div>
            )}

            {step === 4 && (
              <div className="pe-step-content animate-in">
                <div className="step-header"><MapPin size={24} /> <h3>Endereço</h3></div>
                <div className="field-modern"><label>CEP</label><input type="text" className="input-modern" placeholder="69000-000" value={formData.cep} onChange={e => updateForm('cep', e.target.value)} /></div>
                <div className="field-modern"><label>Endereço Completo</label><input type="text" className="input-modern" placeholder="Rua, Bairro e Número" value={formData.rua} onChange={e => updateForm('rua', e.target.value)} /></div>
                <div className="nav-modern"><button className="btn-ghost-modern" onClick={() => setStep(3)}>Voltar</button><button className="btn-primary-modern" onClick={() => setStep(5)}>Avançar</button></div>
              </div>
            )}

            {step === 5 && (
              <div className="pe-step-content animate-in">
                <div className="step-header"><UploadCloud size={24} /> <h3>Anexar Documentos</h3></div>
                <p className="step-desc">Formatos aceitos: PDF, JPG ou PNG (Max 5MB).</p>
                <div className="docs-upload-stack">
                  <div className="upload-item-modern"><span>Documento de Identidade</span> <label><FileUp size={20} /><input type="file" hidden /></label></div>
                  <div className="upload-item-modern"><span>Histórico Escolar</span> <label><FileUp size={20} /><input type="file" hidden /></label></div>
                  <div className="upload-item-modern"><span>Comprovante de Residência</span> <label><FileUp size={20} /><input type="file" hidden /></label></div>
                  {formData.cota !== 'ampla' && <div className="upload-item-modern"><span>Comprovação de Cota</span> <label><FileUp size={20} /><input type="file" hidden /></label></div>}
                </div>
                <div className="nav-modern"><button className="btn-ghost-modern" onClick={() => setStep(4)}>Voltar</button><button className="btn-primary-modern" onClick={() => setStep(6)}>Avançar</button></div>
              </div>
            )}

            {step === 6 && (
              <div className="pe-step-content animate-in">
                <div className="step-header"><ShieldCheck size={24} /> <h3>Finalização e Termos</h3></div>
                <div className="terms-container-modern">
                  <label className="checkbox-modern"><input type="checkbox" checked={agreedVeracity} onChange={e => setAgreedVeracity(e.target.checked)} /> <span>Declaro que as informações e documentos anexados são verdadeiros sob pena da lei.</span></label>
                  <label className="checkbox-modern"><input type="checkbox" checked={agreedEdital} onChange={e => setAgreedEdital(e.target.checked)} /> <span>Li e estou de acordo com todas as regras do Edital de Matrícula.</span></label>
                  <label className="checkbox-modern"><input type="checkbox" checked={agreedLGPD} onChange={e => setAgreedLGPD(e.target.checked)} /> <span>Autorizo o IFAM a processar meus dados pessoais para fins acadêmicos (LGPD).</span></label>
                </div>
                <div className="nav-modern">
                  <button className="btn-ghost-modern" onClick={() => setStep(5)}>Voltar</button>
                  <button className="btn-submit-modern" disabled={!agreedVeracity || !agreedEdital || !agreedLGPD} onClick={() => {
                    onAddEnrollment({
                      name: formData.nome,
                      campus: formData.campus,
                      course: formData.course,
                      cota: formData.cota.toUpperCase(),
                      docs: 7,
                      cpf: formData.cpf
                    });
                    setStep(7);
                  }}>Finalizar e Enviar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="pe-hub-modern animate-in">
        <div className="pe-hero-modern">
          <div className="hero-badge"><Sparkles size={14} /> Ingresso Acadêmico 2026</div>
          <h1>Sua Jornada <strong>Começa Aqui</strong></h1>
          <p>Realize sua pré-matrícula de forma rápida, segura e totalmente digital.</p>
        </div>
        
        <div className="pe-hub-options">
          <div className="hub-card-primary" onClick={() => setScreen('pre_matricula')}>
            <div className="card-icon"><GraduationCap size={32} /></div>
            <div className="card-text"><h3>Fazer Pré-Matrícula</h3><p>Envie sua documentação online.</p></div>
            <ArrowRight size={20} className="card-arrow" />
          </div>
          
          <div className="hub-card-secondary" onClick={() => setScreen('acompanhar')}>
            <div className="card-icon"><Search size={24} /></div>
            <div className="card-text"><h3>Acompanhar Status</h3><p>Verifique o andamento da sua vaga.</p></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pe-root">
      <div className="pe-scroll-area">{renderContent()}</div>
      
      <nav className="pe-tabbar">
        <button className={`tab-btn ${view === 'form' ? 'active' : ''}`} onClick={() => setView('form')}><div className="tab-icon-wrap"><FileCheck2 size={22} /></div><span>Matrícula</span></button>
        <button className={`tab-btn ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}><div className="tab-icon-wrap"><User size={22} /></div><span>Perfil</span></button>
      </nav>

      <style>{`
        .pe-root { display: flex; flex-direction: column; height: 100%; background: #f0f4f8; }
        .pe-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 90px; }
        
        .pe-hub-modern { padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .pe-hero-modern h1 { font-size: 2.2rem; color: #1e293b; letter-spacing: -1px; line-height: 1.1; margin-bottom: 1rem; }
        .pe-hero-modern h1 strong { color: #2f9e41; font-weight: 900; }
        .pe-hero-modern p { font-size: 0.95rem; color: #64748b; }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: #eaf5eb; color: #2f9e41; padding: 6px 12px; border-radius: 20px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem; }

        .pe-hub-options { display: flex; flex-direction: column; gap: 1rem; }
        .hub-card-primary { background: linear-gradient(135deg, #2f9e41, #166534); padding: 1.75rem; border-radius: 24px; color: white; display: flex; align-items: center; gap: 1.25rem; cursor: pointer; box-shadow: 0 10px 25px rgba(47, 158, 65, 0.2); }
        .hub-card-primary .card-icon { width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 18px; display: flex; align-items: center; justify-content: center; }
        .hub-card-primary h3 { font-size: 1.15rem; font-weight: 800; }
        .hub-card-primary p { font-size: 0.8rem; opacity: 0.9; }
        .card-arrow { margin-left: auto; opacity: 0.6; }

        .hub-card-secondary { background: white; padding: 1.25rem; border-radius: 24px; border: 1.5px solid #e2e8f0; display: flex; align-items: center; gap: 1rem; cursor: pointer; }
        .hub-card-secondary .card-icon { color: #2f9e41; }

        .pe-form-container { padding: 1.5rem; }
        .pe-stepper-modern { margin-bottom: 1.5rem; }
        .stepper-track { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
        .stepper-progress { height: 100%; background: #2f9e41; transition: width 0.4s ease; }
        .stepper-labels { display: flex; justify-content: space-between; font-size: 0.7rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; }

        .pe-card-glass { background: white; border-radius: 24px; padding: 1.5rem; border: 1px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .step-header { display: flex; align-items: center; gap: 12px; color: #2f9e41; margin-bottom: 1.5rem; }
        .step-header h3 { font-size: 1.1rem; color: #1e293b; font-weight: 800; }

        .field-modern { margin-bottom: 1.25rem; }
        .field-modern label { display: block; font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.5rem; }
        .select-modern, .input-modern { width: 100%; padding: 0.875rem; border-radius: 12px; border: 1.5px solid #f1f5f9; background: #f8fafc; font-size: 0.95rem; outline: none; }
        
        .options-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        .opt-btn { background: #f8fafc; border: 2px solid #f1f5f9; padding: 1rem 0.5rem; border-radius: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
        .opt-btn span { font-size: 0.6rem; font-weight: 800; }
        .opt-btn.active { border-color: #2f9e41; background: #eaf5eb; color: #2f9e41; }

        .field-row-modern { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .docs-upload-stack { display: flex; flex-direction: column; gap: 0.75rem; }
        .upload-item-modern { display: flex; justify-content: space-between; align-items: center; padding: 0.875rem 1.25rem; background: #f8fafc; border-radius: 14px; font-size: 0.8rem; font-weight: 700; color: #475569; }
        .upload-item-modern label { background: white; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #2f9e41; border: 1.5px solid #e2e8f0; }

        .terms-container-modern { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .checkbox-modern { display: flex; gap: 12px; font-size: 0.8rem; color: #64748b; line-height: 1.4; cursor: pointer; }
        .checkbox-modern input { width: 18px; height: 18px; flex-shrink: 0; }

        .nav-modern { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn-primary-modern { flex: 1; background: #2f9e41; color: white; border: none; padding: 1rem; border-radius: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-submit-modern { flex: 1; background: #1e293b; color: white; border: none; padding: 1rem; border-radius: 14px; font-weight: 800; }
        .btn-ghost-modern { padding: 1rem; background: #f1f5f9; border: none; border-radius: 14px; font-weight: 700; color: #64748b; }

        .pe-tabbar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(15px); display: flex; height: 75px; border-top: 1px solid #f1f5f9; z-index: 1000; max-width: 430px; margin: 0 auto; }
        .tab-btn { flex: 1; background: none; border: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: #94a3b8; }
        .tab-btn.active { color: #2f9e41; }
        .tab-icon-wrap { width: 44px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .tab-btn.active .tab-icon-wrap { background: #eaf5eb; }
        .tab-btn span { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; }

        .pe-success-modern { text-align: center; padding: 3rem 0; }
        .success-lottie { width: 70px; height: 70px; background: #eaf5eb; color: #2f9e41; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem; }
        .pe-protocol-badge { display: inline-block; background: #f8fafc; border: 2px dashed #e2e8f0; padding: 0.75rem 1rem; border-radius: 12px; font-weight: 800; color: #1e293b; font-family: monospace; margin: 1.5rem 0; }
        .btn-finish { width: 100%; padding: 1rem; background: #2f9e41; color: white; border: none; border-radius: 14px; font-weight: 800; }

        .animate-in { animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .pe-profile-view { padding: 1.5rem; }
        .pe-profile-card { background: white; padding: 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 1rem; border: 1.5px solid #f1f5f9; margin-bottom: 1.5rem; }
        .pe-profile-avatar { width: 52px; height: 52px; background: #eaf5eb; color: #2f9e41; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .pe-menu-item { width: 100%; background: white; padding: 1rem; border-radius: 16px; border: 1.5px solid #f1f5f9; display: flex; align-items: center; gap: 12px; font-size: 0.9rem; font-weight: 700; color: #475569; margin-bottom: 0.75rem; }
        .pe-menu-item.logout { color: #ef4444; border-color: #fecaca; }
      `}</style>
    </div>
  );
}
