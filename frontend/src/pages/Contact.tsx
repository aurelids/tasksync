import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/footer';


const Contact: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />
            <main className="flex-1 p-8">
                <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">Contato</h1>
                    <p className="text-lg text-gray-700 mb-4 text-center">
                        Aqui estão meus dados de contato. Sinta-se à vontade para me conectar!
                    </p>
                    <div className="space-y-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold mb-2">Gabriel Aurélio Cogo</h2>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium">Email:</p>
                            <a 
                                href="mailto:gabrielaurelio33@gmail.com" 
                                className="text-blue-600 hover:underline"
                            >
                                gabrielaurelio33@gmail.com
                            </a>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium">GitHub:</p>
                            <a 
                                href="https://github.com/aurelids" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                https://github.com/aurelids
                            </a>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium">LinkedIn:</p>
                            <a 
                                href="https://www.linkedin.com/in/gabriel-aurelio-cogo/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                https://www.linkedin.com/in/gabriel-aurelio-cogo/
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Contact;
