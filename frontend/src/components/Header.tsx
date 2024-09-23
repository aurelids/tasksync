import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-12 h-12 object-cover"
                />
                <h1 className="text-3xl font-bold">TaskSync</h1>
            </div>
            <div className="flex space-x-4">
                <Button
                    variant="text"
                    color="inherit"
                    onClick={() => navigate('/dashboard')}
                >
                    Dashboard
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    onClick={() => navigate('/users')}
                >
                    Lista de Usuários
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    onClick={() => navigate('/sobre')}
                >
                    Sobre
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    onClick={() => navigate('/contato')}
                >
                    Contato
                </Button>
            </div>
        </div>
    );
};

export default Header;
