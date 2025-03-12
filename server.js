import express from "express";
import cors from "cors";
import contractRoutes from "./routes/contractRoutes.js";
import { createDatabase } from "./models/contractModel.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Criar banco de dados se não existir
createDatabase();

// Rotas
app.use("/contracts", contractRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
