import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

interface FehOptions {
  message: string;
}

/*
 * Obs.: this declaration is necessary for including the method `error`
 * as a valid method of FastifyReply.
 */
declare module 'fastify' {
  interface FastifyReply {
    error: (status: number, options: FehOptions) => FastifyReply;
  }
}

async function plugin(fastify: FastifyInstance) {
  /*
   * Obs.: the anonymous function must not be an arrow function,
   * probably because of the way the Fastify use `this` context.
   */
  fastify.decorateReply('error', function (this, status, options) {
    return this.status(status).send({
      message: options.message,
    });
  });
}

const feh = fp(plugin, {
  name: 'feh',
  fastify: '4.x',
});

export default feh;
