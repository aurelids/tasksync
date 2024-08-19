import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';
import 'dotenv/config';
import { prisma } from './prisma';

const app = Fastify({ logger: true });

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});


// Registrar as rotas
app.register(routes);

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.code(error.statusCode || 500).send({ message: error.message });
});

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    app.log.info('Server listening on http://localhost:3333');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
