const { GraphQLServer } = require('graphql-yoga');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');
const Operations = require('./infraestrutura/operations');

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
});

const Clientes = new Operations('cliente');
const Pets = new Operations('pet');

const resolvers = { 
  Query: {
    status: () => "Servidor rodando",
    clientes: () => Clientes.lista(),
    cliente: (root, { id }) => Clientes.buscaPorId(id),
    pets: () => Pets.lista(),
    pet: (root, { id }) => Pets.buscaPorId(id)
  },

  Mutation: {
    addCliente: (root, params) => Clientes.adiciona(params),
    updateCliente: (root, params) => Clientes.atualiza(params),
    deleteCliente: (root, { id }) => Clientes.deleta(id),
    addPet: (root, params) => Pets.adiciona(params),
    updatePet: (root, params) => Pets.atualiza(params),
    deletePet: (root, { id }) => Pets.deleta(id)
  }
}

const server = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
});

server.start(() => console.log(' Servidor ouvindo..'));