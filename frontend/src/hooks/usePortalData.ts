import { useState, useEffect } from 'react';

export interface Enrollment {
  id: string;
  name: string;
  cpf: string;
  campus: string;
  course: string;
  cota: string;
  status: 'Pendente' | 'Em Análise' | 'Deferido' | 'Indeferido';
  date: string;
  docs: number;
}

export interface Protocol {
  id: string;
  studentName: string;
  type: string;
  campus: string;
  date: string;
  status: 'Pendente' | 'Deferido' | 'Indeferido';
  result?: string;
}

export const usePortalData = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem('ifam_enrollments');
    return saved ? JSON.parse(saved) : [
      { id: '2026.001', name: 'Lucas Gabriel Ferreira', cpf: '001.***.***-01', campus: 'Manaus Centro (CMC)', course: 'Informática Integrado', cota: 'Cota L1', status: 'Pendente', date: '10/05/2026', docs: 7 },
      { id: '2026.002', name: 'Maria Eduarda Santos', cpf: '002.***.***-02', campus: 'Manaus Centro (CMC)', course: 'Eng. Mecânica', cota: 'Ampla Concorrência', status: 'Em Análise', date: '09/05/2026', docs: 8 }
    ];
  });

  const [protocols, setProtocols] = useState<Protocol[]>(() => {
    const saved = localStorage.getItem('ifam_protocols');
    return saved ? JSON.parse(saved) : [
      { id: 'PROT-001', studentName: 'João da Silva', type: 'Atestado Médico', campus: 'Manaus Centro (CMC)', date: '05/05/2026', status: 'Deferido', result: 'Faltas abonadas.' },
      { id: 'PROT-002', studentName: 'Ricardo Oliveira', type: 'Justificativa de Falta', campus: 'Manaus Centro (CMC)', date: '10/05/2026', status: 'Pendente' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ifam_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('ifam_protocols', JSON.stringify(protocols));
  }, [protocols]);

  const addEnrollment = (data: Omit<Enrollment, 'id' | 'status' | 'date'>) => {
    const newEnroll: Enrollment = {
      ...data,
      id: `2026.${(enrollments.length + 1).toString().padStart(3, '0')}`,
      status: 'Pendente',
      date: new Date().toLocaleDateString('pt-BR'),
    };
    setEnrollments([newEnroll, ...enrollments]);
  };

  const addProtocol = (data: Omit<Protocol, 'id' | 'status' | 'date'>) => {
    const newProt: Protocol = {
      ...data,
      id: `PROT-${(protocols.length + 1).toString().padStart(3, '0')}`,
      status: 'Pendente',
      date: new Date().toLocaleDateString('pt-BR'),
    };
    setProtocols([newProt, ...protocols]);
  };

  const updateEnrollmentStatus = (id: string, status: Enrollment['status']) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const updateProtocolStatus = (id: string, status: Protocol['status'], result?: string) => {
    setProtocols(prev => prev.map(p => p.id === id ? { ...p, status, result } : p));
  };

  return {
    enrollments,
    protocols,
    addEnrollment,
    addProtocol,
    updateEnrollmentStatus,
    updateProtocolStatus
  };
};
