"use strict";

const Args = require("./services/args");
const s2n = require("./index");

module.exports = rawArgs => {
  const parsedArgs = rawArgs.slice(2);
  const requiredArguments = ["--name", "--json-url"];

  // check if required args was passed in correclty
  requiredArguments.forEach(requiredArgument => {
    if (!parsedArgs.includes(requiredArgument)) {
      throw TypeError(
        `The required argument ${requiredArgument} was not passed. Please, provide it.`
      );
    }
  });

  // setup arguments object
  const { getParam } = new Args(parsedArgs);
  const args = {
    name: getParam("--name"),
    jsonUrl: getParam("--json-url"),
    destination: {
      definitions:
        getParam("--definitions-path") || getParam("-DP") || "./definitions",
      service: getParam("--service-path") || getParam("-SP") || "./services"
    }
  };

  s2n(args);
};
