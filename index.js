const http = require("./services/http");
const swagger = require("./services/swagger");
const Renderer = require("./services/renderer");
const writter = require("./services/writter");

const main = async ({ name, jsonUrl, destination }) => {
  const renderer = new Renderer({
    destination,
    name
  });

  const dependencies = ["axios"];
  const doc = await http.getSwaggerJSON(jsonUrl);
  const paths = swagger.parse(doc);

  const interfaces = paths.map(path => renderer.renderPath(path));
  const imports = renderer
    .getDependencies(dependencies)
    .concat("\n")
    .concat(renderer.getDefinitionsImports(doc.definitions));
  const definitions = renderer.getDefinitions(doc.definitions);

  writter.writeDefinitions(definitions, destination.definitions);
  writter.writeInterfaces(name, interfaces, destination.service, imports);
};

main({
  name: "Petstore",
  jsonUrl: "https://petstore.swagger.io/v2/swagger.json",
  destination: {
    definitions: "./test/deep/a/little/dir",
    service: "./test/also/deep/but/not/in/same/tree"
  }
});
