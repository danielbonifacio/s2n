const { resolve } = require("path");
const { writeFileSync, existsSync, mkdirSync } = require("fs");

class Writter {
  ensureDirectoryExistence(path) {
    const directoryExists = existsSync(resolve(process.cwd(), path));

    if (!directoryExists) {
      mkdirSync(resolve(process.cwd(), path), { recursive: true });
    }
  }

  writeDefinitions(definitions, path) {
    this.ensureDirectoryExistence(path);

    definitions.forEach(definition => {
      const toWrite = resolve(process.cwd(), path, `${definition.title}.d.ts`);
      writeFileSync(toWrite, definition.content);
    });
  }

  writeInterfaces(title, interfaces, path, imports) {
    this.ensureDirectoryExistence(path);

    const toWrite = resolve(process.cwd(), path, `${title}.ts`);
    writeFileSync(toWrite, `${imports}\n${interfaces.join("\n")}`);
  }
}

module.exports = new Writter();
