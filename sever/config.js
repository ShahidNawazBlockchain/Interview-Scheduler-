const env = "production";
const config = {
  development: {
    APIKey: "",
    APISecret: ""
  },
  production: {
    APIKey: "mnav4GcIQUSDpAIkP6GMOA",
    APISecret: "a4ttSoEUXgmSOwrr7qdm35aK73MbqVos"
  }
};

module.exports = config[env];
