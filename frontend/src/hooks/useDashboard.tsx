// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { fetchProjects, createProject } from '../api';

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

    return {
        projects,
        newProject,
        showForm,
        selectedProject,
        handleProjectChange,
        handleSubmit,
        handleProjectClick,
        setShowForm
    };
};
