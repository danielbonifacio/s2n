class Swagger {
  parse(schema) {
    const { keys } = Object;
    const paths = keys(schema.paths);
    const methodsWithPaths = paths.map(path =>
      keys(schema.paths[path]).map(method => {
        const target = schema.paths[path][method];
        return {
          ...target,
          _path: path,
          _method: method
        };
      })
    );

    return methodsWithPaths.flat(Infinity);
  }
}

module.exports = new Swagger();
