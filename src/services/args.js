class Args {
  constructor(args) {
    this.args = args;
  }

  /**
   * Retorna o próximo valor de um argumento
   * @param {string} param
   * @param {array} args
   */
  getParam = param => {
    const next = this.args.indexOf(param) + 1;
    return next ? this.args[next] : undefined;
  };
}

module.exports = Args;
