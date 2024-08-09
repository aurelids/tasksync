import { FastifyInstance } from 'fastify';
import { loginUser, createUser, getAllUsers, getUserById, updateUser, deleteUser } from './controllers/userController';

export async function routes(app: FastifyInstance) {
  app.post('/login', loginUser);
  app.post('/users', createUser);
  app.get('/users', getAllUsers);
  app.get('/users/:id', getUserById);
  app.put('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);
}
