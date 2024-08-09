import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Certifique-se de instalar axios com `npm install axios`

export const Login = () => {
    const navigate = useNavigate();
    
    // States para armazenar os valores dos campos e possíveis mensagens de erro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Envia os dados para o backend
            const response = await axios.post('http://localhost:3333/login', { email, password });
            
            // Se a resposta for bem-sucedida, redireciona o usuário para a página inicial ou onde desejar
            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                setError('Credenciais inválidas ou erro na autenticação.');
            }
        } catch (error: any) {
            // Exibe mensagem de erro se o login falhar
            setError('Credenciais inválidas ou erro na autenticação.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-600 text-center">
                            {error}
                        </div>
                    )}
                    <div className="flex justify-between">
                        <Button type="submit" variant="contained" color="primary">Entrar</Button>
                        <Button variant="contained" color="success" onClick={() => navigate('/register')}>
                            Cadastro
                        </Button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <a href="/forgot-password" className="text-blue-600 underline">Esqueci a Senha</a>
                </div>
            </div>
        </div>
    );
};
