import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicionar lógica de registro aqui
  };

  return (
    <div className="flex h-screen items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-center text-xl font-bold mb-4">REGISTRO</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              CONCLUIR
            </button>
            <button 
              type="button" 
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate('/')}
            >
              VOLTAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
