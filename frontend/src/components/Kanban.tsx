import { useState } from 'react';
import { Button, Paper } from '@mui/material';
import EditTask from './EditTask';

interface KanbanProps {
    project: {
        name: string;
        description: string;
        startDate: string;
        deadline: string;
    };
}

interface Task {
    id: number;
    title: string;
    description: string;
    column: string;
}

const Kanban = ({ project }: KanbanProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskIdCounter, setTaskIdCounter] = useState(0);
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const handleAddTask = (column: string) => {
        const newTask: Task = {
            id: taskIdCounter,
            title: `Tarefa ${taskIdCounter + 1}`,
            description: '',
            column,
        };
        setTasks([...tasks, newTask]);
        setTaskIdCounter(taskIdCounter + 1);
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setEditTaskOpen(true);
    };

    const handleSaveTask = (title: string, description: string) => {
        if (taskToEdit) {
            setTasks(tasks.map(task => 
                task.id === taskToEdit.id 
                ? { ...task, title, description } 
                : task
            ));
            setTaskToEdit(null);
        }
    };

    const handleDeleteTask = () => {
        if (taskToEdit) {
            setTasks(tasks.filter(task => task.id !== taskToEdit.id));
            setTaskToEdit(null);
        }
    };

    const columns = ['Novas Ideias', 'Aprovados', 'Em Execução', 'Em Análise', 'Finalizados'];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
            <p className="mb-4">{project.description}</p>
            <div className="flex space-x-2">
                {columns.map(column => (
                    <div key={column} className="flex-1 bg-white p-4 shadow-md rounded">
                        <h2 className="text-xl font-bold mb-2">{column}</h2>
                        <div className="space-y-2">
                            {tasks.filter(task => task.column === column).map(task => (
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
