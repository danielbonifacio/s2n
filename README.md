# s2n

The Swagger to Node provides a simple way to create TypeScript interefaces based on swagger documentation JSON.

You can use it to populate some BFF's SDK or just to make API calls simpler, by using it on your front-end project.

## The problem

In large scale projects, it is very common the usage of various programming languages/frameworks to expose some service, and the most common way to do the communication of all, it's by expose some REST API with swagger documentation, (wich is great!). But swagger just provide us UI or JSON schema validation. No intellisense at all. And thats where s2n becomes usefull. It will read the Swagger JSON and create a TypeScript interface for you. In 2 seconds.

## How can be this possible?

Swagger provide us a very nice structured documentation of all of our routes and methods. s2n only parses it and generate TypeScript code based on it. It will use axios to make the request, so it's nice to you know how axios works.

## Limitations

If you're an Windows user, ensure that your using posix directory navigation by using the CLI.

```bash
# this will cause some bugs with path
s2n [...args] --definitions-path do\\not\\do\\this

# this is how you should do it
s2n [...args] --defnitions-path do/this/instead
```

## Usage

First you'll need to install s2n globally on your machine. You can do it with the following command:

```bash
npm i -g @danielbonifacio/s2n
```

After that, you must be able to use the CLI with `s2n`

Try to type `s2n --help` on your terminal, to see all the available documented commands.

### Required arguments

You must pass two arguments to the cli, otherwise it will throw an error. They're:

- `--name`: the name of the service that will be parsed (will be rendered with this name);
- `--json-url`: the URL of Swagger documentation JSON. This must be over HTTP protocol.

### Available arguments

- `--name`: the name of the service that will be parsed (will be rendered with this name);
- `--json-url`: the URL of Swagger documentation JSON. This must be over HTTP protocol;
- `--definitions-path` `-DP`: path where all definitions will be rendered (relative to `process.cwd()`);
- `--service-path` `-SP`: path where the service will be rendered (relative to `process.cwd()`).

## Credits

This package was entirely designed and developed by [@danielbonifacio](https://github.com/danielbonifacio).

Thanks to [axios](https://github.com/axios/axios) team for provide the http library.

Thanks to [pag](https://meupag.com.br) for give me the opportunity to explore this architecure and apply it on a large project.

## License

[MIT](./LICENSE.md)
