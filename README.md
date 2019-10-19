# s2n

The Swagger to Node provides a simple way to create TypeScript interfaces based on swagger documentation JSON.

You can use it to populate some BFF's SDK or just to make API calls simpler, by using it on your front-end project.

## The problem

In large scale projects, it is very common the usage of various programming languages/frameworks to expose some service, and the most common way to do the communication of all, it's by expose some REST API with swagger documentation, (which is great!). But swagger just provides us UI or JSON schema validation. No IntelliSense at all. And that's where s2n becomes useful. It will read the Swagger JSON and create a TypeScript interface for you. In 2 seconds

## How can be this possible?

Swagger provides us a very nice structured documentation of all of our routes and methods. s2n only parses it and generate TypeScript code based on it. It will use Axios to make the request, so it's nice to know how Axios works.

## Limitations

If you're a Windows user, ensure that you're using POSIX directory navigation by using the CLI.

```bash
# this will cause some bugs with path
s2n [...args] --definitions-path do\\not\\do\\this

# this is how you should do it
s2n [...args] --defnitions-path do/this/instead
```

## Usage

First, you'll need to install s2n globally on your machine. You can do it with the following command:

```bash
npm i -g @danielbonifacio/s2n
```

After that, you must be able to use the CLI with `s2n`

Try to type `s2n --help` on your terminal, to see all the available documented commands.

### Required arguments

You must pass two arguments to the CLI, otherwise, it will throw an error. They're:

- `--name`: name of the service that will be parsed (will be rendered with this);
- `--json-url`: the URL of Swagger documentation JSON. This must be over the HTTP protocol.

### Available arguments

- `--name`: name of the service that will be parsed (will be rendered with this);
- `--json-url`: the URL of Swagger documentation JSON. This must be over the HTTP protocol.
- `--definitions-path` `-DP`: path where all definitions will be rendered (relative to `process.cwd()`);
- `--service-path` `-SP`: path where the service will be rendered (relative to `process.cwd()`).

## Credits

This package was entirely designed and developed by [@danielbonifacio](https://github.com/danielbonifacio).

Thanks to Axios team to provide the HTTP library.

Thanks to [pag!](http://meupag.com.br) for giving me the opportunity to explore this architecture and apply it on a large project.

## License

[MIT](./LICENSE.md)
