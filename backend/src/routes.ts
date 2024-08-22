import { FastifyInstance } from 'fastify';
import {
    loginUser,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from './controllers/userController';
import {
    handleCreateProject,
    handleGetProjects,
    handleDeleteProject
} from './controllers/projectController';

export async function routes(app: FastifyInstance) {
    // Rotas de usuário
    app.post('/login', loginUser);
    app.post('/users', createUser);
    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById);
    app.put('/users/:id', updateUser);
    app.delete('/users/:id', deleteUser);

    // Rotas de projeto
    app.post('/projects', handleCreateProject);
    app.get('/projects', handleGetProjects);
    app.delete('/projects/:id', handleDeleteProject);  // Adiciona a rota para deletar projeto
}
