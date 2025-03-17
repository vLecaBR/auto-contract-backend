import sqlite3 from "sqlite3";

const DB_FILE = "database.sqlite";
const db = new sqlite3.Database(DB_FILE);

export const createDatabase = () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS contracts (
        artista TEXT,
            camarim TEXT,
            capacidadeLocal TEXT,
            cep TEXT,
            cepPF TEXT,
            cepRepLegal TEXT,
            cidade TEXT,
            cidadePF TEXT,
            cpfCnpj TEXT,
            cpfPF TEXT,
            cpfRepLegal TEXT,
            data TEXT,
            dataDeposito1 TEXT,
            dataDeposito2 TEXT,
            deposito1 TEXT,
            deposito2 TEXT,
            efeitos TEXT,
            emailPF TEXT,
            emailPJ TEXT,
            enderecoCasa TEXT,
            enderecoHotel TEXT,
            enderecoPF TEXT,
            enderecoPJ TEXT,
            enderecoRepLegal TEXT,
            evento TEXT,
            horarioEvento TEXT,
            horarioPalco TEXT,
            hospitalidade TEXT,
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            logistica TEXT,
            nomeCasa TEXT,
            nomeContratantePF TEXT,
            nomeContratantePJ TEXT,
            representanteLegal TEXT,
            rgPF TEXT,
            rgRepLegal TEXT,
            telefoneContatoPF TEXT,
            telefoneContatoPJ TEXT,
            valorShow TEXT
      );
    `);
  };
  

  export const saveContract = (data, callback) => {
    const query = `
  INSERT INTO contracts (
    artista, 
    evento, 
    data, 
    horarioEvento, 
    horarioPalco, 
    nomeCasa, 
    capacidadeLocal, 
    enderecoCasa, 
    cep, 
    cidade, 
    valorShow,
    deposito1, 
    deposito2, 
    dataDeposito1, 
    dataDeposito2, 
    nomeContratantePJ, 
    cpfCnpj, 
    enderecoPJ, 
    telefoneContatoPJ, 
    emailPJ,
    representanteLegal, 
    enderecoRepLegal, 
    cepRepLegal, 
    rgRepLegal, 
    cpfRepLegal, 
    nomeContratantePF, 
    enderecoPF, 
    cepPF, 
    cidadePF,
    telefoneContatoPF, 
    emailPF, 
    rgPF, 
    cpfPF, 
    logistica, 
    hospitalidade, 
    enderecoHotel, 
    efeitos, 
    camarim
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  data.artista || null, 
  data.evento || null, 
  data.data || null, 
  data.horarioEvento || null, 
  data.horarioPalco || null,
  data.nomeCasa || null, 
  data.capacidadeLocal || null, 
  data.enderecoCasa || null, 
  data.cep || null, 
  data.cidade || null,
  data.valorShow || null, 
  data.deposito1 || null, 
  data.deposito2 || null, 
  data.dataDeposito1 || null, 
  data.dataDeposito2 || null,
  data.nomeContratantePJ || null, 
  data.cpfCnpj || null, 
  data.enderecoPJ || null, 
  data.telefoneContatoPJ || null, 
  data.emailPJ || null,
  data.representanteLegal || null, 
  data.enderecoRepLegal || null, 
  data.cepRepLegal || null, 
  data.rgRepLegal || null, 
  data.cpfRepLegal || null,
  data.nomeContratantePF || null, 
  data.enderecoPF || null, 
  data.cepPF || null, 
  data.cidadePF || null, 
  data.telefoneContatoPF || null,
  data.emailPF || null, 
  data.rgPF || null, 
  data.cpfPF || null, 
  data.logistica || null, 
  data.hospitalidade || null,
  data.enderecoHotel || null, 
  data.efeitos || null, 
  data.camarim || null
];

console.log("Valores para inserção:", values);

db.run(query, values, function (err) {
  if (err) {
    console.error("Erro ao inserir contrato:", err);
    callback(err, null);
  } else {
    console.log("Contrato salvo com ID:", this?.lastID);
    callback(null, this?.lastID);
  }
});
};