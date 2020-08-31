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
    pets: () => Pets.lista()
  },

  Mutation: {
    addCliente: (root, params) => Clientes.adiciona(params),
    updateCliente: (root, params) => Clientes.atualiza(params),
    deleteCliente: (root, { id }) => Clientes.deleta(id),
    addPet: (root, params) => Pets.adiciona(params)
  }
}

const server = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
});

server.start(() => console.log(' Servidor ouvindo..'));