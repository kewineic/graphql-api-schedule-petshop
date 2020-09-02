const Operations = require('../../infraestrutura/operations');
const Servicos = new Operations('servico');

const resolvers = {
  Query: {
    servicos: () => Servicos.lista(),
    servico: (root, { id }) => Servicos.buscaPorId(id)
  },
  Mutation: {
    addServico: (root, params) => Servicos.adiciona(params),
    updateServico: (root, params) => Servicos.atualiza(params),
    deleteServico: (root, { id }) => Servicos.deleta(id)
  }
}

module.exports = resolvers;