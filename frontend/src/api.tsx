// src/api.ts
import axios from 'axios';
import { API_BASE_URL } from './api/config';

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
        const response = await axios.post(`${API_BASE_URL}/projects`, {
            ...project,
            userId: 'id-do-usuario' // Substitua 'id-do-usuario' pelo ID real do usuário que deve ser associado ao projeto
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        throw error;
    }
};
