const executaQuery = require('../database/queries')

class Atendimento {
  lista() {
    const sql = 'SELECT * FROM Atendimentos'

    return executaQuery(sql)
  }

  buscaPorId(res, id) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${parseInt(id)}`

    executaQuery(res, sql)
  }

  adiciona(item) {
    const { clienteId, petId, servicoId, status, observacoes } = item
    const data = new Date().toLocaleDateString()

    const sql = `INSERT INTO Atendimentos(
      clienteId, 
      petId, 
      servicoId, 
      data, 
      status, 
      observacoes
    )VALUES(
      ${clienteId}, 
      ${petId}, 
      ${servicoId}, 
      '${data}', 
      '${status}', 
      '${observacoes}'
    );
    SELECT * FROM Clientes WHERE Clientes.id = ${clienteId};
    SELECT * FROM Pets WHERE Pets.id = ${petId}; 
    SELECT * FROM Servicos WHERE Servicos.id = ${servicoId}`

    return executaQuery(sql).then(res => {
      const dados = res[0];
      const cliente = res[1][0];
      const pet = res[2][0];
      const servico = res[3][0];
      
      return ({
        id: dados.insertId,
        cliente,
        pet,
        servico,
        data,
        status,
        observacoes
      });
    });
  }

  atualiza(res, novoItem, id) {
    const { cliente, pet, servico, status, observacoes } = item
    const data = new Date.toLocaleDateString()
  
    const sql = `UPDATE Atendimentos SET clienteId=${cliente}, petId=${pet}, servicoId=${servico}, data='${data}', status='${status}' observacoes='${observacoes}' WHERE id=${id}`

    executaQuery(res, sql)
  }

  deleta(res, id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    executaQuery(res, sql)
  }
}

module.exports = new Atendimento
