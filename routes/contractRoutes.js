import express from "express";
import { saveContract } from "../models/contractModel.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const router = express.Router();

// Rota para salvar contrato no banco e gerar PDF
router.post("/create", (req, res) => {
  const contractData = req.body;

  saveContract(contractData, (err, contractId) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao salvar contrato" });
    }

    // Escolher o modelo de contrato com base no artista
    const templatePath = path.join("templates", `${contractData.artista}.html`);
    
    fs.readFile(templatePath, "utf8", (err, template) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao carregar template" });
      }

      // Substituir placeholders pelos dados do contrato
      let filledTemplate = template;
      Object.keys(contractData).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        filledTemplate = filledTemplate.replace(regex, contractData[key]);
      });


      // Gerar PDF
      const pdfPath = `contracts/contract_${contractId}.pdf`;
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(pdfPath));
      pdfDoc.text(filledTemplate);
      pdfDoc.end();

      res.json({ message: "Contrato criado com sucesso!", pdfPath });
    });
  });
});

export default router;
