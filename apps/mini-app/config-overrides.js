const path = require("node:path");
const { override, babelInclude } = require("customize-cra");

module.exports = function Override(config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../../packages/ui"),
      ])
    )(config, env)
  );
};
