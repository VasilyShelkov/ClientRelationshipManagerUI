const envUrls = {
  test: {
    graphQL: '',
  },
  development: {
    graphQL: 'http://localhost:3010',
  },
  staging: {
    graphQL: 'https://crm-graphql-api-staging.herokuapp.com',
  },
  production: {
    graphQL: 'https://crm-graphql-api.herokuapp.com',
  },
};

export default envUrls[process.env.REACT_APP_GRAPHQL_CONFIG || 'development'];
