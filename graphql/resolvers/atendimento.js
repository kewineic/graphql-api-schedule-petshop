const Operations = require('../../infraestrutura/operations');
const Atendimentos = new Operations('atendimento');

const resolvers = { 
  Query: {
    atendimentos: () => Atendimentos.lista()
    // atendimento: (root, { id }) => Atendimentos.buscaPorId(id)
  },

  Mutation: {
    addAtendimento: (root, params) => Atendimentos.adiciona(params)
    // updateAtendimento: (root, params) => Atendimentos.atualiza(params),
    // deleteAtendimento: (root, { id }) => Atendimentos.deleta(id)
  }
}

module.exports = resolvers;