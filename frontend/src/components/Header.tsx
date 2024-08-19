import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-blue-600 text-white p-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">TaskSync Dashboard</h1>
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
    );
};

export default Header;