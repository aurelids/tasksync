import { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface EditTaskProps {
    open: boolean;
    handleClose: () => void;
    taskTitle: string;
    taskDescription: string;
    handleSave: (title: string, description: string) => void;
    handleDelete: () => void;
}

const EditTask = ({ open, handleClose, taskTitle, taskDescription, handleSave, handleDelete }: EditTaskProps) => {
    const [title, setTitle] = useState(taskTitle);
    const [description, setDescription] = useState(taskDescription);

    const handleSaveClick = () => {
        handleSave(title, description);
        handleClose();
    };

    const handleDeleteClick = () => {
        handleDelete();
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
