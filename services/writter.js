const { resolve } = require("path");
const { writeFileSync } = require("fs");

class Writter {
  writeDefinitions(definitions, path) {
    definitions.forEach(definition => {
      const toWrite = resolve(process.cwd(), path, `${definition.title}.d.ts`);
      writeFileSync(toWrite, definition.content);
    });
  }

  writeInterfaces(title, interfaces, path, imports) {
    const toWrite = resolve(process.cwd(), path, `${title}.ts`);
    writeFileSync(toWrite, `${imports}\n${interfaces.join("\n")}`);
  }
}

module.exports = new Writter();
