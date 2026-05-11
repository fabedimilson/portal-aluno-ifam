-- SCHEMA DO PORTAL ACADÊMICO IFAM
-- Foco: Escalabilidade, BI de Egressos e Validação de Matrículas

-- 1. ESTRUTURA ACADÊMICA (ADMINISTRATIVA)
CREATE TABLE campuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL UNIQUE,
    sigla VARCHAR(10) NOT NULL UNIQUE,
    cidade VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE niveis_ensino (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL UNIQUE -- Integrado, Subsequente, Graduação, etc.
);

CREATE TABLE cursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID REFERENCES campuses(id),
    nivel_id UUID REFERENCES niveis_ensino(id),
    nome VARCHAR(255) NOT NULL,
    turno VARCHAR(50) NOT NULL,
    modalidade VARCHAR(100) NOT NULL DEFAULT 'Presencial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USUÁRIOS E ROLES
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    senha_hash TEXT NOT NULL,
    telefone VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'ALUNO', -- GESTOR, ALUNO, EGRESSO
    status_cadastro VARCHAR(50) DEFAULT 'ATIVO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PRÉ-MATRÍCULAS (O MOTOR PARA ELIMINAR FILAS)
CREATE TABLE inscricoes_pre_matricula (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    curso_id UUID REFERENCES cursos(id),
    modalidade_cota VARCHAR(100),
    status VARCHAR(50) DEFAULT 'PENDENTE', -- PENDENTE, EM_ANALISE, DEFERIDO, INDEFERIDO
    questionario_socioeconomico JSONB, -- Flexibilidade para mudar perguntas conforme o edital
    analisado_por UUID REFERENCES usuarios(id), -- Servidor que validou
    data_analise TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE inscricao_documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inscricao_id UUID REFERENCES inscricoes_pre_matricula(id),
    tipo_documento VARCHAR(100), -- RG, CPF, Historico, Foto3x4
    url_s3 TEXT NOT NULL, -- Link para o armazenamento de arquivos (S3/MinIO)
    status_validacao VARCHAR(50) DEFAULT 'AGUARDANDO', -- OK, REJEITADO
    observacao_rejeicao TEXT, -- Motivo para o aluno corrigir
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. INTELIGÊNCIA DE DADOS (EGRESSOS)
-- Esta tabela é o coração do BI de empregabilidade
CREATE TABLE egressos_historico_profissional (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id),
    situacao VARCHAR(100) NOT NULL, -- Trabalhando, Estudando, Empreendendo, etc.
    empresa_instituicao VARCHAR(255),
    cargo_curso VARCHAR(255),
    faixa_salarial_id INT, -- Referência para métricas financeiras
    data_inicio DATE NOT NULL,
    data_fim DATE, -- NULL se for a situação atual
    is_atual BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXAÇÃO PARA ALTA PERFORMANCE NO BI
CREATE INDEX idx_egressos_situacao ON egressos_historico_profissional(situacao);
CREATE INDEX idx_cursos_campus ON cursos(campus_id);
CREATE INDEX idx_inscricoes_status ON inscricoes_pre_matricula(status);

-- COMENTÁRIOS DE ARQUITETURA:
-- 1. JSONB em 'questionario_socioeconomico' permite que cada Campus ou Edital tenha perguntas diferentes sem mudar o SQL.
-- 2. 'is_atual' no histórico profissional facilita consultas rápidas para o Dashboard sem precisar de cálculos complexos de data.
-- 3. URLs S3 em vez de arquivos físicos no banco garantem que o BD suporte milhões de registros sem inflar.
