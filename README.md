# feh

> *feh* is a Fastify Error Responder, it's a plugin to facilitate and standardize error management in your Fastify application.

## Usage

### Installation

```sh
npm install @zhaoworks/feh
```

<details>
<summary>yarn</summary>

> ```sh
> yarn add @zhaoworks/feh
> ```

</details>

<details>
<summary>pnpm</summary>

> ```sh
> pnpm add @zhaoworks/feh
> ```

</details>

<details>
<summary>bun</summary>

> ```sh
> bun add @zhaoworks/feh
> ```

</details>

### Example

After adding [Fastify](https://fastify.dev/) and **feh** in your project, try this

```ts
import fastify from 'fastify';
import feh from '@zhaoworks/feh';

const server = fastify();

server.register(feh);

server.get('/', (_, reply) => {
  return reply.error(500, {
    message: 'something went completely wrong >:(',
  });
});

server
  .listen({ port: 4000 })
  .then(() => console.log('Listening on http://localhost:4000/'));
```

You can also add a custom format to your errors by registering a new error formatter.

```ts
server.register(feh, {
  format: (status, error) => ({ error: error.message, our_fault: status === 500 })
});

server.get('/', (_, reply) => {
  return reply.error(500, { message: 'a cat must have bitten the wires' }); // -> { error: 'a cat must have bitten the wires', our_fault: true }
});
```
