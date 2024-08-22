import Header from '../components/Header';
import LSideMenu from '../components/LSideMenu';
import AddProject from '../components/AddProject';
import Kanban from '../components/Kanban';
import { useDashboard } from '../hooks/useDashboard';
import Footer from '../components/footer';

const Dashboard = () => {
    const {
        projects,
        newProject,
        showForm,
        selectedProject,
        handleProjectChange,
        handleSubmit,
        handleProjectClick,
        handleDeleteProject, // Adiciona a função de deletar
        setShowForm
    } = useDashboard();

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header />

            <div className="flex flex-1">
                <LSideMenu
                    projects={projects}
                    onNewProjectClick={() => setShowForm(true)}
                    onProjectClick={handleProjectClick}
                />

                <div className="w-4/5 p-4">
                    {selectedProject ? (
                        <Kanban 
                            project={selectedProject}
                            onDeleteProject={handleDeleteProject} // Passa a função para Kanban
                        />
                    ) : (
                        <div>
                            <p>Selecione um projeto para visualizar o conteúdo.</p>
                        </div>
                    )}
                </div>
            </div>

            <AddProject
                open={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleSubmit}
                project={newProject}
                onProjectChange={handleProjectChange}
            />

            <Footer />
        </div>
    );
};

export default Dashboard;
