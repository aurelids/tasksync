// components/Kanban.tsx
import { useState } from 'react';
import { TextField } from '@mui/material';

interface KanbanProps {
    project: {
        name: string;
        description: string;
        startDate: string;
        deadline: string;
    };
}

const Kanban = ({ project }: KanbanProps) => {
    const [taskContent, setTaskContent] = useState('');

    const handleAddTask = (column: string) => {
        if (!taskContent.trim()) return;
        // Adicione a lógica para criar a tarefa na coluna específica
        console.log(`Adicionar tarefa "${taskContent}" na coluna "${column}"`);
        setTaskContent('');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
            <p className="mb-4">{project.description}</p>
            <div className="flex space-x-4">
                {['Novas Ideias', 'Aprovados', 'Em Execução'].map(column => (
                    <div key={column} className="flex-1 bg-white p-4 shadow-md rounded">
                        <h2 className="text-xl font-bold mb-2">{column}</h2>
                        <div className="space-y-2">
                            {/* Renderizar tarefas aqui */}
                        </div>
                        <div className="mt-4">
                            <TextField
                                label={`Adicionar tarefa em ${column}`}
                                variant="outlined"
                                fullWidth
                                value={taskContent}
                                onChange={(e) => setTaskContent(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTask(column)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kanban;
