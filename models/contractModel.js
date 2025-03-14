import sqlite3 from "sqlite3";

const DB_FILE = "database.sqlite";
const db = new sqlite3.Database(DB_FILE);

export const createDatabase = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contracts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artista TEXT,
      evento TEXT,
      data TEXT,
      horarioEvento TEXT,
      horarioPalco TEXT,
      nomeCasa TEXT,
      capacidadeLocal TEXT,
      enderecoCasa TEXT,
      cep TEXT,
      cidade TEXT,
      valorShow TEXT,
      deposito1 TEXT,
      deposito2 TEXT,
      dataDeposito1 TEXT,
      dataDeposito2 TEXT,
      nomeContratantePJ TEXT,
      cpfCnpj TEXT,
      enderecoPJ TEXT,
      telefoneContatoPJ TEXT,
      emailPJ TEXT,
      representanteLegal TEXT,
      enderecoRepLegal TEXT,
      cepRepLegal TEXT,
      rgRepLegal TEXT,
      cpfRepLegal TEXT,
      nomeContratantePF TEXT,
      enderecoPF TEXT,
      cepPF TEXT,
      cidadePF TEXT,
      telefoneContatoPF TEXT,
      emailPF TEXT,
      rgPF TEXT,
      cpfPF TEXT
    )
  `);
};

export const saveContract = (data, callback) => {
    const query = `
    INSERT INTO contracts (
      artista, evento, data, horarioEvento, horarioPalco, nomeCasa, capacidadeLocal, enderecoCasa, cep, cidade, valorShow,
      deposito1, deposito2, dataDeposito1, dataDeposito2, nomeContratantePJ, cpfCnpj, enderecoPJ, telefoneContatoPJ, emailPJ,
      representanteLegal, enderecoRepLegal, cepRepLegal, rgRepLegal, cpfRepLegal, nomeContratantePF, enderecoPF, cepPF, cidadePF,
      telefoneContatoPF, emailPF, rgPF, cpfPF
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;  
  
    const values = [
      data.artista, data.evento, data.data, data.horarioEvento, data.horarioPalco, data.nomeCasa, data.capacidadeLocal, data.enderecoCasa, data.cep, data.cidade, data.valorShow,
      data.deposito1, data.deposito2, data.dataDeposito1, data.dataDeposito2, data.nomeContratantePJ, data.cpfCnpj, data.enderecoPJ, data.telefoneContatoPJ, data.emailPJ,
      data.representanteLegal, data.enderecoRepLegal, data.cepRepLegal, data.rgRepLegal, data.cpfRepLegal, data.nomeContratantePF, data.enderecoPF, data.cepPF, data.cidadePF,
      data.telefoneContatoPF, data.emailPF, data.rgPF, data.cpfPF
    ];
  
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
  
