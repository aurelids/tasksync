// src/api.ts
import axios from 'axios';
import { API_BASE_URL } from './api/config'; // Certifique-se de que o caminho está correto

export const fetchProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        throw error;
    }
};

export const createProject = async (project: { name: string; description: string; startDate: string; deadline: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects`, project);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        throw error;
    }
};

export const deleteProject = async (projectId: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
    } catch (error) {
        console.error('Erro ao excluir projeto:', error);
        throw error;
    }
};

export const fetchTasks = async (projectId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};

export const createTask = async (task: { projectId: string; title: string; status: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, task);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
    }
};
