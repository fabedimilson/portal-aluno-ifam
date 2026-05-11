import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API do Portal do Aluno IFAM rodando' });
});

// Rotas de teste para garantir conexão com o banco
app.get('/api/campuses', async (req, res) => {
  try {
    const campuses = await prisma.campus.findMany();
    res.json(campuses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar campuses' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
