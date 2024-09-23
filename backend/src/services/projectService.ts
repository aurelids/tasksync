import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateProjectInput {
  name: string;
  description: string;
  startDate: string; 
  deadline: string; 
}

export async function createProject(data: CreateProjectInput) {
  try {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        startDate: new Date(data.startDate), 
        deadline: new Date(data.deadline), 
      },
    });
    return project;
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    throw new Error(`Erro ao criar projeto: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw new Error(`Erro ao buscar projetos: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    throw new Error(`Erro ao deletar projeto: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

