// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../api'; // Importar a função deleteProject

export const useDashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [newProject, setNewProject] = useState({ name: '', description: '', startDate: '', deadline: '' });
    const [showForm, setShowForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                // Handle error if needed
            }
        };
        loadProjects();
    }, []);

    const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const data = await createProject(newProject);
            setProjects([...projects, data]);
            setNewProject({ name: '', description: '', startDate: '', deadline: '' });
            setShowForm(false);
        } catch (error) {
            // Handle error if needed
        }
    };

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
    };

    // Nova função para lidar com a exclusão de projetos
    const handleDeleteProject = async (projectId: string) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project.id !== projectId));
            setSelectedProject(null); // Desseleciona o projeto após excluí-lo
        } catch (error) {
            // Handle error if needed
        }
    };

    return {
        projects,
        newProject,
        showForm,
        selectedProject,
        handleProjectChange,
        handleSubmit,
        handleProjectClick,
        handleDeleteProject, // Adiciona a função de deletar
        setShowForm
    };
};
