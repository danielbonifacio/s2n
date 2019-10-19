const http = require("./services/http");
const swagger = require("./services/swagger");
const renderer = require("./services/renderer");
const writter = require("./services/writter");

const main = async (service, api) => {
  const dependencies = ["axios"];
  const doc = await http.getSwaggerJSON(api);
  const paths = swagger.parse(doc);

  const interfaces = paths.map(path => renderer.renderPath(path));
  const imports = renderer
    .getDependencies(dependencies)
    .concat("\n")
    .concat(renderer.getDefinitionsImports(doc.definitions));
  const definitions = renderer.getDefinitions(doc.definitions);

  writter.writeDefinitions(definitions, "./definitions");
  writter.writeInterfaces(service, interfaces, "./interfaces", imports);
};

main("Petstore", "https://petstore.swagger.io/v2/swagger.json");
