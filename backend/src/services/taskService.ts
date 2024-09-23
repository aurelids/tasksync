import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTask(data: { projectId: string; title: string; status: string; description?: string }) {
    return await prisma.task.create({
        data: {
            projectId: data.projectId,
            title: data.title,
            status: data.status,
            description: data.description, 
        },
    });
}

export async function getTasksByProject(projectId: string) {
  return await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
  });
}

export async function deleteTask(id: string) {
  return await prisma.task.delete({
    where: { id },
  });
}

export async function updateTask(id: string, data: { title?: string; status?: string; description?: string }) {
    return await prisma.task.update({
        where: { id },
        data: {
            title: data.title,
            status: data.status,
            description: data.description, 
        },
    });
}
