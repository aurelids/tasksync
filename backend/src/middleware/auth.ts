import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJWT from '@fastify/jwt';

const app = Fastify();

// Registrar o plugin JWT com a sua senha secreta
app.register(fastifyJWT, {
  secret: 'sua_senha_secreta_super_segura',
});

// Middleware para verificar o token em rotas protegidas
app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
