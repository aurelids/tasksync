import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from './controllers/userController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Rota para criar um novo usuário
  fastify.post('/users', createUser);

  // Rota para obter todos os usuários
  fastify.get('/users', getAllUsers);

  // Rota para obter um usuário específico por ID
  fastify.get('/users/:id', getUserById);

  // Rota para atualizar um usuário existente
  fastify.put('/users/:id', updateUser);

  // Rota para excluir um usuário
  fastify.delete('/users/:id', deleteUser);
}