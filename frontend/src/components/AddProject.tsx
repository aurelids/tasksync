// components/AddProject.tsx
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AddProjectProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (project: { name: string; description: string; startDate: string; deadline: string }) => void;
    project: { name: string; description: string; startDate: string; deadline: string };
    onProjectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddProject = ({ open, onClose, onSubmit, project, onProjectChange }: AddProjectProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Novo Projeto</DialogTitle>
            <DialogContent>
                <TextField
                    name="name"
                    label="Nome do Projeto"
                    value={project.name}
                    onChange={onProjectChange}
                    variant="outlined"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    name="description"
                    label="Descrição"
                    value={project.description}
                    onChange={onProjectChange}
                    variant="outlined"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    name="startDate"
                    label="Data de Início"
                    type="date"
                    value={project.startDate}
                    onChange={onProjectChange}
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
                    value={project.deadline}
                    onChange={onProjectChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    required
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancelar</Button>
                <Button onClick={() => onSubmit(project)} color="primary">Criar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProject;
