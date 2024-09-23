import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/footer';


const About: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Descrição do Projeto
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    Um aplicativo web onde usuários podem criar contas, formar grupos e gerenciar tarefas. 
                    Cada usuário pode criar e editar tarefas dentro dos grupos aos quais pertence. 
                    As tarefas podem ter status (pendente, em andamento, concluída) e prazo de entrega.
                </p>
                <h2 className="text-2xl font-semibold mb-4">
                    Funcionalidades
                </h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>
                        <span className="font-bold">Autenticação e Autorização:</span>
                        <ul className="list-disc list-inside ml-6 space-y-1">
                            <li>Registro e login de usuários.</li>
                            <li>Proteção de rotas para áreas autenticadas.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-bold">Gerenciamento de Grupos:</span>
                        <ul className="list-disc list-inside ml-6 space-y-1">
                            <li>Criação e exclusão de grupos.</li>
                            <li>Adicionar e remover membros dos grupos.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-bold">Gerenciamento de Tarefas:</span>
                        <ul className="list-disc list-inside ml-6 space-y-1">
                            <li>CRUD de tarefas (Criar, Ler, Atualizar, Excluir).</li>
                            <li>Atribuir tarefas a membros específicos do grupo.</li>
                            <li>Filtrar tarefas por status ou data de vencimento.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-bold">Interface de Usuário:</span>
                        <ul className="list-disc list-inside ml-6 space-y-1">
                            <li>Página inicial com visão geral dos grupos e tarefas.</li>
                            <li>Páginas para gerenciar grupos e tarefas.</li>
                            <li>Layout responsivo e estilizado com Tailwind CSS.</li>
                        </ul>
                    </li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">
                    Tecnologias
                </h2>
                <p className="text-lg text-gray-700">
                    • Frontend: React, TypeScript, Tailwind.<br/>
                    • Backend: Node.js com TypeScript, Prisma para ORM, MongoDB para banco de dados.<br/>
                    • Autenticação: JWT para autenticação baseada em tokens.
                </p>
            </main>
            <Footer/>
        </div>
    );
};

export default About;
