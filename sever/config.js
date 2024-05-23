const env = "production";
const config = {
  development: {
    APIKey: "",
    APISecret: ""
  },
  production: {
    APIKey: "1A3wEo2vQJG2IWM_2xoDKw",
    APISecret: "MxGkwitJ6gIZE5wv5z02VGoXSSqrN22B"
  }
};

module.exports = config[env];
