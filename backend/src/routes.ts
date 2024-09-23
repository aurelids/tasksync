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
import { handleCreateTask, handleGetTasksByProject, handleDeleteTask, handleUpdateTask } from './controllers/taskController';

export async function routes(app: FastifyInstance) {
    
    app.post('/login', loginUser);
    app.post('/users', createUser);
    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById);
    app.put('/users/:id', updateUser);
    app.delete('/users/:id', deleteUser);

    
    app.post('/projects', handleCreateProject);
    app.get('/projects', handleGetProjects);
    app.delete('/projects/:id', handleDeleteProject);

    
    app.post('/tasks', handleCreateTask);
    app.get('/tasks/:projectId', handleGetTasksByProject);
    app.delete('/tasks/:id', handleDeleteTask); 
    app.put('/tasks/:id', handleUpdateTask); 
}
