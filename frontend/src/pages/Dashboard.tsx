import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Dashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [newProject, setNewProject] = useState({ name: '', startDate: '', deadline: '' });
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        // Fetch existing projects on component mount
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
            await axios.post('http://localhost:3333/projects', newProject);
            // Refresh projects list after adding a new project
            const response = await axios.get('http://localhost:3333/projects');
            setProjects(response.data);
            setNewProject({ name: '', startDate: '', deadline: '' });
            setShowForm(false);
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Barra de tarefas */}
            <div className="w-full bg-blue-600 text-white p-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">TaskSync Dashboard</h1>
                <div className="flex space-x-4">
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() => navigate('/users')} // Navega para a página de usuários
                    >
                        Lista de Usuários
                    </Button>
                    <Button variant="text" color="inherit">Sobre</Button>
                    <Button variant="text" color="inherit">Contato</Button>
                </div>
            </div>

            {/* Layout principal */}
            <div className="flex flex-1">
                {/* Menu lateral */}
                <div className="w-1/5 bg-gray-200 p-4">
                    <Button
                        variant="contained"
                        color="primary"
                        className="mb-4"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Fechar Formulário' : 'Novo Projeto'}
                    </Button>

                    {showForm && (
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="mb-4">
                                <TextField
                                    name="name"
                                    label="Nome do Projeto"
                                    value={newProject.name}
                                    onChange={handleProjectChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="mb-4">
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
                                />
                            </div>
                            <div className="mb-4">
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
                                />
                            </div>
                            <Button type="submit" variant="contained" color="primary">
                                Criar Projeto
                            </Button>
                        </form>
                    )}

                    <div className="space-y-2">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white p-4 shadow-md rounded mb-2">
                                <div className="mb-2">
                                    <h3 className="text-lg font-semibold">{project.name}</h3>
                                    <p>Início: {project.startDate}</p>
                                    <p>Deadline: {project.deadline}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="contained" color="primary">
                                        Juntar-se
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Abrir Projeto
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div className="w-4/5 p-4">
                    {/* Aqui você pode adicionar o conteúdo principal da página, se necessário */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
