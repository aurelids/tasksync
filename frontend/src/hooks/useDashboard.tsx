import { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../api';

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
                console.error('Erro ao carregar projetos:', error);
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
            console.error('Erro ao criar projeto:', error);
        }
    };

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
    };

    const handleDeleteProject = async (projectId: string) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project.id !== projectId));
            setSelectedProject(null);
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
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
        handleDeleteProject,
        setShowForm
    };
};
