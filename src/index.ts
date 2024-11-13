import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

interface ErrorOptions {
  message: string;
}

interface PluginOptions {
  format?: (status: number, error: ErrorOptions) => unknown;
}

/*
 * Obs.: this declaration is necessary for including the method `error`
 * as a valid method of FastifyReply.
 */
declare module 'fastify' {
  interface FastifyReply {
    error: (status: number, options: ErrorOptions) => FastifyReply;
  }
}

const DEFAULT_ERROR_FORMATTER = (_: number, error: ErrorOptions) => ({ error });

async function plugin(fastify: FastifyInstance, plugin: PluginOptions) {
  /*
   * Obs.: the anonymous function must not be an arrow function,
   * probably because of the way the Fastify use `this` context.
   */
  fastify.decorateReply('error', function (this, status, options) {
    return this.status(status).send(
      typeof plugin.format === 'undefined'
        ? DEFAULT_ERROR_FORMATTER(status, options)
        : plugin.format(status, options),
    );
  });
}

const feh = fp(plugin, {
  name: 'feh',
  fastify: '5.x',
});

export default feh;
