const axios = require("axios");

class Http {
  async getSwaggerJSON(url) {
    const { data } = await axios.get(url);
    return data;
  }
}

module.exports = new Http();
