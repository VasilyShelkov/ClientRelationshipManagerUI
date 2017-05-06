module.exports = environment => {
  let password = 'test1234';
  if (environment === 'staging') {
    password = 'Vv07919911824';
  }

  return {
    email: 'vasilydshelkov@gmail.com',
    password
  };
};
