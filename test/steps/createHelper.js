const faker = require('faker');

class CreateHelper extends Helper {
  createFakeUser() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      password: 'test1234'
    };
  }

  createFakeCompany() {
    return {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumberFormat(),
    };
  }
}

module.exports = CreateHelper;
