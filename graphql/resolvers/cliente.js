const Operations = require('../../infraestrutura/operations');
const Clientes = new Operations('cliente');

const resolvers = { 
  Query: {
    clientes: () => Clientes.lista(),
    cliente: (root, { id }) => Clientes.buscaPorId(id)
  },

  Mutation: {
    addCliente: (root, params) => Clientes.adiciona(params),
    updateCliente: (root, params) => Clientes.atualiza(params),
    deleteCliente: (root, { id }) => Clientes.deleta(id)
  }
}

module.exports = resolvers;