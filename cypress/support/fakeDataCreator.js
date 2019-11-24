import faker from 'faker';
export default {
  createUser: () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    password: 'test1234',
  }),
  createCompany: () => ({
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
  }),
};
