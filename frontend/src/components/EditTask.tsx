import { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface EditTaskProps {
    open: boolean;
    handleClose: () => void;
    taskId: string; // Adicionando taskId
    taskTitle: string;
    taskDescription: string;
    handleSave: (taskId: string, title: string, description: string) => Promise<void>; // Adicionando taskId ao handleSave
    handleDelete: (taskId: string) => Promise<void>; // Adicionando taskId ao handleDelete
}

const EditTask = ({ open, handleClose, taskId, taskTitle, taskDescription, handleSave, handleDelete }: EditTaskProps) => {
    const [title, setTitle] = useState(taskTitle);
    const [description, setDescription] = useState(taskDescription);

    // UseEffect para sincronizar os estados de título e descrição com as props recebidas
    useEffect(() => {
        setTitle(taskTitle);
        setDescription(taskDescription);
    }, [taskTitle, taskDescription]);

    const handleSaveClick = () => {
        handleSave(taskId, title, description); // Passando taskId
        handleClose();
    };

    const handleDeleteClick = () => {
        handleDelete(taskId); // Passando taskId
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Visualizar Tarefa</DialogTitle>
            <DialogContent>
                <TextField
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteClick} color="error">
                    Excluir Tarefa
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSaveClick} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTask;
