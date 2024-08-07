import Fastify from "fastify"; // Importa o Fastify, um framework para criar servidores HTTP
import { routes } from "./routes"; // Importa a função que define as rotas do servidor
import cors from '@fastify/cors'; // Importa o plugin CORS para habilitar compartilhamento de recursos entre diferentes origens

const app = Fastify({ logger: true }); // Cria uma instância do Fastify com logging habilitado

app.setErrorHandler((error, request, reply) => { // Configura um manipulador global de erros
    reply.code(400).send({ message: error.message }); // Envia uma resposta com código 400 e a mensagem de erro
})

const start = async () => { // Define uma função assíncrona para iniciar o servidor

    await app.register(cors); // Registra o plugin CORS para permitir requisições de diferentes origens

    await app.register(routes); // Registra as rotas definidas no módulo routes.ts

    try {
        await app.listen({ port: 3333 }); // Inicia o servidor para escutar na porta 3333
    } catch (error) { // Captura qualquer erro que ocorra ao iniciar o servidor
        process.exit(1); // Encerra o processo com um código de erro
    }
}

start(); // Chama a função start para iniciar o servidor
