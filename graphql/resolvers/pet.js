const Operations = require('../../infraestrutura/operations');
const Pets = new Operations('pet');

const resolvers = { 
  Query: {
    pets: () => Pets.lista(),
    pet: (root, { id }) => Pets.buscaPorId(id)
  },

  Mutation: {
    addPet: (root, params) => Pets.adiciona(params),
    updatePet: (root, params) => Pets.atualiza(params),
    deletePet: (root, { id }) => Pets.deleta(id)
  }
}

module.exports = resolvers;