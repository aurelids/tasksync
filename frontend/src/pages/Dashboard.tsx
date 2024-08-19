import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [newProject, setNewProject] = useState({ name: '', description: '', startDate: '', deadline: '' });
    const [showForm, setShowForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3333/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3333/projects', {
                ...newProject,
                userId: 'id-do-usuario' // Substitua 'id-do-usuario' pelo ID real do usuário que deve ser associado ao projeto
            });
            // Adiciona o novo projeto ao estado para exibi-lo no menu da esquerda
            setProjects([...projects, response.data]);
            setNewProject({ name: '', description: '', startDate: '', deadline: '' });
            setShowForm(false);
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
        }
    };

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="w-full bg-blue-600 text-white p-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">TaskSync Dashboard</h1>
                <div className="flex space-x-4">
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => navigate('/users')} 
                    >
                        Lista de Usuários
                    </Button>
                    <Button variant="text" color="inherit">Sobre</Button>
                    <Button variant="text" color="inherit">Contato</Button>
                </div>
            </div>

            <div className="flex flex-1">
                <div className="w-1/5 bg-gray-200 p-4">
                    <Button
                        variant="contained"
                        color="primary"
                        className="mb-4"
                        onClick={() => setShowForm(true)}
                    >
                        Novo Projeto
                    </Button>

                    <div className="space-y-2">
                        {projects.map((project) => (
                            <div 
                                key={project.id} 
                                className="bg-white p-4 shadow-md rounded mb-2 cursor-pointer" 
                                onClick={() => handleProjectClick(project)}
                            >
                                <h3 className="text-lg font-semibold">{project.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-4/5 p-4">
                    {selectedProject ? (
                        <div>
                            <h2>{selectedProject.name}</h2>
                            <div className="kanban-board">
                                <div>Novas Ideias</div>
                                <div>Aprovados</div>
                                <div>Em execução</div>
                                <div>Discussão</div>
                                <div>Concluído</div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Selecione um projeto para visualizar o conteúdo.</p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                <DialogTitle>Novo Projeto</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Nome do Projeto"
                        value={newProject.name}
                        onChange={handleProjectChange}
                        variant="outlined"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <TextField
                        name="description"
                        label="Descrição"
                        value={newProject.description}
                        onChange={handleProjectChange}
                        variant="outlined"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <TextField
                        name="startDate"
                        label="Data de Início"
                        type="date"
                        value={newProject.startDate}
                        onChange={handleProjectChange}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <TextField
                        name="deadline"
                        label="Deadline"
                        type="date"
                        value={newProject.deadline}
                        onChange={handleProjectChange}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        required
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowForm(false)} color="secondary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">Criar</Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Dashboard;
