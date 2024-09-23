import { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import EditTask from './EditTask';
import axios from 'axios'; // Importar axios
import { API_BASE_URL } from '../api/config'; // Importar API_BASE_URL
import { fetchTasks, createTask } from '../api'; // Importar a função de buscar e criar tarefas

interface KanbanProps {
    project: {
        id: string;
        name: string;
        description: string;
        startDate: string;
        deadline: string;
    };
    onDeleteProject: (projectId: string) => void; // Nova prop para deletar o projeto
}

interface Task {
    id: string; // Alterado para string para coincidir com o ID do MongoDB
    title: string;
    description: string;
    status: string; // Corrigido para 'status'
    projectId: string;
}

const Kanban = ({ project, onDeleteProject }: KanbanProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskIdCounter, setTaskIdCounter] = useState(0);
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasksData = await fetchTasks(project.id);
                setTasks(tasksData);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };
        loadTasks();
    }, [project.id]);

    const handleAddTask = async (status: string) => {
        const newTask = {
            title: `Tarefa ${taskIdCounter + 1}`,
            description: '', 
            status,
            projectId: project.id,
        };

        try {
            const response = await createTask(newTask);
            setTasks([...tasks, response]); 
            setTaskIdCounter(taskIdCounter + 1);
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setEditTaskOpen(true);
    };

    const handleSaveTask = async (taskId: string, title: string, description: string) => {
        if (taskId) {
            try {
                await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {
                    title,
                    description,
                });
                setTasks(tasks.map(task =>
                    task.id === taskId
                        ? { ...task, title, description }
                        : task
                ));
                setTaskToEdit(null);
            } catch (error) {
                console.error('Erro ao salvar tarefa:', error);
            }
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (taskId) {
            try {
                await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
                setTasks(tasks.filter(task => task.id !== taskId));
                setTaskToEdit(null);
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
            }
        }
    };

    const handleDeleteProject = () => {
        console.log(`Tentando excluir o projeto com ID: ${project.id}`);
        onDeleteProject(project.id);
    };

    const columns = ['Novas Ideias', 'Aprovados', 'Em Execução', 'Em Análise', 'Finalizados'];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteProject}
                >
                    Excluir Projeto
                </Button>
            </div>
            <p className="mb-4">{project.description}</p>
            <div className="flex space-x-2">
                {columns.map(column => (
                    <div key={column} className="flex-1 bg-white p-4 shadow-md rounded">
                        <h2 className="text-xl font-bold mb-2">{column}</h2>
                        <div className="space-y-2">
                            {tasks.filter(task => task.status === column && task.projectId === project.id).map(task => (
                                <Paper key={task.id} elevation={3} className="p-4">
                                    <h3 className="font-semibold">{task.title}</h3>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        style={{ marginTop: '8px' }}
                                        onClick={() => handleEditTask(task)}
                                    >
                                        VER
                                    </Button>
                                </Paper>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleAddTask(column)}
                            >
                                Nova Tarefa
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {taskToEdit && (
                <EditTask
                    open={editTaskOpen}
                    handleClose={() => setEditTaskOpen(false)}
                    taskId={taskToEdit.id} // Adicionando taskId
                    taskTitle={taskToEdit.title}
                    taskDescription={taskToEdit.description}
                    handleSave={handleSaveTask}
                    handleDelete={handleDeleteTask}
                />
            )}
        </div>
    );
};

export default Kanban;
