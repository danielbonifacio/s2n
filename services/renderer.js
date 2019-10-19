class Renderer {
  getDependencies(dependencies) {
    return dependencies
      .map(dependency => `import ${dependency} from '${dependency}'`)
      .join("\n");
  }

  getDefinitionsImports(definitions) {
    return Object.keys(definitions)
      .map(
        definition => `import ${definition} from '../definitions/${definition}'`
      )
      .join("\n");
  }

  renderDefinitionProperties(props) {
    const properties = Object.keys(props);
    let str = "";
    let dependencies = "";

    // TODO: support enum
    // TODO: support required
    properties.forEach(property => {
      const prop = props[property];
      if (prop.type !== "array") {
        if (prop["$ref"] !== undefined) {
          const refArray = prop["$ref"].split("/");
          const ref = refArray[refArray.length - 1];
          str += `  ${property}?: ${ref}\n`;
          dependencies += `import ${ref} from './${ref}'\n`;
        } else {
          const type = prop.type === "integer" ? "number" : prop.type;
          str += `  ${property}?: ${type}\n`;
        }
      } else if (prop.items.hasOwnProperty("$ref")) {
        const refArray = prop.items["$ref"].split("/");
        const ref = refArray[refArray.length - 1];
        str += `  ${property}?: ${ref}[]\n`;
        dependencies += `import ${ref} from './${ref}'\n`;
      } else {
        const type = prop.items.type === "integer" ? "number" : prop.items.type;
        str += `  ${property}?: ${type}[]\n`;
      }
    });

    return {
      str,
      dependencies
    };
  }

  getDefinitions(defs) {
    const definitions = Object.keys(defs);
    const filledDefinitions = definitions.map(definition => ({
      ...defs[definition],
      title: definition
    }));

    const renderedDefinitions = filledDefinitions.map(definition => {
      // on official documentation, only object definition type
      // is available. anyway, just double checking it, to prevent
      // some possible future problems
      if (definition.type === "object") {
        const rendered = this.renderDefinitionProperties(definition.properties);
        const str = `${rendered.dependencies}
declare interface ${definition.title} {
${rendered.str}
}

export { ${definition.title} }
export default ${definition.title}
`;
        return {
          title: definition.title,
          content: str
        };
      }
    });

    return renderedDefinitions;
  }

  getRef(schema) {
    const isArray = schema.hasOwnProperty("type") && schema.type === "array";
    if (!isArray) {
      if (!schema.$ref) {
        return "any";
      }
      const refArr = schema["$ref"].split("/");
      return refArr[refArr.length - 1];
    } else {
      const refArr = schema.items["$ref"].split("/");
      return refArr[refArr.length - 1] + "[]";
    }
  }

  getParameters(parameters) {
    return parameters
      .map(({ name, description }) => ` * @param ${name} ${description || ""}`)
      .join("\n");
  }
  getParametersInline(parameters) {
    return parameters.length
      ? parameters.map(parameter => parameter.name).join(", ")
      : "";
  }
  getAxiosArguments(path) {
    const inPath = [];
    const inBody = [];
    const inHead = [];
    const inQuery = [];

    path.parameters.forEach(parameter => {
      parameter.in === "path" && inPath.push(parameter);
      parameter.in === "header" && inHead.push(parameter);
      parameter.in === "query" && inQuery.push(parameter);
      (parameter.in === "body" || parameter.in === "formData") &&
        inBody.push(parameter);
    });

    let str = `\`${path._path}`;

    inQuery.length &&
      (() => {
        str += `${this.getQueryStringParams(inQuery)}`;
      })();

    str += "`";

    inPath.length &&
      inPath.forEach(parameter => {
        str = str.replace(
          new RegExp(`{${parameter.name}}`, "gi"),
          "${" + parameter.name + "}"
        );
      });

    inBody.length &&
      (() => {
        str += `, { ${inBody
          .map(parameter => {
            return parameter.name === "body" ? "...body" : parameter.name;
          })
          .join(", ")} }`;
      })();

    inHead.length &&
      (() => {
        if (
          !inBody.length &&
          (path._method === "post" ||
            path._method === "put" ||
            path._method === "patch")
        ) {
          str += ", null";
        }
        str += `, { headers: { ${inHead
          .map(parameter => parameter.name)
          .join(", ")} }  }`;
      })();

    return str;
  }

  getQueryStringParams(queryParams) {
    return `?${queryParams.map(qp => `${qp.name}=\${${qp.name}}`).join("&")}`;
  }

  getAxiosResponse(path) {
    const hasResponse = Object.keys(path.responses).length;
    if (!hasResponse) {
      return "";
    }

    const firstResponse = Object.keys(path.responses)[0];
    const hasSuccessResponse = firstResponse.startsWith("2");

    let str = "";

    hasSuccessResponse &&
      (() => {
        const ref = this.getRef(path.responses[firstResponse].schema);
        str = `Promise<import("axios").AxiosResponse<${ref}>>`;
      })();

    return str;
  }

  renderPath(path) {
    return `
/**
 * ${path.summary}
 * ${path.description}
${this.getParameters(path.parameters)}
 */
export const ${path.operationId} = async (${this.getParametersInline(
      path.parameters
    )}): ${this.getAxiosResponse(path) ||
      `Promise<import("axios").AxiosResponse<any>>`} => {
  const response = await axios.${path._method}(${this.getAxiosArguments(path)})
  return response
}`;
  }
}

module.exports = new Renderer();
