import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import Header from '../components/Header';
import Footer from '../components/footer';

interface User {
    id: string;
    name: string;
    email: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                setError('Erro ao carregar usuários.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Usuários Cadastrados
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 border-b border-gray-300">
                                <th className="py-3 px-4 text-left text-gray-700 font-medium">Nome</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-medium">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 text-gray-700 border-b">{user.name}</td>
                                    <td className="py-3 px-4 text-gray-700 border-b">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Users;
