import { FastifyRequest, FastifyReply } from 'fastify';
import { createProject, getAllProjects, deleteProject } from '../services/projectService';

export async function handleCreateProject(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Atualize a extração de dados do corpo da requisição
    const projectData = request.body as {
      name: string;
      description: string;
      startDate: string;
      deadline: string;
    };
    const project = await createProject(projectData);
    reply.status(201).send(project);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro no controlador ao criar projeto:', error);
      reply.status(500).send({ error: error.message });
    } else {
      console.error('Erro desconhecido no controlador ao criar projeto:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export async function handleGetProjects(request: FastifyRequest, reply: FastifyReply) {
  try {
    const projects = await getAllProjects();
    reply.status(200).send(projects);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro no controlador ao buscar projetos:', error);
      reply.status(500).send({ error: error.message });
    } else {
      console.error('Erro desconhecido no controlador ao buscar projetos:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export async function handleDeleteProject(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    await deleteProject(id);
    reply.status(200).send({ message: 'Projeto deletado com sucesso!' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro no controlador ao deletar projeto:', error);
      reply.status(500).send({ error: error.message });
    } else {
      console.error('Erro desconhecido no controlador ao deletar projeto:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}


