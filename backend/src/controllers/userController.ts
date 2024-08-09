import { FastifyRequest, FastifyReply } from 'fastify';
import { 
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService 
} from '../services/userService';
import { prisma } from '../prisma';  // Certifique-se de que esta importação está correta

// Função para criar um novo usuário
export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { name, email, password } = request.body as { name: string, email: string, password: string };

        const newUser = await createUserService({ 
            name, 
            email, 
            password
        });

        reply.code(201).send({
            message: 'Usuário criado com sucesso!',
            user: newUser
        });
    } catch (error: any) {
        reply.code(500).send({ message: 'Erro ao criar o usuário', error: error.message });
    }
}

// Função para autenticar o usuário (login) com verificação básica
export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { email, password } = request.body as { email: string, password: string };
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            console.log('Usuário não encontrado:', email);
            return reply.code(401).send({ message: 'Credenciais inválidas' });
        }

        // Verificação básica: comparação da senha fornecida com a senha armazenada
        if (password === user.password) {
            return reply.send({ message: 'Login bem-sucedido!' });
        } else {
            console.log('Senha inválida para o usuário:', email);
            return reply.code(401).send({ message: 'Credenciais inválidas' });
        }
    } catch (error: any) {
        console.error('Erro ao realizar login:', error.message);
        return reply.code(500).send({ message: 'Erro ao realizar login', error: error.message });
    }
}

// Função para obter todos os usuários
export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await getAllUsersService();
        reply.send(users);
    } catch (error: any) {
        reply.code(500).send({ message: 'Erro ao obter a lista de usuários', error: error.message });
    }
}

// Função para obter um usuário por ID
export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string };
        const user = await getUserByIdService(id);
        if (user) {
            reply.send(user);
        } else {
            reply.code(404).send({ message: 'Usuário não encontrado' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'Erro ao obter o usuário', error: error.message });
    }
}

// Função para atualizar um usuário existente
export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string };
        const { name, email, password } = request.body as { name?: string, email?: string, password?: string };
        
        const updatedData: any = { name, email };
        if (password) {
            updatedData.password = password;  // Não criptografar a senha por enquanto
        }

        const updatedUser = await updateUserService(id, updatedData);
        if (updatedUser) {
            reply.send({
                message: 'Usuário atualizado com sucesso!',
                user: updatedUser
            });
        } else {
            reply.code(404).send({ message: 'Usuário não encontrado para atualização' });
        }
    } catch (error: any) {
        reply.code(500).send({ message: 'Erro ao atualizar o usuário', error: error.message });
    }
}

// Função para excluir um usuário
export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string };
        await deleteUserService(id);
        reply.code(200).send({ message: 'Usuário deletado com sucesso!' });
    } catch (error: any) {
        reply.code(500).send({ message: 'Erro ao excluir o usuário', error: error.message });
    }
}
