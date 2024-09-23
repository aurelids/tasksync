import { FastifyRequest, FastifyReply } from 'fastify';
import { createTask, getTasksByProject, deleteTask, updateTask } from '../services/taskService';

export async function handleCreateTask(request: FastifyRequest, reply: FastifyReply) {
    try {
        const taskData = request.body as {
            projectId: string;
            title: string;
            status: string;
            description?: string;
        };
        const task = await createTask(taskData);
        reply.status(201).send(task);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro no controlador ao criar tarefa:', error.message);
            reply.status(500).send({ error: error.message });
        } else {
            console.error('Erro desconhecido no controlador ao criar tarefa:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

export async function handleGetTasksByProject(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { projectId } = request.params as { projectId: string };
    const tasks = await getTasksByProject(projectId);
    reply.status(200).send(tasks);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro no controlador ao buscar tarefas:', error.message);
      reply.status(500).send({ error: error.message });
    } else {
      console.error('Erro desconhecido no controlador ao buscar tarefas:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export async function handleDeleteTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    await deleteTask(id);
    reply.status(204).send(); 
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro no controlador ao excluir tarefa:', error.message);
      reply.status(500).send({ error: error.message });
    } else {
      console.error('Erro desconhecido no controlador ao excluir tarefa:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export async function handleUpdateTask(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string };
        const taskData = request.body as { title?: string; status?: string; description?: string };
        const updatedTask = await updateTask(id, taskData);
        if (updatedTask) {
            reply.status(200).send(updatedTask);
        } else {
            reply.status(404).send({ error: 'Task not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro no controlador ao atualizar tarefa:', error.message);
            reply.status(500).send({ error: error.message });
        } else {
            console.error('Erro desconhecido no controlador ao atualizar tarefa:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}
