import React from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Insira o email cadastrado</h2>
        <form>
          <div className="mb-4">
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="contained" color="success">Enviar</Button>
            <Button variant="contained" color="error" onClick={() => navigate(-1)}>Voltar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
