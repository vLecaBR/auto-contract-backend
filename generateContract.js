// src/generateContract.js

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// Função para gerar o Word
export const generateWord = (data) => {
  const templatePath = path.join(__dirname, '../templates/template.docx'); // Caminho do template
  const outputPath = path.join(__dirname, '../public/pdfs/output.docx'); // Caminho para salvar o Word gerado

  const templateContent = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(templateContent);
  const doc = new Docxtemplater(zip);

  doc.setData(data);

  try {
    doc.render();
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputPath, buf);
    console.log('Documento Word gerado com sucesso!');
    return outputPath; // Retorna o caminho do arquivo gerado
  } catch (error) {
    console.error('Erro ao gerar o documento Word:', error);
    throw error;
  }
};

// Função para converter o Word para PDF
export const convertWordToPdf = async (wordFilePath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carregar o arquivo Word gerado e convertê-lo em HTML
  const htmlContent = await convertWordToHtml(wordFilePath); // Função para conversão fictícia

  await page.setContent(htmlContent);
  const pdfPath = wordFilePath.replace('.docx', '.pdf'); // Caminho do PDF

  await page.pdf({ path: pdfPath, format: 'A4' });
  console.log('PDF gerado com sucesso:', pdfPath);
  
  await browser.close();
  return pdfPath;
};

// Função fictícia para converter o Word para HTML
const convertWordToHtml = async (filePath) => {
  // Aqui você pode usar `mammoth` ou outra biblioteca para converter o Word para HTML
  // Para fins de exemplo, vamos simular o HTML
  return "<html><body><h1>Documento Gerado</h1></body></html>"; // Substitua com conversão real.
};
