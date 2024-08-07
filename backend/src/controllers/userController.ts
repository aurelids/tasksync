import { FastifyRequest, FastifyReply } from 'fastify';
import { 
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService 
} from '../services/userService';


// Função para criar um novo usuário
export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        // Obtém os dados do usuário do corpo da requisição
        const { name, email, password } = request.body as any;
        // Chama o serviço para criar o usuário
        const newUser = await createUserService({ name, email, password });
        // Retorna o novo usuário com código de status 201 (Criado)
        reply.code(201).send({
            message: 'Usuário criado com sucesso!',
            user: newUser
        });
    } catch (error: any) {
        // Captura de erros durante a criação do usuário
        reply.code(500).send({ message: 'Erro ao criar o usuário', error: error.message });
    }
}


// Função para obter todos os usuários
export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        // Chama o serviço para obter todos os usuários
        const users = await getAllUsersService();
        // Retorna a lista de usuários
        reply.send(users);
    } catch (error: any) {
        // Captura de erros durante a obtenção da lista de usuários
        reply.code(500).send({ message: 'Erro ao obter a lista de usuários', error: error.message });
    }
}

// Função para obter um usuário por ID
export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
        // Obtém o ID do usuário dos parâmetros da requisição
        const { id } = request.params as any;
        // Chama o serviço para obter o usuário por ID
        const user = await getUserByIdService(id);
        if (user) {
            // Retorna o usuário se encontrado
            reply.send(user);
        } else {
            // Retorna um erro 404 se o usuário não for encontrado
            reply.code(404).send({ message: 'Usuário não encontrado' });
        }
    } catch (error: any) {
        // Captura de erros durante a obtenção do usuário por ID
        reply.code(500).send({ message: 'Erro ao obter o usuário', error: error.message });
    }
}


// Função para atualizar um usuário existente
export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        // Obtém o ID do usuário dos parâmetros e os dados atualizados do corpo da requisição
        const { id } = request.params as any;
        const { name, email, password } = request.body as any;
        // Chama o serviço para atualizar o usuário
        const updatedUser = await updateUserService(id, { name, email, password });
        if (updatedUser) {
            // Retorna o usuário atualizado se encontrado
            reply.send({
                message: 'Usuário atualizado com sucesso!',
                user: updatedUser
            });
        } else {
            // Retorna um erro 404 se o usuário não for encontrado para atualização
            reply.code(404).send({ message: 'Usuário não encontrado para atualização' });
        }
    } catch (error: any) {
        // Captura de erros durante a atualização do usuário
        reply.code(500).send({ message: 'Erro ao atualizar o usuário', error: error.message });
    }
}

// Função para excluir um usuário
export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        // Obtém o ID do usuário dos parâmetros da requisição
        const { id } = request.params as any;
        // Chama o serviço para excluir o usuário
        await deleteUserService(id);
        // Retorna um código de sucesso 204 (Sem conteúdo) após a exclusão
        reply.code(200).send({message: 'Usuario deletado com sucesso!'});
    } catch (error: any) {
        // Captura de erros durante a exclusão do usuário
        reply.code(500).send({ message: 'Erro ao excluir o usuário', error: error.message });
    }
}
