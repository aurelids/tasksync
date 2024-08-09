import React from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">LOGIN</h2>
        <form>
          <div className="mb-4">
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="mb-6">
            <TextField
              label="Senha"
              type="password"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="contained" color="primary">Entrar</Button>
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
