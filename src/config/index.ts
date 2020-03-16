let config;

function initialize() {
  config = {
    port: process.env.PORT || 3000,
    size: process.env.JOKES_DEFAULT_SIZE || 10
  };
  return config;
}

export default () => config || (config = initialize());
