// components/LSideMenu.tsx
import { Button } from '@mui/material';

interface LSideMenuProps {
    projects: any[];
    onNewProjectClick: () => void;
    onProjectClick: (project: any) => void;
}

const LSideMenu = ({ projects, onNewProjectClick, onProjectClick }: LSideMenuProps) => {
    return (
        <div className="w-1/5 bg-gray-200 p-4">
            <Button
                variant="contained"
                color="primary"
                className="mb-4"
                onClick={onNewProjectClick}
            >
                Novo Projeto
            </Button>

            <div className="space-y-2">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className="bg-white p-4 shadow-md rounded mb-2 cursor-pointer" 
                        onClick={() => onProjectClick(project)}
                    >
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LSideMenu;
